<template>
    <v-form>
        <v-container>
            <v-row>
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
                        flat
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

        }
    },
    methods:{
        login:function(){
            let user = {
                email:this.email,
                password:this.password
            }
            this.$store.dispatch("login",user)
            .then(this.$router.push("/"));
        }
    }

}
</script>