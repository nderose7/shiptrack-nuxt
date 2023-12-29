<template>
  <div class="w-full pb-32 h-full">
    <div
      class="w-full mb-5 lg:flex justify-between items-end sticky top-0 pt-5 pb-5 dark:bg-midnight-200 z-50 bg-slate-100"
    >
      <div
        class="border-b w-full dark:border-midnight-100 pb-1 flex gap-5 text-center items-center justify-between"
      >
        <h1 class="text-2xl">
          <button
            type="button"
            @click.prevent="$router.back()"
            class="mb-0 mt-0 mr-1"
          >
            <Icon name="mdi:arrow-left" class="icon-style" /></button
          >Add Carrier
        </h1>
      </div>
    </div>
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
