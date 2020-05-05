<template>
     <v-text-field 
        :label="label" 
        :counter=counter
        @input="value"
        :value="updateProfile($event.target.value)"
    >
    </v-text-field>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            require: true
        },
        counter: {
            type: Number
        },
        value: {
            type: String,
            required: true
        }
    },  
    computed: {
        updateProfile(value) {
            return this.$emit('updateDate', value)
        }
    }
}
</script>