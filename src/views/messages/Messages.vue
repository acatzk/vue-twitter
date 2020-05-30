<template>
  <v-card
    class="mx-auto"
    flat
    outlined
  >
    <v-card-title class="row justify-space-between mx-2">
      <span class="title font-weight-bold">Messages</span>
      <v-btn icon color="blue darken-1">
          <v-icon>mail_outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text color="blue darken-1">
        <v-text-field
            solo-inverted
            rounded
            flat
            dense
            hide-details
            label="Search for people and groups"
            prepend-inner-icon="search"
            autocomplete="off"
        ></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    
  </v-card>
</template>