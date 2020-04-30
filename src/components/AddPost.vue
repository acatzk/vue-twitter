<template>
  <v-card
    class="mx-auto mb-2"
    outlined
   >

    <v-list-item>
        <v-list-item-avatar color="grey">
            <v-img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU"
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-row>
                <v-col cols="9">
                <v-textarea
                    class="title textarea"
                    color="grey"
                    label="What's happening?"
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
                        :loading="loading"
                        text
                        :disabled="tweet == ''"
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
export default {
    name: 'AddPost',

    data() {
        return {
            tweet: '',
            loading: false
        }
    }
}
</script>
