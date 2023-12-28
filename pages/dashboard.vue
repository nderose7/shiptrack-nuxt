<template>
  <div class="w-full lg:px-10 px-5 pb-32">
    <div
      class="w-full mb-5 lg:flex justify-between items-end sticky top-0 pt-5 pb-5 dark:bg-midnight-200"
    >
      <div
        class="border-b w-full dark:border-midnight-100 pb-1 flex gap-5 text-center items-center justify-between"
      >
        <button class="lg:hidden" @click="toggleSidebar">
          <Icon name="majesticons:menu-alt-line" size="1.5rem" />
        </button>
        <h1 class="text-2xl">Dashboard</h1>
        <div><Icon name="majesticons:search-line" size="1.5rem" /></div>
      </div>
    </div>
    <div class="flex justify-between text-lg mb-4 items-center">
      <div class="text-right">
        <NuxtLink
          to="/shipments/new-shipment"
          class="btn-primary inline-block px-4 py-1"
          >New Shipment</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useStrapiUser();
const token = useStrapiToken();
const userdata = ref(null);
const company = ref(null);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
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
});
</script>
