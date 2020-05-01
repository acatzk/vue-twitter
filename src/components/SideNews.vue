<template>
    <div style="position: fixed;">
         <v-card
                outlined
            >
                <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                </v-img>

                <v-card-text class="text--primary">
                    <div class="subtitle-1">Follow Users</div>
                </v-card-text>

                <template>
                    <v-list-item 
                        v-for="(user, index) in users" :key="index" link
                      
                    >
                      <!-- router :to="`/profile/${user.id}`" -->
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>
                                <router-link :to="`/profile/${user.id}`" style="text-decoration: none;">
                                    {{capitalize(`${user.firstname}`) + " " + capitalize(`${user.lastname}`)}}
                                </router-link>
                            </v-list-item-title>
                            <v-list-item-subtitle class="d-flex">
                                @{{`${user.username}`}}
                                <v-btn 
                                    x-small 
                                    depressed
                                    :class="follow ? 'follow ml-2' : 'ml-2'" 
                                    dark
                                    :color="follow ? 'grey darken-1' : 'blue darken-1'"
                                    v-model="userFollow[user.id]"
                                    @click="followUser(user.id)"
                                > 
                                    {{ follow ? 'unfollow' : 'follow' }}
                                </v-btn>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                </template>
            </v-card>
    </div>
</template>

<script>

import { GET_LIST_OF_USERS_QUERY } from '@/graphql/queries/getListOfUsers'
import { fb } from '@/firebase'

export default {
    name: 'SideNews',

    data() {
        return {
            user_id: fb.auth().currentUser,
            follow: false,
            userFollow: []
        }
    },

    apollo: {
        users: {
            query: GET_LIST_OF_USERS_QUERY,
            variables() {
                return {
                    id: this.user_id ? this.user_id.uid : ''
                }
            }
        }
    },



    methods: {
        followUser(user_id) {
            this.follow = !this.follow
        },
         capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    },
}
</script>
