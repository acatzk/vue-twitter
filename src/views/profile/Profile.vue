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
                    :src="user.profile ? user.profile.avatarUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSycaZi2N67EHasjG_KqowjGtP8WuKNwvlr7GeMUM2fPixnVch_&usqp=CAU'"
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
                >
                   {{ capitalize('follow') }} 
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
                                <!-- style="position: relative; left: 350px;" -->
                                <div class="float-left">
                                    <v-btn 
                                        rounded
                                        dark
                                        color="blue"
                                        :loading="loading"
                                        @click="saveProfileInfo"
                                    >
                                    Save
                                </v-btn>
                                </div>
                            </v-row>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 450px;">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field 
                                            label="Firstname" 
                                            counter=25
                                            v-model="profile.firstname"
                                            :hint="user.firstname"
                                            persistent-hint
                                        >
                                        </v-text-field>
                                        <!-- <input type="hidden" > -->
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field 
                                            label="Lastname" 
                                            v-model="profile.lastname"
                                            counter=25
                                            :hint="user.lastname"
                                            persistent-hint
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea
                                            auto-grow
                                            rows="1"
                                            label="Bio"
                                            v-model="profile.bio"
                                            :hint="user.profile ? user.profile.bio : ''"
                                            persistent-hint
                                            counter=160>
                                        </v-textarea>
                                    </v-col> 
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Location" 
                                            v-model="profile.location"
                                            :hint="user.profile ? user.profile.location : ''"
                                            persistent-hint
                                            counter=200
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Website" 
                                            v-model="profile.website"
                                            :hint="user.profile ? user.profile.website : ''"
                                            persistent-hint
                                            counter=100
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" >
                                        <v-text-field 
                                            label="Birth Date" 
                                            v-model="profile.birthdate"
                                            :hint="user.profile ? user.profile.birthdate : ''"
                                            persistent-hint
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Profile URL" 
                                            v-model="profile.avatarUrl"
                                            :hint="user.profile ? user.profile.avatarUrl : ''"
                                            persistent-hint
                                        ></v-text-field>
                                        <input type="hidden" :value="user.profile ? profile.profile_id = user.profile.id : ''">
                                    </v-col>
                                </v-row>
                             </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>

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
                class="subtitle-2 font-weight-regular d-flex" 
                style="position: relative; bottom: 80px; left: 10px; color: grey;"
            >
                <!-- User Location -->
                <div 
                    class="mr-2" 
                    v-show="user.profile"
                >
                    <v-icon>location_on</v-icon> {{ user.profile ? capitalize(user.profile.location) : '' }}
                </div>
                <!-- Birthdate -->
                <div 
                    class="mr-2" 
                    v-show="user.profile"
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
import Spinner from '@/components/Spinner.vue'
import { 
        UPDATE_USER_FULLNAME_MUTATION, 
        INSERT_USER_PROFILE_MUTATION, 
        UPDATE_USER_PROFILE_MUTATION 
    } from '@/graphql/mutations/updateUserProfile'
import UserPosts from './UserPosts'

export default {
    name: 'PostCard',

    components: {
        Spinner,
        UserPosts
    },

    data() {
        return {
            user_id: this.$route.params.id,
            current_id: fb.auth().currentUser,
            profileDialog: false,
            loading: false,
            profile: {
                profile_id: '',
                firstname: '',
                lastname: '',
                bio: '',
                location: '',
                website: '',
                birthdate: '',
                avatarUrl: ''
            },
            tab: null,
            items: [
                { tab: 'Tweets', content: 'Tab 1 Content' },
                { tab: 'Tweets & replies', content: 'Tab 2 Content' },
                { tab: 'Media', content: 'Tab 3 Content' },
                { tab: 'Likes', content: 'Tab 3 Content' },
            ]
        }
    },

    methods: {
         capitalize(word) {
            if (typeof word !== 'string') return ''
            return word.charAt(0).toUpperCase() + word.slice(1)
        },
        saveProfileInfo() {
            this.loading = true

            
            // update user fullname
            this.$apollo.mutate({
                mutation: UPDATE_USER_FULLNAME_MUTATION,
                variables: {
                    id: this.user_id,
                    firstname: this.profile.firstname,
                    lastname: this.profile.lastname
                },
                refetchQueries: ['getUserProfile', 'getUser']
            })

            // end update user fullname

            if (this.profile.profile_id === '') {
                // alert("The profile ID is null")
                
                //profile insert
                this.$apollo.mutate({
                    mutation: INSERT_USER_PROFILE_MUTATION,
                    variables: {
                        user_id: this.user_id,
                        bio: this.profile.bio,
                        avatarUrl: this.profile.avatarUrl,
                        website: this.profile.website,
                        birthdate: this.profile.birthdate,
                        location: this.profile.location
                    },
                    refetchQueries: ['getUserProfile', 'getUser']
                }).then(() => {
                    this.profileDialog = false
                    this.loading = false
                }).catch(error => console.log(error))
                // end insert profile

            } else {
                
                // profile update
                this.$apollo.mutate({
                    mutation: UPDATE_USER_PROFILE_MUTATION,
                    variables: {
                        user_id: this.user_id,
                        bio: this.profile.bio,
                        avatarUrl: this.profile.avatarUrl,
                        website: this.profile.website,
                        birthdate: this.profile.birthdate,
                        location: this.profile.location
                    },
                    refetchQueries: ['getUserProfile', 'getUser']
                }).then(() => {
                    this.profileDialog = false
                    this.loading = false
                }).catch(error => console.log(error))
                // end profile update

            }         

        }
    },

    apollo: {
        users: {
            query: GET_USER_PROFILE_QUERY,
            variables() {
                return {
                    id: this.user_id ? this.$route.params.id : this.user_id
                }
            }
        }
    }
}
</script>

<style scoped>
.follow a:hover{
    text-decoration: underline !important;
}
.v-tab {
    text-transform: none !important;
}

.v-btn {
    text-transform: none !important;
}

</style>
