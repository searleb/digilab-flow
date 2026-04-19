import type { Node } from "@xyflow/react";
import { dataTypeInputsOutputs } from "../data/data-type-input-output";
import type { NodeData, NodeType } from "../types";

export const generateNode = ({
  nodeType,
  lastNode,
  index,
}: {
  nodeType: NodeType;
  lastNode: Node<NodeData> | undefined;
  index: number;
}): Node<NodeData> => ({
  id: `n${index}`, // this is ok for a prototype but could produce duplicate ID's when deleting a node for example, upgrade to a uuid.
  type: nodeType,
  position: {
    x: lastNode ? lastNode.position.x + 50 : 40,
    y: lastNode ? lastNode.position.y + 80 : 40,
  },
  data: {
    label: nodeType,
    nodeType,
    ...dataTypeInputsOutputs[nodeType],
  },
});
