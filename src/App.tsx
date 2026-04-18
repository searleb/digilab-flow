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

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleAddNewNode = (nodeType: NodeType) => {
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
  };

  const handleOnConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => {
        // Each input handle only accepts one connection — remove any existing
        // edge on the same target handle before adding the new one.
        const filterEdges = eds.filter((edge) => edge.target !== params.target);

        return addEdge(params, filterEdges);
      }),
    [setEdges],
  );

  const handleValidateConnection = useCallback(
    (connection: Edge | Connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);
      const sourceOutputDataType = sourceNode?.data.outputs?.output.type;
      const targetInputDataType = targetNode?.data.inputs?.input.type;

      if (!sourceNode || !targetNode) return false;
      if (sourceOutputDataType === "Any" || targetInputDataType === "Any")
        return true;
      return sourceOutputDataType === targetInputDataType;
    },
    [nodes],
  );

  return (
    <div className="h-dvh">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edges={edges}
        fitView
        onConnect={handleOnConnect}
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
