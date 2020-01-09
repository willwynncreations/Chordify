<template>
    <v-container>
        {{children[1][0].firstname}}
    </v-container>
</template>
<script>
export default {
    name:'assignChore',
    data(){
        return{
            addChildStatus:'',
            children:[]
        }
    },
    methods:{
        getStatus:function(){
            this.addChildStatus = this.$store.getters.addChildStatus;
            this.children = this.$store.getters.children;
        }
    },
    mounted(){
        this.getStatus();
    }
}
</script>