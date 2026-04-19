# Digilab Flow

## Getting started

```bash
npm install && npm run dev
```

## Approach to structuring the code

State lives in `App.tsx` via ReactFlow's `useNodesState` and `useEdgesState` hooks — no external state manager was needed for this POC.
Connection handlers (`handleOnConnect`, `handleValidateConnection`) are co-located in `App` as `useCallback`s so they use the same state.

Data Types are separated from UI: `data/initial-nodes.ts` and `lib/generateNode.ts`, use the same return Type to ensure they can't diverge.

Custom node rendering is handled by `components/SimpleNode.tsx`, registered via `components/custom-nodes.ts`. The `BaseNode` primitives (`BaseNode`, `BaseNodeContent` etc.) in `components/base-node.tsx` are building blocks from ReactFlow UI.

## Type validation

ReactFlow's `isValidConnection` prop accepts a callback that returns `true`/`false` before an edge is connected. `handleValidateConnection` in `App.tsx` resolves the `DataType` from the source node's `outputs` and target node's `inputs` records, then applies three rules in order:

1. If either side has no handle data, reject (e.g. connecting to a DataSource input)
2. If either type is `"Any"`, allow
3. Allow only if both types match (`"Dataset"↔"Dataset"`, `"Model"↔"Model"`)

Visual feedback uses ReactFlow's `useConnection` hook inside `SimpleNode` — the node under the cursor highlights red when `connection.isValid === false` and `connection.toNode?.id` matches the current node. An error toast fires via `onConnectEnd`, this logic could be contained within the `SimpleNode` but having it on the `onConnectEnd` via `ReactFlow` creates a global catch error system to be expanded on.

## Design decisions

**Replace rather than block on occupied inputs.** When a second edge is dragged onto an already-occupied input handle, the existing edge is silently removed before the new one is added. This avoids users having to manually delete the old connection first. A confirmation check would be useful to stop unintentional disconnects

**No external state management.** ReactFlow's built-in state hooks are sufficient for this scope. Adding Zustand or similar as suggested in the docs would be useful for orchestrating with wider UI and more complex features like undo.

**Single `SimpleNode` component for all node types.** Given the three types share the same structure , a single component using the `data` prop was simpler than three separate components. Per-type components would make sense once types diverge visually.

## What I would improve with more time

- **Custom Handles** Custom `<Handle>` elements for improved visual control.
- **Viewport-aware node placement.** New nodes are offset from the last node's coordinates. Using `useReactFlow().screenToFlowPosition()` would place them at the centre of the current viewport instead, which is more predictable after panning.
- **Improve node IDs.** `n${index}` reuses IDs if a node is deleted and then a new one added. Replacing with `crypto.randomUUID()` or React's `useId` would fix this.
- **Component folder structure** I picked up shadcn and ReactFlow UI to quickly build components but they're import paths aren't aligning, my custom component should have it's own folder which would co-locate it's test and other specifically related logic.
- **Tests.** Unit tests for utils like `generateNode` and `handleValidateConnection` and a Cypress testing UI flows.

## Assumptions

- The `"Any"` DataType is treated as a wildcard on either side of a connection — an `Any` output can connect to any input type, and any output type can connect to an `Any` input.
- "Replace existing connection" was chosen over "prevent" for occupied inputs as the better default UX; either satisfies the spec.
- Node placement offset from the last node was considered sufficient for the prototype; viewport-centred placement was not required.
- The Type definitions described in the Technical Exercise proved to be largely a red herring, I used them as close as possible but kept finding they were conflicting with the ReactFlow types and the data structure was confusing, I ended up slowly deleting them in favour of extending the ReactFlow Types with just the data definitions given.
