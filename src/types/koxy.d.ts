interface RetryOnFail {
  type: "retry";
  max: number;
  interval: number;
  continue: boolean;
}

interface TerminateOnFail {
  type: "terminate";
}

interface IgnoreOnFail {
  type: "ignore";
}

interface CustomOnFail {
  type: "custom";
  code: string;
}

export type OnFail =
  | RetryOnFail
  | TerminateOnFail
  | IgnoreOnFail
  | CustomOnFail;

interface BaseInputUi {
  placeholder?: string;
}

interface StringInputUi extends BaseInputUi {
  type: "string";
}

interface NumberInputUi extends BaseInputUi {
  type: "number";
  min?: number;
  max?: number;
}

interface BooleanInputUi extends BaseInputUi {
  type: "boolean";
}

interface SelectInputUi extends BaseInputUi {
  type: "select";
  options: [string, string][];
}

interface CustomInputUi extends BaseInputUi {
  type: "custom";
}

export type InputUi =
  | StringInputUi
  | NumberInputUi
  | BooleanInputUi
  | SelectInputUi
  | CustomInputUi;

interface UntypedInput {
  key: string;
  label: string;
  description?: string;

  required: boolean;
  visible: boolean;

  validationRegex?: string;
  default?: any;
  index: number;
}

interface BaseInput extends UntypedInput {
  type: "string" | "number" | "boolean" | "any";
}

interface ArrayInput extends UntypedInput {
  type: "array";
  items: BaseInput | ObjectInput | ArrayInput;
}

interface ObjectInput extends UntypedInput {
  type: "object";
  properties: [BaseInput | ObjectInput | ArrayInput, string][];
}

export type Input = BaseInput | ObjectInput | ArrayInput;

export interface BaseNode {
  id: string;
  name: string;
  label: string;
  icon: string;
  description: string;

  code: string;
  inputs: [Input, string, InputUi][]; // value format: type:K::
  outputs: [Input, string | undefined][];

  group?: string;
  docs?: string; // markdown documentation
  help?: string; // link
}

export interface NormalNode extends BaseNode {
  type: "normal";
  next: string;
  onFail?: OnFail;
}

export interface PythonNode extends BaseNode {
  type: "python";
  next: string;
  onFail?: OnFail;
}

export interface ConditionNode extends BaseNode {
  type: "condition";
  next: { default: string; success: string; fail: string };
}

export interface ControlNode extends BaseNode {
  type: "control";
  next: string;
  children: NormalNode[];
}

export interface StartNode extends BaseNode {
  type: "start";
  next: string;
}

export interface ReturnNode extends BaseNode {
  type: "return";
}

export type FunctionalNode = NormalNode | ControlNode | PythonNode | ConditionNode;

export type KoxyNode =
  | NormalNode
  | ConditionNode
  | ControlNode
  | ReturnNode
  | PythonNode;

export interface Flow {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";

  start: StartNode;
  nodes: KoxyNode[];
  end: ReturnNode;

  history: Flow[];
  dependecies: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  schema: [Input, string][];
}

export interface Api {
  id: string;
  collections?: Collection[];
  database?: string;
  timeout?: number;
  keep_warm: boolean;
  container_type: "BASE" | "MEDIUM" | "LARGE" | "XLARGE";
  gpu?: {
    type: "T4" | "L4" | "A10G" | "A100";
    count: number;
  }
  cpu?: number;
  memory?: number;
  memory_limit?: number;
  autoscale?: boolean;
  flows: Record<string, Flow[]>;
}

export interface Res {
  status: number;
  body?: any;
  headers?: Record<string, string>;
}

// UI STUFF

export interface UpdateProjectProps {
  type: "project";
  data: Partial<Project>;
}

export interface UpdateApiProps {
  type: "api";
  data: Partial<Api>;
}

export interface CompCall {
  team: Team;
  project: Project;
  api: Api;
  openTab: (id: string, comp: CompRes, data?: Record<string, any>) => any;
  closeTab: (id: string) => any;
  saveChanges: (project: Project) => any;
  update: (payload: UpdateProjectProps | UpdateApiProps, callback?: Function) => any;
  data?: Record<string, any>;
}

export type CompRes = (args: CompCall) => JSX.Element;
