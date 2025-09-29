import type { MapPoint } from "~~/shared/types";
import type { RouteLocationRaw } from "vue-router";

export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  mapPoint?: MapPoint | null;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const loading = ref(false);

  return {
    sidebarItems,
    loading,
  };
});
