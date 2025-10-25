"use client";

import dynamic from "next/dynamic";

// non-server loading -> client loading
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

function MapPage() {
  return (
    <main>
      <MapView />
    </main>
  );
}

export { MapPage };
