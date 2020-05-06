<template>
  <div>
      <navbar />
      <v-content class="mx-3">
        <v-row>
            <v-col cols="12" md="3"  class="hidden-sm-and-down">
              <side-bar style="position: fixed;"/> <!--  Sidebar -->
           </v-col>
           <v-col cols="12" md="6">
             <div v-if="this.$route.path == '/'">
                <tweet-post />  <!--  Add Posts components -->
             </div>
             <router-view /> <!--  Dynamic content -->
           </v-col>
           <v-col cols="12" md="3" class="hidden-sm-and-down">
              <side-news /> <!--  Side news -->
           </v-col>
        </v-row>
      </v-content>
  </div>
 
</template>


<script>

export default { 
  name: 'Home',
  components: {
    Navbar: () => import('@/components/Navbar'),
    SideNews: () => import('@/components/SideNews'),
    SideBar: () => import('@/components/Sidebar'),
    TweetPost: () => import('./TweetPost')
  }
}
</script>
