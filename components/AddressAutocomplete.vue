<template>
  <div>
    <input
      id="address-input"
      type="text"
      v-model="address"
      @input="fetchAddressSuggestions"
      placeholder="Enter address"
      class="address-input text-lg"
    />
    <ul v-if="suggestions.length" class="px-3 text-lg overflow-x-scroll">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.place_id"
        @click="selectAddress(suggestion)"
        class="cursor-pointer hover:text-blue-500"
      >
        {{ suggestion.description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const suggestions = ref([]);
const token = useStrapiToken();

const {
  public: { strapiURL },
} = useRuntimeConfig();

const fetchAddressSuggestions = async () => {
  if (address.value.length > 3) {
    try {
      const response = await fetch(
        `${strapiURL}/api/address-autocomplete?input=${address.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      const data = await response.json();
      suggestions.value = data;
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  } else {
    suggestions.value = [];
  }
};

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: "", // You can set a default value if needed
  },
});

const emit = defineEmits(["update:modelValue"]);

const address = ref(props.modelValue);

const parseAddressComponents = (addressComponents, formattedAddress) => {
  const parsedAddress = {
    formattedAddress: formattedAddress,
    streetNumber: "",
    route: "",
    subpremise: "",
    city: "",
    county: "",
    state: "",
    country: "",
    postalCode: "",
    subPostalCode: "",
  };

  addressComponents.forEach((component) => {
    if (component.types.includes("subpremise")) {
      parsedAddress.subpremise = component.long_name;
    } else if (component.types.includes("street_number")) {
      parsedAddress.streetNumber = component.long_name;
    } else if (component.types.includes("route")) {
      parsedAddress.route = component.long_name;
    } else if (component.types.includes("locality")) {
      parsedAddress.city = component.long_name;
    } else if (component.types.includes("administrative_area_level_2")) {
      parsedAddress.county = component.long_name;
    } else if (component.types.includes("administrative_area_level_1")) {
      parsedAddress.state = component.short_name;
    } else if (component.types.includes("country")) {
      parsedAddress.country = component.short_name;
    } else if (component.types.includes("postal_code")) {
      parsedAddress.postalCode = component.long_name;
    } else if (component.types.includes("postal_code_suffix")) {
      parsedAddress.subPostalCode = component.long_name;
    }
  });

  return parsedAddress;
};

const selectAddress = async (suggestion) => {
  try {
    const response = await fetch(
      `${strapiURL}/api/address-details?place_id=${suggestion.place_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    const data = await response.json();
    console.log("Data: ", data);
    const detailedAddress = parseAddressComponents(
      data.address_components,
      data.formatted_address
    );
    console.log("Detailed address: ", detailedAddress);
    // Use detailedAddress for your requirements
    //address.value = detailedAddress;
    address.value = data.formatted_address;
    suggestions.value = [];

    // Emit an event with the selected address
    emit("update:modelValue", detailedAddress);
  } catch (error) {
    console.error("Error fetching detailed address:", error);
  }
};

// Emit initial value
emit("update:modelValue", address.value);

// Update the local address when the prop changes
/*
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== address.value) {
      address.value = newValue;
    }
  }
);
*/
</script>
