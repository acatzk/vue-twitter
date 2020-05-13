<template>
    <div>
        <div class="text-center mt-5"
            v-if="$apollo.loading">
            <!-- <Spinner /> -->
             <v-skeleton-loader
                class="mx-auto"
                type="list-item-avatar, image, list-item-three-line"    
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

                <router-link :to="`/profile/${post.user.id}`" class="d-flex" style="text-decoration: none;">
                    <v-list-item-avatar color="grey" >
                        <v-img
                            :src="userProfile(post)"
                        ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="subtitle-2">
                            <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none;">
                                {{ capitalize(`${post.user.firstname}`) + " " + capitalize(`${post.user.lastname}`) }}
                            </router-link>
                        </v-list-item-title>
                        <v-list-item-subtitle class="caption text-lowercase">
                            <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none; color: grey;">
                                @{{`${post.user.username}`}}
                            </router-link>
                            <v-icon small class="mr-1">public</v-icon>
                            <timeago :datetime="post.created_at" :auto-update="60"></timeago>
                        </v-list-item-subtitle>
                    </v-list-item-content>

                </router-link>
            </v-list-item>

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
           
            <v-card-actions>
                <v-list-item class="grow">
                    <v-row class="justify-space-between">
                        <v-btn icon>
                            <v-icon>chat_bubble_outline</v-icon>
                            {{ count.count }}
                        </v-btn>
                        <v-btn icon>
                            <v-icon>transform</v-icon>
                        </v-btn>
                        <v-btn 
                            icon 
                            :loading="reactLoading"
                            @click="reactButton(post)"
                        >
                            <v-icon v-if="reactCount.count === 0">mdi-heart-outline</v-icon>
                            <v-icon v-else color="red">mdi-heart</v-icon>
                            {{ reactCount.count }}
                        </v-btn>
                        <v-btn icon>
                            <v-icon>keyboard_capslock</v-icon>
                        </v-btn>
                    </v-row>
                </v-list-item>
            </v-card-actions>
            
            <v-divider></v-divider>
            <!-- User COmment -->
            <v-card-actions >
                <router-link :to="`/profile/${auth_user_id.uid}`">
                    <v-list-item-avatar 
                        color="grey"  
                        style="position: relative; left: 5px; bottom: 3px;"
                        v-for="(user, index) in users" :key="index"
                    >
                        <v-img
                            :src="currentUserProfile(user)"
                        ></v-img>
                    </v-list-item-avatar>
                </router-link>

                <v-list-item-content>
                    <v-list-item-title style="position: relative; top: 10px;">
                        <v-text-field
                            class="subtitle-1"
                            outlined
                            dense
                            @keyup.enter="sendComment"
                            single-line
                            color="grey"
                            :loading="loading"
                            :disabled="loading"
                            v-model="commentUser"
                            label="comment..."
                        ></v-text-field>
                    </v-list-item-title>
                </v-list-item-content>
            </v-card-actions>
            <!-- End User Comment -->
            <v-divider></v-divider>

            <!-- Show User commented -->
            <div v-for="(comment, index) in comments" :key="index">
                <user-comments 
                    :comment="comment"
                    :post="post"
                />
            </div>
           <!-- END Show User commented -->
          </v-card>
        </div>
    </div>
</template>

<script>

import { GET_SINGLE_USER_POST } from '@/graphql/queries/getSinglePost'
import { GET_USER_POST_COMMENTS } from '@/graphql/queries/getUserPostComments'
import { GET_CURRENT_USER_QUERY } from '@/graphql/queries/getCurrentUser'
import { COMMENT_USER_MUTATION } from '@/graphql/mutations/commentUser'
import { REACT_USER_MUTATION, UNREACT_USER_MUTATION } from '@/graphql/mutations/reactUser'
import { GET_COMMENT_COUNT } from '@/graphql/queries/getCommentCount'
import { GET_REACT_COUNT } from '@/graphql/queries/getReactCount'

import { fb } from '@/firebase'

export default {
    name: 'PostCard',

    data() {
        return {
            auth_user_id: fb.auth().currentUser,
            commentUser: '',
            loading: false,
            reactLoading: false,
            count: 0,
            reactCount: 0,
            comments: [],
            users: [],
            posts: []
        }
    },

    components: {
        Spinner: () => import('@/components/Spinner.vue'),
        UserComments: () => import('./UserComments')
    },

    apollo: {

        posts: {
            query: GET_SINGLE_USER_POST,
            variables() {
                return {
                    id: this.$route.params.id
                }
            },
            result({ data }) {
                this.posts = data.posts
            }
        },

        users: {
            query: GET_CURRENT_USER_QUERY,
            variables() {
                return {
                    id: this.auth_user_id.uid
                }
            },
            result({ data }) {
                this.users = data.users
            }
        },
        
       $subscribe: {
           comments: {
                query: GET_USER_POST_COMMENTS,
                variables() {
                    return {
                        post_id: this.$route.params.id
                    }
                },
                result({ data }) {
                    this.comments = data.comments
                }
            },
            comments_aggregate: {
                query: GET_COMMENT_COUNT,
                variables() {
                    return {
                        post_id: this.$route.params.id
                    }
                },
                result({ data }) {
                    this.count = data.comments_aggregate.aggregate
                }
            },

            react_aggregate: {
                query: GET_REACT_COUNT,
                variables() {
                    return {
                        post_id: this.$route.params.id
                    }
                },
                result({ data }) {
                    this.reactCount = data.react_aggregate.aggregate
                }
            }
            
       },  
        


    },

    methods: {
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
        currentUserProfile(user) {
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
        sendComment() {
            if(this.commentUser !== '' && this.commentUser !== 'undefined') {
                this.loading = true
                this.$apollo.mutate({
                    mutation: COMMENT_USER_MUTATION,
                    variables: {
                        user_id: this.auth_user_id.uid,
                        post_id: this.$route.params.id,
                        message: this.commentUser
                    }, 
                    refetchQueries: ['getUserPostComments', 'getCommentCount', 'react_aggregate']
                }).then(() => {
                    this.loading = false
                    this.commentUser = ''
                }).catch(error => console.log(error))
            }
        },
        reactButton(post) {
            this.reactLoading = true
            if (this.reactCount.count === 0) {
                this.$apollo.mutate({
                    mutation: REACT_USER_MUTATION,
                    variables: {
                        post_id: post.id, 
                        user_id: this.auth_user_id.uid
                    },
                    refetchQueries: ['getReactCount']
                }).then(() => {
                    this.reactLoading = false
                }).catch(error => console.log(error))
            } else {
                this.$apollo.mutate({
                    mutation: UNREACT_USER_MUTATION,
                    variables: {
                        post_id: this.$route.params.id,
                        user_id: this.auth_user_id.uid
                    },
                    refetchQueries: ['getReactCount']
                }).then(() => {
                    this.reactLoading = false
                }).catch(error => console.log(error))
            }
        }
    },
}
</script>
