<template>
    <v-container>
        <v-row>
            <v-col cols="12" xs="12" md="12">
                Active Chores{{children}}
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" xs="12" md="4">
                <v-card dark>
                    <v-card-title>Create Chore</v-card-title>
                    <v-card-text>
                        <createChore></createChore>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" xs="12" md="4">
                <v-card dark>
                    <v-card-title>Add Child</v-card-title>
                    <v-card-text>
                        <addChild></addChild>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" xs="12" md="4">
                <v-card dark>
                    <v-card-title>Assign Chore</v-card-title>
                    <v-card-text>
                        <addChild></addChild>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import createChore from '../components/createChore'
import addChild from '../components/addChild'
export default {
    name: "Dashboard",
    data(){
        return{
            children : []
        }
    },
    mounted(){
        this.loadChildren();
        this.getChildren();
    },
    methods:{
        loadChildren: function(){
            this.$store.dispatch("loadChildren");//load up the parent's children in the store.
        },
        getChildren: function(){
            this.children = this.$store.getters.children;//pull children from the store
        }
    },
    components:{
        createChore,
        addChild
    },
    computed:{

    }
}
</script>
