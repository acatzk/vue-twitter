<template>
    <div>
        <v-list-item 
            v-for="(following, index) in showFollowing" :key="index"
        >
            <router-link :to="`/profile/${following.user.id}`">
                <v-list-item-avatar>
                    <img :src="showFollowerProfile(following)">
                </v-list-item-avatar>
            </router-link>

            <v-list-item-content>
                <router-link :to="`/profile/${following.user.id}`" style="text-decoration: none;">
                    <v-list-item-title>
                        {{capitalize(`${following.user.firstname}`) + " " + capitalize(`${following.user.lastname}`)}}
                    </v-list-item-title>
                </router-link>
                <v-list-item-subtitle class="d-flex">
                    <router-link :to="`/profile/${following.user.id}`" style="text-decoration: none; color: grey;">
                        @{{`${following.user.username}`}}
                    </router-link>
                </v-list-item-subtitle>
            
            </v-list-item-content>
        </v-list-item>
        <!-- <v-divider></v-divider> -->
    </div>
</template>

<script>
export default {
    name: 'showFollowers',

    props: ['showFollowing'],

    methods: {
        showFollowerProfile(follower) {
             if (follower.user.profile) {
                if (follower.user.profile.avatarUrl !== '') {
                    return follower.user.profile.avatarUrl
                } else {
                    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
                }
            } else {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'
            }
        },
        capitalize(word) {
            if (typeof word !== 'string') return ''
            return word.charAt(0).toUpperCase() + word.slice(1)
        },
    }
}
</script>