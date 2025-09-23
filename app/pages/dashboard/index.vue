<script setup lang="ts">
const { data, status } = await useFetch("/api/locations", {
  lazy: true,
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
    <div v-else-if="data" class="flex flex-wrap gap-2 mt-4">
      <div v-for="location in data" :key="location.id" class="card card-compact bg-base-200 h-40 w-72">
        <div class="card-body overflow-y-scroll">
          <h3 class="text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </div>
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
