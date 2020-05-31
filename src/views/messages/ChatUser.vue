<template>
  <v-card
    class="mx-auto"
    flat
    outlined
  >
    <v-card-title class="mx-3">
        <v-row class="d-flex justify-space-between">
            <v-btn 
                icon 
                color="blue darken-1" 
                router to="/messages"
            >
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <spinner v-if="$apollo.loading" style="position: absolute; margin-left: 55px;" />
            <div 
                v-else
                style="position: absolute; margin-left: 55px;"
                v-for="(user, index) in users" :key="index"
            >
               <v-list-item-content class="d-flex justify-space-between">
                    <v-list-item-title class="font-weight-black text-uppercase" style="position: relative; bottom: 10px;">
                        {{ `${user.firstname} ${user.lastname}` }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light text-lowercase" style="position: relative; bottom: 10px;">
                        @{{ `${user.username}` }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </div>

            <div class="float-left">
                <v-btn icon color="blue darken-1">
                    <v-icon>info_outline</v-icon>
                </v-btn>
            </div>
        </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <div 
        class="text-center"
        style="height: 65vh;"
        v-if="$apollo.loading"
    >
        <spinner />
    </div>
    <v-card-text v-else color="blue darken-1" style="height: 65vh;" class="overflow-y-auto">
        <div class="them">

            <div class="row mt-2">
                <v-list-item-avatar v-for="(u, i) in users" :key="i" style="width: 30px; height: 30px;">
                    <img :src="userProfile(u)">
                </v-list-item-avatar>
                <v-card-text class="user-say mt-2"
                    style="max-width: 300px; 
                            border-radius: 20px; 
                            color: #000; 
                            background-color: #eee; 
                            display: inline-block; 
                            position: relative; 
                            right: 10px;"
                >
                    Lorem ipsum dolor sit amet, consectetur
                </v-card-text>
            </div>

            <div class="row float-right">
                <v-card-text class="user-say mt-2 float-left primary"
                    style="max-width: 300px; 
                            border-radius: 20px; 
                            color: #fff; 
                            background-color: #eee; 
                            display: inline-block; 
                            position: relative; 
                            right: 10px;"
                >
                    Lorem ipsum dolor sit amet, consectetur
                </v-card-text>
            </div>
            
        </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-btn icon color="blue darken-1">
            <v-icon>add_photo_alternate</v-icon>
        </v-btn>
        <v-btn icon color="blue darken-1">
            <v-icon>camera_enhance</v-icon>
        </v-btn>
        <v-text-field
            solo
            rounded
            flat
            dense
            outlined
            color="blue darken-1"
            hide-details
            v-model="chat"
            label="Start a new message"
            autocomplete="off"
        ></v-text-field>
        <v-btn icon color="blue darken-1" :disabled="chat === ''">
            <v-icon>send</v-icon>
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { fb } from '@/firebase'

import gql from 'graphql-tag'

export default {
    name: 'ChatUser',

    components: {
        Spinner: () => import('@/components/Spinner')
    },

    data () {
        return {
            chat: '',
            chat_user_id: fb.auth().currentUser,
            users: []
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
    },

    apollo: {
        users: {
            query: gql`
                query getUserProfile($id: String!) {
                    users(where: {id: {_eq: $id}}) {
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
            `,
            variables() {
                return {
                    id: this.chat_user_id ? this.$route.params.id : this.chat_user_id
                }
            },
            subscribeToMore: {
                document: gql`
                    subscription getUserProfile($id: String!) {
                        users(where: {id: {_eq: $id}}) {
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
                `,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            users: [
                                ...subscriptionData.data.users
                            ]
                        }
                    }
                },  
                variables() {
                    return {
                        id: this.chat_user_id ? this.$route.params.id : this.chat_user_id
                    }
                }
            },
            result ({ data }) {
                this.users = data.users
            }
        }
    }


}
</script>