export class CodeGenerator {
  source: string;
  static replacer: string = "<<KOXY_INSERT_VALUE>>";

  constructor(source: string) {
    this.source = source;
  }

  replace(value: string): string {
    let newCode = String(this.source);
    newCode = newCode.replace(CodeGenerator.replacer, value);

    return newCode;
  }

  apply(code: string) {
    const newCode = this.replace(code);
    return newCode;
  }

  removeSource(code: string) {
    const [first, replacer, second] = code.split(CodeGenerator.replacer);
    return (first || "") + (second || "");
  }

  skip() {
    if (this.source.startsWith(CodeGenerator.replacer)) {
      return 0;
    }

    const [source] = this.source.split(CodeGenerator.replacer);

    return source.length;
  }
}
