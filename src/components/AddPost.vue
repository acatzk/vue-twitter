<template>
  <v-card
    class="mx-auto mb-2"
    outlined
   >

    <v-list-item>
        <v-list-item-avatar color="grey" >
            <v-img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU"
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-row>
                <v-col cols="9">
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
                </v-col>
                    <v-col cols="3">
                        <v-btn 
                            dark 
                            rounded 
                            class="blue"
                            small
                            :loading="loading"
                            text
                            :disabled="tweet == ''"
                            @click="postUser"
                        >
                        Tweet
                        </v-btn> 
                </v-col>
            </v-row>

        </v-list-item-content>
    </v-list-item>
    
  </v-card>
</template>

<script>

import { TWEET_POST_MUTATION } from '@/graphql/mutations/tweetPost'
import { fb } from '@/firebase'

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
                refetchQueries: ['getAllPosts']
            }).then(() => {
                this.loading = false
                this.tweet = ''
            }).catch(error => console.log(error))
        }
    }
}
</script>
