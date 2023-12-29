<template>
  <div class="">
    <div class="logo absolute pl-5 pt-2 text-2xl">
      <Logo />
    </div>
    <div class="flex min-h-screen items-center text-center">
      <div class="mx-auto">
        <Icon
          name="line-md:confirm-circle"
          class="text-brand-500"
          size="5rem"
        />
        <h1 class="mb-4 mt-5 text-5xl">Email Confirmed!</h1>
        <p>Taking you to login...</p>
        <Icon name="svg-spinners:bars-scale" size="5rem" class="mt-10" />
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

onMounted(async () => {
  router.push("/login?emailConfirmed=true");
});

useHead({
  title: "Email Confirmed!",
});
definePageMeta({
  layout: "blank",
});
useHead({
  meta: [{ name: "robots", content: "noindex" }],
});
</script>

<style scoped>
.logo {
  width: 250px;
}
</style>
