<template>
  <div class="w-full lg:px-10 px-5 min-h-screen">
    <div
      class="w-full pb-3 mb-2 flex justify-between items-end sticky top-0 pt-5 dark:bg-midnight-200 bg-white z-50"
    >
      <div
        class="flex items-end gap-5 border-b dark:border-midnight-100 pb-1 w-full"
      >
        <h1 class="text-2xl">
          <button
            type="button"
            @click.prevent="$router.back()"
            class="mb-0 mt-0 mr-1"
          >
            <Icon name="mdi:arrow-left" class="icon-style" /></button
          >New Shipment
        </h1>
      </div>
    </div>
    <div class="">
      <div class="xl:w-1/3">
        <div class="lg:mt-5">
          <Form class="form-control" @submit="getShippingOptions()">
            <div class="form-group">
              <label for="destinationAddress"> Product To Ship </label>
              <div>
                <select
                  name="product"
                  id="product"
                  type="select"
                  v-model="product"
                >
                  <option v-for="product in products" :value="product">
                    {{ product.name }}: {{ product.serial }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="destinationAddress"> Origin Address </label>
              <div class="relative">
                <Field
                  name="originAddress"
                  id="originAddress"
                  type="text"
                  :value="
                    user.useCompanyNameForOrigin
                      ? companyDataValue.name
                      : user.firstName + ' ' + user.lastName
                  "
                  class="padding-right-override"
                  disabled
                />

                <div
                  class="mt-2 ml-2 flex gap-2 items-center dark:text-slate-400 text-slate-600"
                >
                  <div>
                    <Icon name="bx:current-location" class="icon-style" />
                  </div>
                  <div class="text-base">
                    {{
                      user.useCompanyNameForOrigin
                        ? companyAddress
                        : user.defaultOriginAddress
                    }}
                  </div>
                </div>
                <div
                  class="cursor-pointer override absolute right-3 top-[10px] text-blue-500 font-medium text-base"
                >
                  Override
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="destinationAddress"> Destination Address </label>
              <div>
                <select
                  name="address"
                  id="address"
                  type="select"
                  v-model="selectedDestinationAddress"
                >
                  <option :value="address" v-for="address in addresses">
                    {{ address.name
                    }}<span v-if="address.organization !== null">
                      : {{ address.organization }}
                    </span>
                  </option>
                </select>
                <div
                  v-if="selectedDestinationAddress"
                  class="mt-2 ml-2 flex gap-2 items-center dark:text-slate-400 text-slate-600"
                >
                  <div>
                    <Icon name="bx:current-location" class="icon-style" />
                  </div>
                  <div class="text-base">
                    {{ selectedDestinationAddress.address }}
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-8">
              <button type="submit" class="btn-primary inline-block px-5 py-2">
                <span v-if="loadingOptions"
                  ><Icon name="svg-spinners:pulse-3" class="icon-style" />
                  Loading options...
                </span>
                <span v-else> Get Shipping Options </span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
  <transition name="slide" mode="out-in">
    <div
      v-if="isDrawerOpen"
      class="drawer dark:bg-midnight-700 bg-slate-200 p-5 px-6 drop-shadow"
    >
      <div class="">
        <div class="lg:flex justify-between">
          <div>
            <h2 class="text-2xl lg:mb-4 mb-2">
              <button
                type="button"
                @click="isDrawerOpen = false"
                class="mb-0 mt-0 mr-1"
              >
                <Icon name="mdi:arrow-left" class="icon-style" /></button
              >Shipping Options
            </h2>
          </div>
        </div>
        <div class="">
          <form class="mb-2">
            <div class="form-group">
              <label for="carrier"> Carrier </label>
              <ul class="carrier-options">
                <li v-for="carrier in carriers" :key="carrier.id">
                  <button
                    type="button"
                    :class="{
                      carrierButtonActive:
                        selectedCarrier === carrier.attributes.name,
                    }"
                    @click="selectedCarrier = carrier.attributes.name"
                  >
                    {{ carrier.attributes.name }}
                  </button>
                </li>
              </ul>
            </div>
          </form>
          <div class="mb-4">
            <form class="form-control">
              <select>
                <option>Best Price</option>
              </select>
            </form>
          </div>
        </div>
        <div class="overflow-y-scroll h-screen-local pb-48">
          <div
            v-for="shippingOption in filteredShippingOptions"
            class="p-2 px-3 text-lg bg-white rounded-lg drop-shadow my-2 cursor-pointer hover:bg-slate-100 border dark:bg-midnight-400 dark:border-midnight-200"
            @click="selectShippingOption(shippingOption)"
            :key="shippingOption.id"
            :class="{ 'selected-option': isSelected(shippingOption) }"
          >
            <label
              for="shippingOptionGroup"
              class="flex justify-between cursor-pointer"
            >
              <div>
                <input
                  type="radio"
                  :id="shippingOption.id"
                  name="shippingOptionGroup"
                  :value="shippingOption"
                  class="mr-2 cursor-pointer"
                  v-model="selectedShippingOption"
                  @click.stop
                />
                {{ shippingOption.carrier }}:
                {{ addSpacesToServiceName(shippingOption.service) }}
              </div>
              <div>
                <span class="font-bold">${{ shippingOption.rate }}</span
                ><br />
              </div> </label
            ><span class="ml-7 text-base text-slate-500"
              >{{ shippingOption.delivery_days }}
              {{ shippingOption.delivery_days === 1 ? "day" : "days" }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="dark:bg-midnight-700 bg-slate-200 z-50 fixed bottom-0 py-10 w-full"
      >
        <button
          @click="createShipment()"
          class="btn-primary inline-block px-5 py-2"
        >
          Review Shipment Details
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.selected-option {
  @apply border-blue-500 dark:bg-midnight-500;
}
.h-screen-local {
  height: calc(100vh - 188px);
}
.form-group {
  @apply text-lg py-2;
}
.carrier-options {
  @apply mt-2 gap-2 flex;
}

.carrier-options button {
  @apply border rounded px-3 py-1 bg-white font-bold dark:bg-slate-800 dark:border-midnight-200;
}

.carrier-options button.carrierButtonActive {
  @apply bg-blue-500 text-white border-blue-500;
}
.padding-right-override {
  padding-right: 90px !important;
}
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  transform: translateX(0%);
  @apply pb-24 min-w-full lg:min-w-[400px] xl:min-w-[500px];
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
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
const { find, findOne, create } = useStrapi();
const addresses = ref([]);
const products = ref([]);
const selectedOriginAddress = ref("");
const carriers = ref([]);
const company = ref([]);
const selectedDestinationAddress = ref();
const product = ref([]);
const shippingOptions = ref([]);
const loadingOptions = ref(false);
const isDrawerOpen = ref(false);
const selectedShippingOption = ref(null);

const successDHL = ref(false);
const successFEDEX = ref(false);
const successUPS = ref(false);
const successUSPS = ref(false);
const connectingAccount = ref(false);

const expandAddress = ref(false);

const showExistingCarrier = ref(false);
const selectedCarrier = ref("UPS");

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

const fetchAddresses = async () => {
  try {
    const response = await find("addresses");
    addresses.value = response.data;
  } catch (error) {
    console.error("Failed to fetch user with relations:", error);
  }
};

const fetchProducts = async () => {
  try {
    const response = await find("products");
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch user with relations:", error);
  }
};

const fetchCarriers = async () => {
  try {
    const response = await find("carriers");
    carriers.value = response.data;
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
    await fetchProducts();
    await fetchAddresses();
    await fetchCarriers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

definePageMeta({
  layout: "loggedin",
  middleware: ["auth"],
});

const completeDestinationStreet = ref("");

const getShippingOptions = async () => {
  loadingOptions.value = true;

  if (selectedDestinationAddress.value.subpremise !== null) {
    const subpremise = selectedDestinationAddress.value.subpremise;
    //console.log("Subpremise: ", subpremise);
    completeDestinationStreet.value =
      selectedDestinationAddress.value.street1 + " " + subpremise;
    //console.log("Subpremise: ", completeDestinationStreet.value);
  } else {
    completeDestinationStreet.value = selectedDestinationAddress.value.street1;
  }

  try {
    console.log("Creating shipment at /create-shipment endpoint");
    const response = await fetch(`${strapiURL}/api/create-shipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        to_address: {
          city: selectedDestinationAddress.value.city,
          country: selectedDestinationAddress.value.country,
          email: selectedDestinationAddress.value.email,
          name: selectedDestinationAddress.value.name,
          phone: selectedDestinationAddress.value.phone,
          zip: selectedDestinationAddress.value.postalCode,
          state: selectedDestinationAddress.value.state,
          street1: completeDestinationStreet.value,
        },
        from_address: {
          city: companyDataValue.value.city,
          country: companyDataValue.value.country,
          email: companyDataValue.value.email,
          name: companyDataValue.value.name,
          phone: companyDataValue.value.phone,
          zip: companyDataValue.value.postalCode,
          state: companyDataValue.value.state,
          street1:
            companyDataValue.value.street1 + " " + companyDataValue.value.route,
        },
        parcel: {
          length: product.value.length,
          width: product.value.width,
          height: product.value.height,
          weight: product.value.weight,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    shippingOptions.value = await response.json();
    loadingOptions.value = false;
    isDrawerOpen.value = true;
  } catch (error) {
    loadingOptions.value = false;
    console.error(error);
  }
};

const filteredShippingOptions = computed(() => {
  if (!selectedCarrier.value) {
    return shippingOptions.rates; // Return all options if no carrier is selected
  }
  return shippingOptions.value.rates.filter(
    (option) => option.carrier === selectedCarrier.value
  );
});

function addSpacesToServiceName(serviceName) {
  // Insert a space before an uppercase letter if it is followed by a lowercase letter,
  // or if it is preceded by a lowercase letter
  return serviceName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([a-z])/g, " $1$2")
    .trim();
}

const selectShippingOption = (option) => {
  selectedShippingOption.value = option;
};

const isSelected = (option) => {
  return selectedShippingOption.value === option;
};

const fromCity = ref("");
const fromCountry = ref("");
const fromEmail = ref("");
const fromName = ref("");
const fromPhone = ref("");
const fromZip = ref("");
const fromState = ref("");
const fromStreet1 = ref("");
const originAddress = ref("");

const createShipment = async () => {
  if (user.value.useCompanyNameForOrigin) {
    fromCity.value = companyDataValue.value.city;
    fromCountry.value = companyDataValue.value.country;
    fromEmail.value = user.value.email;
    fromName.value = companyDataValue.value.name;
    fromPhone.value = companyDataValue.value.phone;
    fromZip.value = companyDataValue.value.postalCode;
    fromState.value = companyDataValue.value.state;
    fromStreet1.value = companyDataValue.value.street1;
    originAddress.value = companyDataValue.value.address;
  } else {
    fromCity.value = user.value.city;
    fromCountry.value = user.value.country;
    fromEmail.value = user.value.email;
    fromName.value = user.value.firstName + " " + user.value.lastName;
    fromPhone.value = companyDataValue.value.phone;
    fromZip.value = user.value.postalCode;
    fromState.value = user.value.state;
    fromStreet1.value = user.value.street1;
    originAddress.value = user.value.defaultOriginAddress;
  }
  try {
    const shipment = await create("shipments", {
      product: {
        connect: [product.value.id],
      },
      company: {
        connect: [companyId.value],
      },
      /*
      carrier: {
        connect: [carrierId.value]
      },*/
      originAddress: originAddress.value,
      destinationAddress: selectedDestinationAddress.value.address,
      toCity: selectedDestinationAddress.value.city,
      toCountry: selectedDestinationAddress.value.country,
      toEmail: selectedDestinationAddress.value.email,
      toName: selectedDestinationAddress.value.name,
      toPhone: selectedDestinationAddress.value.phone,
      toZip: selectedDestinationAddress.value.postalCode,
      toState: selectedDestinationAddress.value.state,
      toStreet1: completeDestinationStreet.value,
      fromCity: fromCity.value,
      fromCountry: fromCountry.value,
      fromEmail: fromEmail.value,
      fromName: fromName.value,
      fromPhone: fromPhone.value,
      fromZip: fromZip.value,
      fromState: fromState.value,
      fromStreet1: fromStreet1.value,
      length: product.value.length,
      width: product.value.width,
      height: product.value.height,
      weight: product.value.weight,
      shippingOption: selectedShippingOption.value.id,
      cost: selectedShippingOption.value.rate,
      status: "In Progress",
      carrierName: selectedCarrier.value,
      carrierService: selectedShippingOption.value.service,
      deliveryDays: selectedShippingOption.value.delivery_days,
      easyPostId: shippingOptions.value.id,
    });
    navigateTo(`/shipments/${shipment.data.id}`);
  } catch (error) {
    console.error(error);
  }
};
</script>
