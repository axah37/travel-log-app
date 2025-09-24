<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
  iconColor?: "text-accent" | "text-primary" | "text-secondary";
}>();
const route = useRoute();
</script>

<template>
  <div class="tooltip tooltip-right" :data-tip="!props.showLabel ? props.label : undefined">
    <NuxtLink
      :class="{ 'bg-base-200': route.path === props.href, 'justify-start': props.showLabel, 'justify-center': !props.showLabel }"
      :to="props.href"
      class="flex flex-nowrap gap-2 p-2 hover:bg-base-300 hover:curser-pointer"
    >
      <Icon
        :name="props.icon"
        size="24"
        :class="iconColor"
      />
      <Transition name="grow">
        <span v-if="props.showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow-in 0.1s;
}
.grow-leave-active {
  animation: grow-in 0.2s reverse;
}
@keyframes grow-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
