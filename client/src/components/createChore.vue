<template>
    <v-form>
        <v-container>
            <v-alert v-model="createStatus" class="primary"  dismissible>{{createMessage}}</v-alert>
            <v-row>
                <v-col cols="12" xs="12" md="12">
                    <v-text-field
                        type="text"
                        v-model="title"
                        label="Chore Title"
                        placeholder="Give your chore a title/name"
                        required
                    >
                    </v-text-field>
                    <v-textarea v-model="description" placeholder="Describe your chore"></v-textarea>
                    <v-text-field
                        type="number"
                        v-model="experience"
                        placeholder="How much experience is this worth?"
                        label="Experience"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        type="number"
                        v-model="coins"
                        placeholder="What is the coin reward?"
                        label="Coins"
                        required
                    >
                    </v-text-field>
                    <v-btn @click="createChore" text class="success">Add Chore</v-btn>
                </v-col>
            </v-row>
    </v-container>
    </v-form>
</template>
<script>
export default {
    name:'createChore',
    data(){
        return{
            title:'',
            description: '',
            experience: '',
            coins: '',
            parent_id: '',
            createStatus:true,
            createMessage:''
        }
    },
    methods:{
        createChore:function(){
            let chore = {
                title: this.title,
                description: this.description,
                experience: this.experience,
                coins: this.coins,
                parent_id: this.$store.getters.parent._id
            }

            this.dispatch("createChore", chore)
            .then(()=>{
                this.createMessage = `Successfully added new chore - <strong>${this.title}</strong>`;
                this.createStatus = true;
            })
            .catch(err=>{
                this.createStatus = true;
                this.createMessage = `Error adding new chore - ${err}`;
            });        
        }
    },
    mounted(){

    }
}
</script>