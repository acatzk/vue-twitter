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
                hover
                style="text-decoration: none;"
                router :to="`/post/${post.id}`"
            >
            <v-list-item>

                <router-link :to="`/profile/${post.user.id}`" class="d-flex" style="text-decoration: none;">
                    <v-list-item-avatar color="grey" >
                        <v-img
                            :src="userProfile(post)"
                        ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="subtitle-2" >
                            <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none;">
                                {{ capitalize(`${post.user.firstname}`) + " " + capitalize(`${post.user.lastname}`) }}
                            </router-link>
                        </v-list-item-title>
                        <v-list-item-subtitle class="caption text-lowercase">
                            <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none; color: grey;">
                                @{{`${post.user.username}`}}
                            </router-link>
                            <v-icon small class="mr-2">public</v-icon>
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
                            {{ post.comments_aggregate.aggregate.count }}
                            <!-- {{ count.count }} -->
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
            </v-card>
        </div>
    </div>
</template>

<script>

import { GET_USER_POSTS } from '@/graphql/queries/getUserPosts'
import Spinner from '@/components/Spinner.vue'

export default {
    name: 'PostCard',

    data() {
        return {
            posts: []
        }
    },

    components: {
        Spinner
    },

    apollo: {
        $subscribe: {
            posts: {
                query: GET_USER_POSTS,
                variables() { 
                    return {
                        user_id: this.$route.params.id
                    }
                },
                result({ data }) {
                    this.posts = data.posts
                }
            }
        }
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
    },
}
</script>
