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
                    <div class="headline text-center mt-5">Log out?</div>
                </v-card-text>
      
                <v-btn 
                    rounded 
                    small 
                    dark
                    color="blue" 
                    width="100%"
                    height="50px"
                >
                        Log out
                </v-btn>

      
            </v-card>
    </v-container>
</template>


<script>


export default {
    name: 'Logout',



    data() {
        return {
          
        }
    },

    methods: {
        
    },
}
</script>