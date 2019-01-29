<template>
  <div class="home">
    <div class="row">
      <div class="col-2"><p>Sidebar Left</p></div>
      <div class="col-7"><ListQuestions></ListQuestions></div>
      <div class="col-3"><p>Sidebar Right</p></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ListQuestions from '@/components/ListQuestions.vue'

export default {
  name: 'home',
  components: {
    HelloWorld, ListQuestions
  },
  created(){
    this.$store.dispatch('getAllQuestions')
  }
}
</script>
