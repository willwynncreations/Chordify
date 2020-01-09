<template>
    <v-container>
        <v-row>
            <v-col cols="12" xs="12" md="12">
                Active Chores{{children}}
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" xs="12" md="4">
                <v-card>
                    <v-card-title>Create Chore</v-card-title>
                    <v-card-text>
                        <addChore></addChore>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" xs="12" md="4">
                <v-card>
                    <v-card-title>Add Child</v-card-title>
                    <v-card-text>
                        <addChild></addChild>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" xs="12" md="4">
                <v-card>
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
import addChore from '../components/addChore'
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
            this.$store.dispatch("loadChildren");
        },
        getChildren: function(){
            this.children = this.$store.getters.children;
        }
    },
    components:{
        addChore,
        addChild
    },
    computed:{

    }
}
</script>
