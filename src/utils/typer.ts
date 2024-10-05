import { Input, KoxyNode, StartNode } from "@/types/koxy";

export class Typer {
  constructor() {}

  static solveType(input: Input) {
    if (input.type !== "object") {
      return input.type;
    }

    let type = "{";

    for (const prop of input.properties) {
      const propType = Typer.solveType(prop[0]);
      type += `${prop[0].key}: ${propType},`;
    }

    type = type.slice(0, -1);
    type += "}";

    return type;
  }

  static generateTypeCode(
    input: Input,
    prefix: string | undefined = undefined,
    inner?: boolean
  ): string {
    const type = this.solveType(input);
    let typeName = Typer.capitalFirst(input.key);

    if (prefix) {
      typeName = Typer.capitalFirst(prefix) + typeName;
    }

    if (input.type !== "object") {
      return !inner ? `type ${typeName} = ${type};` : `${input.key}: ${type}`;
    }

    return !inner ? `interface ${typeName} ${type};` : `${input.key}: ${type}`;
  }

  static generateNodeTypesCode(node: KoxyNode | StartNode): string {
    let code = "";

    code += "interface Inputs {";
    for (const [input] of node.inputs) {
      code += Typer.generateTypeCode(input, node.name, true);
    }
    code += "};\n";

    code += "interface Outputs {";
    for (const [input] of node.outputs) {
      code += Typer.generateTypeCode(input, node.name, true);
      code += "\n";
    }
    code += "};\n";

    return code;
  }

  static capitalFirst(value: string) {
    const first = value.charAt(0).toUpperCase();
    const rest = value.slice(1);
    return first + rest;
  }
}
