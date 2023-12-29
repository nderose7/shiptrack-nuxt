<template>
  <div class="w-full lg:px-10 px-5 min-h-screen pb-32">
    <div
      class="w-full pb-3 mb-5 flex justify-between items-end sticky top-0 pt-5 dark:bg-black bg-white z-50"
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
          >Review Shipment
        </h1>
      </div>
    </div>
    <div v-if="!pageLoading" class="text-lg">
      <div class="">
        <div class="lg:flex items-start justify-between">
          <div class="">
            <h1 class="text-3xl mb-1">{{ shipment?.product?.name }}</h1>
            <p>{{ shipment?.product?.serial }}</p>
            <div
              class="p-1 px-3 mb-6 dark:bg-midnight-500 bg-slate-100 w-fit rounded-lg"
            >
              <b>Status: </b>
              <span v-if="shipmentDetails?.status === 'unknown'">
                {{ shipment?.status }}
              </span>
              <span
                v-if="
                  shipmentDetails?.status &&
                  shipmentDetails?.status !== 'unknown'
                "
              >
                {{ snakeCaseToTitleCase(shipmentDetails?.status) }}
              </span>
            </div>
            <div>
              <div class="text-base font-bold text-slate-500 mb-1">FROM</div>
              <b>{{ shipment?.fromName }}</b
              ><br />
              {{ shipment?.originAddress }}
            </div>
            <div>
              <div class="mt-4">
                <div class="text-base font-bold text-slate-500 mb-1">TO</div>
                <b>{{ shipment?.toName }}</b
                ><br />
                {{ shipment?.destinationAddress }}
              </div>
              <div class="mt-4">
                <div class="text-base font-bold text-slate-500 mb-1">
                  DETAILS
                </div>
                <ul>
                  <li><b>Carrier: </b> {{ shipment?.carrierName }}</li>
                  <li>
                    <b>Service: </b>
                    {{ addSpacesToServiceName(shipment?.carrierService) }}
                  </li>
                  <li>
                    <b>Estimated Delivery: </b>
                    {{ calculateDeliveryDate(shipment?.deliveryDays) }}
                  </li>
                </ul>
              </div>
              <div class="mt-4">
                <div class="text-base font-bold text-slate-500 mb-1">COST</div>
                <b>Rate: </b> ${{ shipment?.cost }}
              </div>
              <div v-if="shipmentDetails?.tracker" class="mt-4">
                <div class="text-base font-bold text-slate-500 mb-1">
                  TRACKING
                </div>

                <div>
                  <b>{{ shipmentDetails?.tracker?.carrier }} Tracking Code: </b>
                  <NuxtLink
                    class="link"
                    :to="`https://wwwapps.ups.com/tracking/tracking.cgi?tracknum=${shipmentDetails?.tracker?.tracking_code}`"
                    >{{ shipmentDetails?.tracker?.tracking_code }}
                  </NuxtLink>
                </div>

                <div>
                  <b>Status: </b
                  >{{ snakeCaseToTitleCase(shipmentDetails?.tracker?.status) }}
                </div>
                <div>
                  <b>Details: </b
                  >{{
                    snakeCaseToTitleCase(
                      shipmentDetails?.tracker?.status_detail
                    )
                  }}
                </div>
                <div>
                  <b>Last Updated: </b
                  >{{ formatDateTime(shipmentDetails?.tracker?.updated_at) }}
                </div>
                <div class="flex gap-2 mt-8">
                  <button type="button" class="btn-white">Print Label</button>
                  <button type="button" class="btn-white">Email Label</button>
                </div>
              </div>
            </div>
            <div v-if="shipment.status === 'In Progress'" class="">
              <button
                @click="createShippingLabel"
                class="btn-primary inline-block px-6 py-3 mt-6"
              >
                <span v-if="loading"
                  ><Icon name="svg-spinners:pulse-3" class="icon-style" />
                  Purchasing...
                </span>
                <span v-else> Purchase Label </span>
              </button>
            </div>
          </div>
          <div v-if="shipmentDetails?.tracker" class="mt-10 mb-20 lg:mt-0">
            <div class="tracking-container">
              <h2 class="text-2xl mb-3">Tracking</h2>
              <div class="event-content">
                <div
                  v-for="(detail, index) in shipmentDetails.tracker
                    .tracking_details"
                  :key="index"
                  class="tracking-event"
                >
                  <div class="flex gap-2">
                    <Icon
                      name="bx:check-circle"
                      class="text-emerald-500 event-icon mt-1"
                    />
                    <div>
                      <div class="event-time">
                        {{ formatDateTime(detail.datetime) }}
                      </div>
                      <div class="event-details">
                        <div class="event-message text-base font-bold">
                          {{ detail.message }}
                        </div>
                        <div class="event-location">
                          {{ formatLocation(detail.tracking_location) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading shipment...</div>
  </div>
</template>

<style scoped>
table,
th,
td {
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
  vertical-align: top;
}
tr td:first-child {
  @apply font-bold;
}
.tracking-container {
  @apply dark:bg-midnight-500 bg-slate-100 rounded-lg xl:p-8 xl:py-6 p-6 py-4;
}
.tracking-event {
  @apply py-2;
}

.event-time {
  font-size: 0.9em;
  @apply text-slate-700 dark:text-slate-400;
}

.event-details {
  margin-top: 5px;
}

.event-status {
  font-weight: bold;
}

.event-message {
  margin-top: 5px;
}

.event-location {
  font-size: 0.9em;
  @apply text-slate-700 dark:text-slate-400;
}
</style>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import swalMixins from "~/mixins/swalMixins";
import { snakeCaseToTitleCase } from "~/utils/capitalize";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
const { Toast } = swalMixins.data();
const user = useStrapiUser();
const token = useStrapiToken();
const userData = ref(null);
const route = useRoute();
const { findOne, update } = useStrapi();
const shipment = ref([null]);

const {
  public: { strapiURL },
} = useRuntimeConfig();

// Function to format date/time
const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const zonedDate = utcToZonedTime(
    dateString,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return format(zonedDate, "MMM dd, yyyy 'at' h:mm a");
};

function formatLocation(location) {
  // Create an array with city, state, and country
  const locationParts = [location.city, location.state, location.country];

  // Filter out null values and join the remaining parts with a comma
  return locationParts
    .filter((part) => part !== null && part !== "")
    .join(", ");
}

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

const fetchShipment = async () => {
  try {
    const shipmentData = await findOne("shipments", route.params.id);
    shipment.value = shipmentData.data;
  } catch (error) {
    console.error(error);
  }
};

function addSpacesToServiceName(serviceName) {
  if (!serviceName) {
    return ""; // Return an empty string or any default value if serviceName is undefined or null
  }
  // Insert a space before an uppercase letter if it is followed by a lowercase letter,
  // or if it is preceded by a lowercase letter
  return serviceName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([a-z])/g, " $1$2")
    .trim();
}

function calculateDeliveryDate(deliveryDays) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + deliveryDays);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return currentDate.toLocaleDateString("en-US", options);
}

const shippingLabel = ref([]);
const loading = ref(false);

const createShippingLabel = async () => {
  try {
    loading.value = true;
    const response = await fetch(
      `${strapiURL}/api/create-shipment/${shipment.value.easyPostId}/buy-label`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          rateId: shipment.value.shippingOption,
        }),
      }
    );
    if (!response.ok) {
      console.error("Error: ", response);
    }
    shippingLabel.value = await response.json();

    const updateShipment = await update("shipments", route.params.id, {
      status: "Label Purchased",
    });

    await fetchShipment();
    await fetchShipmentDetails();
    loading.value = false;
  } catch (error) {
    console.error("Failed to create shipping label:", error);
  }
};

const shipmentDetails = ref([]);

const fetchShipmentDetails = async () => {
  try {
    const response = await fetch(
      `${strapiURL}/api/retrieve-shipment/${shipment.value.easyPostId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Error: ", response);
    }
    shipmentDetails.value = await response.json();
  } catch (error) {
    console.error("Failed to create shipping label:", error);
  }
};

const pageLoading = ref(true);

onMounted(async () => {
  pageLoading.value = true;
  await fetchShipment();
  await fetchShipmentDetails();
  pageLoading.value = false;
});
</script>
