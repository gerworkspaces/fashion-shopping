<template>
  <div class="bg-cover" :style="{ backgroundImage: 'url(/images/image.png)' }">
    <div class="mx-auto flex h-[790px]">
      <div class="w-1/3 ml-10 relative">
        <h1
          class="text-white text-3xl font-bold p-8 absolute top-20 -right-9 z-10"
        >
          Let’s create your account to explore more about Danang Food!
        </h1>

        <div
          class="absolute bg-cover w-[666px] h-[560px] bottom-5 -right-60 z-10"
          :style="{ backgroundImage: 'url(/images/img-login-1.png)' }"
        ></div>
      </div>
      <div
        class="w-2/3 flex items-center justify-center relative rounded-tl-3xl rounded-bl-3xl"
        :style="{ backgroundImage: 'url(/images/bg-login.jpg)' }"
      >
        <div class="p-8 w-full max-w-lg relative z-10 ml-28">
          <h2 class="text-3xl text-[#C9C9C9] font-bold mb-12">
            Create Your Account Here!!!
            <strong class="text-zinc-800">fast & easy</strong>
          </h2>
          <form @submit.prevent="register">
            <input
              v-model="username"
              class="border p-2 w-full mb-4 text-black"
              placeholder="Username*"
              type="username"
              required
            />
            <input
              v-model="email"
              class="border p-2 w-full mb-4 text-black"
              placeholder="Email*"
              type="email"
              required
            />
            <input
              v-model="phone"
              class="border p-2 w-full mb-4 text-black"
              placeholder="Phone*"
              type="phone"
              required
            />
            <input
              v-model="password"
              class="border p-2 w-full mb-4 text-black"
              placeholder="Password*"
              type="password"
              required
            />

            <div class="text-black flex justify-between">
              <p class="mt-4 text-center w-3/3">
                Already have an account ?
                <a href="/login" class="text-blue-500">Login</a>
              </p>

              <button
                type="submit"
                class="bg-gold-500 text-white p-2 w-1/3 rounded-md"
              >
                Register
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

const userStore = useUserStore();
const username = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");

const register = async () => {
  const res = await userStore.register({
    username: username.value,
    email: email.value,
    phone: phone.value,
    password_hash: password.value,
    role_id: 3,
    image: "",
  });

  alert(res.message);
};
</script>

<style scoped>
.bg-gold-500 {
  background-color: #d4af37;
}
</style>
