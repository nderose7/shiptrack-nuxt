<template>
  <div class="w-full">
    <SettingsNav />
    <div class="mt-10">
      <AccountSettingsCarriers />
      {{ processedProducts }}
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "loggedin",
});
</script>
