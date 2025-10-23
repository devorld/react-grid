import type { WfsFeature } from "./";

interface WfsResponse {
  type: "FeatureCollection";
  features: WfsFeature[];
}

export type { WfsResponse };
