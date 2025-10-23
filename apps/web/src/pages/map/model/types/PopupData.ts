import type { LatLngLiteral} from "leaflet";
import type { WfsFeatureProperties } from "./";

interface PopupData {
  latlng: LatLngLiteral;
  props: WfsFeatureProperties;
}

export type { PopupData };
