import { Input, KoxyNode, StartNode } from "@/types/koxy";

export class Typer {
  constructor() {}

  static solveType(input: Input): string {
    if (input.type !== "object") {
      if (input.type === "array") {
        return `${Typer.solveType(input.items)}[]`;
      }

      return input.type;
    }

    let type = "{";

    for (const prop of input.properties) {
      const propType = Typer.solveType(prop[0]);
      type += prop[0].required
        ? `${prop[0].key}: ${propType},`
        : `${prop[0].key}?: ${propType},`;
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

    const innerOptional = input.required ? "" : "?";
    const outerOptional = input.required ? "" : " | undefined";

    return !inner
      ? `type ${typeName} = ${type}${outerOptional};`
      : `${input.key}${innerOptional}: ${type}`;
  }

  static generateNodeSpecType(
    node: KoxyNode,
    focus: "inputs" | "outputs",
    varName?: string
  ): string {
    let code = "";
    const asVar = typeof varName === "string" && varName.length > 0;

    code += asVar ? `interface ${Typer.capitalFirst(varName)} {` : "{";
    for (const [input] of node[focus]) {
      code += Typer.generateTypeCode(input, node.name, true);
    }

    code += "}";
    if (asVar) code += ";\n";

    return code;
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
