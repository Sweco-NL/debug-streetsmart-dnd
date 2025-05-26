import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider as MyDragDropProvider } from "my-dragdrop";
import { HTML5Backend as MyDragDropBackend } from "my-dragdrop-backend";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MyDragDropProvider backend={MyDragDropBackend}>
      <App />
    </MyDragDropProvider>
  </StrictMode>
);
