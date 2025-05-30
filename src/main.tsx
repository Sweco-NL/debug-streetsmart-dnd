import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "my-dragdrop";
import { HTML5Backend } from "my-dragdrop-backend";
import App from "./App.tsx";

export function AppWithProviders() {
  const [isScopeInitialized, setIsScopeInitialized] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    setIsScopeInitialized(true);
  }, []);

  return (
    <StrictMode>
      <div
        // Prevent drag events from bubbling up to the window object which also has dnd backends (set by StreetSmartApi)
        onDragOver={(e) => e.stopPropagation()}
        onDragStart={(e) => e.stopPropagation()}
        ref={scopeRef}
      >
        {isScopeInitialized && (
          <DndProvider
            backend={HTML5Backend}
            // Provide the custom rootElement to the DndProvider
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
