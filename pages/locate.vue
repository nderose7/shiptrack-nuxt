<template>
  <div class="mt-5 w-full pr-10">
    <div
      class="w-full border-b dark:border-midnight-100 pb-1 mb-5 flex justify-between items-end"
    >
      <div class="flex items-end gap-5">
        <h1 class="text-2xl">Locate</h1>
      </div>
      <span class="font-medium text-lg"
        ><Icon name="bx:building" class="icon-style" /> <CompanyName
      /></span>
    </div>
    <div class="flex justify-between text-lg mb-4">
      <div class="font-bold">Total: 1</div>
      <div class="text-right"></div>
    </div>
    <div class="table-container max-w-full">
      <el-table :data="processedProducts" style="font-size: 16px" fit>
        <el-table-column
          v-for="key in tableHeaders"
          :key="key"
          :prop="key"
          :label="formatHeader(key)"
          :width="getColumnWidth(key)"
        >
          <template v-if="key === 'updatedAt'" #default="{ row }">
            {{ formatDateTime(row.updatedAt) }}
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
</style>

<script setup>
import "element-plus/theme-chalk/dark/css-vars.css";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";
import { truncateString } from "~/utils/truncateString.js";
const user = useStrapiUser();
const { find } = useStrapi();

const rawData = ref([]);
const processedProducts = ref([]);
const tableHeaders = ref([]);

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
  middleware: ["auth"],
});
</script>
