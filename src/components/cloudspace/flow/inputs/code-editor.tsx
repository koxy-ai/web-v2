"use client";

import { KoxyNode, StartNode, Input, InputUi, Flow } from "@/types/koxy";
import { CodeGenerator } from "@/utils/code-generator";
import { CodeReplacer } from "@/utils/code-replacer";
import { FlowStore } from "@/utils/flow";
import { Typer } from "@/utils/typer";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

interface KVCollections {}
type KVCollectionsNames = keyof KVCollections;
interface KoxyType {
  headers: Record<string, string>;
  body: Record<string, any>;
  logger: {
    info: (...args: any) => void;
    error: (...args: any) => void;
    warn: (...args: any) => void;
  };
  db: {
    get: <T extends KVCollectionsNames>(
      collection: T,
      key: string[]
    ) => Promise<KVCollections[T]>;
    set: <T extends KVCollectionsNames>(
      collection: T,
      key: string[],
      data: KVCollections[T]
    ) => Promise<boolean>;
  };
  results: {};
}

const Editor = dynamic(
  () => import("@/components/cloudspace/flow/editor/Editor")
);

interface Props {
  node: KoxyNode | StartNode;
  input: [Input, string, InputUi];
  store: FlowStore;
  update: (f: Flow) => any;
  show: boolean;
  hide: () => any;
}

export function InputCodeEditor({ node, store, input, show, hide }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const returnType = Typer.solveType(input[0], true);
  const generator = new CodeGenerator(store);
  const types = generator.generateContext(node);

  const replacer = new CodeReplacer(
    `
      ${types}
      const main = async ({ Koxy }: {Koxy: KoxyType}): Promise<${returnType}> => (<<KOXY_INSERT_VALUE>>)
    `
  );

  console.log(returnType);
  console.log(types);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        hide();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, hide]);

  if (!show) return null;

  return (
    <div
      ref={editorRef}
      className={`w-full bg-background z-40 border rounded-lg flex flex-col`}
    >
      <Editor
        replacer={replacer}
        showLineNumbers={false}
        showDiagnostics={["error", "warning"]}
        width="15rem"
      />
    </div>
  );
}
