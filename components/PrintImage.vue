<template>
  <div class="print-container">
    <!-- Hidden image -->
    <img :src="imageUrl" alt="Image to print" class="hidden-image" />

    <!-- Print button -->
    <button type="button" class="btn-white" @click="printImage">
      Print Label
    </button>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: String,
});

const printImage = () => {
  window.print();
};
</script>

<style>
.hidden-image {
  display: none;
}

@media print {
  /* Hide all content except for the print container */
  .tracking-container,
  .review-shipment-header {
    display: none !important;
  }

  /* Specifically show the print container and the image */
  .print-container,
  .print-container .hidden-image {
    display: block !important;
    position: absolute;
    left: 0;
    top: 0;
  }

  /* Adjust the image size to fit on one page */
  .hidden-image {
    max-width: 100%;
    min-width: 500px;
  }
}
</style>
