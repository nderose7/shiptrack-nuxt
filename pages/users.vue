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
        <h1 class="text-2xl">Users</h1>
        <div><Icon name="majesticons:search-line" size="1.5rem" /></div>
      </div>
    </div>
    <div class="flex justify-between text-lg mb-4 items-center">
      <div class="font-bold">Total: {{ totalAddresses }}</div>
      <div class="text-right">
        <button class="link font-bold">
          <Icon name="lucide:import" class="icon-style mr-1" /> Import CSV
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.table-container {
  overflow-x: auto;
  th .cell {
    @apply text-slate-800 dark:text-slate-200;
  }
}
</style>

<script setup>
import { sidebarVisible } from "@/composables/state.js";
import "element-plus/theme-chalk/dark/css-vars.css";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
import { truncateString } from "~/utils/truncateString.js";
const user = useStrapiUser();
const { find } = useStrapi();

const rawData = ref([]);
const processedProducts = ref([]);
const tableHeaders = ref([]);

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

//const { data: products } = await find("products");

// Function to format the header text
const formatHeader = (header) => {
  if (header === "updatedAt") {
    return "Updated At";
  }
  return header.charAt(0).toUpperCase() + header.slice(1);
};

// Function to format date/time
const formatDateTime = (dateString) => {
  const zonedDate = utcToZonedTime(
    dateString,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return format(zonedDate, "MMM dd, yyyy 'at' h:mm a");
};

const getColumnWidth = (key) => {
  const narrowColumns = ["length", "width", "height", "weight"];
  if (narrowColumns.includes(key)) {
    return 100; // Width in pixels for narrow columns
  }
  return null; // No width specified for other columns
};

onMounted(async () => {
  try {
    const response = await find("shipments");
    rawData.value = response.data;

    // Process data for the table
    processedProducts.value = rawData.value.map((item) => item.attributes);

    // Dynamically create table headers, exclude certain fields
    if (processedProducts.value.length > 0) {
      tableHeaders.value = Object.keys(processedProducts.value[0]).filter(
        (key) => !["createdAt", "publishedAt"].includes(key)
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

definePageMeta({
  layout: "loggedin",
});
</script>
