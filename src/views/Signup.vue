<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <!-- class="body-2 ml-3" style="text-decoration: none;" -->
            <router-link 
                class="body-2 mt-3" 
                to="/forgot" 
                style="text-decoration: none;"
            >
                Forgot password?
            </router-link>
            <a 
                href="#" 
                class="body-2 ml-5 mt-3" 
                v-on="on" 
                style="text-decoration: none;"
            >
                Sign up for Twitter
            </a>
        </template>
      <v-card>     
        <v-form v-model="valid">
            <v-avatar class="avatar-logo">
                <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU" width="10%"></v-img>
            </v-avatar>
            
            <v-card-text class="text--primary">
                <div class="headline font-weight-bold" style="position: relative; top: 25px;">Create your account</div>
            </v-card-text>

            <alert v-show="error" :error="error" class="mx-5"/>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field 
                            label="Firstname" 
                            v-model="firstname" 
                            :rules="[required('Firstname'), minLength('Firstname', 3), maxLength('Firstname', 20)]"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" >
                        <v-text-field
                        label="Lastname"
                        hint="Lastname"
                        v-model="lastname"
                        :rules="[required('Lastname'), minLength('Lastname', 3), maxLength('Lastname', 20)]"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="6">
                        <v-text-field 
                            label="Username*"  
                            v-model="username"
                            :rules="[required('Username'), minLength('Username', 5), maxLength('Lastname', 20)]"
                        ></v-text-field>
                    </v-col>
                     <v-col cols="6" sm="6">
                        <v-text-field 
                            label="Email" 
                            v-model="email"
                            :rules="[required('Email'), emailRules('Email')]"
                        ></v-text-field>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col cols="12">
                        <v-text-field 
                            label="Password" 
                            v-model="password"
                            :rules="passwordRules"
                            :append-icon="value ? 'visibility' : 'visibility_off'"
                            @click:append="() => (value = !value)"
                            :type="value ? 'password' : 'text'"
                            error-count="5"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
                <v-btn 
                    rounded 
                    color="blue darken-1" 
                    @click="signupUser" 
                    :disabled="!valid"
                    :loading="loading"
                    depressed
                >Signup</v-btn>
            </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import { fb } from '@/firebase'
import Alert from '@/components/Alert'
import { nanoid } from 'nanoid'
import { INSERT_USER_PROFILE_MUTATION } from '@/graphql/mutations/updateUserProfile'
import { SIGNUP_USER_MUTATION } from '@/graphql/mutations/signup'

export default {
    name: 'SignUp',

    components: {
        Alert
    },
    data() {
        return {
            dialog: false,
            valid: false,
            loading: false,
            value: String,
            error: '',
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            required(propertyType) { 
                return v => v && v.length > 0 || `${propertyType} is required.`
            },
            minLength(propertyType, minLength) {
                return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters.`
            },
            maxLength(propertyType, maxLength) {
                return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters.`
            },
            emailRules(propertyType) {
                return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
            },
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 5) || 'Password must have 5+ characters',
                v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
                v => /(?=.*\d)/.test(v) || 'Must have one number',
                v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
            ]
        }
    },

    methods: {
        signupUser() {
            this.loading = true
            fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {          
                    const { firstname, lastname, username, email, password } = this.$data
                    let user = fb.auth().currentUser;

                    this.$apollo.mutate({
                        mutation: SIGNUP_USER_MUTATION,
                        variables: {
                            id: user.uid,
                            firstname,
                            lastname,
                            username,
                            email,
                            password
                        }
                    }).then(() => { 
                        //profile insert
                        this.$apollo.mutate({
                            mutation: INSERT_USER_PROFILE_MUTATION,
                            variables: {
                                user_id: user.uid,
                                bio: '',
                                avatarUrl: '',
                                website: '',
                                birthdate: '',
                                location: ''
                            }
                        }).then(() => {
                            this.loading = false
                            this.$router.replace('/')   
                        }).catch(error => {
                            this.loading = false
                            let errorCode = error.code;
                            let errorMessage = error.message;
                            if (errorCode) {
                                return this.error = errorCode
                            } else if (errorMessage) {
                                this.error = errorMessage
                            } else {
                                return this.error = error
                            }
                        })
                        // end insert profile
                    })
                    .catch(error => { 
                        this.errorProvider(error)
                    })
                })
                .catch(error => {
                    this.errorProvider(error)
                })
        },

        errorProvider(error) {
            this.loading = false
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode) {
                return this.error = errorCode
            } else if (errorMessage) {
                return this.error = errorMessage
            } else {
                return this.error = error
            }
        }
    }

}
</script>


<style scoped>
.avatar-logo {
    position: relative;
    top: 20px;
    right: 50%;
    left: 50%;
    margin: auto;
}
</style>