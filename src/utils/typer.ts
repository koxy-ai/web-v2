import { Input, KoxyNode, StartNode } from "@/types/koxy";

export class Typer {
  constructor() {}

  solveType(input: Input) {
    if (input.type !== "object") {
      return input.type;
    }

    let type = "{";

    for (const prop of input.properties) {
      const propType = this.solveType(prop[0]);
      type += `${prop[0].key}: ${propType},`;
    }

    type = type.slice(0, -1);
    type += "}";

    return type;
  }

  generateTypeCode(input: Input, prefix?: string): string {
    const type = this.solveType(input);
    let typeName = this.capitalFirst(input.key);

    if (prefix) {
      typeName = this.capitalFirst(prefix) + typeName;
    }

    if (input.type !== "object") {
      return `type ${typeName} = ${type};`;
    }

    return `interface ${typeName} ${type};`;
  }

  generateNodeTypesCode(node: KoxyNode | StartNode): string {
    let code = "";

    for (const [input] of node.inputs) {
      code += this.generateTypeCode(input, node.name);
      code += "\n";
    }

    return code;
  }

  capitalFirst(value: string) {
    const first = value.charAt(0).toUpperCase();
    const rest = value.slice(1);
    return first + rest;
  }
}
