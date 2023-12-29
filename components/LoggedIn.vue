<template>
  <div
    id="LoggedIn"
    class="md:flex h-full min-h-screen"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <Sidebar
      class="sidebar"
      :isVisible="sidebarVisible"
      :class="{ visible: sidebarVisible }"
    />
    <div class="content" :class="{ 'content-expanded': sidebarVisible }">
      <NuxtPage
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        class="min-h-screen"
      />
    </div>
  </div>
</template>

<script setup>
import { sidebarVisible } from "@/composables/state.js";

const touchStartX = ref(0);
const touchEndX = ref(0);
const touchStartTime = ref(0);

const handleTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0].screenX;
  touchStartTime.value = new Date().getTime();
};

const handleTouchMove = (event) => {
  touchEndX.value = event.changedTouches[0].screenX;
};

const handleTouchEnd = () => {
  const deltaX = touchEndX.value - touchStartX.value;
  const deltaTime = new Date().getTime() - touchStartTime.value;

  // Adjust these thresholds as needed
  const swipeThreshold = 100; // Min distance for a swipe gesture
  const timeThreshold = 400; // Max time for a swipe gesture

  if (
    deltaX > swipeThreshold &&
    deltaTime < timeThreshold &&
    touchStartX.value < 50
  ) {
    // Swipe Right - Open Sidebar
    sidebarVisible.value = true;
  } else if (
    deltaX < -swipeThreshold &&
    deltaTime < timeThreshold &&
    sidebarVisible.value
  ) {
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

/* Style for the area that detects swipe gestures */
.swipe-area {
  position: relative;
  left: 0;
  width: 50px; /* Width of the swipe-sensitive area */
  height: 100vh;
}
</style>
