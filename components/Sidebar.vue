<template>
  <div class="min-w-[260px] bg-slate-200 dark:bg-slate-700 h-full min-h-screen">
    <div class="px-7 py-5">
      <div class="text-2xl mb-5"><Logo /></div>
      <ul class="text-lg logged-in-nav">
        <li>
          <NuxtLink to="/dashboard"
            ><Icon name="bx:tachometer" class="icon-style mr-1" />
            Dashboard</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/shipments"
            ><Icon name="bx:send" class="icon-style mr-1" /> Shipments</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/products"
            ><Icon name="bx:package" class="icon-style mr-1" />
            Products</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/locate"
            ><Icon name="bx:map" class="icon-style mr-1" /> Locate</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/users"
            ><Icon name="bx:group" class="icon-style mr-1" /> Users</NuxtLink
          >
        </li>
        <li class="hidden">
          <NuxtLink to="/archive"
            ><Icon name="bx:archive" class="icon-style mr-1" />
            Archive</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/settings"
            ><Icon name="bx:cog" class="icon-style mr-1" /> Settings</NuxtLink
          >
        </li>
      </ul>
    </div>
    <div
      class="mx-5 fixed bottom-5 px-3 py-3 font-semibold border bg-slate-100 dark:bg-slate-800 rounded-lg lg:w-[220px] w-[220px] dark:border-slate-600"
    >
      <Icon name="bx:user" class="icon-style mr-1" /> {{ user.fullName }}
      {{ user.admin ? "(Admin)" : "" }}
    </div>
  </div>
</template>

<script setup>
const user = useStrapiUser();
</script>

<style scoped>
.logged-in-nav li a {
  @apply py-1 inline-block font-semibold;
}
.logged-in-nav li a.router-link-active {
  @apply text-blue-500 font-bold;
}
</style>
