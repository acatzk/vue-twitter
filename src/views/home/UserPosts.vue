<template>
    <div>
        <div v-for="(post, index) in posts" :key="index">
            <v-card  
                class="mx-auto mb-2"
                flat
                outlined
                hover
                style="text-decoration: none;"
                router :to="`/posts/${post.id}`"
            >
            <v-list-item>
                <v-list-item-avatar color="grey" >
                    <v-img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU"
                    ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="subtitle-2" style="position: relative; top: 4px;">
                        <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none;">
                            {{ capitalize(`${post.user.firstname}`) + " " + capitalize(`${post.user.lastname}`) }}
                        </router-link>
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption text-lowercase" style="position: relative; bottom: 4px;">
                        <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none; color: grey;">
                             @{{`${post.user.username}`}}
                        </router-link>
                    </v-list-item-subtitle>
                </v-list-item-content>
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
            </v-card>
        </div>
    </div>
</template>

<script>

import { GET_ALL_POSTS } from '@/graphql/queries/getAllPosts'

export default {
    name: 'PostCard',

    apollo: {
        posts: {
            query: GET_ALL_POSTS
        }
    },

    methods: {
         capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    },
}
</script>
