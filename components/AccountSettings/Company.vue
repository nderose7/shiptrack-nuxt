<template>
  <div>
    <Form class="form-control xl:w-1/2" @submit="onSubmit">
      <div>
        <label for="companyName">Company Name</label>
        <Field
          name="companyName"
          id="companyName"
          type="text"
          v-model="companyName"
        />
      </div>
      <div>
        <label for="companyName">Company Address</label>
        <AddressAutocomplete v-model="companyAddress" />
      </div>
      <div class="lg:flex gap-5">
        <div class="lg:w-5/12">
          <label for="companyPhone">Company Phone</label>
          <Field
            name="companyPhone"
            id="companyPhone"
            type="text"
            v-model="companyPhone"
          />
        </div>
        <div class="w-full">
          <label for="companyWebsite">Company Website</label>
          <Field
            name="companyWebsite"
            id="companyWebsite"
            type="text"
            v-model="companyWebsite"
            placeholder="www.mycompany.com"
          />
        </div>
      </div>
      <div class="mb-6">
        <button
          class="btn-primary my-12 py-4 block font-bold w-full text-xl max-w-[200px] mx-auto"
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.form-control {
  label {
    @apply text-lg mb-2 mt-6;
  }
  input {
    @apply text-lg;
  }
}
</style>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();
const user = useStrapiUser();
const { findOne, update, find } = useStrapi();

const token = useStrapiToken();
const userData = ref(null);
//const companyId = ref(null);

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

    userData.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch user with relations:", error);
  }
};

onMounted(() => {
  fetchUserWithRelations();
});

const companyId = computed(() => {
  if (userData.value?.company.id) {
    return userData.value.company.id;
  }
  return "";
});

const companyData = await find("companies", companyId.value, {
  populate: "users",
});

const companyDataValue = computed(() => {
  if (companyData.data[0]) {
    return companyData.data[0].attributes;
  }
  return "";
});

console.log(companyDataValue.value);

const companyName = ref(companyDataValue.value.name);
const companyAddress = ref(companyDataValue.value.address);
const companyPhone = ref(companyDataValue.value.phone);
const companyWebsite = ref(companyDataValue.value.website);

const onSubmit = async () => {
  try {
    await update("companies", companyId.value, {
      name: companyName.value,
      address: companyAddress.value.formattedAddress,
      street1: companyAddress.value.streetNumber,
      street2: companyAddress.value.streetNumber,
      route: companyAddress.value.route,
      city: companyAddress.value.city,
      state: companyAddress.value.state,
      postalCode: companyAddress.value.postalCode,
      subPostalCode: companyAddress.value.subPostalCode,
      country: companyAddress.value.country,
      county: companyAddress.value.county,
      website: companyWebsite.value,
      subpremise: companyAddress.value.subpremise,
      phone: companyPhone.value,
    });
    Toast.fire({
      icon: "success",
      title: "Company Saved",
    });
  } catch (e) {
    Toast.fire({
      icon: "error",
      title: "Error:" + e,
    });
  }
};
</script>
