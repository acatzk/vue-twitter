<template>
    <v-container>
         <v-card
                class="mx-auto"
                max-width="500"
                outlined
                style="position: relative; top: 30%;"
            >
                <v-avatar class="avatar-logo">
                    <v-icon large color="blue">mdi-twitter</v-icon>
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
                    :rules="[required('Email')]"
                ></v-text-field>

                <v-text-field
                    v-model="password" 
                    label="Password"
                    :rules="[required('password')]"
                    :append-icon="value ? 'visibility' : 'visibility_off'"
                    @click:append="() => (value = !value)"
                    :type="value ? 'password' : 'text'"
                    @keyup.enter="loginUser"
                ></v-text-field>
                
                <v-btn 
                    rounded 
                    small 
                    dark
                    depressed
                    color="blue" 
                    width="100%"
                    height="50px"
                    @click="loginUser"
                    :loading="loading"
                >
                        Log in
                </v-btn>

                <div class="justify-space-between mx-3">
                    <sign-up />     
                </div>
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
            value: String,
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
    },
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