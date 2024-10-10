import { Flow, KoxyNode, StartNode } from "@/types/koxy";
import { Typer } from "./typer";
import { FlowStore } from "./flow";

export class CodeGenerator {
  store: FlowStore;
  code: string = "";
  solved: KoxyNode[] = [];

  constructor(store: FlowStore) {
    this.store = store;
  }

  private generateLogger() {
    this.code += `logger: {
      info: (...args: any) => void,
      error: (...args: any) => void,
      warn: (...args: any) => void
    };`;
  }

  private generateDb() {
    const names = this.store
      .getDBCollectionsNames()
      .map((c) => `"${c}"`)
      .join("|");
    this.code = `type KVCollectionsNames = ${names};\n${this.code}`;

    let collectionsCode = "interface KVCollections {\n";

    for (const collection of this.store.getCollections()) {
      let code = `${collection.name}: {\n`;

      for (const type of collection.schema) {
        const typeCode = Typer.generateTypeCode(type[0], undefined, true);
        code += `${type[0].key}: ${typeCode},\n`;
      }

      code += "\n},";
      collectionsCode += code;
    }

    this.code = `${collectionsCode};\n${this.code}`;

    this.code += `db: {
      get: <T extends KVCollectionsNames>(collection: T, key: string[]) => Promise<KVCollections[T]>,
      set: <T extends KVCollectionsNames>(collection: T, key: string[], data: KVCollections[T]) => Promise<boolean>,
    };\n`;
  }

  private generateResults(node: KoxyNode) {
    this.code += "results: {\n";

    const parent = this.store.getParent(node)!;
    if (parent) this.generateNodeResults(parent, "up");

    this.code += "\n};\n";
  }

  private generateNodeResults(
    node: KoxyNode | StartNode,
    direction: "up" | "down"
  ): void {
    if (node.type === "start") return;
    if (node.outputs.length < 1) return;
    if (this.solved.indexOf(node) !== -1) return;

    if (node.type === "condition") {
      const children = this.store.getConditionChildren(node);
      if (children.success) {
        this.generateNodeResults(children.success, "down");
      }

      if (children.fail) {
        this.generateNodeResults(children.fail, "down");
      }

      if (direction === "down" && children.default) {
        return this.generateNodeResults(children.default, "down");
      }

      if (direction === "down") {
        return;
      }
    }

    const outputType = Typer.generateNodeSpecType(node, "outputs");

    if (!this.code.includes(`"${node.name}": `)) {
      this.code += `"${node.name}": ${outputType}`;
    }

    this.solved.push(node);
    if (direction === "up") {
      const parent = this.store.getParent(node)!;
      if (parent) this.generateNodeResults(parent, "up");
      return;
    }

    const next = this.store.getNext(node);
    if (next) this.generateNodeResults(next, "down");
  }

  generateContext(node: KoxyNode) {
    console.log("Generating context for node:", node.name);
    this.code = "interface KoxyType {\n";

    this.code += `"headers": Record<string, string>`;

    this.generateLogger();
    this.generateDb();
    this.generateResults(node);

    this.code += "};\n";

    return this.code;
  }
}
