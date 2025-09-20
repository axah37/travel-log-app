<template>
  <div class="navbar bg-primary text-primary-content shadow-sm">
    <div class="flex-1">
      <nuxt-link to="/" class="btn btn-ghost text-xl">
        Travel Log
      </nuxt-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <nuxt-link class="btn btn-accent">
            Sign In w/ <Icon name="tabler:brand-github-filled" size="24" />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
