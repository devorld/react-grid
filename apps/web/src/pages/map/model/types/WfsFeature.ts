import type { GeoJSON } from "react-leaflet";
import type { WfsFeatureProperties } from "./";

interface WfsFeature {
  type: "Feature";
  geometry: GeoJSON.Geometry;
  properties: WfsFeatureProperties;
}

export type { WfsFeature };
