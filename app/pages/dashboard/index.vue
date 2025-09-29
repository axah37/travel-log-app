<script setup lang="ts">
import { useLocationStore } from "~/stores/location";

const locationStore = useLocationStore();
const { locations, status } = storeToRefs(locationStore);
const mapStore = useMapStore();

onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'" class="">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-else-if="locations" class="flex flex-nowrap gap-2 my-4 overflow-auto">
      <NuxtLink
        v-for="location in locations"
        :key="location.id"
        class="card card-compact bg-base-200 border-2 h-40 w-72 mb-2 shrink-0 hover: cursor-pointer"
        :class="{
          'border-accent': location.id === mapStore.selectedPoint?.id,
          'border-transparent': location.id !== mapStore.selectedPoint?.id,
        }"
        :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
        @mouseenter="mapStore.selectedPoint = location"
        @mouseleave="mapStore.selectedPoint = null"
      >
        <div class="card-body overflow-y-scroll">
          <h3 class="text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
        <Icon name="tabler:circle-plus-filled" size="24" />
        Add Location
      </NuxtLink>
    </div>
  </div>
</template>
