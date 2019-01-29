<template>
  <div class="details">
    <question :question="detailQuestion"></question>
    <hr><br>
    <h5 class="ml-3">{{answers.length}} Answers</h5>
    <hr>
    <answer :answers="answers"></answer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import question from '@/components/Question.vue'
import answer from '@/components/Answer.vue'

export default {
  name: 'detailquestion',
  components: {
    question, answer
  },
  data(){
    return {

    }
  },
  methods: {
    
  },
  computed: mapState([
    'detailQuestion', 'answers'
  ]),
  mounted(){
    this.$store.dispatch('getDetailsQuestion', this.$route.params.questionId)
    this.$store.dispatch('getAnswer', this.$route.params.questionId)
  },
  watch: {
    $route(){
      this.$store.dispatch('getDetailQuestion', this.$route.params.questionId)
      this.$store.dispatch('getAnswer', this.$route.params.questionId)
    }
  }
}
</script>
