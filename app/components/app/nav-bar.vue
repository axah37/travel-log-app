<script setup lang="ts">
import AuthButton from "../auth-button.vue";
</script>

<template>
  <div class="navbar bg-primary text-primary-content shadow-sm">
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li class="mx-4 my-auto">
          <AppThemeSelector />
        </li>
        <li>
          <AuthButton />
        </li>
      </ul>
    </div>
  </div>
</template>
