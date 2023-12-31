<template>
  <div
    class="bg-white dark:bg-black lg:dark:bg-midnight-900 lg:bg-slate-200 h-full min-h-screen lg:sticky top-0 w-[330px] max-h-screen border-r dark:border-midnight-300"
  >
    <div class="px-7 py-5">
      <div class="text-2xl mb-5 flex gap-1 items-center">
        <CloudLogo class="max-w-[32px] inline-block mr-[2px]" /><Logo />
      </div>
      <ul class="lg:text-lg text-xl logged-in-nav">
        <li>
          <NuxtLink to="/dashboard" @click="closeSidebar"
            ><Icon name="bx:tachometer" class="icon-style mr-1" />
            Dashboard</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/shipments" @click="closeSidebar"
            ><Icon name="bx:send" class="icon-style mr-1" /> Shipments</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/products" @click="closeSidebar"
            ><Icon name="bx:package" class="icon-style mr-1" />
            Products</NuxtLink
          >
        </li>
        <li class="">
          <NuxtLink to="/addresses" @click="closeSidebar"
            ><Icon name="bx:map" class="icon-style mr-1" /> Addresses</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/users" @click="closeSidebar"
            ><Icon name="bx:group" class="icon-style mr-1" /> Users</NuxtLink
          >
        </li>

        <li>
          <NuxtLink to="/settings" @click="closeSidebar"
            ><Icon name="bx:cog" class="icon-style mr-1" /> Settings</NuxtLink
          >
        </li>
      </ul>
      <NuxtLink
        to="/shipments/new-shipment"
        class="btn-primary px-5 py-3 mt-8 flex justify-between items-center hidden"
        @click="closeSidebar"
        ><div>New Shipment</div>
        <Icon name="mdi:arrow-right" />
      </NuxtLink>
    </div>
    <div class="fixed bottom-5 px-5 lg:w-[300px] w-[300px]">
      <div
        v-if="showUserMenu"
        class="px-3 py-2 pt-3 bg-slate-100 dark:bg-midnight-500 font-medium rounded-t-lg border-t border-l border-r dark:border-midnight-200 slideUpAnimation z-30 relative text-lg"
      >
        <label class=""
          ><Icon
            name="codicon:color-mode"
            class="icon-style mr-1"
            size="1rem"
          />
          Color Mode:</label
        >
        <div class="mt-2">
          <ColorMode class="" />
        </div>
        <div class="mb-2 border-b pb-4 dark:border-gray-700"></div>
        <NuxtLink
          @click="(showUserMenu = !showUserMenu), closeSidebar()"
          to="/settings/profile"
          class="mt-0 block py-1"
        >
          <Icon name="bx:cog" class="icon-style mr-1 lg:mx-0" /> Account
          Settings
        </NuxtLink>

        <a href="/logout" class="block cursor-pointer py-1">
          <Icon name="mdi:logout" class="icon-style mr-1 lg:mx-0" />
          <span class="ml-1 inline-block"> Logout </span>
        </a>
      </div>
      <div
        class="px-3 font-semibold border bg-slate-100 dark:bg-midnight-500 dark:border-midnight-200 flex gap-2 items-center w-full cursor-pointer z-40 relative text-lg"
        :class="{
          'py-2': user.admin,
          'py-3': !user.admin,
          'rounded-b-lg': showUserMenu,
          'rounded-lg': !showUserMenu,
        }"
        @click="showUserMenu = !showUserMenu"
      >
        <img
          v-if="userData?.avatar?.url"
          :src="`${userData?.avatar?.url}`"
          alt="avatar"
          class="h-[30px] w-[30px] cursor-pointer rounded-full"
        />
        <Icon v-else name="bx:user" class="" />
        <div class="pt-0" :class="user.admin ? 'pt-1' : ''">
          {{ user.firstName || user.email }} {{ user.lastName }}<br />
          <span
            v-if="user.admin"
            class="text-sm relative top-[-5px] text-slate-500"
          >
            Admin<span class="dark:text-midnight-100 text-slate-300"
              >&nbsp;|&nbsp;</span
            >
            <CompanyName />
          </span>
          <span v-else class="text-sm">
            <CompanyName />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sidebarVisible } from "@/composables/state.js";
const user = useStrapiUser();
const token = useStrapiToken();
const userData = ref(null);
const showUserMenu = ref(false);

const {
  public: { strapiURL },
} = useRuntimeConfig();

const props = defineProps({
  isVisible: Boolean,
});

const closeSidebar = () => {
  sidebarVisible.value = false;
  if (sidebarVisible.value) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};

const fetchUserWithRelations = async () => {
  try {
    const response = await fetch(`${strapiURL}/api/users/me?populate=avatar`, {
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
</script>

<style scoped>
.logged-in-nav li a {
  @apply lg:py-1 py-2 inline-block font-semibold;
}
.logged-in-nav li a.router-link-active {
  @apply text-blue-500 dark:text-blue-400 font-semibold;
}
@keyframes slideUpDrawer {
  from {
    transform: translateY(50px); /* Start from off-screen */
  }
  to {
    transform: translateY(0); /* End at the final position */
  }
}

.slideUpAnimation {
  position: relative; /* or 'relative' based on your layout */
  bottom: 0; /* Adjust based on the height of the clickable div */
  animation: slideUpDrawer 0.5s ease forwards;
}
</style>
