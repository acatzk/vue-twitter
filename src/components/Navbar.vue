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
      
      <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-on="on"
                    dense
                    label="Search"
                    solo
                    rounded
                    dark
                    flat
                    hide-details single-line
                    background-color="blue"
                    class="ml-5 font-weight-bold"
                    v-model="user"
                    autocomplete="off"
                    @input="filterUsers"
                    @blur="modal = true"
                    clearable
                ></v-text-field>
            </template>
            <v-list v-if="filteredUsers && modal">
                <v-list-item-group>
                    <v-list-item 
                        v-for="(filteredUser, index) in filteredUsers" :key="index"
                        link :to="`/profile/${filteredUser.id}`"
                    >
                        <v-list-item-avatar>
                            <img :src="userProfile(filteredUser)">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>
                                {{ capitalize(filteredUser.firstname) + " " + capitalize(filteredUser.lastname) }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="d-flex">
                                @{{ filteredUser.username }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>     
        </v-menu>

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
import { GET_ALL_USERS_SEARCH_QUERY } from '@/graphql/queries/getListOfUsers'

export default {
    name: 'Navbar',
    components: {
        SideBar
    },
    data() {
        return {
            drawer: false,
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
            user: '',
            users: [],
            filteredUsers: [],
            modal: false
        }
    },
    methods: {
        logout() {
            fb.auth().signOut()
                .then(() => {
                    location.reload()
                })
                .catch(error => console.log(error))
        },
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },

        filterUsers() {
            this.filteredUsers = this.users.filter(user => {
                return user.firstname.toLowerCase().startsWith(this.user.toLowerCase()) ||  user.lastname.toLowerCase().startsWith(this.user.toLowerCase())
            })
        },

        userProfile(filteredUser) {
            if (filteredUser.profile) {
                if (filteredUser.profile.avatarUrl !== '') {
                    return filteredUser.profile.avatarUrl
                } else {
                    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
                }
            } else {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
            }
        },


    },

    apollo: {
        users: {
            query: GET_ALL_USERS_SEARCH_QUERY,
            result({ data }) {
                this.users = data.users
            }
        }
    }

    
}
</script>