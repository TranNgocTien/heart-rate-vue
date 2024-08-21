<template>
  <the-header></the-header>
  <main>
    <router-view> </router-view>
  </main>
</template>
<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
  background-color: black;
}
</style>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>
