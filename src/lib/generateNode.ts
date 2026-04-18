import { dataTypeInputsOutputs } from "../data/data-type-input-output";
import type { DigiNode, NodeType } from "../types";

export const generateNode = ({
  nodeType,
  lastNode,
  index,
}: {
  nodeType: NodeType;
  lastNode: DigiNode | undefined;
  index: number;
}): DigiNode => ({
  id: `n${index}`,
  type: nodeType === "DataSource" ? "input" : "default",
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
