import { EventEmitter } from "@okikio/emitter";
import { EditorView } from "@codemirror/view";
import {
  autocompletion,
  completeFromList,
  startCompletion,
} from "@codemirror/autocomplete";
import { hoverTooltip } from "@codemirror/tooltip";
import { Diagnostic, linter } from "@codemirror/lint";
import { keymap } from "@codemirror/view";

import debounce from "lodash.debounce";
import debounceAsync from "debounce-async";
const asyncdebounce = debounceAsync;

import type {
  CompletionContext,
  CompletionResult,
  Completion,
} from "@codemirror/autocomplete";
import type { ViewUpdate } from "@codemirror/view";
import type { Tooltip } from "@codemirror/tooltip";

import Codemirror from "./codemirror";
import { LegacyRef, useEffect, useRef, useState } from "react";

const emitter = new EventEmitter();

export default function Editor() {
  const [update, setUpdate] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let tsServer: Worker;
    let editor: EditorView;

    if (ref.current) {
      tsServer = new Worker(
        new URL("/workers/tsserver.js", window.location.origin),
        { name: "ts-server" }
      );

      editor = Codemirror(ref.current, "const a = 'hi'", [
        EditorView.updateListener.of(
          debounce((update: ViewUpdate) => {
            if (update.docChanged) {
              tsServer.postMessage({
                event: "updateText",
                details: update.state.doc,
              });
            }
          }, 150)
        ),

        autocompletion({
          activateOnTyping: true,
          override: [
            asyncdebounce(
              async (
                ctx: CompletionContext
              ): Promise<CompletionResult | null> => {
                const { pos } = ctx;

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
            tsServer.postMessage({
              event: "tooltip-request",
              details: { pos },
            });

            const { result: quickInfo, tootltipText }: any = await new Promise(
              (resolve) => {
                emitter.on("tooltip-results", (completions: any) => {
                  resolve(completions);
                });
              }
            );

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

            const diagnostics = await new Promise((resolve) => {
              emitter.on("lint-results", (completions: any) => {
                resolve(completions);
              });
            });

            if (!diagnostics) return [];
            return diagnostics as Diagnostic[];
          },
          {
            delay: 400,
          }
        ),
      ]);

      emitter.on("ready", () => {
        console.log("ts-server is ready");

        tsServer.postMessage({
          event: "updateText",
          details: editor.state.doc,
        });
      });

      tsServer.addEventListener(
        "message",
        ({ data }: MessageEvent<{ event: string; details: any }>) => {
          let { event, details } = data;
          emitter.emit(event, details);
        }
      );
    }

    return () => {
      tsServer?.terminate();
      editor?.destroy();
    };
  }, []);

  return <div className="text-sans" id="editor" ref={ref}></div>;
}
