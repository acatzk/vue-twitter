<template>
  <v-app style="background: #EEEE !important;">
      <router-view />
  </v-app>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
#nprogress .bar {
  background: rgb(255, 255, 255) !important;
}
</style>