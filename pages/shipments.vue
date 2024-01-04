<template>
  <NuxtPage />
</template>

<style></style>

<script setup>
definePageMeta({
  layout: "loggedin",
  middleware: ["auth"],
});
</script>
