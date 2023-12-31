<template>
  <div class="pb-32">
    <h1 class="text-2xl">Carrier Accounts</h1>
    <div class="grid lg:grid-cols-4 grid-cols-2 my-4">
      <div
        v-for="carrier in carriers"
        class="p-4 bg-white dark:bg-midnight-500 rounded-lg drop-shadow dark:border dark:border-midnight-100"
      >
        <div class="text-xl font-bold">{{ carrier.name }}</div>
        <div class="text-base">{{ carrier.accountId }}</div>
        <div class="absolute right-2 top-2">
          <Icon name="bxs:check-circle" class="text-green-400" size="1.5rem" />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <h2 class="text-xl mb-4">Connect Existing Carrier Account</h2>
      <div class="gap-4 hidden">
        <button
          class="button"
          @click="showExistingCarrier = !showExistingCarrier"
          :class="showExistingCarrier ? '' : 'buttonActive'"
        >
          Create New Carrier Account
        </button>
        <button
          class="button"
          @click="showExistingCarrier = !showExistingCarrier"
          :class="showExistingCarrier ? 'buttonActive' : ''"
        >
          Connect Existing Carrier Account
        </button>
      </div>
      <div>
        <ul class="carrier-options">
          <li>
            <button
              :class="{ carrierButtonActive: selectedCarrier === 'DHL' }"
              @click="selectedCarrier = 'DHL'"
            >
              DHL
            </button>
          </li>
          <li>
            <button
              :class="{
                carrierButtonActive: selectedCarrier === 'FedEx',
              }"
              @click="selectedCarrier = 'FedEx'"
            >
              FedEx
            </button>
          </li>
          <li>
            <button
              :class="{ carrierButtonActive: selectedCarrier === 'UPS' }"
              @click="selectedCarrier = 'UPS'"
            >
              UPS
            </button>
          </li>
          <li>
            <button
              :class="{ carrierButtonActive: selectedCarrier === 'USPS' }"
              @click="selectedCarrier = 'USPS'"
            >
              USPS
            </button>
          </li>
        </ul>
      </div>
      <div class="xl:w-1/2">
        <form v-show="selectedCarrier === 'DHL'" class="form-control mt-1">
          <Icon name="simple-icons:dhl" size="5rem" />
          <h4 class="text-lg border-b pb-1 mb-4 dark:border-midnight-100">
            Connect a new DHL account:
          </h4>
          <p>
            Please provide the following credentials to securely connect your
            DHL account.
          </p>
          <p class="text-base dark:text-slate-400 text-slate-600 italic mb-6">
            Note that we do not store these credentials. They are only used to
            connect your account and are securely transmitted during this
            process.
          </p>
          <div class="mb-6">
            <label for="">Client ID</label>
            <input type="text" />
          </div>
          <div class="mb-4">
            <label for="">Client Secret</label>
            <input type="text" />
          </div>
          <button type="submit" class="btn-primary px-4 py-2 inline-block mt-4">
            Connect Account
          </button>
        </form>

        <form v-show="selectedCarrier === 'FedEx'" class="form-control mt-1">
          <Icon name="simple-icons:fedex" size="5rem" />
          <h4 class="text-lg border-b pb-1 mb-4 dark:border-midnight-100">
            Connect a new FedEx account:
          </h4>
          <p>
            We'll need the following credentials to securely connect your FedEx
            account.
          </p>
          <p class="text-base dark:text-slate-400 text-slate-600 italic mb-6">
            Note that we do not store these credentials. They are only used to
            connect your account and are securely transmitted during this
            process.
          </p>
          <div class="mb-5">
            <label for="">Client ID</label>
            <input type="text" />
          </div>
          <div>
            <label for="">Client Secret</label>
            <input type="text" />
          </div>
          <button type="submit" class="btn-primary px-4 py-2 inline-block mt-4">
            Connect Account
          </button>
        </form>

        <form
          v-show="selectedCarrier === 'UPS'"
          @submit.prevent="createUPS()"
          class="form-control mt-1"
        >
          <Icon name="simple-icons:ups" size="2rem" class="my-6" />
          <h4 class="text-lg border-b pb-1 mb-4 dark:border-midnight-100">
            Connect a new UPS account:
          </h4>
          <p>
            We'll need the following credentials to securely connect your UPS
            account.
          </p>
          <p class="text-base dark:text-slate-400 text-slate-600 italic mb-6">
            Note that this information must match your UPS account details
            <b>exactly</b> to successfully connect your account.
          </p>
          <div class="form-group">
            <div
              class="mb-5 rounded-xl bg-slate-200 p-6 dark:bg-midnight-400 flex gap-5"
            >
              <div class="w-full">
                <label for="">UPS Account Number</label>
                <input type="text" v-model="accountNumberUPS" />
              </div>
              <div class="w-full">
                <label for="">Company Name</label>
                <input type="text" v-model="companyUPS" />
              </div>
            </div>
            <div class="mb-5 rounded-xl bg-slate-200 p-6 dark:bg-midnight-400">
              <label for="address">UPS Account Address</label>
              <div v-if="expandAddress" class="">
                <div class="flex gap-5 mb-6">
                  <div class="w-full">
                    <label for="">Street Address</label>
                    <input type="text" v-model="street1UPS" />
                  </div>
                  <div class="w-full">
                    <label for="">City</label>
                    <input type="text" v-model="cityUPS" />
                  </div>
                  <div>
                    <label for="">State</label>
                    <input type="text" v-model="stateUPS" />
                  </div>
                </div>
                <div class="flex gap-5">
                  <div>
                    <label for="">Postal / Zip Code</label>
                    <input type="text" v-model="postalCodeUPS" />
                  </div>
                  <div>
                    <label for="">Country</label>
                    <input type="text" v-model="countryUPS" />
                  </div>
                </div>
              </div>
              <AddressAutocomplete v-else v-model="addressUPS" />
              <button class="link" @click="expandAddress = true">
                Expand Address
              </button>
            </div>

            <div class="mb-5 rounded-xl bg-slate-200 p-6 dark:bg-midnight-400">
              <div class="flex gap-5 mb-6">
                <div class="w-full">
                  <label for="">Name</label>
                  <input type="text" v-model="nameUPS" />
                </div>
                <div class="w-2/3">
                  <label for="">Your Job Title</label>
                  <input type="text" v-model="jobTitleUPS" />
                </div>
              </div>
              <div class="flex gap-5 mb-6">
                <div class="w-full">
                  <label for="">Email</label>
                  <input type="text" v-model="emailUPS" />
                </div>

                <div class="w-2/3">
                  <label for="">Phone</label>
                  <input type="text" v-model="phoneUPS" />
                </div>
              </div>
              <div>
                <label for="">Website URL</label>
                <input type="text" v-model="websiteUPS" />
              </div>
            </div>
          </div>
          <button type="submit" class="btn-primary px-4 py-2 inline-block mt-4">
            Connect Account
          </button>
        </form>

        <form v-show="selectedCarrier === 'USPS'" class="form-control mt-1">
          <Icon name="simple-icons:usps" size="2rem" class="my-6" />
          <h4 class="text-lg border-b pb-1 mb-4 dark:border-midnight-100">
            Connect a new USPS account:
          </h4>
          <p>
            We'll need the following credentials to securely connect your USPS
            account.
          </p>
          <p class="text-base dark:text-slate-400 text-slate-600 italic mb-6">
            Note that we do not store these credentials. They are only used to
            connect your account and are securely transmitted during this
            process.
          </p>
          <div class="mb-5">
            <label for="">Client ID</label>
            <input type="text" />
          </div>
          <div class="">
            <label for="">Client Secret</label>
            <input type="text" />
          </div>
          <button type="submit" class="btn-primary px-4 py-2 inline-block mt-4">
            Connect Account
          </button>
        </form>
        {{ street1UPS }}
      </div>
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
  if (companyData) {
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

onMounted(async () => {
  try {
    await fetchUserWithRelations();
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

const createUPS = async () => {
  try {
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
        }),
      }
    );
  } catch (error) {
    console.error(error);
  }
};
</script>
