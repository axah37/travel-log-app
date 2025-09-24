import type { MapPoint } from "~~/shared/types";
import type { LngLatBounds } from "maplibre-gl";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null> (null);

  const shouldFlyTo = ref(true);

  function selectPointWithoutFlyTo(point: MapPoint | null) {
    shouldFlyTo.value = false;
    selectedPoint.value = point;
  }

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");
    const map = useMap();
    let bounds: LngLatBounds | null = null;

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint) {
        return;
      }
      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));
      map.map?.fitBounds(bounds, {
        padding: 60,
        maxZoom: 3,
      });
    });

    effect (() => {
      if (selectedPoint.value) {
        if (shouldFlyTo.value) {
          map.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            speed: 0.7,
            curve: 1,
            easing(t) {
              return t;
            },
          });
        }
        shouldFlyTo.value = true;
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, {
          speed: 0.7,
          curve: 1,
          padding: 60,
          maxZoom: 3,
        });
      }
    });
  }

  return {
    init,
    selectPointWithoutFlyTo,
    mapPoints,
    selectedPoint,
  };
});
