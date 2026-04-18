import type { Edge } from "@xyflow/react";

export const initialEdges: Edge[] = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "Dataset",
    type: "smoothstep",
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "Dataset",
    type: "smoothstep",
  },
];
