<template>
  <div class="home">
    <div class="row" v-if="this.$route.path === '/'">
      <div class="col-2"><p>Sidebar Left</p></div>
      <div class="col-7"><ListQuestions></ListQuestions></div>
      <div class="col-3"><p>Sidebar Right</p></div>
    </div>
    <router-view v-if="this.$route.path !== '/'"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ListQuestions from '@/components/ListQuestions.vue'
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    HelloWorld, ListQuestions
  },
  methods: {
    checkStatusLogin(){
      if(this.statusLogin){
        console.log('sudah login')
        // this.$route.push('/')
      }
    }
  },
  created(){
    this.$store.dispatch('getAllQuestions')
    this.checkStatusLogin()
  },
  computed: mapState([
    'statusLogin'
  ])
}
</script>
