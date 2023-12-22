<template>
  <div>
    <Form @submit="onSubmit()" class="form-control text-left">
      <div class="flex gap-4">
        <div class="w-full">
          <label for="firstName">First Name</label>
          <Field
            name="firstName"
            id="firstName"
            type="text"
            v-model="firstName"
          />
        </div>

        <div class="w-full">
          <label for="lastName">Last Name</label>
          <Field name="lastName" id="lastName" type="text" v-model="lastName" />
        </div>
      </div>

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
        <label for="companyPhone">Company Phone</label>
        <Field
          name="companyPhone"
          id="companyPhone"
          type="text"
          v-model="companyPhone"
        />
      </div>

      <div>
        <label for="companyAddress">Company Address</label>
        <AddressAutocomplete v-model="companyAddress" />
      </div>

      <div>
        <label for="companyPhone">Company Website</label>
        <Field
          name="companyWebsite"
          id="companyWebsite"
          type="text"
          v-model="companyWebsite"
        />
      </div>

      <div>
        <label for="jobTitle">Job Title</label>
        <Field name="jobTitle" id="jobTitle" type="text" v-model="jobTitle" />
      </div>

      <div class="text-center mt-6">
        <button type="submit" class="btn-primary inline-block">
          <span v-if="loading"
            ><Icon name="svg-spinners:pulse-3" class="icon-style" />
            Saving...
          </span>
          <span class="v-else"> Save Details </span>
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
label {
  @apply text-lg mt-5;
}
</style>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import swalMixins from "~/mixins/swalMixins";
const { Toast } = swalMixins.data();

const user = useStrapiUser();

const firstName = ref("");
const lastName = ref("");
const companyName = ref("");
const companyPhone = ref("");
const jobTitle = ref("");
const token = useStrapiToken();
const loading = ref(false);
const companyAddress = ref(null);
const { create } = useStrapi();
const companyWebsite = ref("");

const {
  public: { strapiURL },
} = useRuntimeConfig();

const onSubmit = async () => {
  try {
    loading.value = true;
    const createCompany = await create("companies", {
      users: {
        connect: [user.value?.id],
      },
      admins: {
        connect: [user.value?.id],
      },
      // Company Address
      name: companyName.value,
      phone: companyPhone.value,
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
    });

    const updateUserDefaultOrigin = await fetch(`${strapiURL}/api/user/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        jobTitle: jobTitle.value,
        //email: userEmail.value,
        //username: username.value,
        defaultOriginAddress: companyAddress.value.formattedAddress,
        street1: companyAddress.value.streetNumber,
        //street2: companyAddress.value.streetNumber,
        route: companyAddress.value.route,
        city: companyAddress.value.city,
        state: companyAddress.value.state,
        postalCode: companyAddress.value.postalCode,
        subPostalCode: companyAddress.value.subPostalCode,
        country: companyAddress.value.country,
        county: companyAddress.value.county,
        website: companyAddress.value,
        subpremise: companyAddress.value.subpremise,
      }),
    });
    // Step 2: Complete the registration by creating a Stripe customer
    const response = await fetch(`${strapiURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        email: user.value?.email,
        userId: user.value?.id,
        name: firstName.value + " " + lastName.value,
        jobTitle: jobTitle.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
    });
    navigateTo("/settings/carriers");
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
};
</script>
