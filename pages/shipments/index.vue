<template>
  <div class="w-full lg:px-10 px-5 pb-32 h-full">
    <div
      class="w-full mb-5 lg:flex justify-between items-end sticky top-0 pt-5 pb-5 dark:bg-midnight-200 z-50 bg-slate-100"
    >
      <div
        class="border-b w-full dark:border-midnight-100 pb-1 flex gap-5 text-center items-center justify-between"
      >
        <button class="lg:hidden" @click="toggleSidebar">
          <Icon name="majesticons:menu-alt-line" size="1.5rem" />
        </button>
        <h1 class="text-2xl">Shipments</h1>
        <div><Icon name="majesticons:search-line" size="1.5rem" /></div>
      </div>
    </div>
    <div class="flex justify-between text-lg mb-4 items-center">
      <div class="font-bold">Total: {{ totalShipments }}</div>
      <div class="text-right">
        <NuxtLink
          to="/shipments/new-shipment"
          class="btn-primary inline-block px-4 py-1"
          >New Shipment</NuxtLink
        >
      </div>
    </div>

    <div class="">
      <div
        v-for="shipment in processedShipments"
        class="dark:bg-midnight-500 bg-white drop-shadow my-5 p-5 rounded-lg"
      >
        <NuxtLink :to="`/shipments/${shipment.id}`" class="link">
          <div class="text-2xl font-bold">
            {{ shipment.product.name }}
          </div>
        </NuxtLink>
        <div class="mb-4 mt-2 font-bold">
          {{ shipment?.carrierName }} {{ shipment?.carrierService }}
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

          <div class="mt-4 hidden">
            <div class="text-base font-bold text-slate-500 mb-1">COST</div>
            <b>Rate: </b> ${{ shipment?.cost }}
          </div>
          <NuxtLink
            :to="`/shipments/${shipment.id}`"
            class="btn-primary inline-block px-5 py-2 text-xl mt-5"
          >
            <div class="">Track</div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="table-container max-w-full hidden">
      <el-table :data="processedShipments" style="font-size: 16px" fit>
        <el-table-column
          v-for="key in tableHeaders"
          :key="key"
          :prop="key"
          :label="formatHeader(key)"
        >
          <template v-if="key === 'updatedAt'" #default="{ row }">
            {{ formatDateTime(row.updatedAt) }}
          </template>
          <template v-if="key === 'id'" #default="{ row }">
            <NuxtLink :to="`/shipments/${row.id}`"> {{ row.id }}</NuxtLink>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="120">
          <template #default="{ row }">
            <Icon name="bx:cog" class="icon-style" />
          </template>
        </el-table-column>
      </el-table>
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
.no-scroll {
  width: 100%;
  position: fixed;
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
const processedShipments = ref([]);
const tableHeaders = ref([]);

const totalShipments = ref();

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;

  if (sidebarVisible.value) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
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
    processedShipments.value = rawData.value.map((item) => item);

    // Dynamically create table headers, exclude certain fields
    if (processedShipments.value.length > 0) {
      tableHeaders.value = Object.keys(processedShipments.value[0]).filter(
        (key) =>
          ![
            "createdAt",
            "publishedAt",
            "toCity",
            "toCountry",
            "toState",
            "toPhone",
            "toStreet1",
            "toZip",
            "fromCity",
            "fromCountry",
            "fromState",
            "fromPhone",
            "fromStreet1",
            "fromZip",
            "length",
            "width",
            "height",
            "weight",
            "toEmail",
            "fromEmail",
            "updatedAt",
            "company",
            "easyPostId",
            "labelLink",
            "sentBy",
            "shippingOption",
          ].includes(key)
      );
    }

    totalShipments.value = processedShipments.value.length;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

definePageMeta({
  layout: "loggedin",
});
</script>
