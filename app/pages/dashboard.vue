<script setup lang="ts">
const isSideBarOpen = ref(true);
onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});
function toggleSideBar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSidebarOpen", isSideBarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transistion-all duration-300" :class="{ 'w-64': isSideBarOpen, 'w-16': !isSideBarOpen }">
      <div class="flex hover:cursor-pointer hover:bg-base-200 p-2" :class="{ 'justify-center': !isSideBarOpen, 'justify-end': isSideBarOpen }" @click="toggleSideBar()">
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
        <div class="divider" />
        <AppSideBarButton
          :show-label="isSideBarOpen"
          href="/sign-out"
          label="Sign Out"
          icon="tabler:logout-2"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
