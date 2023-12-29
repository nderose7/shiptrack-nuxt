<template>
  <div class="px-5 xl:w-1/2 mx-auto page-style mt-5 pb-48">
    <button
      type="button"
      @click.prevent="$router.back()"
      class="mb-4 btn-gray btn-sm"
    >
      &larr; Back
    </button>
    <h1>Terms of Use</h1>

    <h2>1. Introduction</h2>
  </div>
</template>

<style scoped>
h2 {
  @apply my-4 mt-8;
}
</style>

<script setup>
const router = useRouter();
</script>
