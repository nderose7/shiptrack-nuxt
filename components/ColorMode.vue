<template>
  <ClientOnly>
    <select
      v-model="$colorMode.preference"
      class="dark:bg-midnight-900 bg-slate-200 rounded-lg p-2"
    >
      <option value="system">
        <Icon name="bx:laptop" size="1.5em" /> System
      </option>
      <option value="light"><Icon name="bx:sun" size="1.5em" /> Light</option>
      <option value="dark"><Icon name="bx:moon" size="1.5em" /> Dark</option>
    </select>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();

const colorModeValue = ref(colorMode.value);

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
