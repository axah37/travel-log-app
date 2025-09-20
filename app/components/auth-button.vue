<script setup lang="ts">
import { useAuthStore } from "~/stores";

const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn m-1">
      <div class="avatar">
        <div class="w-8 rounded-full">
          <img :src="authStore.user.image || undefined" :alt="authStore.user.name">
        </div>
      </div>
      {{ authStore.user.name }}
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <NuxtLink to="/sign-out">
          Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>

  <button v-else :disabled="authStore.loading" class="btn btn-accent" @click="authStore.signIn()">
    Sign In w/
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon v-else name="tabler:brand-github-filled" size="24" />
  </button>
</template>
