<template>
  <div class="pb-32">
    <h1 class="text-2xl">Carrier Accounts</h1>
    <div class="grid lg:grid-cols-4 grid-cols-2 my-4">
      <div
        v-if="carriers?.length"
        v-for="carrier in carriers"
        class="p-4 bg-white dark:bg-midnight-500 rounded-lg drop-shadow dark:border dark:border-midnight-100"
      >
        <div class="text-xl font-bold">{{ carrier.name }}</div>
        <div class="text-base">{{ carrier.accountId }}</div>
        <div class="absolute right-2 top-2">
          <Icon
            name="bxs:check-circle"
            class="text-emerald-600"
            size="1.5rem"
          />
        </div>
      </div>
      <div v-else>No carriers added yet.</div>
    </div>
    <div class="mt-8">
      <NuxtLink
        to="/settings/carriers/add-carrier"
        class="inline-block btn-primary px-4 py-2 pr-5"
        ><Icon name="bx:link" class="icon-style" /> Connect New
        Carrier</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.form-group {
  @apply mt-5;
  > div {
    @apply mb-5;
  }
}
.button {
  @apply font-bold pb-1 border-b-2 border-transparent;
}
.buttonActive {
  @apply text-blue-500  border-blue-500;
}
.carrier-options {
  @apply bg-slate-300 dark:bg-midnight-900 px-2 py-1 rounded w-fit mt-5 flex gap-2;
  button {
    @apply border rounded px-3 py-1 bg-white font-bold dark:bg-slate-800 dark:border-midnight-200;
    &.carrierButtonActive {
      @apply bg-blue-500 text-white border-blue-500;
    }
  }
}
label,
input {
  @apply text-lg;
}
</style>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();
const user = useStrapiUser();
const token = useStrapiToken();
const userData = ref(null);
const rawData = ref(null);
const { find, findOne } = useStrapi();
const carriers = ref(null);

const successDHL = ref(false);
const successFEDEX = ref(false);
const successUPS = ref(false);
const successUSPS = ref(false);
const connectingAccount = ref(false);

const expandAddress = ref(false);

const showExistingCarrier = ref(false);
const selectedCarrier = ref("DHL"); // default selected carrier

const {
  public: { strapiURL },
} = useRuntimeConfig();

const fetchUserWithRelations = async () => {
  try {
    const response = await fetch(`${strapiURL}/api/users/me?populate=company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    userData.value = await response.json();
    companyData.value = userData.value.company;
  } catch (error) {
    console.error("Failed to fetch user with relations:", error);
  }
};

const companyId = computed(() => {
  if (userData.value?.company.id) {
    return userData.value.company.id;
  }
  return "";
});

const companyData = await findOne("companies", companyId.value, {
  //populate: "users",
});

const companyDataValue = computed(() => {
  if (companyData.data[0]) {
    return companyData.data[0].attributes;
  }
  return "";
});

const companyAddress = computed(() => {
  if (userData?.value) {
    //console.log("companyData 1:", userData?.value);
    return userData?.value?.company.address;
  }
  return "";
});

const fetchCarriers = async () => {
  try {
    const response = await find("carriers", {
      populate: "company",
      filters: {
        company: userData?.value?.company?.id,
      },
    });
    rawData.value = response.data;
    addressUPS.value = companyData.value.address;
    console.log("addressUPS: ", companyAddress.value);
    // Process data for the table
    carriers.value = rawData.value.map((item) => item.attributes);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  try {
    await fetchUserWithRelations();
    await fetchCarriers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const accountNumberUPS = ref("");
const addressUPS = ref(companyDataValue.value.address);
const cityUPS = ref(companyDataValue.value.city);
const companyUPS = ref(companyDataValue.value.name);
const countryUPS = ref(companyDataValue.value.country);
const emailUPS = ref(user.value.email);
const nameUPS = ref(user.value.firstName + " " + user.value.lastName);
const phoneUPS = ref(companyDataValue.value.phone);
const postalCodeUPS = ref(companyDataValue.value.postalCode);
const stateUPS = ref(companyDataValue.value.state);
const subpremise = ref(
  companyDataValue.value.subpremise ? companyDataValue.value.subpremise : ""
);
const street1UPS = ref(
  companyDataValue.value.street1 +
    " " +
    companyDataValue.value.route +
    " " +
    subpremise.value
);

const websiteUPS = ref(companyDataValue.value.website);
const jobTitleUPS = ref(user.value.jobTitle);
const displayError = ref("");
const displayErrorMessage = ref("");
const displayErrorDetails = ref("");

const createUPS = async () => {
  try {
    displayErrorDetails.value = "";
    displayError.value = "";
    displayErrorMessage.value = "";
    connectingAccount.value = true;

    const response = await fetch(
      `${strapiURL}/api/carriers/add-carrier-ups/${userData?.value?.company?.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          account_number: accountNumberUPS.value,
          city: cityUPS.value,
          company: companyUPS.value,
          country: countryUPS.value,
          email: emailUPS.value,
          name: nameUPS.value,
          phone: phoneUPS.value,
          postal_code: postalCodeUPS.value,
          state: stateUPS.value,
          street1: street1UPS.value,
          website: websiteUPS.value,
          title: jobTitleUPS.value,
          companyId: userData?.value?.company?.id,
        }),
      }
    );
    if (!response.ok) {
      connectingAccount.value = false;
      // If the response status code is not OK, handle it as an error
      const errorData = await response.json();
      console.log("Response: ", errorData);
      displayErrorMessage.value = errorData.message;
      displayError.value = errorData.error;

      if (errorData.details && errorData.details.length > 0) {
        // Handle detailed errors
        displayErrorDetails.value = errorData.details;
      }
      return;
    } else {
      connectingAccount.value = false;
      successUPS.value = true;
      await fetchCarriers();
    }
  } catch (error) {
    console.error(error);
    displayError.value = "Error connecting account: " + error;
  }
};
</script>
