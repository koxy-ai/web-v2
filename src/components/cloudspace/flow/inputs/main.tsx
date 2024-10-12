"use client";

import { CompCall, Flow, Input, InputUi, KoxyNode, StartNode } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";
import StringInput from "./string-input";
import { Typer } from "@/utils/typer";

interface Props {
  node: KoxyNode | StartNode;
  input: [Input, string, InputUi];
  store: FlowStore;
  update: (f: Flow) => any;
}

export default function SimpleInput({ node, input, store, update }: Props) {
  const type = Typer.readInputValueType(input[1]);
  console.log(input);

  const updateInputValue = (value: string) => {
    const newFlow = store.updateNode({
      ...node,
      inputs: [
        ...node.inputs.filter((i) => i[0].key !== input[0].key),
        [input[0], `${type}:K::${value}`, input[2]],
      ],
    });

    update(newFlow);
  };

  return (
    <StringInput
      node={node}
      input={input}
      value={Typer.readInputValue(input[1])}
      store={store}
      updateValue={(v) => updateInputValue(v)}
    />
  );
}
