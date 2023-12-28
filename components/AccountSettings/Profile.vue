<template>
  <div class="w-full pb-20 xl:w-1/2">
    <Form class="vue-form form-control rounded-lg text-left" @submit="onSubmit">
      <div class="w-full text-lg flex gap-5 mb-6">
        <div class="w-full">
          <label for="firstName" class="block font-bold">First Name</label>
          <Field
            name="firstName"
            type="text"
            class="rounded-lg"
            id="firstName"
            v-model="firstName"
          />
        </div>
        <div class="w-full">
          <label for="lastName" class="block font-bold">Last Name</label>
          <Field
            name="lastName"
            type="text"
            class="rounded-lg"
            id="lastName"
            v-model="lastName"
          />
        </div>
      </div>

      <div class="w-full text-lg mb-6">
        <label for="jobTitle" class="block font-bold">Job Title</label>
        <Field
          name="jobTitle"
          type="text"
          class="rounded-lg"
          id="jobTitle"
          v-model="jobTitle"
        />
      </div>
      <div class="mb-6">
        <label for="email" class="block font-bold">Your Email</label>
        <div
          class="rounded-xl bg-slate-200 px-5 pt-5 pb-2 dark:bg-midnight-400"
        >
          <div class="mb-2 text-lg">
            <div class="relative">
              <input
                type="email"
                class="rounded-lg font-semibold text-slate-500 cursor-not-allowed"
                v-model="userEmail"
                disabled
              />
              <Icon
                v-if="user.provider == 'google'"
                name="bx:lock"
                class="absolute right-5 top-3"
              />
            </div>

            <span
              v-if="user.provider == 'google'"
              class="mt-2 mr-3 inline-block font-bold"
            >
              <Icon name="logos:google-icon" class="icon-style mr-1" />
              Google Linked Account
            </span>

            <span
              v-if="user.confirmed"
              class="mx-1 mt-2 inline-block font-bold text-blue-500"
            >
              <Icon name="bx:envelope" class="icon-style" />
              Confirmed
            </span>
          </div>

          <NuxtLink
            v-if="!user.provider"
            to="/reset-password"
            class="mt-5 mb-4 block rounded-lg bg-slate-300 p-2 text-center text-lg font-bold dark:bg-midnight-200 dark:text-indigo-400"
            >Reset Password</NuxtLink
          >
        </div>
      </div>
      <div class="relative mt-10 my-6 text-lg hidden">
        <label for="username" class="block font-bold">Your Username</label>
        <div class="relative">
          <input
            type="text"
            v-model="username"
            class="rounded-lg font-semibold text-slate-500"
            maxLength="48"
          />
        </div>
      </div>

      <div class="w-full text-lg mb-6">
        <label for="address-input" class="block font-bold"
          >Default Origin Address</label
        >

        <div
          class="rounded-xl bg-slate-200 px-5 pt-5 pb-2 dark:bg-midnight-400"
        >
          <div class="toggle-container">
            <div
              :class="{ 'toggle-option': true, active: useCompanyName }"
              @click="useCompanyName = true"
            >
              {{ userData?.company?.name }}
            </div>
            <div
              :class="{ 'toggle-option': true, active: !useCompanyName }"
              @click="useCompanyName = false"
            >
              {{ userData?.firstName + " " + userData?.lastName }}
            </div>
          </div>
          <AddressAutocomplete v-model="defaultOriginAddress" />
          <p class="text-base mt-2 pl-1 dark:text-slate-400 text-slate-500">
            <Icon
              name="bx:info-circle"
              class="icon-style dark:text-slate-400 text-slate-500"
            />
            This is used to autofill your origin address when creating a new
            shipping label.
          </p>
        </div>
      </div>

      <label for="avatar" class="block font-bold">Avatar</label>
      <div
        class="mb-5 rounded-xl bg-slate-200 px-8 pt-8 pb-2 dark:bg-midnight-400"
      >
        <div class="gap-5 md:flex">
          <div
            class="mb-5 w-full text-lg"
            :class="`${userData?.avatar ? 'lg:flex' : ''}`"
          >
            <label
              for="files"
              class="pt-1 md:w-[100px]"
              v-if="userData?.avatar"
            >
              <img
                v-if="userData.avatar"
                :src="`${userData?.avatar?.url}`"
                alt="avatar"
                class="h-[60px] w-[60px] cursor-pointer rounded-full"
              />
            </label>
            <div class="w-full">
              <h3 class="font-bold text-xl lg:text-xl">Upload new avatar:</h3>
              <p class="pt-0 pb-3 text-base">100x100, 1 MB limit</p>
              <input
                class="max-w-full"
                type="file"
                name="files"
                id="files"
                ref="fileInput"
              />
              <p v-if="uploading">Uploading...</p>
              <span
                v-if="uploadError"
                class="mt-3 inline-block text-base"
                role="alert"
              >
                {{ uploadError }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <button
          class="btn-primary my-12 py-4 block font-bold w-full text-xl max-w-[200px] mx-auto"
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
label {
  @apply text-lg mb-2;
}

input::file-selector-button {
  font-weight: bold;
  color: white;
  padding: 0.1rem 0.75rem;
  margin-right: 0.75rem;
  border-radius: 20px;
  border: thin solid;
  cursor: pointer;
  @apply bg-blue-500 hover:bg-blue-600 border-blue-500;
}
input::file-selector-button:active,
input::file-selector-button:focus {
  @apply border border-blue-500 bg-blue-600;
}
.toggle-container {
  @apply flex rounded-lg overflow-hidden border dark:border-midnight-200 mb-2 font-medium dark:bg-midnight-300 bg-white;
}

.toggle-option {
  @apply cursor-pointer py-2 px-4 text-center flex-1 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-midnight-200;
  transition: background-color 0.3s;
}
.toggle-option:first-child {
  @apply border-r dark:border-midnight-200;
}

.toggle-option.active {
  @apply text-blue-500 dark:bg-midnight-600 font-bold  dark:border-midnight-200 border-slate-300 bg-white;
}
</style>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();
const user = useStrapiUser();
const route = useRoute();
const { find, findOne, create, update, delete: remove } = useStrapi();

const token = useStrapiToken();
const userData = ref(null);
const useCompanyName = ref(user.value?.useCompanyNameForOrigin);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const getUserId = computed(() => {
  if (userData.value) {
    return userData.value.id;
  }
  return null;
});

const firstNameValue = computed(() => {
  if (user.value?.firstName) {
    return user.value.firstName;
  }
  return "";
});

const lastNameValue = computed(() => {
  if (user.value?.lastName) {
    return user.value.lastName;
  }
  return "";
});

const emailValue = computed(() => {
  if (user.value?.email) {
    return user.value.email;
  }
  return "";
});

const jobTitleValue = computed(() => {
  if (user.value?.jobTitle) {
    return user.value.jobTitle;
  }
  return "";
});

const defaultOriginAddressValue = computed(() => {
  if (user.value?.defaultOriginAddress) {
    return user.value.defaultOriginAddress;
  }
  return "";
});

const usernameValue = computed(() => {
  if (user.value?.username) {
    return user.value.username;
  }
  return "";
});

const fileInput = ref(null);
const firstName = ref(firstNameValue.value);
const lastName = ref(lastNameValue.value);
const userEmail = ref(emailValue.value);
const username = ref(usernameValue.value);
const jobTitle = ref(jobTitleValue.value);
const defaultOriginAddress = ref(defaultOriginAddressValue.value);

const client = useStrapiClient();
const uploading = ref(false);
const uploadError = ref(null);

// Upload avatar up api uploads and link to userdata avatar field
async function onSubmit() {
  try {
    let userDataId;
    userDataId = getUserId.value;

    //console.log(user.value.id);

    try {
      const response = await fetch(`${strapiURL}/api/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          jobTitle: jobTitle.value,
          //email: userEmail.value,
          //username: username.value,
          defaultOriginAddress: defaultOriginAddress.value.formattedAddress,
          street1: defaultOriginAddress.value.streetNumber,
          street2: defaultOriginAddress.value.streetNumber,
          route: defaultOriginAddress.value.route,
          city: defaultOriginAddress.value.city,
          state: defaultOriginAddress.value.state,
          postalCode: defaultOriginAddress.value.postalCode,
          subPostalCode: defaultOriginAddress.value.subPostalCode,
          country: defaultOriginAddress.value.country,
          county: defaultOriginAddress.value.county,
          website: defaultOriginAddress.value,
          subpremise: defaultOriginAddress.value.subpremise,
          useCompanyNameForOrigin: useCompanyName.value,
        }),
      });
      if (!response.ok) {
        console.error("Error: ", response);
      }
    } catch (error) {
      console.error("Error w/ PUT at user/me: ", error);
    }
    const maxSize = 1 * 1024 * 1024; // 1 MB
    if (fileInput.value.files.length) {
      const file = fileInput.value.files[0];
      if (file.size > maxSize) {
        uploadError.value = `Error: File size should not exceed ${
          maxSize / (1024 * 1024)
        } MB.`;
        return;
      }

      const formData = new FormData();
      formData.append("files", fileInput.value.files[0]);
      formData.append("ref", "plugin::users-permissions.user");
      formData.append("refId", user.value.id);
      formData.append("field", "avatar");

      await client("/upload", {
        method: "POST",
        body: formData,
      });
    }
    fetchUserWithRelations();
    Toast.fire({
      icon: "success",
      title: "Profile Saved",
    });
  } catch (e) {
    Toast.fire({
      icon: "error",
      title: "Error:" + e,
    });
  }
}

const fetchUserWithRelations = async () => {
  try {
    const response = await fetch(
      `${strapiURL}/api/users/me?populate=avatar,company`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    userData.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch user with relations:", error);
  }
};

onMounted(() => {
  fetchUserWithRelations();
});

// Watch for changes in user data and update the address
watch(
  user,
  (newValue) => {
    if (newValue && newValue.defaultOriginAddress) {
      defaultOriginAddress.value = newValue.defaultOriginAddress;
    }
  },
  { immediate: true }
);
</script>
