import type { Node } from "@xyflow/react";
import type { NodeData } from "../types";

export const initialNodes: Node<NodeData>[] = [
  {
    id: "n1",
    type: "input",
    data: {
      label: "Data Source",
      outputs: {
        output: { type: "Dataset", label: "Output" },
      },
      nodeType: "DataSource",
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "n2",
    type: "default",
    data: {
      label: "Transform",
      inputs: { input: { type: "Dataset", label: "Input" } },
      outputs: {
        output: { type: "Dataset", label: "Output" },
      },
      nodeType: "Transform",
    },
    position: { x: 250, y: 100 },
  },
  {
    id: "n3",
    type: "default",
    data: {
      label: "Model",
      inputs: { input: { type: "Dataset", label: "Input" } },
      outputs: {
        output: { type: "Model", label: "Output" },
      },
      nodeType: "Model",
    },
    position: { x: 250, y: 200 },
  },
];
