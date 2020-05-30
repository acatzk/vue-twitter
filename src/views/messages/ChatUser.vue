<template>
  <v-card
    class="mx-auto"
    flat
    outlined
  >
    <v-card-title class="mx-3">
        <v-row class="d-flex justify-space-between">
            <v-btn 
                icon 
                color="blue darken-1" 
                router to="/messages"
            >
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <div style="position: absolute; margin-left: 55px;">
               <v-list-item-content class="d-flex justify-space-between">
                    <v-list-item-title class="font-weight-black" style="position: relative; bottom: 10px;">
                        JOSHUA GALIT
                    </v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light" style="position: relative; bottom: 10px;">
                        @angryboy
                    </v-list-item-subtitle>
                </v-list-item-content>
            </div>

            <div class="float-left">
                <v-btn icon color="blue darken-1">
                    <v-icon>info_outline</v-icon>
                </v-btn>
            </div>
        </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text color="blue darken-1" style="height: 70vh;" class="overflow-y-auto">
          <v-radio-group column>
            <v-radio label="Bahamas, The" value="bahamas"></v-radio>
            <v-radio label="Bahrain" value="bahrain"></v-radio>
            <v-radio label="Bangladesh" value="bangladesh"></v-radio>
            <v-radio label="Barbados" value="barbados"></v-radio>
            <v-radio label="Belarus" value="belarus"></v-radio>
            <v-radio label="Belgium" value="belgium"></v-radio>
            <v-radio label="Belize" value="belize"></v-radio>
            <v-radio label="Benin" value="benin"></v-radio>
            <v-radio label="Bhutan" value="bhutan"></v-radio>
            <v-radio label="Bolivia" value="bolivia"></v-radio>
            <v-radio label="Bosnia and Herzegovina" value="bosnia"></v-radio>
            <v-radio label="Botswana" value="botswana"></v-radio>
            <v-radio label="Brazil" value="brazil"></v-radio>
            <v-radio label="Brunei" value="brunei"></v-radio>
            <v-radio label="Bulgaria" value="bulgaria"></v-radio>
            <v-radio label="Burkina Faso" value="burkina"></v-radio>
            <v-radio label="Burma" value="burma"></v-radio>
            <v-radio label="Burundi" value="burundi"></v-radio>
          </v-radio-group>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-btn icon color="blue darken-1">
            <v-icon>add_photo_alternate</v-icon>
        </v-btn>
        <v-btn icon color="blue darken-1">
            <v-icon>camera_enhance</v-icon>
        </v-btn>
        <v-text-field
            solo-inverted
            rounded
            flat
            dense
            hide-details
            v-model="chat"
            label="Start a new message"
            autocomplete="off"
        ></v-text-field>
        <v-btn icon color="blue darken-1" :disabled="chat === ''">
            <v-icon>send</v-icon>
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: 'ChatUser',

    data () {
        return {
            chat: ''
        }
    }
}
</script>