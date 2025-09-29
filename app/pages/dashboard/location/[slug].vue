<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;
const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, { lazy: true });
const mapStore = useMapStore();

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});
</script>

<template>
  <div class="p-4 min-h-60">
    <div v-if="status === 'pending'">
      <div class="loading" />
    </div>
    <div v-if="location && status !== 'pending'">
      <h2 class="text-xl">
        {{ location.name }}
      </h2>
      <p class="text-sm it">
        {{ location.description }}
      </p>
      <div v-if="!location.locationLogs.length" class="mt-4">
        <p class="text-sm italic">
          Add a location log to get started.
        </p>
        <button class="btn btn-primary mt-2">
          Add Location Log
          <Icon name="tabler:map-pin-plus" size="24" />
        </button>
      </div>
    </div>
    <div v-if="error && status !== 'pending'" class="alert alert-error">
      <h2 class="text-lg">
        {{ error.statusMessage }}
      </h2>
    </div>
  </div>
</template>
