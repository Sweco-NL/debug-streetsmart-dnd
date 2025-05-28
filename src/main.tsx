import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "my-dragdrop";
import { HTML5Backend } from "my-dragdrop-backend";
import App from "./App.tsx";

export function AppWithProviders() {
  const [scopeElement, setScopeElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setScopeElement(document.getElementById("dnd-scope"));
  }, []);

  return (
    <StrictMode>
      <div id="dnd-scope">
        {scopeElement && (
          <DndProvider
            backend={HTML5Backend}
            options={{ rootElement: scopeElement }}
          >
            <App />
          </DndProvider>
        )}
      </div>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<AppWithProviders />);
