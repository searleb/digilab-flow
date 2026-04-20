import {
  Position,
  useConnection,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { BaseNode, BaseNodeContent } from "./base-node";
import type { NodeData } from "../types";
import { BaseHandle } from "./base-handle";
import { dataTypeInputsOutputs } from "../data/data-type-input-output";

export const SimpleNode = (props: NodeProps<Node<NodeData>>) => {
  const { data } = props;
  const connection = useConnection();
  const isInvalidConnection =
    connection.toNode?.id === props.id && !connection.isValid;
  const nodeTypeHandles = dataTypeInputsOutputs[data.nodeType];

  return (
    <BaseNode className={isInvalidConnection ? "bg-red-600" : ""}>
      <BaseNodeContent>
        {"inputs" in nodeTypeHandles && (
          <BaseHandle id="target-1" type="target" position={Position.Top} />
        )}
        {data?.label}
        {"outputs" in nodeTypeHandles && (
          <BaseHandle id="source-1" type="source" position={Position.Bottom} />
        )}
      </BaseNodeContent>
    </BaseNode>
  );
};
