<script setup lang="ts">
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";

import { CENTER_USA } from "~~/shared/constants";

import { useMapStore } from "~/stores/map";

const mapStore = useMapStore();
const colorMode = useColorMode();
const style = computed(() => colorMode.value === "dark" ? "/styles/dark.json" : "/styles/light.json");
const center = CENTER_USA;
const zoom = 3;

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat;
    mapStore.addedPoint.long = location.lng;
  }
}

function onDoubleClick(mglEvent: MglEvent<"dblclick">) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = mglEvent.event.lngLat.lat;
    mapStore.addedPoint.long = mglEvent.event.lngLat.lng;
  }
}

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <div>
    <MglMap
      :map-style="style"
      :center="center"
      :zoom="zoom"
      @map:dblclick="onDoubleClick"
    >
      <MglNavigationControl />
      <MglMarker
        v-for="point in mapStore.mapPoints"
        :key="point.id"
        :coordinates="[point.long, point.lat]"
      >
        <template #marker>
          <div
            class="tooltip tooltip-top hover:cursor-pointer"
            :class="{ 'tooltip-open': mapStore.selectedPoint?.id === point.id }"
            :data-tip="point.name"
            @mouseenter="mapStore.selectedPoint = point"
            @mouseleave="mapStore.selectedPoint = null"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="30"
              :class="mapStore.selectedPoint?.id === point.id ? 'text-accent' : 'text-secondary'"
            />
          </div>
        </template>
        <MglPopup>
          <h3 class="text-xl">
            {{ point.name }}
          </h3>
          <p v-if="point.description">
            {{ point.description }}
          </p>
        </MglPopup>
      </MglMarker>

      <MglMarker
        v-if="mapStore.addedPoint"
        :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
        draggable
        @update:coordinates="updateAddedPoint($event)"
      >
        <template #marker>
          <div
            class="tooltip tooltip-top hover:cursor-pointer"
            data-tip="Drag to your desired location"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="35"
              class="text-warning"
            />
          </div>
        </template>
      </MglMarker>
    </MglMap>
  </div>
</template>
