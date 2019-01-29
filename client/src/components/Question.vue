<template>
  <div class="container details">
    <div class="row">
      <h4>{{question.title}}</h4>
      <div v-if="checkOwner">
        <router-link :to="`/questions/edit/${question._id}`">
          <b-button variant="link">Edit</b-button>
        </router-link>
        <b-button variant="link" @click.prevent="deleteQuestion">Delete</b-button>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-2 vote">
        <a href="#" @click.prevent="vote('up')"><i class="fas fa-sort-up fa-3x"></i></a>
        <h4> {{totalVote}} </h4>
        <a href="#" @click.prevent="vote('down')"><i class="fas fa-sort-down fa-3x"></i></a>
      </div>
      <div class="col-10">
        <p>Detail Question:</p>
        <p v-html="question.body"></p>
        <small>Posted on {{String(question.updatedAt).slice(0,10)}} by {{question.userId.name}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'questiondetails',
  props: ['question'],
  data(){
    return {
    }
  },
  methods: {
    vote(status){
      let questionId = this.$route.params.questionId
      console.log(`vote question ${questionId}-`, status)
      this.$store.dispatch('voteQuestion', {status, questionId})
    },
    deleteQuestion(){
      this.$store.dispatch('deleteQuestion', this.$route.params.questionId)
      this.$router.push('/')
    }
  },
  computed: {
    checkOwner(){
      if(localStorage.userId === this.question.userId._id){
        return true
      } else {
        return false
      }
    },
    totalVote(){
      if(this.question.voteUp){
        return (this.question.voteUp).length - (this.question.voteDown).length
      } else {
        return 0
      }
    }
  }

}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.details{
  text-align: left;
}

.vote{
  text-align: center;
}

a{
  color: grey;
}
</style>


