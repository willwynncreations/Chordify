<template>
    <v-container>
        <v-alert transition="scale-transition" v-if="message" class="success" dismissible>{{message}}</v-alert>
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12" xs="12" md="3">
                <v-card>
                    <v-card-title class="primary white--text">Parent Login</v-card-title>
                    <v-card-text>
                        <Login></Login>
                    </v-card-text>
                </v-card>
                
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Login from '../components/Login'
export default {
    data(){
        return{
            alert:false,
            message:''
        }
    },
    mounted(){
        this.checkMessages();
       
    },
    methods:{
        checkMessages:function(){
            this.message = this.$store.getters.affirmativeMessage;
            if(this.message !== ''){
                this.alert = true;

            }
        }
    },
    components:{
        Login
    }
}
</script>