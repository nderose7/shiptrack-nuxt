<template>
  <div class="w-full px-5">
    <div
      class="vue-form form-control rounded-xl bg-white p-7 pb-6 pt-6 text-left dark:bg-midnight-900 lg:mx-0 border dark:border-midnight-100"
    >
      <label for="username" class="mb-2 block text-2xl font-bold"
        ><Icon name="lucide:sprout" size="1.25rem" class="icon-style" /> Account
        Created:</label
      >

      <p class="text-lg">
        {{ dateFormat(user.createdAt, "ddd, mmm dS, yyyy, h:MM TT") }}
      </p>
    </div>
    <div
      class="vue-form form-control mt-6 rounded-xl bg-white p-7 pt-6 text-left dark:bg-midnight-900 lg:mx-0 border dark:border-midnight-100"
    >
      <div class="flex">
        <div class="w-full text-lg">
          <div class="mb-2 block text-2xl font-bold">
            <Icon
              name="jam:triangle-danger"
              size="1.25rem"
              class="icon-style"
            />
            Remove your account
          </div>
          <p class="mb-4">
            This will permanently delete your account along with all data
            associated with it. It will also cancel all existing memberships
            immediately.
          </p>
          <p><b>Please exercise caution.</b></p>

          <button
            class="btn-danger rounded-full inline-block mt-4"
            @click="showModal = !showModal"
          >
            <Icon name="jam:triangle-danger" class="icon-style" /> Delete My
            Account
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="modal w-full">
    <div class="modal-content relative w-full">
      <button
        type="button"
        @click="showModal = false"
        class="close absolute right-3 top-2 dark:hover:text-slate-300"
      >
        <Icon name="bx:x" size="2rem" />
      </button>
      <div class="text-center w-full">
        <Icon name="jam:triangle-danger" size="4rem" class="text-red-600" />
        <h2 class="text-3xl mt-10 mb-5">
          Are you sure you want to delete your account?
        </h2>
        <p>
          You will instantly lose access to EatClassy.com, and any active
          membership subscriptions will be removed. Remember, you can always
          pause or cancel your subscription instead of deleting your account.
        </p>
        <div class="md:flex gap-4 justify-center mt-10">
          <AccountSettingsDeleteAccount />
          <button
            @click="showModal = false"
            class="btn-white text-base block md:inline-block w-full mt-4 md:pt-0"
          >
            Keep My Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import dateFormat, { masks } from "dateformat";
const user = useStrapiUser();
const showModal = ref(false);
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  @screen lg {
    @apply pt-60 w-full h-full;
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-content {
  @apply dark:bg-midnight-900 bg-slate-100 p-20 rounded-lg dark:border-midnight-100 border;
  margin: 5% auto;
  padding: 50px;
  height: 100%;
  @screen lg {
    width: 40%;
  }
}
</style>
