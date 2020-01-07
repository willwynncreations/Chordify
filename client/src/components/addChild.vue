<template>
    <v-form>
        <v-container>
            <v-alert v-if="addChildStatus === 'Success'" class="success" dismissible>Successfully Added Child!</v-alert>
            <v-row>
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        v-model="firstname"
                        type="text"
                        placeholder="First Name"
                        required
                        label="First Name"
                    >

                    </v-text-field>
                    <v-text-field
                        v-model="lastname"
                        type="text"
                        placeholder="Last Name"
                        required
                        label="Last Name"
                    >

                    </v-text-field>
                    <v-text-field
                        v-model="age"
                        type="text"
                        placeholder="Age"
                        required
                        label="Age"
                    >

                    </v-text-field>

                    <v-text-field
                        v-model="username"
                        type="text"
                        placeholder="Username"
                        required
                        label="Username"
                    >

                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        type="password"
                        placeholder="PIN code"
                        required
                        label="4 Digit PIN"
                    >

                    </v-text-field>
                    <v-btn
                        text
                        @click="addChild"
                        class="success"
                    >
                        Add
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
export default {
    name:'add-child',
    data(){
        return{
            firstname:'',
            lastname: '',
            age: '',
            username:'',
            password:'',
            parent:{}
        }
    },
    methods:{
        addChild: function (){
            let child = {
                firstname: this.firstname,
                lastname: this.lastname,
                age: this.age,
                username: this.username,
                password: this.password,
                parent_id: this.parent._id
            }
           alert(JSON.stringify(child))

            //create the new child via store addChild action and then reset the form.
            this.$store.dispatch("addChild", child)
            .then(this.resetForm())
            .then(this.$router.push(`/assignchores/${this.$store.getters.newChildID}`));//head on to the initial assignment page for a new child.
        },
        resetForm: function (){
            this.firstname = '',
            this.lastname = '',
            this.age = '',
            this.username = '',
            this.password = ''
        },
        getParent:function(){
            this.parent = this.$store.getters.parent;
        }
    },
    mounted(){
        this.getParent();
    },
    computed:{
        addChildStatus: function(){
            return this.$store.getters.addChildStatus;
        }
    }
}
</script>