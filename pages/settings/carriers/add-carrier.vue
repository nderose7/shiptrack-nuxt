<template>
  <div class="mt-5 w-full">
    <div
      class="w-full border-b dark:border-midnight-100 pb-1 mb-5 flex justify-between items-end"
    >
      <div class="flex items-end gap-5">
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
      <span class="font-medium text-lg"
        ><Icon
          name="bx:building"
          class="mr-1 relative top-[-1px]"
          size="1rem" />
        <CompanyName
      /></span>
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
