<template>
    <div>
        <div class="text-center mt-5" v-if="$apollo.loading">
            <spinner />
        </div>
        <div v-else>
            <v-card  
                class="mx-auto mb-2"
                flat
                outlined
                v-for="(user, index) in users" :key="index"
            >

            <!-- COVER PHOTO -->
            <!-- https://cdn.vuetifyjs.com/images/cards/mountain.jpg -->
           <v-img
                style="background-color: grey;"
                src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                height="130"
            ></v-img>

            <v-avatar 
                size="110" 
                style="position: relative; bottom: 60px; left: 25px; border: 3px solid #fff;">
                <v-img
                    :src="userProfile(user)"
                ></v-img>
            </v-avatar>

            <!-- FULL NAME -->
            <div 
                class="title text-uppercase font-weight-black" 
                style="position: relative; bottom: 60px; left: 15px;"
            >
                {{ `${user.firstname} ${user.lastname}` }}
            </div>
            <div 
                class="text-lowercase subtitle-2 font-weight-regular" 
                style="position: relative; bottom: 64px; left: 15px; color: grey;">
                @{{ `${user.username}` }}
            </div>


            <!-- BUTTON OPTIONS -->
            <div 
                v-if="$route.params.id !== current_id.uid"
                class="text-right" 
                style="position: relative; bottom: 150px;"
            >

                <v-btn fab dark small outlined color="primary">
                    <v-icon dark>more_horiz</v-icon>
                </v-btn>

                <v-btn class="ml-3" fab dark small outlined color="primary">
                    <v-icon dark>mail_outline</v-icon>
                </v-btn>

                <!-- <v-btn class="ml-3" outlined fab dark small color="primary">
                    <v-icon dark>notifications_none</v-icon>
                </v-btn> -->

                <v-btn 
                    rounded 
                    dark
                    color="blue" 
                    class="mx-3"
                    depressed
                    :loading="loading"
                    @click="followUser(user)"
                >
                   {{ follow ? 'Unfollow' : 'Follow' }}
                </v-btn>
            </div>


            <!-- Edit Profile -->
            <div v-else
                class="text-right" 
                style="position: relative; bottom: 150px;"
            >
        
              <v-dialog v-model="profileDialog" scrollable max-width="600px">
                    <template v-slot:activator="{ on }">
                         <v-btn 
                            rounded 
                            dark
                            outlined
                            color="blue" 
                            class="mx-3"
                            v-on="on"
                        >
                            {{ capitalize('Edit profile') }} 
                        </v-btn>
                    </template>
                    <v-card style="border-radius: 15px;">
                        <v-card-title>
                            <v-row class="d-flex justify-space-between">
                                <v-btn 
                                    icon 
                                    color="blue" 
                                    @click="profileDialog = false"
                                >
                                    <v-icon>close</v-icon>
                                </v-btn>
                                <div class="font-weight-black" style="position: absolute; margin-left: 45px;">
                                    Edit Profile
                                </div>

                                <div class="float-left">
                                    <v-btn 
                                        rounded
                                        dark
                                        color="blue"
                                        depressed
                                        :loading="loading"
                                        @click="saveProfileInfo(user)"
                                    >
                                    Save
                                </v-btn>
                                </div>
                            </v-row>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 400px;">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                          <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-img
                                                        v-on="on"
                                                        style="background-color: grey;"
                                                        src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                                                        height="130"
                                                        class="profile-image"
                                                    ></v-img>
                                                </template>
                                                <span>Change Cover Photo</span>
                                            </v-tooltip>
                                        <v-avatar 
                                            size="110" 
                                            style="position: relative; bottom: 70px; left: 25px; border: 3px solid #fff;">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-img
                                                        v-on="on"
                                                        :src="userProfile(user)"
                                                        class="profile-image"
                                                    ></v-img>
                                                    <v-btn
                                                        class="camera-action" 
                                                        icon 
                                                        color="white darken-3" 
                                                        dark style="position: absolute;"
                                                    >
                                                        <v-icon>camera_enhance</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Change Profile</span>
                                            </v-tooltip>
                                        </v-avatar>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="text-field-area">
                                        <v-text-field 
                                            label="Firstname" 
                                            counter=25
                                            v-model="user.firstname"
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" class="text-field-area">
                                        <v-text-field 
                                            label="Lastname" 
                                            v-model="user.lastname"
                                            counter=25
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="text-field-area">
                                        <!--   v-model="user.profile.bio" -->
                                        <v-textarea
                                            auto-grow
                                            rows="1"
                                            label="Bio"
                                            v-model="user.profile.bio"
                                            counter=160>
                                        </v-textarea>
                                    </v-col> 
                                    <v-col cols="12" class="text-field-area">
                                        <v-text-field 
                                            label="Location" 
                                            counter=200
                                            v-model="user.profile.location"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="text-field-area">
                                        <v-text-field 
                                            label="Website" 
                                            counter=100
                                            v-model="user.profile.website"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="text-field-area">
                                        <v-text-field 
                                            label="Birth Date" 
                                            type="date"
                                            v-model="user.profile.birthdate"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="text-field-area">
                                        <v-text-field 
                                            label="Profile URL" 
                                            v-model="user.profile.avatarUrl"
                                            hint="Paste your Profile URL (it's on development)"
                                            persistent-hint
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                             </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- END EDIT PROFILE -->

            </div>
            <!-- BIO -->
            <div 
                class="body-2 font-regular" 
                style="position: relative; bottom: 95px; left: 15px; display: block; width: 50%;"
                v-show="user.profile"
            >
                {{ user.profile ? capitalize(user.profile.bio) : '' }}
            </div>
            
            <!-- USER INFO -->
            <div  
                class="caption font-weight-regular d-flex mx-3" 
                style="position: relative; bottom: 80px; color: grey;"
            >
                <!-- User Website -->
                <div 
                    class="mr-2 website" 
                    v-show="userWebsite(user)"
                >
                    <v-icon>link</v-icon> 
                    <a 
                        :href="user.profile ? user.profile.website : ''" 
                        target="_blank" style="text-decoration: none;">
                        {{ user.profile ? user.profile.website : '' }}
                    </a>
                </div>
                <!-- User Location -->
                <div 
                    class="mr-2" 
                    v-show="userLocation(user)"
                >
                    <v-icon>location_on</v-icon> {{ user.profile ? capitalize(user.profile.location) : '' }}
                </div>
                <!-- Birthdate -->
                <div 
                    class="mr-2" 
                    v-show="userBirthdate(user)"
                >
                    <v-icon>search</v-icon> {{ user.profile ? capitalize(user.profile.birthdate) : '' }}
                </div>
                <!-- Date Created -->
                <div class="mr-2">
                    <v-icon>date_range</v-icon> Joined {{ `${user.created_at.split('T')[0]}` }}
                </div>
            </div>

            <!-- FOLLOWERS AND FOLLOWING -->
            <div 
                class="d-flex subtitle-2 font-weight-regular" 
                style="position: relative; bottom: 64px; left: 15px; color: grey;">
                <div class="mr-2 follow">
                    <a 
                        href="#" 
                        style="text-decoration: none; color: grey;">
                        <b style="color: #000;">0</b> Following
                    </a>
                </div>
                <div class="follow">
                    <a 
                        href="#"
                        style="text-decoration: none; color: grey;"
                    >
                        <b style="color: #000;">0</b> Followers
                    </a>
                </div>
            </div>

            <!-- Tweet tabs -->
            <v-tabs
                v-model="tab"
                fixed-tabs
                style="position: relative; bottom: 40px;"
            >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                >
                    {{ item.tab }}
                </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card 
                        flat 
                        style="position: relative; bottom: 40px;"
                        v-if="item.tab == 'Tweets'"
                    >
                        <user-posts class="mt-2"/>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>

        </v-card>
       </div>
    </div>
</template>

<script>

import { fb } from '@/firebase'
import { GET_USER_PROFILE_QUERY } from '@/graphql/queries/getUserProfile'
import { UPDATE_USER_FULLNAME_MUTATION, UPDATE_USER_PROFILE_MUTATION } from '@/graphql/mutations/updateUserProfile'
import { FOLLOW_USER_MUTATION, DELETE_FOLLOW_USER_MUTATION, GET_FOLLOW_USER } from '@/graphql/mutations/followUser'
import UserPosts from './UserPosts'


export default {
    name: 'PostCard',

    components: {
        Spinner: () => import('@/components/Spinner.vue'),
        UserPosts
    },

    data() {
        return {
            user_id: this.$route.params.id,
            current_id: fb.auth().currentUser,
            profileDialog: false,
            loading: false,
            tab: null,
            items: [
                { tab: 'Tweets', content: 'Tab 1 Content' },
                { tab: 'Tweets & replies', content: 'Tab 2 Content' },
                { tab: 'Media', content: 'Tab 3 Content' },
                { tab: 'Likes', content: 'Tab 3 Content' },
            ],
            follow: false
        }
    },

    methods: {
        // User Website Show Detials
        userWebsite(user) {
             if (user.profile) {
                if (user.profile.website !== '') {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        // User Location Show Details
        userLocation(user) {
            if (user.profile) {
                if (user.profile.location !== '') {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        // User Birthdate Show Details
        userBirthdate(user) {
            if (user.profile) {
                if (user.profile.birthdate !== '') {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        // User Proile Show Detials
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
        //  Capital first letter of Text
        capitalize(word) {
            if (typeof word !== 'string') return ''
            return word.charAt(0).toUpperCase() + word.slice(1)
        },
        // Update User Info Details
        saveProfileInfo(user) {
            this.loading = true

            
            // update user fullname
            this.$apollo.mutate({
                mutation: UPDATE_USER_FULLNAME_MUTATION,
                variables: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname
                },
                mutation: UPDATE_USER_PROFILE_MUTATION,
                variables: {
                    user_id: user.id,
                    bio: user.profile.bio,
                    avatarUrl: user.profile.avatarUrl,
                    website: user.profile.website,
                    birthdate: user.profile.birthdate,
                    location: user.profile.location
                },
                refetchQueries: ['getUserProfile', 'getUser'],
            }).then(() => {
                this.profileDialog = false
                this.loading = false
            }).catch(error => console.log(error))
            // end update user fullname

        },
        // FOllow User
        followUser(user) {
            this.follow = !this.follow
            alert("User ID: " + user.id)
            // if (!this.follow) {
            //     this.loading = true
            //     this.$apollo.mutate({
            //         mutation: FOLLOW_USER_MUTATION,
            //         variables: {
            //             user_id: this.user_id,
            //             follower_id: this.current_id.uid
            //         },
            //         refetchQueries: ['getFollowStatus']
            //     }).then(() => {
            //         this.follow = !this.follow
            //         this.loading = false
            //     }).catch(error => console.log(error))
            // } else {
            //     this.loading = true
            //     this.$apollo.mutate({
            //         mutation: DELETE_FOLLOW_USER_MUTATION,
            //         variables: {
            //             user_id: this.user_id,
            //             follower_id: this.current_id.uid
            //         },
            //         refetchQueries: ['getFollowStatus']
            //     }).then(() => {
            //         this.follow = !this.follow
            //         this.loading = false
            //     }).catch(error => console.log(error))
            // }
            
        }

    },

    apollo: {
        // Get user data where id = this.user_id
        users: {
            query: GET_USER_PROFILE_QUERY,
            variables() {
                return {
                    id: this.user_id ? this.$route.params.id : this.user_id
                }
            }
        },
        // follow: {
        //     query: GET_FOLLOW_USER,
        //     variables() {
        //         return {
        //             user_id:  this.user_id ? this.$route.params.id : this.user_id,
        //             follower_id: this.current_id.uid
        //         }
        //     }
        // }
    }
}
</script>


<style scoped lang="scss">
.follow a:hover, .website a:hover{
    text-decoration: underline !important;
}
.v-tab {
    text-transform: none !important;
}

.v-btn {
    text-transform: none !important;
}
.text-field-area {
    position: relative;
    bottom: 75px;
}

.profile-image:hover {
    // opacity: 0.9;
    transition: 0.3s; 
}

</style>
