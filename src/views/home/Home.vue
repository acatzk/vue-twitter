<template>
  <div>
      <navbar />
      <v-content class="mx-3">
        <v-row>
          <!-- if thi responsive point into medius size close this -->
            <v-col cols="12" md="3"  class="hidden-sm-and-down">
              <side-bar style="position: fixed;"/> <!--  Sidebar -->
           </v-col>

           <!-- if the responsive point into middium size show this -->
           <v-col class="hidden-md-and-up">
                <v-col md="2">
                  <side-bar-icon style="max-width: 60px; position: fixed;"/>  
                </v-col>
                <v-col md="10" style="margin-left: 70px;">
                    <div v-if="this.$route.path == '/'" style="margin-right: 50px;">
                      <tweet-post style="position: relative; bottom: 20px;"/>  <!--  Add Posts components -->
                    </div>
                    <router-view style="position: relative; bottom: 20px; margin-right: 50px;"/>
                </v-col>
          </v-col>

          <!-- if thi responsive point into medius size close this -->
           <v-col cols="12" md="6" class="hidden-sm-and-down">
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
    TweetPost: () => import('./TweetPost'),
    SideBarIcon: () => import('@/components/SidebarIcon')
  }
}
</script>
