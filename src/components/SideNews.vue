<template>
    <div>
        <div class="text-center"
            v-if="$apollo.loading">
            <Spinner />
        </div>
         <v-card
                v-else
                style="position: fixed; max-height: 550px"
                outlined
                class="overflow-y-auto"
            >
                <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn3.vectorstock.com/i/1000x1000/85/52/cartoon-blue-bird-on-wire-vector-4988552.jpg"
                >
                </v-img>

                <v-card-text class="text--primary">
                    <div class="subtitle-1">Suggested user to follow</div>
                </v-card-text>


                <template>
                    <v-list-item 
                        v-for="(user, index) in users" :key="index" link
                    >
                        <router-link :to="`/profile/${user.id}`">
                            <v-list-item-avatar>
                                <img :src="userProfile(user)">
                            </v-list-item-avatar>
                        </router-link>

                        <v-list-item-content>
                            <router-link :to="`/profile/${user.id}`" style="text-decoration: none;">
                                <v-list-item-title>
                                    {{capitalize(`${user.firstname}`) + " " + capitalize(`${user.lastname}`)}}
                                </v-list-item-title>
                                <v-list-item-subtitle class="d-flex">
                                        @{{`${user.username}`}}
                                    <!-- <v-btn 
                                        depressed
                                        x-small
                                        :class="follow ? 'follow ml-2' : 'ml-2'" 
                                        dark
                                        :color="follow ? 'grey darken-1' : 'blue darken-1'"
                                        v-model="userFollow[user.id]"
                                        @click="followUser(user.id)"
                                    > 
                                        {{ follow ? capitalize('unfollow') : capitalize('follow') }}
                                    </v-btn> -->
                                </v-list-item-subtitle>
                            </router-link>

                           
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
import Spinner from './Spinner'

export default {
    name: 'SideNews',

    components: {
        Spinner
    },

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
        },
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
    },
}
</script>

<style scoped>

.v-btn {
    text-transform: none !important;
}

</style>