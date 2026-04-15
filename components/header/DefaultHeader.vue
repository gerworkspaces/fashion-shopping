<template>
  <header>
    <div class="container mx-auto flex w-full mt-2">
      <nuxt-link to="/home" class="wrap-logo w-2/6 flex">
        <div>
          <img :src="logoImage" alt="logo_img" class="w-20 h-20" />
        </div>
        <div
          class="title font-bold text-2xl tracking-widest text-center p-3 content-center text-secondary uppercase"
        >
          <h1>Local Food</h1>
        </div>
      </nuxt-link>
      <div class="wrap-nav w-4/6 flex items-center">
        <ul class="list-none flex justify-between w-4/6">
          <li>
            <nuxt-link to="/foods" class="text-lg font-medium p-2"
              >Foods</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/news" class="text-lg font-medium p-2"
              >News</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/vouchers" class="text-lg font-medium p-2"
              >Vouchers</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/orders" class="text-lg font-medium p-2"
              >Orders</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/menu" class="text-lg font-medium p-2"
              >Menu</nuxt-link
            >
          </li>
        </ul>

        <div class="flex justify-end w-2/6 items-center">
          <div v-if="!userStore.userInfo" class="flex gap-2">
            <nuxt-link to="/login">
              <button class="bg-secondary text-white px-4 py-2 rounded-md">
                Signin
              </button>
            </nuxt-link>
            <nuxt-link to="/register-account">
              <button class="bg-secondary text-white px-4 py-2 rounded-md">
                Signup
              </button>
            </nuxt-link>
          </div>
          <div
            v-if="userStore.userInfo"
            class="relative mx-4 dropdown-container wrap-dropdown"
          >
            <img
              :src="`/images/${userStore.userInfo?.image}`"
              alt="Avatar"
              class="h-24 w-24 rounded-full border border-gray-300"
            />
            <!-- <Icon icon="lets-icons:user-fill" width="48" height="48" /> -->
            <!-- Dropdown menu -->
            <div
              class="dropdown-menu absolute right-0 text-black mt-2 w-40 bg-white border rounded shadow-lg hidden z-10"
            >
              <ul class="flex flex-col visible text-left">
                <li>
                  <nuxt-link
                    to="/profile"
                    class="block px-4 py-2 hover:bg-gray-100"
                    >Profile
                  </nuxt-link>
                </li>
                <li>
                  <a
                    @click.prevent="logout"
                    class="block px-4 py-2 hover:bg-gray-100"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import logoImage from "@/assets/images/logo.png";
import { Icon } from "@iconify/vue";
import { useUserStore } from "@/stores/user-store"; // Import user store
import { useRouter } from "vue-router"; // Import router

const userStore = useUserStore();
const router = useRouter();
const { handleFileInput, files } = useFileStorage({ clearOldFiles: false });

const logout = async () => {
  try {
    await $fetch("/api/auth", {
      method: "DELETE",
    });
    localStorage.removeItem("token"); // Remove token from local storage
    userStore.logout(); // Clear user info from store
    router.push("/login"); // Redirect to home page
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<style scoped>
.wrap-dropdown::after {
  width: 22px;
  height: 20px;
  content: "";
  position: absolute;
  right: 0.75rem;
  transform: translateY(-50%);
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.w-40 {
  width: 10rem;
}
.bg-white {
  background-color: white;
}
.border {
  border: 1px solid #e2e8f0;
}
.rounded {
  border-radius: 0.25rem;
}
.shadow-lg {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}
.dropdown-container:hover .dropdown-menu {
  display: block;
}
.hidden {
  display: none;
}
</style>
