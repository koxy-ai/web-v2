// just placeholders (remove in real-world app)
namespace React {
  export interface ReactNode {}
}

interface Schema {}

// accounts & teams

type Role = "developer" | "admin" | "owner" | "analytics";

interface Invitation {
  teamId: string;
  teamName: string;
  role: Role;
}

interface Member {
  name: string;
  avatar?: string;
  teamId: string;
  role: string;
}

interface User {
  // all the basic info
  teams: string[];
  invitations: Invitation[];
}

interface Team {
  id: string;
  uniqueName: string;
  avatar?: string;
  members: Member[];
}

// Cores

type Type = string &
  (
    | "string"
    | "number"
    | "boolean"
    | "string[]"
    | "number[]"
    | "boolean[]"
    | "any"
  );

interface TypeInterface {
  schema: Schema;
  properties: [string, string][];
}

interface Var {
  id: string;
  type: Type;
  default?: any;
}

interface GlobalVar extends Var {
  global: true;
}

// Interface inputs

interface BaseInput {
  id: string;
  placeholder: string;
  name: string;
  help?: string;
  docs?: string;
  required: boolean;
  value?: any;
}

interface StringInput extends BaseInput {
  type: "string";
  inputType: "text";
}

interface NumberInput extends BaseInput {
  type: "number";
  inputType: "number";
}

interface BooleanInput extends BaseInput {
  type: "boolean";
  inputType: "check";
}

interface SelectInput extends BaseInput {
  type: Type;
  inputType: "select";
  options: { value: string; placeholder: string }[];
}

interface NodeInput extends BaseInput {
  type: "node";
  inputType: "node-select";
}

interface CollectionInput extends BaseInput {
  type: "collection";
  inputType: "collection-select";
}

interface ModelInput extends BaseInput {
  type: "model";
  inputType: "model-select";
}

type Input =
  | StringInput
  | NumberInput
  | BooleanInput
  | SelectInput
  | NodeInput
  | CollectionInput
  | ModelInput;

// Nodes

interface NodeBlueprint<I = any> {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description: string;
  info: string;
  vars: Var[];
  inputs: Input[];
  types: Record<string, TypeInterface>;
  inputsType: I;
  settings: Input[];
  response: Type;
}

interface FlowNode<I = any> extends NodeBlueprint<I> {
  type: string; // the ID of the blueprint
}

interface NodeExecutor<I = any, O = any> {
  node: FlowNode<I>;
  executor: (args: I) => O | Promise<O>;
}

// Flow

interface Flow {
  id: string;
  name: string;
  inputs: Record<string, Type>;
  nodes: FlowNode[];
  types: Record<string, TypeInterface>;
  response: string[];
  vars: Var[];
  method: "GET" | "POST" | "DELETE";
}

interface API {
  main: Flow;
  error: Flow;
  paths: [string, Flow][];
}

// project

interface Project {
  id: string;
  teamId: string;
  name: string;
  members: string[];
}

// Database

interface DB {}

// Utils

// Read variables
class Dynamica {}

// Read and match types
class Typer {}
