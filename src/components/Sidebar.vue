<template>
   <div>
    <v-list-item>
        <v-list-item-avatar>
            <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU"></v-img>
        </v-list-item-avatar>
        
        <router-link 
            v-for="(user, index) in users" :key="index"
            :to="`/profile/${user.id}`" 
            style="text-decoration: none;"
        >
            <v-list-item-content>
                <v-list-item-title class="subtitle-2" style="position: relative; top: 4px;">
                    {{capitalize(`${user.firstname}`) + " " + capitalize(`${user.lastname}`)}}
                </v-list-item-title>
                <v-list-item-subtitle class="text-lowercase caption" style="position: relative; bottom: 4px;">
                    @{{`${user.username}`}}
                </v-list-item-subtitle>
            </v-list-item-content>
        </router-link>
        <!-- 
        <v-list-item-avatar>
            <v-btn icon @click="drawer = !drawer">
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
        </v-list-item-avatar> -->

    </v-list-item>

    <v-divider></v-divider>
    <v-list dense>
        <div v-for="item in links" :key="item.title">

            <v-list-item v-if="!item.subLinks" link router :to="item.to">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
                    
            <v-menu offset-x button v-else>
                <template v-slot:activator="{ on }">
                    <v-list-item link v-on="on">
                        <v-list-item-icon >
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <v-list dense>
                    <v-subheader>Options</v-subheader>
                    <v-list-item-group v-model="model" color="blue darken-1">
                        <div v-for="(sub, i) in item.subLinks" :key="i">
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>{{ sub.icon }}</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>{{ sub.text }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </div>
                    </v-list-item-group>
                </v-list>
            </v-menu>
        </div>
    

        <v-btn dark color="blue darken-1" width="90%" class="ml-3 mt-3">Tweet</v-btn>
    </v-list>
   </div>
</template>

<script>

import { fb } from '@/firebase'
import { GET_CURRENT_USER_QUERY } from '@/graphql/queries/getCurrentUser'
import SkeletonLoader from '@/components/Skeleton-Loader'

export default {
    name: 'Sidebar',

    components: {
        SkeletonLoader
    },

     data() {
        return {
            user_id: fb.auth().currentUser,
            model: 1,
            links: [
                { title: 'Home', icon: 'storefront', to: '/' },
                { title: 'Explore', icon: 'card_travel', to: '/explore' },
                { title: 'Notifications', icon: 'notifications_none', to: '/notifications' },
                { title: 'Messages', icon: 'mail_outline', to: '/messages' },
                { title: 'Bookmarks', icon: 'bookmark_border', to: '/bookmarks' },
                { title: 'Lists', icon: 'list', to: '/lists' },                         
                { title: 'Profile', icon: 'perm_identity', to: `/profile/:id` },
                { title: 'More', icon: 'more_horiz',
                    subLinks: [
                        { text: 'Settings', icon: 'perm_identity', to: "/settings" },
                        { text: 'Logout', icon: 'power_settings_new' }
                    ] 
                }
            ]
        }
    },

    methods: {
         capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    },


    apollo: {
        users: {
            query: GET_CURRENT_USER_QUERY,
            variables() {
                return {
                    id: this.user_id ? this.user_id.uid : ''
                }
            }
        }
    }
}
</script>