<template>
    <v-container>
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12" xs="10" md="4">
                <v-row> 
                    <v-card>
                        <v-card-title class="primary white--text">Register New Parent Account</v-card-title>
                        <v-card-content><RegisterCard/></v-card-content>
                    </v-card>
                </v-row>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import RegisterCard from '../components/Register'
export default {
    data(){

    },
    components:{
        RegisterCard
    }
}
</script>