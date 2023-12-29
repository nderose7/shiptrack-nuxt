<template>
  <VForm
    :validation-schema="schema"
    :initial-values="initialValues"
    class="vue-form p-5 text-left lg:mx-auto lg:w-full lg:max-w-[500px] lg:rounded-3xl lg:p-10"
  >
    <div class="">
      <h1 class="mb-2 text-4xl font-bold text-center lg:text-left">
        Create Account
      </h1>
    </div>
    <div class="mt-5 hidden">
      <a
        :href="`${strapiURL}/api/connect/google`"
        class="btn-primary inline-block py-3 px-4 text-center"
      >
        <span class="mr-1 inline-block h-[27px] w-[27px] rounded-full bg-white">
          <Icon name="logos:google-icon" class="icon-style h-[20px] w-[20px]"
        /></span>
        Sign Up With Google
      </a>
    </div>

    <div class="mt-8">
      <p class="mt-6 hidden text-lg font-bold">Or sign up with your email:</p>
      <div class="form-control w-full text-xl">
        <VTextInput
          type="email"
          name="email"
          id="email"
          label="Your Email"
          :debug="debug"
          v-model="email"
        />
        <div class="relative mt-5">
          <VTextInput
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            label="Choose a Password"
            :debug="debug"
            v-model="password"
          />
          <button
            @click="showPassword = !showPassword"
            class="absolute top-[39px] right-3"
          >
            <Icon :name="`${showPassword ? 'mdi:eye-off' : 'mdi:eye'}`" />
          </button>
        </div>
      </div>

      <p class="mt-4 text-base">
        By signing up, you agree to our
        <NuxtLink to="/terms" class="text-blue-500">Terms of Use</NuxtLink>
        and our
        <NuxtLink to="/privacy" class="text-blue-500"
          >Privacy Agreement</NuxtLink
        >. We
        <i>never</i>
        share your data.
      </p>

      <div class="mt-5">
        <button
          type="submit"
          @click="onSubmit()"
          class="btn-primary mt-2 block w-full rounded-lg text-xl font-bold lg:inline-block lg:w-auto"
        >
          Next
        </button>
        <p v-if="errorMessage" class="mt-5 text-red-500">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </VForm>
</template>

<style>
#landing-managed {
  scroll-behavior: smooth;
}
</style>

<script setup>
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";

const {
  public: { strapiURL },
} = useRuntimeConfig();

const email = ref("");
const password = ref("");
const { register } = useStrapiAuth();
const debug = ref(false);
const showPassword = ref(false);
const errorMessage = ref(null);
const showUsernameField = ref(false);
const customUsername = ref("");

onMounted(() => {
  document.getElementById("email").focus();
});

// Check if email exists in database
/*
const existingEmail = async (value) => {
  const result = await $fetch("/api/checkemail?email=" + value);
  return result ? true : false;


  onMounted(() => {
  debug.value =
    useRouter().currentRoute.value.query.debug === "true" ? true : false;
  document.getElementById("email").focus();
});
};*/

const regexSpecialCharacters = /^(?=.*?[~!@#$%^&*()]).*$/i;
const regexCapitalLetters = /^(?=.*?[A-Z]).*$/i;
const regexNumerical = /^(?=.*?[0-9]).*$/i;

const validatePasswordSpecial = async (value) => {
  if (!regexSpecialCharacters.test(value)) {
    return true;
  }
  return false;
};

const validatePasswordCapital = async (value) => {
  if (!regexCapitalLetters.test(value)) {
    return true;
  }
  return false;
};

const validatePasswordNumerical = async (value) => {
  if (!regexNumerical.test(value)) {
    return true;
  }
  return false;
};

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

const schema = object({
  email: string().required().email().label("Email Address"),
  password: string()
    .required()
    .test(
      "password-no-special",
      "Password must contain at least one special character e.g. ~!@#$%^&*().",
      async (value) => !(await validatePasswordSpecial(value))
    )
    .test(
      "password-no-number",
      "Password must contain at least one number.",
      async (value) => !(await validatePasswordNumerical(value))
    )
    .min(8)
    .test(
      "password-no-capital",
      "Password must contain at least one capital letter.",
      async (value) => !(await validatePasswordCapital(value))
    )
    .label("Password"),
  confirmed: string()
    .required()
    .oneOf([yupRef("password")], "Passwords do not match") //Cross-Field Validation
    .label("Your Confirmation Password"),
});
const initialValues = { email: "", password: "" };
//const mail = useMail();

const displayErrorMessage = (msg) => {
  errorMessage.value = msg;
};

const displayUsernameField = () => {
  showUsernameField.value = true;
};

const onSubmit = async () => {
  try {
    // Step 1: Register the user using the Strapi function

    const userRegistered = await register({
      username: email.value,
      email: email.value,
      password: password.value,
    });

    if (userRegistered.user.value) {
      console.log(userRegistered.user.value.id);
    } else {
      console.log("User object is undefined");
    }

    const userId = userRegistered.user.value.id;

    console.log(userId);

    navigateTo("/onboarding");
  } catch (error) {
    // Handle the unique username constraint
    if (
      error.error &&
      error.error.message === "Email or Username are already taken"
    ) {
      // Adjust this condition based on the exact error message from Strapi
      displayErrorMessage(
        "Email already taken. Please choose a different one."
      );
      displayUsernameField(); // Function to render the "Username" input field for the user
    } else {
      // Handle other errors
      displayErrorMessage(
        "An error occurred during registration. Please try again."
      );
    }
  }
};
</script>
