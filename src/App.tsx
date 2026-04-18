import { ReactFlow, Background, Controls } from "@xyflow/react";
import { initialEdges } from "./data/initial-edges";
import { initialNodes } from "./data/initial-nodes";

function App() {
  return (
    <div className="h-dvh">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
