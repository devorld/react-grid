import React, { useEffect, useRef, useState } from "react";
import { CRS } from "leaflet";
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
      geojsonRef.current.setStyle((feature?: GeoJSON.Feature<GeoJSON.Geometry, { FIPS_CNTRY: string }>) =>
        feature?.properties?.FIPS_CNTRY === selectedRegion
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

      setSelectedRegion(feature?.properties?.FIPS_CNTRY);
    });

    // noinspection SpellCheckingInspection
    layer.on("popupclose", () => setSelectedRegion(null));
  };

  const getRegionStyle = (feature?: GeoJSON.Feature<GeoJSON.Geometry, { FIPS_CNTRY: string }>) =>
    feature?.properties?.FIPS_CNTRY === selectedRegion
      ? MAP_STYLES.highlight
      : MAP_STYLES.default;

  return (
    <MapContainer
      center={[55.75, 37.62]}
      zoom={4}
      style={{width: "100%", height: "100vh"}}
    >
      <ClickHandler />

      <WMSTileLayer
        url="/api/wms"
        layers="world:world"
        format="image/png"
        version="1.3.0"
        transparent
        crs={CRS.EPSG4326}
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
            <strong>{popupData.props.CNTRY_NAME}</strong> <br />
            ID: {popupData.props.FIPS_CNTRY}
          </div>
        </Popup>
      )}
    </MapContainer>
  );
}

export default MapView;
