<template>
  <div class="h-screen">
    <button
      type="button"
      @click.prevent="$router.back()"
      class="mb-0 mt-0 mr-1 p-3"
    >
      <Icon name="mdi:arrow-left" class="icon-style" size="2rem" />
    </button>
    <div class="flex min-h-screen justify-center text-center">
      <form @submit.prevent="onSubmit()" class="max-w-md px-10 pt-0 pb-10">
        <div class="logo mb-10 px-10 text-4xl mx-auto">
          <span class="inline-block">
            <CloudLogo class="w-[48px] mx-auto mb-3" />
            <Logo />
          </span>
        </div>
        <h1 class="mb-4 text-2xl font-extrabold">Forgot your password?</h1>
        <p class="text-lg">
          Enter your email below. If you have an account on file, you'll receive
          a temporary link to reset your password.
        </p>

        <div class="form-control mb-6 text-left">
          <label for="email" class="mb-1 block font-bold">Your Email</label>
          <input
            v-model="email"
            type="email"
            class="rounded-lg"
            placeholder="name@domain.com"
            required
          />
        </div>
        <button type="submit" class="btn-primary px-5 py-3 font-bold">
          Get New Password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const { forgotPassword } = useStrapiAuth();
const router = useRouter();
const email = ref("");
const onSubmit = async () => {
  try {
    await forgotPassword({ email: email.value });
    router.push("/forgot-password-success");
  } catch (e) {}
};
definePageMeta({
  layout: "blank",
});

useHead({
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
