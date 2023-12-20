<template>
  <div class="pb-8 xl:pl-48">
    <ul class="settings-links text-xl font-bold px-5">
      <li class="mb-4">
        <NuxtLink to="/settings/profile" class="py-2">Profile</NuxtLink>
      </li>
      <li class="mb-4">
        <NuxtLink to="/settings/billing" class="py-2">Billing</NuxtLink>
      </li>
      <li class="mb-4">
        <NuxtLink to="/settings/account" class="py-2">Account</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.settings-links .router-link-active {
  @apply font-bold text-brand-500 border-b border-brand-500;
}
.settings-links li a,
.settings-links li {
  @apply inline-block;
}
.settings-links li a {
  @apply mr-8;
}
.settings-links li a:hover {
  @apply text-brand-500;
}
</style>
