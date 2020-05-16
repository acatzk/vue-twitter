<template>
   <div>
        <div class="text-center" v-if="$apollo.loading">
            <spinner />
        </div>
        <v-list-item v-else>
            <router-link 
                v-for="(user, index) in users" :key="index"
                :to="`/profile/${user.id}`" 
                style="text-decoration: none;"
                class="d-flex"
            >
                <v-list-item-avatar>
                    <v-img :src="userProfile(user)"></v-img>
                </v-list-item-avatar>
            
                <v-list-item-content>
                    <!-- style="position: relative !important; top: 4px !important;" -->
                    <v-list-item-title class="subtitle-2" style="text-decoration: none; position: relative; top: 4px;">
                        {{capitalize(`${user.firstname}`) + " " + capitalize(`${user.lastname}`)}}
                    </v-list-item-title>
                    <!-- style="position: relative !important; bottom: 4px !important;" -->
                    <v-list-item-subtitle class="text-lowercase caption" style="position: relative; bottom: 2px;">
                        @{{`${user.username}`}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </router-link>
            
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense v-if="!$apollo.loading">
            <div v-for="item in links" :key="item.title">

                <v-list-item v-if="!item.subLinks" link router 
                    :to="item.title === 'Profile' ? `/profile/${user_id ? user_id.uid : ''}` : item.to"
                    color="blue darken-1"
                >

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
                                <v-list-item v-if="sub.text == 'Logout'" @click="logout">
                                    <v-list-item-icon>
                                        <v-icon>{{ sub.icon }}</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title>{{ sub.text }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                 <v-list-item v-else>
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
        

            <v-btn 
                dark 
                color="blue darken-1" 
                width="90%" 
                class="ml-3 mt-3"
                depressed
                rounded
            >Tweet</v-btn>
        </v-list>
   </div>
</template>

<script>

import { fb } from '@/firebase'
import { GET_CURRENT_USER_QUERY } from '@/graphql/queries/getCurrentUser'
import Spinner from './Spinner'

export default {
    name: 'Sidebar',

    components: {
        Spinner
    },

     data() {
        return {
            user_id: fb.auth().currentUser,
            model: 1,
            links: [
                { title: 'Home', icon: 'storefront', to: '/'},
                { title: 'Explore', icon: 'card_travel', to: '/explore' },
                { title: 'Notifications', icon: 'notifications_none', to: '/notifications' },
                { title: 'Messages', icon: 'mail_outline', to: '/messages' },
                { title: 'Bookmarks', icon: 'bookmark_border', to: '/bookmarks' },
                { title: 'Lists', icon: 'list', to: '/lists' },                         
                { title: 'Profile', icon: 'perm_identity', to: `/profile` },
                { title: 'More', icon: 'more_horiz',
                    subLinks: [
                        { text: 'Settings', icon: 'settings', to: "/settings" },
                        { text: 'Logout', icon: 'power_settings_new' }
                    ] 
                }
            ]
        }
    },

    methods: {
         userProfile(user) {
            if (user.profile) {
                if (user.profile.avatarUrl !== '') {
                    return user.profile.avatarUrl
                } else {
                    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
                }
            } else {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
            }
        },
         capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        logout() {
            fb.auth().signOut()
                .then(() => {
                    location.reload()
                    this.$router.replace('/login')
                })
                .catch(error => console.log(error))
        },
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