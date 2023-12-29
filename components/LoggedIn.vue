<template>
  <div id="LoggedIn" class="md:flex h-full min-h-screen overflow-x-hidden">
    <Sidebar
      class="sidebar"
      :isVisible="sidebarVisible"
      :class="{ visible: sidebarVisible }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    />
    <div class="content" :class="{ 'content-expanded': sidebarVisible }">
      <div class="swipearea z-50" @click="sidebarVisible = false"></div>
      <NuxtPage class="z-10" />
    </div>
  </div>
</template>

<script setup>
import { sidebarVisible } from "@/composables/state.js";

const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0].screenX;
};

const handleTouchMove = (event) => {
  touchEndX.value = event.changedTouches[0].screenX;
};

const handleTouchEnd = () => {
  if (touchStartX.value < 50 && touchEndX.value > 150) {
    // Swipe Right - Open Sidebar
    sidebarVisible.value = true;
  } else if (touchEndX.value < touchStartX.value && sidebarVisible.value) {
    // Swipe Left - Close Sidebar
    sidebarVisible.value = false;
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  transform: translateX(-100%);
  top: 0;
  height: 100%;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.sidebar.visible {
  transform: translateX(0);
}

.content {
  transition: margin-left 0.3s ease;
  width: 100%;
}

.content-expanded {
  margin-left: 85%; /* Shift content to the right */
}

/* Mobile styles - hide sidebar initially */
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%); /* Initially offscreen */
  }

  .sidebar.visible {
    transform: translateX(0); /* Slide in */
  }
}

/* Desktop styles - always show sidebar */
@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0); /* Always onscreen */
  }
  .content {
    margin-left: 320px; /* Shift content to the right */
  }
}

.swipearea {
  @apply absolute top-[56px] min-h-screen w-[50px];
}
</style>
