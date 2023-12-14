<template>
  <div class="lg:w-3/4 mx-auto py-10 lg:py-20 lg:px-20">
    <div class="flex gap-48">
      <div class="w-2/3">
        <h1 class="leading-tight mb-5">
          The easiest way to ship and track your company's packages.
        </h1>
        <p>
          Use the ShipTrack mobile app for iOS or Android to scan your product
          serial numbers and automatically create shipping labels.
        </p>
        <NuxtLink to="/get-started" class="btn-primary inline-block btn-lg"
          >Get Started <Icon name="mdi:arrow-right" class="icon-style" />
        </NuxtLink>
      </div>
      <div class="w-1/3">
        <img
          src="/demo.png"
          alt="demo"
          class="max-h-[800px] rounded-3xl border drop-shadow"
        />
      </div>
    </div>
  </div>
</template>
