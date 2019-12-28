<template>
    <v-form v-model="valid">
        <v-container >
            <v-row>     
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        required
                        type="email"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        type="password"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        v-model="confirmPassword"
                        label="Confirm Password"
                        required
                        type="password"
                    >
                    </v-text-field>
                </v-col>               
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        v-model="title"
                        label="Title"
                        required
                        placeholder="Mom, Dad, etc"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        v-model="firstname"
                        label="First Name"
                        required
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        v-model="lastname"
                        label="Last Name"
                        required
                    >
                    </v-text-field>
                </v-col>
                <v-col align="right" cols="12" xs="12" md="12">
                    <v-btn class="primary" @click="register" >Submit</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
export default {
    name:"RegisterCard",
    data(){
       return { 
           valid:true
       
       }
    },
    methods:{
        register: function (){

            if(this.passwordMatched){
 
                let parent = {
                    email:this.email,
                    password:this.password,
                    title:this.title,
                    firstName: this.firstName,
                    lastname: this.lastname
                }


                this.$store.dispatch("login",parent);               
            }
        }
    },
    computed:{
        passwordMatched:function(){ //Use this to style the confirm password field appropriately and enable/disable the submit button
            if(this.confirmPassword != this.password){
                return false;
            }else{
                return true;
            }
        }
    }
}
</script>