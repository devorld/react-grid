import React, { useEffect, useRef, useState } from "react";
import { MapContainer, WMSTileLayer, GeoJSON, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { GeoJSON as LeafletGeoJSON, PathOptions, Layer, LeafletMouseEvent } from "leaflet";
import type { PopupData, WfsFeature, WfsResponse } from "../model/types";

const MAP_STYLES = {
  default: {color: "#3388ff", weight: 1, fillOpacity: 0.3} satisfies PathOptions,
  highlight: {color: "#ff0000", weight: 2, fillOpacity: 0.5} satisfies PathOptions,
};

function MapView() {
  const [geojsonData, setGeojsonData] = useState<WfsResponse | null>(null);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const geojsonRef = useRef<LeafletGeoJSON | null>(null);

  useEffect(() => {
    const loadWfsData = async () => {
      const res = await fetch("/api/wfs");
      const data = (await res.json()) as WfsResponse;
      setGeojsonData(data);
    };

    void loadWfsData();
  }, []);

  const ClickHandler: React.FC = () => {
    useMapEvents({
      click(event: LeafletMouseEvent) {
        const target = event.originalEvent.target as HTMLElement;

        // if clicked on polygon -> no reset
        if (target.closest(".leaflet-interactive")) return;

        setPopupData(null);
        setSelectedRegion(null);
      },
    });
    return null;
  };

  useEffect(() => {
    if (geojsonRef.current) {
      geojsonRef.current.setStyle((feature?: GeoJSON.Feature<GeoJSON.Geometry, { STATE_FIPS: string }>) =>
        feature?.properties?.STATE_FIPS === selectedRegion
          ? MAP_STYLES.highlight
          : MAP_STYLES.default
      )
    }
  }, [selectedRegion]);

  const onEachFeature = (feature: WfsFeature, layer: Layer) => {
    layer.on("click", (event: LeafletMouseEvent) => {
      setPopupData({
        latlng: event.latlng,
        props: feature.properties,
      });

      setSelectedRegion(feature?.properties?.STATE_FIPS);
    });

    // noinspection SpellCheckingInspection
    layer.on("popupclose", () => setSelectedRegion(null));
  };

  const getRegionStyle = (feature?: GeoJSON.Feature<GeoJSON.Geometry, { STATE_FIPS: string }>) =>
    feature?.properties?.STATE_FIPS === selectedRegion
      ? MAP_STYLES.highlight
      : MAP_STYLES.default;

  return (
    <main>
      <MapContainer
        center={[39.5, -98.5]}
        zoom={4}
        style={{width: "100%", height: "100vh"}}
      >
        <ClickHandler />

        <WMSTileLayer
          url="https://ahocevar.com/geoserver/wms"
          layers="topp:states"
          format="image/png"
          transparent
          version="1.1.1"
        />

        {geojsonData && (
          <GeoJSON
            data={geojsonData as GeoJSON.FeatureCollection}
            onEachFeature={onEachFeature}
            ref={geojsonRef}
            style={getRegionStyle}
          />
        )}

        {popupData && (
          <Popup key={`${popupData.latlng.lat}-${popupData.latlng.lng}`} position={popupData.latlng}>
            <div>
              <strong>{popupData.props.STATE_NAME}</strong> <br />
              ID: {popupData.props.STATE_FIPS}
            </div>
          </Popup>
        )}
      </MapContainer>
    </main>
  );
}

export default MapView;
