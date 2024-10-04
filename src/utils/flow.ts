import {
  ConditionNode,
  Flow,
  FunctionalNode,
  KoxyNode,
  ReturnNode,
  StartNode,
} from "@/types/koxy";

export class FlowStore {
  flow: Flow;

  constructor(flow: Flow) {
    this.flow = flow;
  }

  set(flow: Flow) {
    this.flow = { ...flow };
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
  }

  updateEnd(end: ReturnNode) {
    const newFlow = this.copy();
    newFlow.end = end;
    this.set(newFlow);
  }

  updateNode(node: KoxyNode) {
    const newFlow = this.copy();
    const nodes = newFlow.nodes.filter((n) => n.name !== node.name);
    nodes.push(node);
    newFlow.nodes = nodes;

    this.set(newFlow);
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

    return true;
  }

  getNext(node: KoxyNode | StartNode): KoxyNode | null {
    if (node.type === "return") return null;

    const next = node.type === "condition" ? node.next.default : node.next;
    const nextNode = this.flow.nodes.find((n) => n.name === next);
    if (!nextNode) return null;

    return nextNode;
  }

  getConditionChildren(node: ConditionNode): {
    success: KoxyNode | null;
    fail: KoxyNode | null;
  } {
    const success = this.flow.nodes.find((n) => n.name === node.next.success);
    const failed = this.flow.nodes.find((n) => n.name === node.next.fail);

    return { success: success || null, fail: failed || null };
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
}