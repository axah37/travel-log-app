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
          <NuxtLink class="btn btn-accent">
            Sign In w/ <Icon name="tabler:brand-github-filled" size="24" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
