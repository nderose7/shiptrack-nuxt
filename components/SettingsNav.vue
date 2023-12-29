<template>
  <div class="w-full">
    <div
      class="w-full lg:flex justify-between items-end sticky top-0 pt-5 pb-5 dark:bg-midnight-200"
    >
      <div
        class="border-b w-full dark:border-midnight-100 pb-1 flex gap-5 text-center items-center justify-between"
      >
        <button class="lg:hidden" @click="toggleSidebar">
          <Icon name="majesticons:menu-alt-line" size="1.5rem" />
        </button>
        <h1 class="text-2xl">Settings</h1>
        <div><Icon name="majesticons:search-line" size="1.5rem" /></div>
      </div>
    </div>
    <ul class="flex text-lg">
      <li><NuxtLink to="/settings/profile">Profile</NuxtLink></li>
      <li>
        <NuxtLink to="/settings/company">Company</NuxtLink>
      </li>
      <li><NuxtLink to="/settings/billing">Billing</NuxtLink></li>
      <li><NuxtLink to="/settings/carriers">Carriers</NuxtLink></li>
    </ul>
  </div>
</template>

<script setup>
import { sidebarVisible } from "@/composables/state.js";
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

<style scoped>
ul li {
  @apply pr-6 font-bold;
  a.router-link-active {
    @apply font-bold border-b-2 pb-1 border-blue-500 text-blue-500;
  }
}
</style>
