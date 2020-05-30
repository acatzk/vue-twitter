<template>
    <div>
        <div class="text-center" v-if="$apollo.loading">
            <spinner />
        </div>
        <!-- <v-card-actions
            v-else
            v-for="(user, index) in users" :key="index"
        > -->
        <div  v-for="(user, index) in users" :key="index">
            <v-list-item link>
                <v-list-item-avatar>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU">
                </v-list-item-avatar>

                <v-list-item-content class="d-flex justify-space-between">
                    <v-list-item-title>
                        {{ user.user.firstname + " " + user.user.lastname }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        @{{ user.user.username }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
        </div>
        <!-- </v-card-actions> -->
    </div>
</template>

<script>

import gql from 'graphql-tag'
import { fb } from '@/firebase'

export default {
    name: 'ListChatUsers',

    components: {
        Spinner: () => import('@/components/Spinner')
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
        }
    },

    data () {
        return {
            users: [],
            current_id: fb.auth().currentUser
        }
    },

    apollo: {
        follow: {
            query: gql`
                query ($follower_id: String!) {
                    follow (where: { follower_id: { _eq: $follower_id } }) {
                        user {
                            id
                            firstname
                            lastname
                            username
                        }
                    }
                }
            `,
            variables() {
                return {
                    follower_id: this.current_id.uid
                }
            },
            result ({ data }) {
                this.users = data.follow
            } 
        }
    }
}
</script>