export type NodeType = "DataSource" | "Transform" | "Model";
export type DataType = "Dataset" | "Model" | "Any";

export type NodeData = {
  label: string;
  inputs?: Record<string, HandleParam>;
  outputs?: Record<string, HandleParam>;
  nodeType: NodeType;
};

type HandleParam = {
  type: DataType;
  label: string;
};

// Renamed from `Node` to `DigiNode` — `Node` conflicts with the global DOM interface in lib.dom.d.ts.
export type DigiNode = {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: NodeData;
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
};
