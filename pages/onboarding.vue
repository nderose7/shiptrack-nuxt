<template>
  <div class="mt-10">
    <div class="flex items-center text-center">
      <div class="mx-auto w-1/4">
        <NuxtLink to="/" class="mb-5 text-2xl">
          <CloudLogo class="w-[36px] inline-block mr-1" /> <Logo />
        </NuxtLink>
        <div class="mt-8">
          <h1 class="text-3xl">Let's gather some details.</h1>
          <div class="mt-4">
            <Onboarding />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});
</script>
