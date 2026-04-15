<template>
  <section
    class="relative bg-cover bg-center text-white py-20 px-4 bg-[url('@/assets/images/bg_img_nav.png')] mt-10"
  >
    <div class="max-w-2xl mx-auto p-8 rounded-lg text-center">
      <h1 class="text-4xl font-bold mb-4 tracking-wider text-black">
        Discover Food <span class="text-yellow-400">news</span>
      </h1>
      <p class="text-base">t our own information system</p>
      Follow more vouchers abou

      <!-- Input box with icon -->
      <div
        class="relative flex items-center justify-center mt-4 w-full max-w-md mx-auto"
      >
        <input
          v-model="search"
          @keyup.enter="searchNews"
          type="text"
          placeholder="Explore here..."
          class="w-full p-4 rounded-2xl border-none outline-none text-black placeholder-gray-500 pr-14"
        />
        <button
          class="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10"
          @click="searchNews"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
        </button>
      </div>

      <p class="text-sm mt-4 opacity-80">
        Start your exploring free on our website | No credit card required
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
// import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const router = useRouter();

const searchNews = () => {
  console.log(search.value);

  router.push({
    path: "/home/news",
    query: {
      search: search.value,
    },
  });
};
</script>
