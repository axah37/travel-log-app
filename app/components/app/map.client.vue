<script setup lang="ts">
import { CENTER_USA } from "~~/shared/constants";

import { useMapStore } from "~/stores/map";

const mapStore = useMapStore();
const colorMode = useColorMode();
const style = computed(() => colorMode.value === "dark" ? "/styles/dark.json" : "/styles/light.json");
const center = CENTER_USA;
const zoom = 3;

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
    >
      <MglNavigationControl />
      <MglMarker
        v-for="point in mapStore.mapPoints"
        :key="point.id"
        :coordinates="[point.long, point.lat]"
      >
        <template #marker>
          <div class="tooltip tooltip-top" :data-tip="point.label">
            <Icon
              name="tabler:map-pin-filled"
              size="30"
              class="text-secondary"
            />
          </div>
        </template>
        <MglPopup>
          <h3 class="text-xl">
            {{ point.label }}
          </h3>
          <p v-if="point.description">
            {{ point.description }}
          </p>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>
