import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  Panel,
  addEdge,
  useEdgesState,
  type Connection,
} from "@xyflow/react";
import { initialEdges } from "./data/initial-edges";
import { initialNodes } from "./data/initial-nodes";
import { Button } from "./components/ui/button";
import type { NodeType } from "./types";
import { useCallback } from "react";

function App() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const handleAddNewNode = (nodeType: NodeType) => {
    setNodes((currentNodes) => {
      const lastNode = currentNodes.findLast(() => true);
      return [
        ...currentNodes,
        {
          id: `n${currentNodes.length + 1}`,
          type: nodeType === "DataSource" ? "input" : "default",
          position: {
            x: lastNode ? lastNode.position.x : 40,
            y: lastNode ? lastNode.position.y + 80 : 40,
          },
          data: {
            label: nodeType,
            nodeType,
          },
        },
      ];
    });
  };

  const handleOnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-dvh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onConnect={handleOnConnect}
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
