import { EventEmitter } from "@okikio/emitter";
import { EditorView } from "@codemirror/view";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";
import { hoverTooltip } from "@codemirror/tooltip";
import { Diagnostic, linter } from "@codemirror/lint";

import debounce from "lodash.debounce";
import debounceAsync from "debounce-async";

import type {
  CompletionContext,
  CompletionResult,
  Completion,
} from "@codemirror/autocomplete";
import type { ViewUpdate } from "@codemirror/view";
import type { Tooltip } from "@codemirror/tooltip";

import Codemirror from "./codemirror";
import { useEffect, useRef, useState } from "react";
import type { Extension, Text } from "@codemirror/state";
import { CodeGenerator } from "@/utils/code-generator";

interface Props {
  doc?: string;
  generator?: CodeGenerator;
  theme?: Extension;
}

interface Doc {
  text: string[];
  length: number;
}

const emitter = new EventEmitter();
const asyncdebounce = debounceAsync;

export default function Editor({ doc, generator, theme }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  let contentLength = 0;

  useEffect(() => {
    let tsServer: Worker;
    let editor: EditorView;

    if (ref.current) {
      tsServer = new Worker(
        new URL("/workers/tsserver.js", window.location.origin),
        { name: "ts-server" }
      );

      editor = Codemirror({
        parentEl: ref.current,
        doc: doc ?? "// #Koxy.use(Typescript)",
        theme,
        extentions: [
          EditorView.updateListener.of(
            debounce((update: ViewUpdate) => {
              if (update.docChanged) {
                let doc: Doc = {
                  text: (update.state.doc as any as Doc).text,
                  length: update.state.doc.length,
                };

                if (!doc || doc.length < 1) return;

                if (generator) {
                  const text = generator.removeSource(doc.text.join("\n"));

                  doc.text = [...generator.apply(text).split("\n")];
                  doc.length = doc.text.join("\n").length;
                }

                tsServer.postMessage({
                  event: "updateText",
                  details: doc ?? {
                    text: ["// Koxy.use(Typescript)"],
                    length: "// #Koxy.use(Typescript)".length,
                  },
                });
              }

              contentLength = update.state.doc.length;
              }, 150)
          ),

          autocompletion({
            activateOnTyping: true,
            override: [
              asyncdebounce(
                async (
                  ctx: CompletionContext
                ): Promise<CompletionResult | null> => {
                  let { pos } = ctx;
                  // pos += 39;

                  try {
                    tsServer.postMessage({
                      event: "autocomplete-request",
                      details: { pos },
                    });

                    const completions = await new Promise((resolve) => {
                      emitter.on("autocomplete-results", (completions: any) => {
                        resolve(completions);
                      });
                    });

                    if (!completions) {
                      console.log("Unable to get completions", { pos });
                      return null;
                    }

                    console.log("completions", completions);
                    return completeFromList(
                      // @ts-ignore
                      completions.entries.map((c, i) => {
                        let suggestions: Completion = {
                          type: c.kind,
                          label: c.name,
                          // TODO:: populate details and info
                          boost: 1 / Number(c.sortText),
                        };

                        return suggestions;
                      })
                    )(ctx);
                  } catch (e) {
                    console.log("Unable to get completions", { pos, error: e });
                    return null;
                  }
                },
                200
              ),
            ],
          }),

          hoverTooltip(
            async (
              { state }: EditorView,
              pos: number
            ): Promise<Tooltip | null> => {
              const skip = generator?.skip() ?? 0;
              console.log(pos + skip);

              tsServer.postMessage({
                event: "tooltip-request",
                details: { pos: pos + skip },
              });

              const { result: quickInfo, tootltipText }: any =
                await new Promise((resolve) => {
                  emitter.on("tooltip-results", (completions: any) => {
                    resolve(completions);
                  });
                });

              if (!quickInfo) return null;

              return {
                pos,
                create() {
                  const dom = document.createElement("div");
                  dom.setAttribute("class", "cm-quickinfo-tooltip");
                  dom.textContent = tootltipText;

                  return { dom };
                },
              };
            },
            {
              hideOnChange: true,
            }
          ),

          linter(
            async (view: EditorView): Promise<Diagnostic[]> => {
              tsServer.postMessage({
                event: "lint-request",
                details: [],
              });

              const diagnostics: Diagnostic[] = await new Promise((resolve) => {
                emitter.on("lint-results", (completions: any) => {
                  resolve(completions as Diagnostic[]);
                });
              });

              if (!diagnostics || contentLength < 1) return [];

              for (const diag of diagnostics) {
                if (diag.from > contentLength || diag.to > contentLength) {
                  diag.from = 0;
                  diag.to = 1;
                }
              }

              return diagnostics;
            },
            {
              delay: 400,
            }
          ),
        ],
      });

      emitter.on("ready", () => {
        console.log("ts-server is ready");

        // console.log("STATE DOC", editor.state.doc);
        // tsServer.postMessage({
        //   event: "updateText",
        //   details: editor.state.doc,
        // });
      });

      tsServer.addEventListener(
        "message",
        ({ data }: MessageEvent<{ event: string; details: any }>) => {
          let { event, details } = data;
          console.log("EVENT", event);
          emitter.emit(event, details);
        }
      );
    }

    return () => {
      tsServer?.terminate();
      editor?.destroy();
    };
  }, []);

  return (
    <div className="text-sans border rounded-lg" id="editor" ref={ref}></div>
  );
}
