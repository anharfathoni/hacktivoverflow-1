<template>
  <div class="form">
    <h4>Edit Answer</h4>
    <b-form>
      <wysiwyg v-model="answer.content"/>
      <br>
      <b-button type="submit" variant="primary" @click.prevent="editAnswer">Edit Your Answer</b-button>
    </b-form>
  </div>
</template>

<script>
import api from '@/api/api.js'
import { mapState } from 'vuex';

export default {
  name: "editanswer",
  data() {
    return {
      answer: {
        content: ''
      }
    };
  },
  created(){
    this.getAnswer()
  },
  computed: mapState([
    'detailAnswer'
  ]),
  methods: {
    editAnswer(){
      let answerId = this.$route.params.answerId
      let questionId = this.$route.params.questionId
      this.$store.dispatch('editAnswer', {answerId, questionId, content: this.answer.content})
      this.$router.push(`/questions/${questionId}`)
    },
    getAnswer(){
        let answerId = this.$route.params.answerId
        let questionId = this.$route.params.questionId
        this.$store.dispatch('getOneAnswer', {answerId, questionId})
    }
  },
  watch: {
    detailAnswer(val){
      this.answer = val
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
