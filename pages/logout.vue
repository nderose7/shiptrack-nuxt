<script setup>
const { logout } = useStrapiAuth();
const router = useRouter();
onMounted(async () => {
  await logout();
  //router.push("/");
});

definePageMeta({
  layout: "blank",
});
</script>

<template>
  <div class="dark:bg-midnight-800">
    <div class="logo absolute pl-5 pt-2 text-2xl">
      <NuxtLink to="/" class="flex">
        <CloudLogo class="w-[32px] inline-block mr-1" /> <Logo />
      </NuxtLink>
    </div>
    <div class="flex min-h-screen items-center text-center">
      <div class="mx-auto">
        <Icon
          name="line-md:confirm-circle"
          class="text-brand-500"
          size="5rem"
        />
        <h1 class="mb-4 mt-5 text-3xl">You are now logged out.</h1>
      </div>
    </div>
  </div>
</template>
