<template>
    <v-alert
      v-model="alert"    
      color="blue"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
    >
      {{ error }}
    </v-alert>
</template>


<script>
  export default {
    props: ['error'],
    data () {
    return {
        alert: true,
    }
    },
  }
</script>