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
import { CodeReplacer } from "@/utils/code-replacer";
import { IconLoader } from "@tabler/icons-react";

interface Props {
  doc?: string;
  replacer?: CodeReplacer;
  theme?: Extension;
  showLineNumbers?: boolean;
  fallback?: string;
  showDiagnostics?: ("info" | "error" | "warning")[];
  width?: string;
  height?: string;
  setDiagnostic?: (diags: Diagnostic[]) => any;
  className?: string;
  updateDoc?: (doc: string) => any;
}

interface Doc {
  text: string[];
  length: number;
}

const emitter = new EventEmitter();
const asyncdebounce = debounceAsync;

export default function Editor({
  doc,
  replacer,
  theme,
  showLineNumbers,
  fallback,
  setDiagnostic,
  updateDoc,
  showDiagnostics = [],
  className,
  width,
  height
}: Props) {
  const [readyState, setReady] = useState<boolean>(false);
  const [errors, setErrorsState] = useState<string[]>([]);
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
        doc: doc ?? "",
        theme,
        showLineNumbers,
        extentions: [
          EditorView.updateListener.of(
            debounce((update: ViewUpdate) => {
              if (update.docChanged) {
                let doc: Doc = {
                  text: (update.state.doc as any as Doc).text,
                  length: update.state.doc.length,
                };

                if (!doc || doc.length < 1 || doc.text.join("\n").length < 1) {
                  if (fallback) {
                    doc.text = [...fallback.split("\n")];
                    doc.length = fallback.length;
                  } else {
                    return;
                  }
                }

                if (replacer) {
                  const text = replacer.removeSource(doc.text.join("\n"));

                  doc.text = [...replacer.apply(text).split("\n")];
                  doc.length = doc.text.join("\n").length;
                }

                tsServer.postMessage({
                  event: "updateText",
                  details: doc ?? {
                    text: [""],
                    length: 0,
                  },
                });

                if (updateDoc) {
                  updateDoc(doc.text.join("\n"));
                }
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
              try {
                const skip = replacer?.skip() ?? 0;

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
              } catch (err) {
                console.error("Error in tooltip:", err);
                return null;
              }
            },
            {
              hideOnChange: true,
            }
          ),

          linter(
            async (_view: EditorView): Promise<Diagnostic[]> => {
              try {
                tsServer.postMessage({
                  event: "lint-request",
                  details: [],
                });

                const diagnostics: Diagnostic[] = await new Promise(
                  (resolve) => {
                    emitter.on("lint-results", (completions: any) => {
                      resolve(completions as Diagnostic[]);
                    });
                  }
                );

                if (!diagnostics || contentLength < 1) return [];
                const wanted: Diagnostic[] = [];

                for (const diag of diagnostics) {
                  if (
                    showDiagnostics.length > 1 &&
                    showDiagnostics.indexOf(diag.severity) === -1
                  ) {
                    continue;
                  }

                  if (diag.from > contentLength || diag.to > contentLength) {
                    diag.from = 0;
                    diag.to = 1;
                  }

                  if (diag.from < 0) diag.from = 0;
                  if (diag.to < 1) diag.to = 1;

                  if (diag.severity === "error") {
                    setErrorsState((prev) => [...prev, diag.message]);
                  }

                  if (typeof diag.message === "object") {
                    diag.message = (diag.message as any).messageText;
                  }

                  wanted.push(diag);
                }

                console.log("LINTER", wanted);
                if (setDiagnostic) {
                  setDiagnostic(wanted);
                }

                return wanted;
              } catch (err) {
                console.error("Error in linter:", err);
                return [];
              }
            },
            {
              delay: 400,
            }
          ),
        ],
      });

      emitter.on("ready", () => {
        console.log("ts-server is ready");
        setReady(true);

        const content = replacer?.apply("undefined") ?? "";

        tsServer.postMessage({
          event: "updateText",
          details: {
            text: content.split("\n"),
            length: content.length,
          },
        });
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
    <>
      {!readyState && (
        <div className="p-10 flex items-center justify-center">
          <IconLoader size={15} className="animate-spin" />
        </div>
      )}
      <div
        className={`relative text-sans resize-none pl-0 z-20 overflow-hidden pr-6 bg-[#0f0f0f] ${
          !readyState ? "hidden" : ""
        } ${className}`}
        id="editor"
        ref={ref}
        style={{
          maxWidth: width || "20vw",
          width: width || "20rem",
          maxHeight: height || "15rem",
          height: height || "15rem",
        }}
      ></div>
    </>
  );
}
