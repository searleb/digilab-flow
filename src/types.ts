// Renamed from `Node` to `DigiNode` — `Node` conflicts with the global DOM interface in lib.dom.d.ts.
type DigiNode = {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: NodeData;
};

type NodeData = {
  label: string;
  inputs: Record<string, HandleParam>;
  outputs: Record<string, HandleParam>;
  nodeType: "DataSource" | "Transform" | "Model";
};

type HandleParam = {
  type: DataType;
  label: string;
};

type DataType = "Dataset" | "Model" | "Any";

type Edge = {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
};
