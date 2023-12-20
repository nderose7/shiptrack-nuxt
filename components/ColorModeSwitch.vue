<template>
  <ClientOnly>
    <span class="inline-block relative top-[-2px]">
      <span
        class="cursor-pointer hover:text-purple-500"
        :class="$colorMode.value"
        v-if="colorMode.preference === 'light'"
        @click="cycleColorMode()"
      >
        <Icon name="bx:moon" size="1.5em" />
      </span>
      <span
        class="cursor-pointer hover:text-yellow-400"
        :class="$colorMode.value"
        v-if="colorMode.preference === 'dark'"
        @click="cycleColorMode()"
      >
        <Icon name="bx:sun" size="1.5em" />
      </span>
      <span
        class="cursor-pointer"
        :class="$colorMode.value"
        v-if="colorMode.preference === 'system'"
        @click="cycleColorMode()"
      >
        <Icon name="bx:laptop" size="1.5em" />
      </span>
    </span>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();

const colorModeValue = ref(colorMode.value);

const cycleColorMode = () => {
  if (colorMode.preference === "light") {
    colorMode.preference = "dark";
  } else if (colorMode.preference === "dark") {
    colorMode.preference = "system";
  } else if (colorMode.preference === "system") {
    colorMode.preference = "light";
  }
};

watch(
  () => colorMode.preference,
  (newPreference) => {
    // Update colorModeValue based on new preference
    colorModeValue.value =
      newPreference === "light"
        ? "light"
        : newPreference === "dark"
        ? "dark"
        : colorMode.value;
  }
);
</script>
