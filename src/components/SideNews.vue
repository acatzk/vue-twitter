<template>
    <div>
         <v-card
                outlined
            >
                <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                </v-img>

                <v-card-text class="text--primary">
                    <div class="subtitle-1">Trends for you</div>
                </v-card-text>

                <template>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Jane Smith</v-list-item-title>
                            <v-list-item-subtitle>@angory</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>Jane Smith</v-list-item-title>
                            <v-list-item-subtitle>@jane</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>Jane Smith</v-list-item-title>
                            <v-list-item-subtitle>@smith</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
         
            </v-card>
    </div>
</template>
