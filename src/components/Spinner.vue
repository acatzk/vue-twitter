<template>
      <div>
            <!-- https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif -->
         <!-- <img src="@/assets/loading.gif" width="25" alt="Loading..."> -->
            <v-progress-circular
                  indeterminate
                  color="primary" 
                  style="width: 20px;"
            >
            </v-progress-circular>
      </div>
</template>

<script>
export default {
      name: 'Spinner'
}
</script>