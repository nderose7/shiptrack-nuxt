<template>
  <div class="mt-5 w-full px-10">
    <div
      class="w-full border-b dark:border-midnight-100 pb-1 mb-5 flex justify-between items-end"
    >
      <div class="flex items-end gap-5">
        <h1 class="text-2xl">Dashboard</h1>
      </div>
      <span class="font-medium text-lg"
        ><Icon name="bx:building" class="icon-style" /> <CompanyName
      /></span>
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
