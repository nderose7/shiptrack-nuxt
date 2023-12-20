<template>
  <div v-if="loading" class="px-5">
    <Icon name="svg-spinners:bars-scale" size="3rem" class="mt-2" />
  </div>
  <div v-else-if="dataLoaded" class="w-full px-5">
    <div v-if="stripeUserData?.subscriptions?.length > 0" class="w-full">
      <div
        v-for="subscription in stripeUserData.subscriptions"
        class="billing-tile"
      >
        <div class="lg:flex">
          <div class="w-full">
            <h2 class="mb-1 text-2xl font-bold lg:text-3xl">
              {{ subscription.title }}
            </h2>
            <ul class="my-1">
              <li>{{ subscription.description }}</li>
            </ul>
            <span class="mt-1 inline-block text-xl"
              >{{ subscription.currency == "usd" ? "$" : "" }}
              {{ subscription.price }}
              <span class="uppercase">{{ subscription.currency }}</span> / month
              {{
                subscription.pause_collection !== null ? "(Billing Paused)" : ""
              }}</span
            >
          </div>

          <div class="lg:w-1/3 lg:text-right mt-3 lg:mt-0">
            <Status
              v-if="
                subscription.active &&
                !subscription.canceled &&
                subscription.pause_collection !== null
              "
              status-value="Active"
              class="inline-block rounded-lg dark:bg-midnight-300 px-2 py-1"
            >
              <template v-slot:statusValue
                ><span>Active (Paused)</span></template
              >
            </Status>
            <Status
              v-if="
                subscription.active &&
                !subscription.canceled &&
                subscription.pause_collection == null
              "
              status-value="Active"
              class="inline-block rounded-lg dark:bg-midnight-300 px-2 py-1"
            >
              <template v-slot:statusValue><span>Active</span></template>
            </Status>
            <Status
              v-if="subscription.active && subscription.canceled"
              status-value="Active"
              class="inline-block rounded-lg dark:bg-midnight-300 px-2 py-1"
            >
              <template v-slot:statusValue
                ><span>Active (Not Renewing)</span></template
              >
            </Status>
            <Status
              v-if="!subscription.active"
              status-value="Inactive"
              class="inline-block rounded-lg dark:bg-midnight-300px-2 py-1"
            >
              <template v-slot:statusValue><span>Inactive</span></template>
            </Status>
          </div>
        </div>
        <div class="lg:flex lg:justify-between lg:items-end">
          <div class="w-full">
            <p
              v-if="
                !subscription.canceled && subscription.pause_collection == null
              "
              class="mt-6 mb-0"
            >
              <b><Icon name="bx:time" class="icon-style" /> Next Payment:</b>
              {{ subscription.nextPaymentDate }}
            </p>
            <p
              v-if="
                subscription.canceled || subscription.pause_collection !== null
              "
              class="mt-6 mb-0"
            >
              <b><Icon name="bx:time" class="icon-style" /> Active Until:</b>
              {{
                subscription.becomesInactiveOn || subscription.nextPaymentDate
              }}
            </p>
          </div>
          <div class="lg:w-2/3 w-full lg:text-right mt-5 lg:mt-0">
            <div class="flex gap-2 lg:justify-end">
              <button
                v-if="
                  !subscription.canceled &&
                  subscription.pause_collection == null
                "
                type="button"
                @click="pauseSubscription(subscription.subscriptionId)"
                class="block p-2 dark:bg-midnight-800 bg-slate-100 link rounded-lg border dark:border-midnight-100 mb-2 lg:mb-0 w-full"
              >
                <Icon name="mdi:pause" class="icon-style" /> Pause
              </button>
              <button
                v-if="
                  !subscription.canceled &&
                  subscription.pause_collection !== null
                "
                type="button"
                @click="resumeSubscription(subscription.subscriptionId)"
                class="block p-2 dark:bg-midnight-800 bg-slate-100 rounded-lg link border dark:border-midnight-100 mb-2 lg:mb-0 w-full"
              >
                <Icon
                  name="material-symbols:resume"
                  class="icon-style top-[-1px]"
                />
                Resume
              </button>

              <button
                v-if="!subscription.canceled"
                type="button"
                @click="openCancelModal(subscription.subscriptionId)"
                class="block p-2 dark:bg-midnight-800 bg-slate-100 rounded-lg link border dark:border-midnight-100 mb-2 lg:mb-0 w-full"
              >
                <Icon name="mdi:cancel" class="icon-style" /> Cancel
              </button>
            </div>
            <NuxtLink
              v-if="subscription.canceled"
              type="button"
              to="/membership"
              class="btn-primary inline-block px-3 py-2 font-semibold"
            >
              <Icon name="bx:redo" class="icon-style" /> Renew Membership
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="md:flex gap-4 mt-5">
        <div v-if="user && !user.freeAccount" class="">
          <NuxtLink
            to="/membership/change"
            class="btn-primary block md:inline-block text-lg px-5 py-3 font-bold text-center w-full mb-4 md:mb-0"
            >Upgrade / Downgrade</NuxtLink
          >
        </div>
        <div>
          <button
            @click="redirectToCustomerPortal()"
            class="btn-primary block md:inline-block px-5 py-3 font-bold text-center w-full"
          >
            Open Billing Portal
          </button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="tile-no-hover p-5 w-full bg-slate-100 dark:bg-midnight-900 rounded-lg"
    >
      <h3>Looks like you don't have any active subscriptions!</h3>
      <NuxtLink
        to="/membership"
        class="btn-primary inline-block mt-5 py-2 px-4 font-bold"
      >
        Purchase Subscription
      </NuxtLink>
    </div>
  </div>
  <div v-else>
    Something went wrong. Please refresh this page or contact customer service.
  </div>
  <div v-if="showModal" class="modal w-full">
    <div class="modal-content relative w-full">
      <button
        type="button"
        @click="showModal = false"
        class="close absolute right-3 top-2 dark:hover:text-slate-300"
      >
        <Icon name="bx:x" size="2.5rem" />
      </button>
      <div class="text-center w-full">
        <Icon name="jam:triangle-danger" size="4rem" class="text-red-600" />
        <h2 class="text-3xl mt-10 mb-5">
          Are you sure you want to cancel your subscription?
        </h2>
        <p>
          You will still have access to your subscription until your next
          scheduled payment date. Remember, you can always pause your
          subscription instead and easily resume anytime.
        </p>
        <div class="flex gap-4 justify-center mt-10">
          <button
            @click="cancelSubscription(subscriptionToCancel)"
            class="btn-danger"
          >
            <Icon name="jam:triangle-danger" class="icon-style" />
            Cancel My Subscription
          </button>
          <button @click="showModal = false" class="btn-white text-base">
            Keep My Subscription
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.billing-tile {
  @apply rounded-lg dark:bg-midnight-900 bg-white p-5 mb-4 dark:border-midnight-100 border;
}
h2 {
  @apply dark:text-blue-200;
}
h3 {
  @apply text-lg;
}
</style>

<script setup>
import { loadStripe } from "@stripe/stripe-js";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();
const { find, findOne, create, update, delete: remove } = useStrapi();

const {
  public: { strapiURL, stripeKey },
} = useRuntimeConfig();

const userData = ref(null);
const stripeUserData = ref("");
let stripeData = ref(null);
const dataLoaded = ref(false);
const loading = ref(true);

const user = useStrapiUser();

const stripe = ref(null);

const initializeStripe = async () => {
  stripe.value = await loadStripe(stripeKey);
};

const fetchUserData = async () => {
  try {
    loading.value = true;
    userData.value = await findOne("userdatas");
    await initializeStripe();
    await fetchStripeData();
  } catch (error) {
    console.error("Error fetching user data:", error);
  } finally {
    loading.value = false;
    dataLoaded.value = true;
  }
};

const fetchStripeData = async () => {
  try {
    if (!user.value?.stripeCustomerId) {
      throw new Error("Stripe Customer ID not found");
    }

    const token = useStrapiToken();

    const response = await fetch(`${strapiURL}/api/get-stripe-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        stripeCustomerId: user.value?.stripeCustomerId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    stripeData = await response.json();

    stripeUserData.value = stripeData;

    console.log(stripeData);
  } catch (error) {
    console.error("Error fetching Stripe data:", error);
  }
};

onMounted(() => {
  fetchUserData();
});

const cancelSubscription = async (subscriptionId) => {
  try {
    const token = useStrapiToken();

    const response = await fetch(`${strapiURL}/api/cancel-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    showModal.value = false;

    fetchUserData();

    Toast.fire({
      icon: "success",
      title: "Subscription Canceled",
    });

    console.log("Subscription canceled:", data.canceledSubscription);
  } catch (error) {
    console.error("Error canceling subscription:", error);
    Toast.fire({
      icon: "error",
      title: "Error canceling, please contact support.",
    });
  }
};

const renewSubscription = async (priceId) => {
  try {
    const token = useStrapiToken();
    const response = await fetch(`${strapiURL}/api/renew-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        priceId: priceId,
        customerId: user.value?.stripeCustomerId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const { sessionId } = await response.json(); // Destructure the session ID from the response data

    await initializeStripe();

    // Redirect the user to the Stripe Checkout page
    stripe.value.redirectToCheckout({ sessionId }).then((result) => {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer.
      if (result.error) {
        alert(result.error.message);
      }
    });
  } catch (error) {
    console.error("Error renewing subscription:", error);
    Toast.fire({
      icon: "error",
      title: "Error renewing, please contact support.",
    });
  }
};

const pauseSubscription = async (subscriptionId) => {
  try {
    const token = useStrapiToken();

    const response = await fetch(`${strapiURL}/api/pause-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    Toast.fire({
      icon: "success",
      title: "Subscription paused",
    });

    fetchUserData();

    console.log("Subscription paused:", data);
  } catch (error) {
    console.error("Error pausing subscription:", error);
    Toast.fire({
      icon: "error",
      title: "Error pausing, please contact support.",
    });
  }
};

const resumeSubscription = async (subscriptionId) => {
  try {
    const token = useStrapiToken();

    const response = await fetch(`${strapiURL}/api/resume-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    Toast.fire({
      icon: "success",
      title: "Subscription resumed",
    });

    fetchUserData();

    console.log("Subscription resumed:", data);
  } catch (error) {
    console.error("Error resuming subscription:", error);
    Toast.fire({
      icon: "error",
      title: "Error resuming, please contact support.",
    });
  }
};

const showModal = ref(false);
const subscriptionToCancel = ref(null);
const openCancelModal = (subscriptionId) => {
  subscriptionToCancel.value = subscriptionId;
  showModal.value = true;
};

const redirectToCustomerPortal = async () => {
  try {
    const token = useStrapiToken();

    const response = await fetch(
      `${strapiURL}/api/create-customer-portal-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to create customer portal session: " + response.statusText
      );
    }

    const { url } = await response.json();
    window.location.href = url; // Redirect the user to the Customer Portal
  } catch (error) {
    console.error("Error redirecting to customer portal:", error);
    // Handle the error appropriately
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  @apply pt-60 w-full h-full  px-5;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-content {
  @apply dark:bg-midnight-900 bg-slate-100 p-20 rounded-lg dark:border-midnight-100 border lg:w-5/12 mx-auto;

  padding: 50px;
}
</style>
