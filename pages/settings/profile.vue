<template>
  <div class="w-full">
    <SettingsNav />
    <div class="mt-10">
      <AccountSettingsProfile />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "loggedin",
  middleware: ["auth"],
});
</script>
