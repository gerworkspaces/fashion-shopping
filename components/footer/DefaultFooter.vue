<template>
  <footer class="bg-[#9b6a4e] text-black py-10">
    <div class="container mx-auto flex flex-wrap justify-between">
      <!-- Logo và Mạng Xã Hội -->
      <div class="w-full md:w-1/5 mb-8 md:mb-0">
        <h2 class="text-2xl font-bold mb-4">Local Food Danang</h2>
        <div class="flex space-x-4">
          <!-- Icon mạng xã hội -->
          <nuxt-link to="#">
            <Icon icon="pajamas:twitter" width="22" height="22" />
          </nuxt-link>
          <nuxt-link to="#">
            <Icon icon="mdi:instagram" width="22" height="22" />
          </nuxt-link>
          <nuxt-link to="#">
            <Icon icon="flowbite:youtube-solid" width="22" height="22" />
          </nuxt-link>
          <nuxt-link to="#">
            <Icon icon="mdi:linkedin" width="22" height="22" />
          </nuxt-link>
        </div>
      </div>

      <!-- Menu INFO -->
      <div class="w-1/4 md:w-1/6 mb-8 md:mb-0">
        <h3 class="font-semibold mb-4">INFO</h3>
        <ul>
          <li>
            <nuxt-link to="#" class="hover:underline"> Home </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline"> About </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline"> News </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline"> Vouchers </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- Menu EXPLORE -->
      <div class="w-1/4 md:w-1/6 mb-8 md:mb-0">
        <h3 class="font-semibold mb-4">EXPLORE</h3>
        <ul>
          <li>
            <nuxt-link to="#" class="hover:underline">
              Browse Vouchers
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#" class="hover:underline"> Order Local </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- Menu COMMUNITY -->
      <div class="w-1/4 md:w-1/6 mb-8 md:mb-0">
        <h3 class="font-semibold mb-4">COMMUNITY</h3>
        <ul>
          <li>
            <nuxt-link to="#" class="hover:underline">
              Featured Best Food
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- JOIN OUR NEWSLETTER -->
      <div
        class="w-full md:w-1/4 flex flex-col justify-center items-center md:items-start"
      >
        <h3 class="font-semibold mb-4 text-thirdary max-w-20">
          JOIN OUR NEWSLETTER
        </h3>
        <form class="flex w-full max-w-sm">
          <input
            type="email"
            placeholder="Email Address"
            class="p-2 rounded-l-full w-full text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            class="bg-black text-white px-4 rounded-r-full font-semibold"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
</script>

<style></style>
