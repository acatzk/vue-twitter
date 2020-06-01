<template>
    <div>
        <div class="text-center" v-if="$apollo.loading">
            <spinner />
        </div>
        <div  v-for="(user, index) in users" :key="index">
            <v-list-item link :to="`/messages/${user.user.id}`">
                <v-list-item-avatar>
                    <img :src="userProfile(user.user)">
                </v-list-item-avatar>

                <v-list-item-content class="d-flex justify-space-between">
                    <v-list-item-title>
                        {{ capitalize(`${user.user.firstname} ${user.user.lastname}`) }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        @{{ user.user.username }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
        </div>
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
                    follow (where: { follower_id: { _eq: $follower_id } }, order_by: {created_at: desc}) {
                        user {
                            id
                            firstname
                            lastname
                            username
                            profile {
                                id
                                avatarUrl
                            }
                        }
                    }
                }
            `,
            variables() {
                return {
                    follower_id: this.current_id.uid
                }
            },
            subscribeToMore: {
                document: gql`
                    subscription ($follower_id: String!) {
                        follow (where: { follower_id: { _eq: $follower_id } }, order_by: {created_at: desc}) {
                            user {
                                id
                                firstname
                                lastname
                                username
                                profile {
                                    id
                                    avatarUrl
                                }
                            }
                        }
                    }
                `,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            follow: [
                                ...subscriptionData.data.follow
                            ]
                        }
                    }
                },
                variables() {
                    return {
                        follower_id: this.current_id.uid
                    }
                }
            },
            result ({ data }) {
                this.users = data.follow
            } 
        }
    }
}
</script>