<template>
    <v-container>
        <v-alert v-if="addChildStatus=='Success'" class="success" dismissible>Successfully added new child, assign a chore to get started!</v-alert>
        <AssignChore></AssignChore>
    </v-container>
</template>
<script>
import AssignChore from '../components/assignChore'
export default {
    name:'AssignChores',
    data(){
        return{
            addChildStatus:''
        }
    },
    components:{
        AssignChore
    },
    mounted(){
        this.getStatus();
    },
    methods:{
        getStatus:function(){
            this.addChildStatus = this.$store.getters.addChildStatus;
        }
    }
}
</script>