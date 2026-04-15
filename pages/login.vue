<template>
  <div
    class="bg-cover"
    :style="{ backgroundImage: 'url(/images/bg-login.jpg)' }"
  >
    <div class="mx-auto flex h-[790px]">
      <div class="w-1/3 ml-20 mt-40 relative">
        <h1
          class="text-black text-5xl font-bold p-8 absolute top-20 -right-9 z-10"
        >
          Let’s discovered your favour food
        </h1>
      </div>
      <div
        class="w-2/3 flex items-center justify-center relative rounded-tl-3xl rounded-bl-3xl"
      >
        <div class="p-8 w-full bg-[#D9D9D9] relative z-10 max-w-lg ml-28">
          <h2 class="text-3xl text-black font-bold mb-12">Login Account</h2>
          <form @submit.prevent="login">
            <input
              v-model="username"
              class="border p-2 w-full mb-4 text-black"
              placeholder="Username*"
              type="username"
              required
            />
            <input
              v-model="password"
              class="border p-2 w-full mb-4 text-black"
              placeholder="Password*"
              type="password"
              required
            />
            <div class="flex items-center mb-4 text-black">
              <input type="checkbox" id="remember" />
              <label for="remember" class="ml-2"
                >Save my password after login</label
              >
            </div>
            <div class="text-black flex justify-between items-center">
              <p class="text-center w-3/3">
                Create account here!
                <a href="/register" class="text-blue-500">Register</a>
              </p>

              <button
                type="submit"
                class="bg-gold-500 text-white p-2 w-1/3 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "~/stores/user-store";
import { setAuthToken } from "~/service/api-service";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  await userStore.login(username.value, password.value);
  setAuthToken(userStore.token);

  if (userStore.userInfo?.role_id === 3) {
    alert("Login success");
    router.push("/home");
  }
  if (userStore.userInfo?.role_id === 2) {
    alert("Login editor success");
    router.push("/admin");
  }
  if (userStore.userInfo?.role_id === 1 || userStore.userInfo?.role_id === 1) {
    alert("Login admin success");
    router.push("/admin");
  }
};

onMounted(() => {
  if (userStore.userInfo) {
    router.push("/home");
  }
});
</script>

<style scoped>
.bg-gold-500 {
  background-color: #d4af37;
}
</style>
