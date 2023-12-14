<template>
  <div
    id="landing-managed"
    class="h-screen px-4 text-center dark:bg-midnight-900 bg-slate-100"
  >
    <div class="h-screen flex items-center justify-center">
      <div class="xl:w-1/5 lg:w-1/3 min-w-[320px]">
        <div
          class="rounded-xl border bg-white px-8 pb-12 pt-10 dark:border-slate-800 dark:bg-midnight-700 lg:rounded-3xl"
        >
          <div class="logo mb-6 px-10 text-4xl text-center">
            <NuxtLink to="/" class="inline-block">
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

<style scoped></style>

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
    console.log(error);
    Toast.fire({
      icon: "error",
      title: "Error!",
      text: error,
    });
  }
};

useHead({
  meta: [{ name: "robots", content: "noindex" }],
});

// handle form submit
/*
const loginUser = async (e) => {
  e.preventDefault();
  if (name && email && password) {
    // GraphQL Sign in Query
    let signInQuery = {
      query: `mutation( $email: String!, $password: String!) {
        login(input: { identifier: $email, password: $password }) {
          jwt,
          user{
            id
            username
            email
          }
        }
      }`,
      variables: { email: email.value, password: password.value },
    };
    try {
      isLoading.value = true;
      const { login, errors } = await sendReq(graphqlURL, { body: JSON.stringify(signInQuery), headers: { "Content-Type": "application/json" } });
      if (errors) throw Error(errors);
      setSession(login);

      // notify and navigate to the home page

      // Add in full-width alert for successful login and redirect to clients?
      //alert("Sign in successful!");
      navigateTo("/treatment-library");
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
};
*/
</script>
