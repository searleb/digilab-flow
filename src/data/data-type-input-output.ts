import type { NodeData, NodeType } from "../types";

export const dataTypeInputsOutputs: Record<
  NodeType,
  {
    inputs?: NodeData["inputs"];
    outputs: NodeData["outputs"];
  }
> = {
  DataSource: {
    outputs: {
      output: { type: "Dataset", label: "Output" },
    },
  },
  Transform: {
    inputs: { input: { type: "Dataset", label: "Input" } },
    outputs: {
      output: { type: "Dataset", label: "Output" },
    },
  },
  Model: {
    inputs: { input: { type: "Dataset", label: "Input" } },
    outputs: {
      output: { type: "Model", label: "Output" },
    },
  },
};
