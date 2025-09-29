<script setup lang="ts">
const route = useRoute();
const isSideBarOpen = ref(true);
const sidebarStore = useSidebarStore();
const locationStore = useLocationStore();
const mapStore = useMapStore();
onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});
function toggleSideBar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSidebarOpen", isSideBarOpen.value.toString());
  if (route.path !== "/dashboard") {
    locationStore.refresh();
  }
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transistion-all duration-300 shrink-0" :class="{ 'w-64': isSideBarOpen, 'w-16': !isSideBarOpen }">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="{ 'justify-center': !isSideBarOpen, 'justify-end': isSideBarOpen }"
        @click="toggleSideBar()"
      >
        <Icon :name="isSideBarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="32" />
      </div>
      <div class="flex flex-col gap-1">
        <AppSideBarButton
          :show-label="isSideBarOpen"
          href="/dashboard"
          label="Locations"
          icon="tabler:map"
        />
        <AppSideBarButton
          :show-label="isSideBarOpen"
          href="/dashboard/add"
          label="Add Location"
          icon="tabler:circle-plus-filled"
        />
        <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-4 w-full" />
        </div>
        <div v-if="sidebarStore.sidebarItems.length" class="flex flex-col flex-1 ">
          <AppSideBarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.label"
            :show-label="isSideBarOpen"
            :label="item.label"
            :icon="item.icon"
            :to="item.to"
            :icon-color="isPointSelected(item.mapPoint, mapStore.selectedPoint) ? 'text-accent' : undefined"
            @mouseenter="mapStore.selectedPoint = item.mapPoint ?? null"
            @mouseleave="mapStore.selectedPoint = null"
          />
        </div>
        <div class="divider" />
        <AppSideBarButton
          :show-label="isSideBarOpen"
          href="/sign-out"
          label="Sign Out"
          icon="tabler:logout-2"
        />
      </div>
    </div>
    <div class="flex-1 overflow-auto bg-base-200">
      <div
        class="flex size-full"
        :class="{ 'flex-col': route.path !== '/dashboard/add' }"
      >
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>
