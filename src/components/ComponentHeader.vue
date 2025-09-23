<script setup lang="ts">
import router from '@/router';

</script>

<template>
  <header class="containerHeader">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo empresa" />
    </div>
    <button class="linkCart" v-on:click="router.push('/cart')">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
    </button>
  </header>
</template>

<style scoped>
.containerHeader {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.linkCart{
    width: 30px;
    height: 30px;
    background: none;
}

.linkCart svg{
    width: 80%;
}
</style>
