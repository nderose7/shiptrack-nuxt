<template>
  <div class="min-h-screen lg:mx-auto">
    <div class="grid-cols-2 items-center lg:grid lg:min-h-screen">
      <div class="py-4 lg:min-h-screen lg:px-8 lg:pt-6 lg:pb-0">
        <div class="mx-auto px-6 text-2xl lg:px-0 relative top-[-1px]">
          <NuxtLink to="/" class="flex items-center">
            <CloudLogo class="w-[32px] inline-block mr-2" /> <Logo />
          </NuxtLink>
        </div>
        <div class="pt-3 sm:px-24 md:px-36 lg:px-0 lg:pt-20">
          <SignUp />
        </div>
      </div>
      <div class="md:px-40 md:pb-20 lg:p-12 xl:p-32 p-5">
        <div class="">
          <img
            src="/demo.png"
            alt="demo"
            class="max-h-[600px] mx-auto rounded-3xl border drop-shadow"
          />
          <p class="lead text-center mt-8 lg:px-20">
            Ship and track your packages with ease.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let colorModeDark = ref(false);

definePageMeta({
  layout: "blank",
  middleware: ["loggedin"],
});

useHead({
  title: "Get Started",
});
</script>
