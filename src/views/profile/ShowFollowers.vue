<template>
    <div>
        <div  v-for="(following, index) in showFollowing" :key="index">
            <template>
                <v-list-item>
                    <v-list-item-avatar>
                        <img :src="showFollowerProfile(following)">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{capitalize(`${following.user.firstname}`) + " " + capitalize(`${following.user.lastname}`)}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="d-flex">
                                @{{`${following.user.username}`}}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content>
                        <v-list-item-title style="position: relative; left: 66px;">
                            <v-btn 
                                small
                                depressed 
                                rounded
                                dark 
                                outlined 
                                color="blue">
                                Unfollow
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </template>
        </div>
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

<style scoped>
.v-btn {
    text-transform: none !important;
}
</style>