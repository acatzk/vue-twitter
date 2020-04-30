<template>
  <nav>
   <v-app-bar app dark dense color="blue darken-1">

      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title>
        Twitter
      </v-toolbar-title>
      
       <v-text-field
            dense
            label="Search"
            solo
            rounded
            dark
            flat
            hide-details single-line
            background-color="blue darken-2"
            class="ml-5"
        ></v-text-field>

      <v-spacer></v-spacer>

       <v-btn 
            rounded 
            small 
            outlined 
            dense
            color="white" 
            class="mr-2 text-lowercase"
            @click="logout"
        >
            {{ capitalize("log out") }}
       </v-btn>

    </v-app-bar>
    
    <v-navigation-drawer
        absolute
        temporary
        v-model="drawer"
        >
        <!-- <v-list-item>
            <v-list-item-avatar>
                <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU"></v-img>
            </v-list-item-avatar>

             <v-list-item-content>
                <v-list-item-title class="subtitle-2" style="position: relative; top: 4px;">Joshua Galit</v-list-item-title>
                <v-list-item-subtitle class="caption" style="position: relative; bottom: 4px;">@angryboy</v-list-item-subtitle>
            </v-list-item-content>

           
        </v-list-item>

        <v-divider></v-divider> -->

        <side-bar />

        <template v-slot:append>
            <v-btn block text>
                <v-list-item-content>
                    <v-list-item-title>Joshua Galit</v-list-item-title>
                </v-list-item-content>
                <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
        </template>
      </v-navigation-drawer>
  </nav>
</template>

<script>

import { fb } from '@/firebase'
import SideBar from './Sidebar'

export default {
    name: 'Navbar',
    components: {
        SideBar
    },
    data() {
        return {
            drawer: false,
            model: 1,
            links: [
                { title: 'Home', icon: 'storefront', to: '/' },
                { title: 'Explore', icon: 'card_travel', to: '/explore' },
                { title: 'Notifications', icon: 'notifications_none', to: '/notifications' },
                { title: 'Messages', icon: 'mail_outline', to: '/messages' },
                { title: 'Bookmarks', icon: 'bookmark_border', to: '/bookmarks' },
                { title: 'Lists', icon: 'list', to: '/lists' },
                { title: 'Profile', icon: 'perm_identity', to: '/:profile' },
                { 
                    title: 'More', 
                    icon: 'more_horiz',
                    subLinks: [
                        { text: 'Import', icon: 'perm_identity', to: "/import" },
                        { text: 'Export', icon: 'perm_identity', to: "/export" },
                        { text: 'Print', icon: 'perm_identity', to: "/print" },
                        { text: 'Undo changes', icon: 'perm_identity', to: "/undochanges" },
                        { text: 'Other contacts', icon: 'perm_identity', to: "others" }
                    ] 
                }
            ]
        }
    },
    methods: {
        logout() {
            fb.auth().signOut()
                .then(() => {
                this.$router.replace('/login')
                })
                .catch(error => console.log(error))
        },
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    }
    
}
</script>