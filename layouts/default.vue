<template>
  <div class="marketing-page min-h-screen">
    <div class="">
      <div class="px-5 max-w-[1680px] mx-auto">
        <div class="flex items-center w-full justify-between">
          <div class="w-full">
            <Nav />
          </div>
        </div>
      </div>
    </div>
    <div class="px-5 py-5 max-w-[1680px] mx-auto min-h-screen">
      <slot />
    </div>
  </div>
</template>

<style></style>
