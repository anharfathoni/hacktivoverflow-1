<template>
  <div class="container details">
    <div v-for="answer in answers" :key="answer._id">
      <div class="row">
        <div class="col-2 vote">
          <a href="#" @click.prevent="vote('up', answer._id)"><i class="fas fa-sort-up fa-3x"></i></a>
          <h4> {{totalVote(answer)}} </h4>
          <a href="#" @click.prevent="vote('down', answer._id)"><i class="fas fa-sort-down fa-3x"></i></a>
        </div>
        <div class="col-10">
          <b><p v-html="answer.content"></p></b>
          <div class="row">
            <small>Posted on {{answer.createdAt}} by {{answer.userId.name}}</small>
          </div>
          <div class="row">
            <small>Updated on {{answer.updatedAt}}</small>
          </div>
        </div>
        <div class="col-2">
          <router-link :to="`/answer/edit/${answer.questionId}/${answer._id}`">
            <b-button variant="link">Edit</b-button>
          </router-link>
        </div>
      </div>
      <hr>
    </div>
    <hr>
    <div class="form">
      <h4>Your Answer</h4>
      <b-form>  
        <wysiwyg v-model="content"/>
        <br>
        <b-button type="submit" variant="primary" @click.prevent="postAnswer">Post Your Answer</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "answerdetails",
  props: ["answers"],
  data() {
    return {
      content: '',
    };
  },
  methods:{
    postAnswer(){
      let questionId = this.$route.params.questionId
      this.$store.dispatch('postAnswer', {content: this.content, questionId})
    },
    vote(status,answerId){
      let questionId = this.$route.params.questionId
      this.$store.dispatch('voteAnswer', {answerId, questionId, status})
    },
    totalVote(answer){
      if(answer.voteUp){
        return (answer.voteUp).length - (answer.voteDown).length
      } else {
        return 0
      }
    }
  },
  
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.details {
  text-align: left;
}

.vote {
  text-align: center;
}
</style>
