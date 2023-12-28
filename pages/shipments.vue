<template>
  <NuxtPage />
</template>

<style></style>

<script setup>
definePageMeta({
  layout: "loggedin",
  middelware: "auth",
});
</script>
