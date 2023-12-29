// frontend/pages/user/Forgot.vue
<template>
  <div class="h-screen px-4 text-center">
    <div class="flex min-h-screen items-center justify-center">
      <div class="px-10 lg:w-5/12">
        <div>
          <Icon name="bx:envelope" class="text-brand-500" size="6rem" />
        </div>
        <h1 class="my-4 text-2xl font-bold lg:text-3xl">Check your email!</h1>
        <p>
          If you have an account with us, you should have received an email with
          further instructions. If you think you have an account, but you did
          not receive an email, please check your spam folder.
        </p>
        <NuxtLink
          to="/login"
          class="btn-primary my-8 inline-block px-5 py-3 font-bold"
        >
          Back to Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});

useHead({
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
