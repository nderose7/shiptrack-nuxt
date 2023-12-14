<template>
  <div class="lg:flex justify-between">
    <ul class="main-nav lg:flex gap-10">
      <NuxtLink to="/" class="font-bold text-3xl lg:mr-10 inline-block py-4">
        <Logo />
      </NuxtLink>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
    </ul>
    <ul v-if="!user" class="lg:flex gap-2 mt-3">
      <li>
        <NuxtLink to="/login" class="btn-primary inline-block">Login</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/get-started" class="btn-primary inline-block"
          >Get Started <Icon name="mdi:arrow-right" class="icon-style"
        /></NuxtLink>
      </li>
    </ul>
    <ul v-else class="lg:flex gap-2 mt-3">
      <li>
        <NuxtLink to="/dashboard" class="btn-primary inline-block"
          >Dashboard <Icon name="mdi:arrow-right" class="icon-style"
        /></NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const user = useStrapiUser();
const token = useStrapiToken();
const userdata = ref(null);

const fetchUserWithRelations = async () => {
  try {
    // Replace ':id' with the actual user ID and specify the relations you want to populate
    const response = await fetch(
      `http://localhost:1337/api/users/me?populate=company`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`, // Make sure to use the correct auth token
        },
      }
    );

    userdata.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch user with relations:", error);
  }
};

onMounted(() => {
  fetchUserWithRelations();
});
</script>

<style scoped>
.main-nav li a {
  @apply text-lg font-semibold lg:mt-2 py-2 inline-block border-b-2 border-transparent;
}
.main-nav li a.router-link-active {
  @apply text-blue-500 border-blue-500 border-b-2;
}
</style>
