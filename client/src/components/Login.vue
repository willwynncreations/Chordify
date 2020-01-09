<template>
    <v-form>
        <v-container>
            <v-row>
                <v-alert transition="scale-transition" v-if="message" class="error">{{message}}<a href='/reset'>Forgot Password?</a></v-alert>
                <v-col cols="12" xs="12" md="12" >
                    <v-text-field
                        v-model="email"
                        label="Email"
                        required
                        type="email"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        type="password"
                    >

                    </v-text-field>
                    <v-btn
                        class="success"
                        text
                        @click="login"

                    >Login</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
export default {
    name:'Login',
    data(){
        return{
           email:'',
           password:'',
           message:''
        }
    },
    methods:{
        login:function(){
            let user = {
                email:this.email,
                password:this.password
            }
            this.$store.dispatch("login",user)
            .then(()=>{
                if(this.$store.getters.authErrorResponse == 400){
                    this.message=this.$store.getters.authErrorMessage
                    this.$store.dispatch("clearAuthError"); // We need to clear the store messages so that we can continue with another login attempt.
                }else{
                    this.$router.push("/dashboard")
                }
            });
        }
    }

}
</script>