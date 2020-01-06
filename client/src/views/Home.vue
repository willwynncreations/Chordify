<template>
  <div class="home">
    <Landing />

  </div>
</template>

<script>
// @ is an alias to /src
import Landing from '../components/Landing'

export default {
  name: 'home',
  components: {
    Landing
  },
  data(){
    return{
      dialog:false
    }
  }
}
</script>
