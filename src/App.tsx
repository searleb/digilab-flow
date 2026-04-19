import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  Panel,
  addEdge,
  useEdgesState,
  type Connection,
  type Edge,
} from "@xyflow/react";
import { initialEdges } from "./data/initial-edges";
import { initialNodes } from "./data/initial-nodes";
import { Button } from "./components/ui/button";
import type { NodeType } from "./types";
import { useCallback } from "react";
import { generateNode } from "./lib/generateNode";
import { toast } from "sonner";
import { nodeTypes } from "./components/custom-nodes";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleAddNewNode = useCallback(
    (nodeType: NodeType) => {
      setNodes((currentNodes) => {
        const lastNode = currentNodes.findLast(() => true);

        return [
          ...currentNodes,
          {
            ...generateNode({
              nodeType,
              lastNode,
              index: currentNodes.length + 1,
            }),
          },
        ];
      });
    },
    [setNodes],
  );

  const handleOnConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => {
        // Each input handle only accepts one connection — remove any existing
        // edge on the same target handle before adding the new one.
        const filterEdges = eds.filter((edge) => edge.target !== params.target);
        const label = nodes.find((n) => n.id === params.source)?.data.outputs?.output.type;

        return addEdge({ ...params, label, type: "smoothstep" }, filterEdges);
      }),
    [setEdges, nodes],
  );

  const handleValidateConnection = useCallback(
    (connection: Edge | Connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);
      const sourceOutputDataType = sourceNode?.data.outputs?.output.type;
      const targetInputDataType = targetNode?.data.inputs?.input.type;

      if (sourceOutputDataType === "Any" || targetInputDataType === "Any") {
        return true;
      }
      return sourceOutputDataType === targetInputDataType;
    },
    [nodes],
  );

  return (
    <div className="h-dvh">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edges={edges}
        fitView
        onConnect={handleOnConnect}
        onConnectEnd={(_, connectionState) => {
          // If connection is invalid and a node was targeted - would fire by just aborting a connection
          if (!connectionState.isValid && connectionState.toNode) {
            toast.error("This connection cannot be made");
          }
        }}
        isValidConnection={handleValidateConnection}
      >
        <Panel position="top-right">
          <Button size="lg" onClick={() => handleAddNewNode("DataSource")}>
            Add DataSource Node
          </Button>
          <Button size="lg" onClick={() => handleAddNewNode("Transform")}>
            Add Transform Node
          </Button>
          <Button size="lg" onClick={() => handleAddNewNode("Model")}>
            Add Model Node
          </Button>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
