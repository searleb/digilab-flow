import {
  Position,
  useConnection,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { BaseNode, BaseNodeContent } from "./base-node";
import type { NodeData } from "../types";
import { BaseHandle } from "./base-handle";

export const SimpleNode = (props: NodeProps<Node<NodeData>>) => {
  const connection = useConnection();
  const isInvalidConnection =
    connection.toNode?.id === props.id && !connection.isValid;

  const { data } = props;

  return (
    <BaseNode className={isInvalidConnection ? "bg-red-600" : ""}>
      <BaseNodeContent>
        <BaseHandle id="target-1" type="target" position={Position.Top} />
        {data?.label}
        <BaseHandle id="source-1" type="source" position={Position.Bottom} />
      </BaseNodeContent>
    </BaseNode>
  );
};
