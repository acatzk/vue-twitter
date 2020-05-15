<template>
    <div>
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
            
            <v-list-item-content> 
                <v-list-item-title class="subtitle-2" style="position: relative; top: 2px;">
                    <router-link :to="`/profile/${comment.user.id}`" style="text-decoration: none;">
                        {{`${comment.user.firstname} ${comment.user.lastname}`}}
                    </router-link>
                </v-list-item-title>
                <v-list-item-subtitle class="caption text-lowercase" style="position: relative; bottom: 5px;">
                    Replying to
                    <router-link :to="`/profile/${post.user.id}`" style="text-decoration: none;">
                        @{{`${post.user.username}`}}
                    </router-link>
                    <v-icon small class="mr-1">public</v-icon>
                    <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
                </v-list-item-subtitle>
                <v-list-item-subtitle class="font-weight-normal">
                    <v-card>
                        {{ comment.message }}
                    </v-card>
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
</template>

<script>
export default {
    name: 'UserComments',

    props: ['comment', 'post'],

    methods: {
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
    }
}
</script>