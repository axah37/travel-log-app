import type { SelectLocation } from "~~/shared/db/schema";
import type { MapPoint } from "~~/shared/types";

export function createPointFromLocation(location: SelectLocation): MapPoint {
  return {
    ...location,
    to: { name: "dashboard-location-slug", params: { slug: location.slug } },
    toLabel: "View",
  };
}

export function isPointSelected(item: Pick<MapPoint, "id" | "lat" | "long"> | null | undefined, selectedPoint: MapPoint | null | undefined) {
  if (!item || !selectedPoint) {
    return false;
  }
  return item.id === selectedPoint.id
    && item.lat === selectedPoint.lat
    && item.long === selectedPoint.long;
}
