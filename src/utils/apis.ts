import { Api } from "@/types/koxy";

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
