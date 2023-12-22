<template>
  <div class="w-full">
    <SettingsNav />
    <div class="">
      <AccountSettingsAddCarrier />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "loggedin",
  middleware: ["auth"],
});
</script>
