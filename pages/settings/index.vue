<template>
  <div></div>
</template>

<script setup>
navigateTo("/settings/profile");

definePageMeta({
  layout: "loggedin",
  middleware: ["auth"],
});
</script>
