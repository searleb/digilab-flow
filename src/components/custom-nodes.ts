import type { NodeTypes } from "@xyflow/react";
import { SimpleNode } from "./SimpleNode";

export const nodeTypes: NodeTypes = {
  DataSource: SimpleNode,
  Transform: SimpleNode,
  Model: SimpleNode,
};
