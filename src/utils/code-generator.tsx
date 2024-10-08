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

  private generateResults(node: KoxyNode) {
    this.code += "results: {\n";

    const parent = this.store.getParent(node)!;
    if (parent) this.generateNodeResults(parent, "up");

    this.code += "\n},";
  }

  private generateNodeResults(node: KoxyNode | StartNode, direction: "up" | "down"): void {
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

    this.code += "};\n";

    return this.code;
  }
}
