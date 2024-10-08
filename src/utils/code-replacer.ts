export class CodeReplacer {
  source: string;
  static replacer: string = "<<KOXY_INSERT_VALUE>>";

  constructor(source: string) {
    this.source = source;
  }

  replace(value: string): string {
    let newCode = String(this.source);
    newCode = newCode.replace(CodeReplacer.replacer, value);

    return newCode;
  }

  apply(code: string) {
    const newCode = this.replace(code);
    return newCode;
  }

  removeSource(code: string) {
    const [first, replacer, second] = code.split(CodeReplacer.replacer);
    return (first || "") + (second || "");
  }

  skip() {
    if (this.source.startsWith(CodeReplacer.replacer)) {
      return 0;
    }

    const [source] = this.source.split(CodeReplacer.replacer);

    return source.length;
  }
}
