<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-img
                                v-on="on"
                                style="background-color: grey;"
                                src="https://cdn3.vectorstock.com/i/1000x1000/85/52/cartoon-blue-bird-on-wire-vector-4988552.jpg"
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
            <v-col 
                cols="12" 
                sm="6" 
                md="6" 
                class="text-field-area"
                style="position: relative; bottom: 70px;"
            >
                <v-text-field 
                    label="Firstname" 
                    counter=25
                    v-model="user.firstname"
                >
                </v-text-field>
            </v-col>
            <v-col 
                cols="12" 
                sm="6" 
                md="6" 
                class="text-field-area"
                style="position: relative; bottom: 70px;"
            >
                <v-text-field 
                    label="Lastname" 
                    v-model="user.lastname"
                    counter=25
                >
                </v-text-field>
            </v-col>
            <v-col 
                cols="12" 
                class="text-field-area"
                style="position: relative; bottom: 70px;"
            >
                <!--   v-model="user.profile.bio" -->
                <v-textarea
                    auto-grow
                    rows="1"
                    label="Bio"
                    v-model="user.profile.bio"
                    counter=160>
                </v-textarea>
            </v-col> 
            <v-col 
                cols="12" 
                class="text-field-area"
                style="position: relative; bottom: 70px;"
            >
                <v-text-field 
                    label="Location" 
                    counter=200
                    v-model="user.profile.location"
                ></v-text-field>
            </v-col>
            <v-col 
                cols="12" 
                class="text-field-area"
                style="position: relative; bottom: 70px;"
            >
                <v-text-field 
                    label="Website" 
                    counter=100
                    v-model="user.profile.website"
                ></v-text-field>
            </v-col>
            <v-col 
                cols="12" 
                class="text-field-area"
                style="position: relative; bottom: 70px;"
            >
                <v-text-field 
                    label="Birth Date" 
                    type="date"
                    v-model="user.profile.birthdate"
                ></v-text-field>
            </v-col>
            <v-col 
                cols="12" 
                class="text-field-area"
                style="position: relative; bottom: 70px;"
            >
                <v-text-field 
                    label="Profile URL" 
                    v-model="user.profile.avatarUrl"
                    hint="Paste your Profile URL (it's on development)"
                    persistent-hint
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'EditProfile',

    props: ['user'],

    methods: {
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
        }
    }
}
</script>