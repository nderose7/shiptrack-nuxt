<template>
  <div
    id="landing-managed"
    class="h-screen px-4 text-center dark:bg-black bg-slate-100"
  >
    <div class="h-screen flex items-center justify-center">
      <div class="xl:w-1/5 lg:w-1/3 min-w-[320px]">
        <div class="px-8 pb-12 pt-10">
          <div class="logo mb-10 px-10 text-4xl text-center">
            <NuxtLink to="/" class="inline-block">
              <CloudLogo class="w-[48px] mx-auto mb-3" />
              <Logo />
            </NuxtLink>
          </div>
          <p class="hidden">Login to your Momentum account.</p>
          <div v-if="error">
            <div v-show="error !== ''" class="p-3">
              <p>{{ error }}</p>
            </div>
          </div>
          <div class="mt-4 mb-8 text-center hidden">
            <a
              :href="`${strapiURL}/api/connect/google`"
              class="btn-primary inline-block min-w-[200px] rounded-full border px-3 py-2 text-lg font-bold text-white dark:border-blue-500"
            >
              <span
                class="mr-1 inline-block h-[28px] w-[28px] rounded-full bg-white"
              >
                <Icon
                  name="logos:google-icon"
                  class="icon-style h-[18px] w-[18px] relative top-[-1px]"
              /></span>
              Login With Google
            </a>
          </div>
          <form @submit="loginUser" class="form-control mt-4 text-left">
            <div class="form-group">
              <label for="email" class="label font-bold">Email Address</label>
              <input
                v-model="email"
                class="rounded-md"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password" class="label font-bold">Password</label>
              <input
                v-model="password"
                class="rounded-md"
                id="password"
                type="password"
                name="password"
                required
              />
            </div>
            <div class="mt-8 flex justify-center">
              <button
                :disabled="email === '' || password === ''"
                class="btn-primary rounded-full px-10 py-3 text-xl font-bold text-white"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <p class="mt-4 mb-2 text-center text-base">
          Don't have an account?
          <NuxtLink to="/get-started" class="font-semibold"
            >Get Started.</NuxtLink
          >
        </p>
        <p class="text-center text-base">
          <NuxtLink to="/forgot-password" class="font-semibold"
            >Forgot your password?</NuxtLink
          >
        </p>
        <NuxtLink
          to="/forgot-password"
          class="hidden rounded bg-slate-700 px-3 py-2 font-bold text-white"
          >Forgot Password</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.cloud-logo {
  @apply w-[48px];
}
.h-screen-minus-header {
  height: calc(100vh - 100px); /* Default height */
  @screen lg {
    /* Tailwind's way to apply media queries */
    height: calc(100vh - 100px); /* Adjusted height for large screens */
  }
}
input[type="password"] {
  font-family: Verdana;
}
.form-group {
  @apply mb-4;
}
label {
  @apply text-lg;
}
</style>

<script setup>
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();

definePageMeta({
  layout: "blank",
  middleware: "loggedin",
});

useHead({
  title: "Login",
});

const {
  public: { strapiURL },
} = useRuntimeConfig();

// form state
const email = ref("");
const password = ref("");
const error = ref("");

const { login } = useStrapiAuth();
const router = useRouter();

const loginUser = async (e) => {
  e.preventDefault();
  try {
    await login({
      identifier: email.value,
      password: password.value,
    });
    router.push("/dashboard");
  } catch (error) {
    //loadingLogin.value = false;
    console.error("Login error:", error);
    let errorMessage = "Login failed. Please try again.";

    // Check for error message in the expected structure
    if (error && error.error && error.error.message) {
      errorMessage = error.error.message;
    }

    Toast.fire({
      icon: "error",
      title: "Login Error",
      text: errorMessage,
    });
  }
};

useHead({
  meta: [{ name: "robots", content: "noindex" }],
});
</script>
