<template>
    <div>
        <div class="text-center mt-5"
            v-if="$apollo.loading">
            <Spinner />
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
                        </v-btn>
                        <v-btn icon>
                            <v-icon>transform</v-icon>
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
                
                <v-card-actions>
                    
                    <router-link :to="`/profile/${comment.user.id}`">
                        <v-list-item-avatar 
                            color="grey"  
                            style="position: relative; left: 5px; bottom: 15px;"                
                        >
                            <v-img
                                :src="commentUserProfile(comment)"
                            ></v-img>
                        </v-list-item-avatar>
                    </router-link>

                    <!-- <v-list-item-avatar            
                    >
                         <v-menu offset-y button> 
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                    <v-icon>more_horiz</v-icon>
                                </v-btn>
                            </template>
                            <v-list dense>
                                <v-list-item-group color="blue darken-1">
                                    <div>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon>delete_outline</v-icon>
                                            </v-list-item-icon>
 
                                            <v-list-item-content>
                                                <v-list-item-title>Delete</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </div>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </v-list-item-avatar> -->
                    
                    <v-list-item-content> 
                        <v-list-item-title class="subtitle-2" style="position: relative; top: 4px;">
                            <router-link :to="`/profile/${comment.user.id}`" style="text-decoration: none;">
                                {{`${comment.user.firstname} ${comment.user.lastname}`}}
                            </router-link>
                        </v-list-item-title>
                        <v-list-item-subtitle class="caption text-lowercase" style="position: relative; bottom: 4px;">
                            Replying to
                            <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none;">
                                @{{`${post.user.username}`}}
                            </router-link>
                            <v-icon small class="mr-1">public</v-icon>
                            <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="font-weight-medium">
                            {{ comment.message }}
                        </v-list-item-subtitle>
                        <v-row class="justify-space-around">
                            <v-btn icon x-small>
                                <v-icon>chat_bubble_outline</v-icon>
                            </v-btn>
                            <v-btn icon x-small>
                                <v-icon>transform</v-icon>
                            </v-btn>
                            <v-btn icon x-small>
                                <v-icon>mdi-heart-outline</v-icon>
                            </v-btn>
                            <v-btn icon x-small>
                                <v-icon>keyboard_capslock</v-icon>
                            </v-btn>
                        </v-row>
                    </v-list-item-content>
                </v-card-actions>
                <v-divider></v-divider>
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

import { fb } from '@/firebase'
import Spinner from '@/components/Spinner.vue'

export default {
    name: 'PostCard',

    data() {
        return {
            auth_user_id: fb.auth().currentUser,
            commentUser: '',
            loading: false
        }
    },

    components: {
        Spinner
    },

    apollo: {
        posts: {
            query: GET_SINGLE_USER_POST,
            variables() {
                return {
                    id: this.$route.params.id
                }
            }
        },

        users: {
            query: GET_CURRENT_USER_QUERY,
            variables() {
                return {
                    id: this.auth_user_id.uid
                }
            }
        },
        
        comments: {
            query: GET_USER_POST_COMMENTS,
            variables() {
                return {
                    post_id: this.$route.params.id
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
        commentUserProfile(comment) {
            if (comment.user.profile) {
                if (comment.user.profile.avatarUrl !== '') {
                    return comment.user.profile.avatarUrl
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
                    refetchQueries: ['getUserPostComments']
                }).then(() => {
                    this.loading = false
                    this.commentUser = ''
                }).catch(error => console.log(error))
            }
        }
    },
}
</script>
