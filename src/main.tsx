import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "my-dragdrop";
import { HTML5Backend } from "my-dragdrop-backend";
import App from "./App.tsx";

function handleDragEvents(e: DragEvent) {
  e.stopPropagation();
}

export function AppWithProviders() {
  const [isScopeInitialized, setIsScopeInitialized] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    const scopeElement = scopeRef.current;
    scopeElement.addEventListener("dragover", handleDragEvents);
    scopeElement.addEventListener("dragstart", handleDragEvents);
    setIsScopeInitialized(true);
    return () => {
      scopeElement.removeEventListener("dragover", handleDragEvents);
      scopeElement.removeEventListener("dragstart", handleDragEvents);
    };
  }, []);

  return (
    <StrictMode>
      <div ref={scopeRef}>
        {isScopeInitialized && (
          <DndProvider
            backend={HTML5Backend}
            options={{ rootElement: scopeRef.current }}
          >
            <App />
          </DndProvider>
        )}
      </div>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<AppWithProviders />);
