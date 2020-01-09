<template>
  <v-container fluid fill-height class="grey lighten-5 splash pa-0">
    <v-row no-gutters >
      <v-col cols="12" xs="12" md="12">
        <v-row 
          align="center"
          justify="center"
          class="blue lighten-1  white--text"
          style="height:300px"
          
        >
          <span><strong>Chordify:</strong> Turn chores into a game!</span>
        </v-row>
        <v-row
          align="center"
          justify="center"
          style="height:20px"
        >
          <span><strong>Auth Status</strong> - {{getState}}</span>
        </v-row>
        <v-row
          align="center"
          justify="center"
          style="height:201px"
          
        >
          <v-btn 
            @click="logout"
            class="success"
          >Logout</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
export default {
  name:'Landing',
  data(){
    return {
      status:'',
      token: '',
      isLoggedIn: false
    }
  },
  mounted(){

  },
  computed:{
    getStatus:function(){
      return this.$store.getters.authStatus;
    },
    getToken: function(){
      return this.$store.getters.token;
    },
    getParent:function(){
      return this.$store.getters.parent;
    },
    getIsLoggedIn:function(){
      return this.$store.getters.isLoggedIn;
    },
    getState: function(){
      return this.$store.getters.state
    }
  },
  methods:{
    logout:function(){
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
}
</script>
<style scoped>
  .splash{
    min-height: 100%;
  }
</style>
