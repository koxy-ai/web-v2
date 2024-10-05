import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

import { BASIC_SETUP, EditorView, EditorState } from "./editor-basic-setup";
import { THEME, HIGHTLIGHT_STYLE } from "./editor-theme";

import type { Extension } from "@codemirror/state";

export default (parentEl: HTMLElement, doc: string, extentions?: Extension) => {
  return new EditorView({
    state: EditorState.create({
      doc,
      extensions: [
        BASIC_SETUP,

        THEME,
        HIGHTLIGHT_STYLE,

        keymap.of([indentWithTab]),
        javascript({
          typescript: true,
        }),
      ].concat(extentions || []),
    }),
    parent: parentEl,
  });
};