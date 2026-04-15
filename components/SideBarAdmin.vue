<template>
  <div class="bg-[#222521] text-white h-full w-80">
    <div class="bg-[#1D253B]">
      <div class="px-4 flex justify-center">
        <img src="/public/images/logo-museum-new.png" alt="" />
      </div>
      <div class="relative flex justify-center cursor-pointer">
        <img
          :src="`/images/${userStore.userInfo?.image}`"
          alt="Avatar"
          class="h-24 w-24 rounded-full border border-gray-300"
        />
        <!-- + format ava admin + -->
        <!-- <div>
          <p class="text-white text-sm font-semibold">Admin</p>
          <p class="text-white text-lg font-bold">Quang Vo</p>
        </div>
        <button
          class="text-white group-hover:rotate-180 transform transition duration-200"
        >
          ▼
        </button> -->

        <!-- Menu thả xuống -->
        <!-- <div
        v-show="menuVisible"
        class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-10"
      >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          User Info
        </a>
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Change Password
        </a>
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Logout
        </a>
      </div> -->
      </div>
      <div class="flex justify-between">
        <div class="px-4 py-2 flex items-center cursor-pointer">
          <span>{{ userStore.userInfo?.username }}</span>
        </div>

        <div class="px-4 py-2 flex items-center cursor-pointer">
          <span>▼</span>
        </div>
      </div>
      <div>
        <div class="px-4 py-2 flex items-center cursor-pointer text-xl">
          <span>{{ userStore.userInfo?.email }}</span>
        </div>
      </div>
    </div>
    <div class="wrap-links">
      <div class="overview-list">
        <div class="p-4">
          <span class="text-sm">Overview</span>
        </div>
        <ul>
          <li
            v-for="item in itemsOverview"
            :key="item.label"
            :class="[
              'flex items-center cursor-pointer text-sm',
              item.active ? 'bg-gray-600 text-white' : 'hover:bg-gray-700',
            ]"
            @click="activateItem(item)"
          >
            <nuxt-link
              :to="item.url"
              class="flex items-center w-full px-5 py-2"
            >
              <Icon
                class="pr-1"
                :icon="item.icon"
                width="24"
                height="24"
                style="color: white"
              />
              <span>{{ item.label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="role-list">
        <div class="p-4">
          <span class="text-sm">Role</span>
        </div>
        <ul>
          <li
            v-for="item in itemsRole"
            :key="item.label"
            :class="[
              'flex items-center cursor-pointer text-sm',
              item.active ? 'bg-gray-600 text-white' : 'hover:bg-gray-700',
            ]"
            @click="activateItem(item)"
          >
            <nuxt-link
              :to="item.url"
              class="flex items-center w-full px-5 py-2"
            >
              <Icon
                class="pr-1"
                :icon="item.icon"
                width="24"
                height="24"
                style="color: white"
              />
              <span>{{ item.label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="service-list">
        <div class="p-4">
          <span class="text-sm">Service</span>
        </div>
        <ul>
          <li
            v-for="item in itemsService"
            :key="item.label"
            :class="[
              'flex items-center cursor-pointer text-sm',
              item.active ? 'bg-gray-600 text-white' : 'hover:bg-gray-700',
            ]"
            @click="activateItem(item)"
          >
            <nuxt-link
              :to="item.url"
              class="flex items-center w-full px-5 py-2"
            >
              <Icon
                class="pr-1"
                :icon="item.icon"
                width="24"
                height="24"
                style="color: white"
              />
              <span>{{ item.label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user-store";
import { Icon } from "@iconify/vue";

const userStore = useUserStore();
console.log("User Info in Admin:", userStore.userInfo);

const itemsOverview = reactive([
  {
    label: "Dashboard",
    active: false,
    url: "/admin",
    icon: "iconamoon:clock",
  },
  {
    label: "Museums",
    active: false,
    url: "/museum-management",
    icon: "solar:gallery-broken",
  },
  {
    label: "News",
    active: false,
    url: "/post-management",
    icon: "mingcute:bookmark-line",
  },
  {
    label: "Categories",
    active: false,
    url: "/category-management",
    icon: "material-symbols-light:send",
  },
  {
    label: "Feedback",
    active: false,
    url: "/feedback-management",
    icon: "mdi:heart-outline",
  },
  {
    label: "Review",
    active: false,
    url: "/review-management",
    icon: "mdi:heart-outline",
  },
]);

const itemsRole = reactive([
  {
    label: "User",
    active: false,
    url: "/user-management",
    icon: "mdi:user-outline",
  },
  {
    label: "Roles",
    active: false,
    url: "/role-management",
    icon: "mdi:user-group-outline",
  },
]);

const itemsService = reactive([
  {
    label: "Food Type",
    active: false,
    url: "/post-type-management",
    icon: "material-symbols:code",
  },
  {
    label: "Vouchers",
    active: false,
    url: "/vouchers-management",
    icon: "line-md:bell",
  },
  {
    label: "Orders Food",
    active: false,
    url: "/orders-food-management",
    icon: "solar:ticket-bold",
  },
  {
    label: "Payments",
    active: false,
    url: "/payment-management",
    icon: "solar:wallet-money-broken",
  },
]);

const activateItem = (item: { label: string; active: boolean }) => {
  const allItems = [...itemsOverview, ...itemsRole, ...itemsService];

  allItems.forEach((i) => (i.active = false));
  item.active = true;
};

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
</script>

<style scoped>
div[v-show="false"] {
  display: none;
}
</style>
