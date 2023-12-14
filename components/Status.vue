<template>
  <div
    class="z-10 inline-block rounded-lg bg-slate-100 px-1 pr-2 dark:bg-midnight-200"
  >
    <Icon
      :class="newIconColor"
      class="icon-style ml-1 mr-1 w-[12px] h-[12px]"
      name="fluent-mdl2:status-circle-inner"
      size="0.85rem"
    />
    <span class="relative font-bold text-slate-600 dark:text-slate-300">
      <slot name="statusValue" />
    </span>
  </div>
</template>

<script setup>
// Define our props
const props = defineProps({
  statusValue: {
    type: String,
    default: "",
  },
});

// Define our emit
const emit = defineEmits(["iconColor"]);

// Define our variable for the icon color using "let" because it's changing
let newIconColor = ref("");

async function changeStatus() {
  if (props.statusValue == "Active") {
    newIconColor.value = "text-green-500";
    newIconColor = newIconColor.value;
  }
  if (props.statusValue == "Active (Paused)") {
    newIconColor.value = "text-green-500";
    newIconColor = newIconColor.value;
  }
  if (props.statusValue == "Active (Not Renewing)") {
    newIconColor.value = "text-green-500";
    newIconColor = newIconColor.value;
  }
  if (props.statusValue == "Inactive") {
    newIconColor.value = "text-red-600";
    newIconColor = newIconColor.value;
  }

  emit("iconColor", newIconColor);
}
changeStatus();
</script>
