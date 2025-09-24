<script setup lang="ts">
import { CENTER_USA } from "~~/shared/constants";

const colorMode = useColorMode();
const style = computed(() => colorMode.value === "dark" ? "/styles/dark.json" : "/styles/light.json");
const center = CENTER_USA;
const zoom = 3;
</script>

<template>
  <ClientOnly>
    <MglMap
      :map-style="style"
      :center="center"
      :zoom="zoom"
    >
      <MglNavigationControl />
    </MglMap>
  </ClientOnly>
</template>
