<template>
  <button
    @click="deleteAccount"
    :disabled="isDeleting"
    class="btn-danger rounded-full block md:inline-block w-full"
  >
    {{ isDeleting ? "Deleting..." : "Delete My Account" }}
  </button>
</template>

<script setup>
const isDeleting = ref(false);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const { logout } = useStrapiAuth();
const token = useStrapiToken();
const router = useRouter();

const deleteAccount = async () => {
  isDeleting.value = true;

  try {
    const response = await fetch(`${strapiURL}/api/delete-my-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    console.log(response);
    if (response.error) {
      console.error(response.error);
      alert("Failed to delete account."); // Replace with more user-friendly error handling if desired
    } else {
      alert("Your account has been deleted successfully."); // Replace with desired success handling
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred.");
  } finally {
    isDeleting.value = false;
    logout();
    router.push("/");
  }
};
</script>

<style scoped>
/* Add any styling for the button here */
</style>
