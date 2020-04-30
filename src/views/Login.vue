<template>
    <v-container>
         <v-card
                class="mx-auto"
                max-width="500"
                outlined
                style="position: relative; top: 80px;"
            >
                <v-avatar style="margin: auto; position: relative; left: 220px; top: 20px;">
                    <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU" width="10%"></v-img>
                </v-avatar>
               
                <v-card-text class="text--primary">
                    <div class="headline text-center mt-5">Log in to Twitter</div>
                </v-card-text>
                 <alert v-show="error" :error="error" class="mx-5"/>
                <v-form
                    class="mx-5 mb-5"
                >

                <v-text-field
                    v-model="email"
                    label="Phone, email, or username"
                    required
                    :rules="[required('Email')]"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    label="Password"
                    required
                    type="password"
                    :rules="[required('password')]"
                ></v-text-field>
                
                <v-btn 
                    rounded 
                    small 
                    dark
                    color="blue" 
                    width="100%"
                    height="50px"
                    @click="loginUser"
                    :loading="loading"
                >
                        Log in
                </v-btn>

                <v-row class="mt-4">
                    <router-link class="body-2" to="/forgot" style="text-decoration: none; position: relative; left: 120px">Forgot password?</router-link>
                    <sign-up /> <!-- this is sign up dialog -->      
                </v-row>

                </v-form>
            </v-card>
            
    </v-container>
</template>


<script>

import Alert from '@/components/Alert'
import { fb } from '@/firebase'
import SignUp from './Signup'

export default {
    name: 'Login',

    components: {
        Alert,
        SignUp
    },

    data() {
        return {
            email: '',
            password: '',
            error: '',
            loading: false,
            required(propertyType) { 
               return v => v && v.length > 0 || `${propertyType} is required.`
            },
        }
    },

    methods: {
        loginUser() {
            this.loading = true
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.loading = false
                    this.$router.replace('/')
                })
                .catch(error =>  {
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
    },
}
</script>