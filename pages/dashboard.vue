<template>
  <div class="w-full lg:px-10 px-5 pb-32">
    <div
      class="w-full mb-0 lg:flex justify-between items-end sticky top-0 pt-5 pb-5"
    >
      <div
        class="border-b w-full dark:border-midnight-500 pb-1 flex gap-5 text-center items-center justify-between"
      >
        <button class="lg:hidden" @click="toggleSidebar">
          <Icon name="majesticons:menu-alt-line" size="1.5rem" />
        </button>
        <h1 class="text-2xl">Dashboard</h1>
        <div><Icon name="majesticons:search-line" size="1.5rem" /></div>
      </div>
    </div>
    <div class="flex justify-between text-lg mb-4 items-center w-full">
      <div class="text-right w-full">
        <div class="mb-4 text-center">
          <NuxtLink to="/shipments/new-shipment" class="btn-white block w-full"
            >New Shipment</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sidebarVisible } from "@/composables/state.js";
const user = useStrapiUser();
const token = useStrapiToken();
const userdata = ref(null);
const company = ref(null);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;

  if (sidebarVisible.value) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};

const fetchUserWithRelations = async () => {
  try {
    const response = await fetch(`${strapiURL}/api/users/me?populate=company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    userdata.value = await response.json();
    company.value = userdata.value.company;
  } catch (error) {
    console.error("Failed to fetch user with relations:", error);
  }
};

onMounted(() => {
  fetchUserWithRelations();
});

definePageMeta({
  layout: "loggedin",
  middleware: ["auth"],
});
</script>
