import { useEffect, useRef } from "react";
import {
  StreetSmartApi,
  ViewerType,
  type Locale,
} from "@cyclomedia/streetsmart-api";
import { DndExample } from "./Example";

const SRS = "EPSG:28992";
const LOCALE: Locale = "nl";
const COORD = [202757.84, 502816.75, 0];

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const isInitializing = useRef(false);

  useEffect(() => {
    if (!ref?.current || isInitializing?.current) return;
    console.log("Initializing StreetSmart API...");
    const targetElement = ref.current;
    isInitializing.current = true;

    const init = async () => {
      await StreetSmartApi.init({
        targetElement,
        srs: SRS,
        locale: LOCALE,
        apiKey: import.meta.env.VITE_STREETSMART_API_KEY,
        addressSettings: {
          locale: LOCALE,
          database: "CMDatabase",
        },
        loginOauth: false,
        username: import.meta.env.VITE_STREETSMART_USER,
        password: import.meta.env.VITE_STREETSMART_PASSWORD,
      });

      // const viewerInstance =
      await StreetSmartApi.open(COORD, {
        viewerType: [ViewerType.PANORAMA],
        srs: SRS,
        panoramaViewer: {
          closable: true,
          maximizable: false,
          timeTravelVisible: true,
          recordingsVisible: true,
          navbarVisible: true,
          replace: true,
        },
      });
    };

    void init();
  }, []);

  return (
    <>
      <h1>Debug dnd</h1>
      <div ref={ref} style={{ width: "640px", height: "240px" }}>
        Loading StreetSmart API...
      </div>
      <DndExample />
    </>
  );
}

export default App;
