<template>
  <nav>
   <v-app-bar app dark flat dense color="blue darken-1">

      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title>
        <!-- Twitter -->
        <v-btn icon class="mr-2">
            <v-icon>mdi-twitter</v-icon>
        </v-btn>
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
            class="ml-5 font-weight-bold"
            v-bind="user_profile"
        ></v-text-field>

      <v-spacer></v-spacer>

        <v-menu offset-y button>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>more_horiz</v-icon>
                </v-btn>
            </template>
            <v-list dense>
                <v-subheader>Options</v-subheader>
                <v-list-item-group>
                      <v-list-item>
                        <v-list-item-icon>
                            <v-icon>settings</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="logout">
                        <v-list-item-icon>
                            <v-icon>power_settings_new</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
    </v-app-bar>
    
    <v-navigation-drawer
        absolute
        temporary
        v-model="drawer"
        style="position: fixed;"
        >
 
        <side-bar/> <!-- this is navaba -->

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
            ],
            user_profile: ''
        }
    },
    methods: {
        logout() {
            fb.auth().signOut()
                .then(() => {
                    location.reload()
                    // this.$router.replace('/login')
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