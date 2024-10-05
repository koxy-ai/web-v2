import { Api, Flow } from "@/types/koxy";

export const apiSample: Api = {
  id: "sample",
  flows: {},
  keep_warm: false,
  container_type: "BASE",
  timeout: 150,
  autoscale: false,
  collections: [],
  database: "default",
  cpu: 0.5,
  memory: 1024,
  memory_limit: 2048,
};

export const newApiFromSample = (api: Partial<Api> = {}) => {
  return { ...apiSample, ...api };
};

export const sampleRoute = (
  path: string,
  method: Flow["method"],
  name?: string
): Flow => {
  return {
    id: crypto.randomUUID(),
    method,
    name: name || `${method} ${path}`,
    history: [],
    dependecies: [],
    start: {
      id: "start-0",
      name: "start",
      label: "Start",
      code: "",
      description: "",
      icon: "",
      type: "start",
      inputs: [],
      next: "NONE",
    },
    nodes: [],
    end: {
      id: "end-0",
      name: "end",
      label: "End",
      icon: "",
      inputs: [
        [
          {
            type: "number",
            key: "status",
            label: "Status",
            required: false,
            visible: true,
            default: 200,
            description: "The response status code"
          },
          "number:K::200",
          { type: "number", placeholder: "200" },
        ],
        [
          {
            type: "number",
            key: "body",
            label: "Body",
            required: false,
            visible: true,
            default: "{}",
            description: "The response body"
          },
          "code:K::{}",
          { type: "custom", placeholder: "The response body" },
        ],
      ],
      type: "return",
      code: "",
      description: "",
    },
  };
};
