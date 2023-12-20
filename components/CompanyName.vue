<template>
  <span class="text-base">{{ company?.name }}</span>
</template>

<script setup>
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

onBeforeMount(() => {
  fetchUserWithRelations();
});
</script>
