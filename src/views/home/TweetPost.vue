<template>
  <v-card
    class="mx-auto mb-2"
    outlined
   >

    <v-list-item>
        <v-list-item-avatar
            style="position: relative; bottom: 20px;"
            color="grey"
            v-for="(user, index) in users" :key="index"
        >
            <v-img
               :src="userProfile(user)"
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
                <v-textarea
                    class="title textarea"
                    color="grey"
                    label="What's happening?"
                     auto-grow
                    rows="1"
                    flat
                    solo
                    v-model="tweet"
                >
            </v-textarea>
            <div class="btn-group">
                <v-btn icon color="primary">
                    <v-icon>add_photo_alternate</v-icon>
                </v-btn>
                <v-btn icon color="primary">
                    <v-icon>camera_enhance</v-icon>
                </v-btn>
                <v-btn 
                    dark 
                    rounded 
                    style="width: 60%;"
                    outlined
                    class="primary"
                    small
                    :loading="loading"
                    :disabled="tweet == ''"
                    @click="postUser"
                    >
                    Tweet
                    </v-btn> 
            </div>

        </v-list-item-content>
    </v-list-item>
    
  </v-card>
</template>

<script>

import { TWEET_POST_MUTATION } from '@/graphql/mutations/tweetPost'
import { fb } from '@/firebase'
import { GET_CURRENT_USER_QUERY } from '@/graphql/queries/getCurrentUser'

export default {
    name: 'AddPost',
    


    data() {
        return {
            user_id: fb.auth().currentUser,
            tweet: '',
            imageSource: '',
            loading: false
        }
    },

    methods: {
        postUser() {
            this.loading = true
            const  { tweet, imageSource, user_id } = this.$data
            this.$apollo.mutate({
                mutation: TWEET_POST_MUTATION,
                variables: {
                    user_id: user_id.uid,
                    imageUrl: imageSource,
                    caption: tweet,
                },
                refetchQueries: ['getUser', 'getUserPosts']
            }).then(() => {
                this.loading = false
                this.tweet = ''
            }).catch(error => console.log(error))
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

    apollo: {
        users: {
            query: GET_CURRENT_USER_QUERY,
            variables() {
                return {
                    id: this.user_id ? this.user_id.uid : ''
                }
            }
        }
    },
}
</script>
