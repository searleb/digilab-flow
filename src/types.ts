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
