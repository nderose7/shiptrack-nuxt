<template>
  <div class="h-screen px-4 text-center">
    <div class="flex min-h-screen items-center justify-center">
      <form @submit.prevent="onSubmit()" class="min-w-[380px] px-10 py-5 pb-10">
        <div class="logo mt-4 mb-5 px-10">
          <NuxtLink to="/" class="inline-block">
            <Logo />
          </NuxtLink>
        </div>
        <h1 class="mb-4 text-2xl font-extrabold">Reset your password</h1>

        <div class="mb-6 text-left mt-8 form-control">
          <label for="email" class="block">New Password</label>
          <input
            v-model="password"
            type="password"
            class="rounded-md"
            required
          />
          <label for="email" class="block mt-2">Confirm New Password</label>
          <input
            v-model="passwordConfirmation"
            type="password"
            class="rounded-md"
            required
          />
        </div>
        <button type="submit" class="btn-primary px-5 py-3 font-bold">
          Set New Password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const { resetPassword } = useStrapiAuth();
const router = useRouter();
const password = ref("");
const passwordConfirmation = ref("");
const route = useRoute();
const onSubmit = async () => {
  try {
    await resetPassword({
      code: route.query.code,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    });
    navigateTo("/login");
  } catch (e) {}
};
definePageMeta({
  layout: "blank",
});

useHead({
  title: "Reset Password",
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
