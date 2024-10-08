import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

import { BASIC_SETUP, EditorView, EditorState } from "./editor-basic-setup";
import { THEME, HIGHTLIGHT_STYLE } from "./editor-theme";
import { lineNumbers } from "@codemirror/gutter";

import type { Extension } from "@codemirror/state";

interface Props {
  parentEl: HTMLElement;
  doc: string;
  extentions?: Extension;
  theme?: Extension;
  showLineNumbers?: boolean;
}

export default ({
  doc,
  parentEl,
  extentions,
  theme,
  showLineNumbers,
}: Props) => {
  const extensions: Extension[] = [
    BASIC_SETUP,

    theme ?? THEME,
    HIGHTLIGHT_STYLE,

    keymap.of([indentWithTab]),
    javascript({
      typescript: true,
    }),
  ];

  if (showLineNumbers) {
    extensions.push(lineNumbers());
  }

  return new EditorView({
    state: EditorState.create({
      doc,
      extensions: extensions.concat(extentions || []),
    }),
    parent: parentEl,
  });
};
