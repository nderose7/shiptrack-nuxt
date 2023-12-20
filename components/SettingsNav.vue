<template>
  <div class="mt-5 w-full">
    <div
      class="w-full border-b dark:border-midnight-100 pb-1 mb-5 flex justify-between items-end"
    >
      <div class="flex items-end gap-5">
        <h1 class="text-2xl">Account Settings</h1>
      </div>
      <span class="font-medium text-lg"
        ><Icon
          name="bx:building"
          class="mr-1 relative top-[-1px]"
          size="1rem" />
        <CompanyName
      /></span>
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

<style scoped>
ul li {
  @apply pr-6 font-bold;
  a.router-link-active {
    @apply font-bold border-b-2 pb-1 border-blue-500 text-blue-500;
  }
}
</style>
