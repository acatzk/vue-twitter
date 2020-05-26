<template>
    <div>
        <div class="text-center" v-if="$apollo.error">
            Something went wrong in your connection...
        </div>
        <div class="text-center mt-5"
            v-if="$apollo.loading"
        >
            <!-- <spinner /> -->
            <v-skeleton-loader
                class="mx-auto"
                type="list-item-avatar-two-line, card"    
            >
            </v-skeleton-loader>
        </div>
        <div v-else
            v-for="(post, index) in posts" :key="index">
            <v-card  
                class="mx-auto mb-2"
                flat
                outlined
                style="text-decoration: none;"
            >
            <v-list-item>

                <v-row class="justify-space-between">
                    <router-link :to="`/profile/${post.user.id}`" class="d-flex ml-2" style="text-decoration: none;">
                        <v-list-item-avatar color="grey" >
                            <v-img
                                :src="userProfile(post)"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="subtitle-2">
                                <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none; position: relative; top: 4px;">
                                    {{ capitalize(`${post.user.firstname}`) + " " + capitalize(`${post.user.lastname}`) }}
                                </router-link>
                            </v-list-item-title>
                            <v-list-item-subtitle class="caption text-lowercase" style="position: relative; bottom: 2px;">
                                <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none; color: grey;">
                                    @{{`${post.user.username}`}}
                                </router-link>
                                <v-icon small class="mr-1">public</v-icon>
                                <timeago :datetime="post.created_at" :auto-update="60"></timeago>
                            </v-list-item-subtitle>
                        </v-list-item-content>

                    </router-link>

                     <v-bottom-sheet 
                        inset
                        width="400"
                     >
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" class="ma-3">
                                <v-icon>expand_more</v-icon>
                            </v-btn>
                        </template>
                        <v-sheet 
                            flat
                            class="text-left" 
                            :height="currentUserId.uid === post.user.id ? '200px' : '120px'"
                        >
                           <v-list-item-group>
                                <v-list-item dense>
                                    <v-list-item-icon>
                                        <v-icon>bookmark_outline</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Save Post</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item dense :to="`/profile/${post.user.id}`">
                                     <v-list-item-icon>
                                        <v-icon>photo_album</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>View Post</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item 
                                    dense
                                    v-if="currentUserId.uid === post.user.id"
                                    @click="deletePosts(post)"
                                >
                                    <v-list-item-icon>
                                        <v-icon>delete_outline</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Delete Post</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item dense
                                    v-if="currentUserId.uid === post.user.id"
                                >
                                    <v-list-item-icon>
                                        <v-icon>create</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Edit Post</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item dense 
                                    @click="copyLinkPost(post)"
                                >
                                    <v-list-item-icon>
                                        <v-icon>link</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Copy link</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-sheet>
                    </v-bottom-sheet>

                    <v-snackbar
                        v-model="snackbar"
                        :timeout="timeout"
                    >
                    Copied Link {{ snackbarText }}
                    <v-btn
                        color="blue"
                        text
                        @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                    </v-snackbar>

                </v-row>

            </v-list-item>
            

            <!-- Posts -->

            <router-link 
                :to="`/post/${post.id}`" 
                style="text-decoration: none; color: grey;">
                
                <div v-if="post.imageUrl">
                    <v-img
                        :src="post.imageUrl"
                        height="194"
                    ></v-img>
                </div>


                <v-card-text :class="!post.imageUrl ? 'title' : 'subtitle-2'">
                    <div :class="post.caption.length <= 100 ? 'title' : 'subtitle-2'">
                        {{ post.caption }}
                    </div>
                </v-card-text>
            </router-link>

            <!-- End Posts -->

            <v-card-actions>
                <v-list-item class="grow">
                    <v-row class="justify-space-between">
                        <v-btn icon :to="`/post/${post.id}`">
                            <v-icon>chat_bubble_outline</v-icon>
                            {{ post.comments_aggregate.aggregate.count }}
                        </v-btn>
                        <v-btn icon>
                            <v-icon>repeat</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>keyboard_capslock</v-icon>
                        </v-btn>
                    </v-row>
                </v-list-item>
            </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>

import { GET_ALL_POSTS } from '@/graphql/queries/getAllPosts' // query
import { DELETE_POST_MUTATION } from '@/graphql/mutations/deletePost' // mutation
import { GET_ALL_POSTS_SUBSCRIPTION } from '@/graphql/subscriptions/getAllPosts' // subscription
// import { GET_USERS_FOLLOWING_POSTS_SUBSCRIPTION } from '@/graphql/queries/getUsersFollowingPosts'
import Spinner from '@/components/Spinner.vue'
import { fb } from '@/firebase'

export default {
    name: 'PostCard',

    data() {
        return {
            posts: [],
            subscribePosts: [],
            followingUsersPosts: [],
            loading: true,
            currentUserId: fb.auth().currentUser,
            snackbar: false,
            snackbarText: '',
            timeout: 1000
        }
    },

    components: {
        Spinner
    },

    apollo: {
        posts: {
            query: GET_ALL_POSTS,
            subscribeToMore: {
                document: GET_ALL_POSTS_SUBSCRIPTION,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            posts: [
                                ...subscriptionData.data.posts
                            ]
                        }
                    }
                }
            }
        }
    },


    methods: {
        savePost() {
            alert('Save Posts')
        },
        viewPost() {
            alert('View Posts')
        },
        editPost() {
            alert('Edit Posts')
        },
        copyLinkPost(post) {
            post.id = document.execCommand('copy')
            this.snackbarText = post.id
            this.snackbar = true
        },
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        userProfile(post) {
            if (post.user.profile) {
                if (post.user.profile.avatarUrl !== '') {
                    return post.user.profile.avatarUrl
                } else {
                    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
                }
            } else {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
            }
        },

        deletePosts(post)  {
            if (confirm("Are you sure you want to delete?")) {
                this.$apollo.mutate({
                    mutation: DELETE_POST_MUTATION,
                    variables: {
                        post_id: post.id
                    },
                    refetchQueries: ['getAllPosts']
                }).catch(error => console.log(error))
            }
        }
    }

}
</script>
