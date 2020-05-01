<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <a href="#" class="body-2 ml-3" v-on="on" style="text-decoration: none;">Sign up for Twitter</a>
        </template>
      <v-card class="rounded">     
        <v-form v-model="valid">
            <v-avatar style="margin: auto; position: relative; left: 280px; top: 20px;">
                <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU" width="10%"></v-img>
            </v-avatar>
            
            <v-card-text class="text--primary">
                <div class="headline font-weight-bold mt-5">Create your account</div>
            </v-card-text>

            <v-card-text>
                <alert v-show="error" :error="error" class="mx-5"/>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field 
                            label="Firstname" 
                            v-model="firstname" 
                            :rules="[required('Firstname'), minLength('Firstname', 3), maxLength('Firstname', 20)]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field
                        label="Lastname"
                        hint="Lastname"
                        v-model="lastname"
                        :rules="[required('Lastname'), minLength('Lastname', 3), maxLength('Lastname', 20)]"
                        ></v-text-field>
                    </v-col>
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
                    <v-col cols="12">
                        <v-text-field 
                            label="Password" 
                            type="password" 
                            v-model="password"
                             :rules="[required('Password'), minLength('Password', 5)]"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
                <v-btn 
                    rounded 
                    color="blue darken-1" 
                    @click="signupUser" 
                    :disabled="!valid"
                    :loading="loading"
                >Signup</v-btn>
            </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import { fb } from '@/firebase'
import { SIGNUP_USER_MUTATION } from '@/graphql/mutations/signup'
import Alert from '@/components/Alert'
import { nanoid } from 'nanoid'

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
            }
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
                            this.loading = false
                            this.$router.replace('/')
                        })
                        .catch(error => { 
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
                })
                .catch(error => {
                    this.loading = false
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    if (errorCode) {
                        this.error = errorCode
                    } else if (errorMessage) {
                        this.error = errorMessage
                    } else {
                        this.error = error
                    }
                })
        }
    }

}
</script>