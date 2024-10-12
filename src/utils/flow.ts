import {
  Api,
  ConditionNode,
  Flow,
  FunctionalNode,
  KoxyNode,
  ReturnNode,
  StartNode,
} from "@/types/koxy";

export class FlowStore {
  api: Api;
  flow: Flow;
  state: Record<string, any> = {};
  stateListeners: Record<string, Function[]> = {};
  mainListener?: (f: Flow) => any;

  constructor(api: Api, flow?: Flow, mainListener?: (f: Flow) => any) {
    this.api = api;
    this.flow = flow || ({} as Flow);
    this.mainListener = mainListener;
  }

  useNodeState<T = any>(node: KoxyNode | StartNode, key: string, defaultV: T) {
    const stateKey = this.nodeStateKey(node, key);
    const exist = this.getState<T>(stateKey);

    if (exist !== undefined) {
      return exist;
    }

    this.setState<T>(stateKey, defaultV);
    return this.getState<T>(stateKey);
  }

  nodeStateKey(node: KoxyNode | StartNode, key: string) {
    return `${this.flow.id}:${node.id}:${key}`;
  }

  nodeState(node: KoxyNode | StartNode) {
    const store = this;

    const get = function <T = any>(key: string) {
      return store.getState<T>(store.nodeStateKey(node, key));
    };

    const set = function <T = any>(key: string, data: T) {
      store.setState<T>(store.nodeStateKey(node, key), data);
    };

    const onUpdate = function <T = any>(
      key: string,
      callback: (data: T) => void
    ) {
      store.onStateUpdate<T>(store.nodeStateKey(node, key), callback);
    };

    const use = function <T = any>(key: string, defaultV: T): T {
      const res = store.useNodeState<T>(node, key, defaultV);
      return res;
    };

    return {
      get,
      set,
      onUpdate,
      use,
    };
  }

  setState<T = any>(key: string, data: T) {
    this.state[key] = data;
    (this.stateListeners[key] ?? []).forEach((callback) => callback(data));

    if (this.mainListener) this.mainListener(this.flow);
  }

  getState<T = any>(key: string): T {
    return this.state[key] as T;
  }

  onStateUpdate<T = any>(key: string, callback: (data: T) => void) {
    if (!this.stateListeners[key]) this.stateListeners[key] = [];
    this.stateListeners[key].push((d: T) => callback(d));
  }

  set(flow: Flow) {
    this.flow = { ...flow };
    if (this.mainListener) this.mainListener(this.flow);
  }

  copy() {
    return { ...this.flow };
  }

  getNodeByName(name: string): KoxyNode | StartNode | null {
    if (name === this.flow.start.name) return this.flow.start;
    if (name === this.flow.end.name) return this.flow.end;

    return this.flow.nodes.find((n) => n.name === name) || null;
  }

  updateStart(start: StartNode) {
    const newFlow = this.copy();
    newFlow.start = start;
    this.set(newFlow);

    return newFlow;
  }

  updateEnd(end: ReturnNode) {
    const newFlow = this.copy();
    newFlow.end = end;
    this.set(newFlow);

    return newFlow;
  }

  updateNode(node: KoxyNode | StartNode) {
    if (node.type === "start") return this.updateStart(node);
    if (node.type === "return" && node.id === this.flow.end.id) {
      return this.updateEnd(node);
    }

    const newFlow = this.copy();
    const nodes = newFlow.nodes.filter((n) => n.name !== node.name);
    nodes.push(node);
    newFlow.nodes = nodes;

    this.set(newFlow);
    return newFlow;
  }

  addNode(
    parent: string,
    node: KoxyNode,
    as: "success" | "fail" = "success"
  ): boolean {
    const parentNode = this.getNodeByName(parent);
    if (!parentNode) return false;

    this.flow.nodes.push(node);

    if (parentNode.type === "return") return false;

    const currentNext =
      parentNode.type === "condition" ? parentNode.next[as] : parentNode.next;

    if (currentNext) {
      if (node.type === "condition") {
        node.next[as] = `${currentNext}`;
      } else if (node.type !== "return") {
        node.next = currentNext;
      }
    }

    if (parentNode.type === "condition") {
      parentNode.next[as] = node.name;
    } else {
      parentNode.next = node.name;
    }

    if (parentNode.type === "start") {
      this.updateStart(parentNode);
    } else {
      this.updateNode(parentNode);
    }

    this.set(this.flow);
    return true;
  }

  getNext(node: KoxyNode | StartNode): KoxyNode | null {
    if (node.type === "return") return null;

    const next = node.type === "condition" ? node.next.default : node.next;
    if (!next) return null;

    const nextNode = this.flow.nodes.find((n) => n.name === next);
    if (!nextNode) return null;

    return nextNode;
  }

  getConditionChildren(node: ConditionNode): {
    success: KoxyNode | null;
    fail: KoxyNode | null;
    default: KoxyNode | null;
  } {
    const success = this.flow.nodes.find((n) => n.name === node.next.success);
    const failed = this.flow.nodes.find((n) => n.name === node.next.fail);
    const next = this.flow.nodes.find((n) => n.name === node.next.default);

    return {
      success: success || null,
      fail: failed || null,
      default: next || null,
    };
  }

  hasConditionParent(node: KoxyNode): boolean {
    let children: KoxyNode | null = { ...node };
    let parent = this.getParent(node);

    while (parent && parent.type !== "start") {
      if (parent.type !== "condition") {
        parent = this.getParent(parent);
        continue;
      }

      const condChildren = this.getConditionChildren(parent);
      if (condChildren.success === children || condChildren.fail === children) {
        return true;
      }

      children = parent;
      parent = this.getParent(parent);
    }

    return false;
  }

  getParent(node: KoxyNode): KoxyNode | StartNode | null {
    if (this.flow.start.next === node.name) return this.flow.start;
    if (this.flow.end.name === node.name) return this.flow.end;

    const nodes = this.flow.nodes.filter(
      (n) => n.type !== "return"
    ) as FunctionalNode[];

    const parent = nodes.find((n) => n.next === node.name);
    if (!parent) return null;

    return parent;
  }

  validString(value: string) {
    return typeof value === "string" && value.length > 0;
  }

  // --- DB & collections

  getCollections() {
    return this.api.collections ?? [];
  }

  getDBCollectionsNames(): string[] {
    if (!this.api.collections) return [];

    return this.api.collections.map((c) => c.name);
  }
}
