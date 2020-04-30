<template>
    <div>
        <v-card  
            class="mx-auto mb-2"
            flat
            outlined
           
            style="text-decoration: none;"
        >
        <v-list-item>
            <v-list-item-avatar color="grey">
                <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_oLh-lBWDZkLGJkA9txG8r0DGFr5IkgRBmTpRKfIyH-15m82V&usqp=CAU"
                ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="subtitle-2" style="position: relative; top: 4px;">Joshua Galit</v-list-item-title>
                <v-list-item-subtitle class="caption" style="position: relative; bottom: 4px;">@angryboy</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="194"
        ></v-img>

        <v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
        </v-card-text>

        <v-card-actions>
            <v-list-item class="grow">
                <v-row class="justify-space-between">
                    <v-btn icon>
                        <v-icon>chat_bubble_outline</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>transform</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>keyboard_capslock</v-icon>
                    </v-btn>
                </v-row>
            </v-list-item>
        </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'PostCard'
}
</script>