<template>
  <div>
    <div class="listquestions">
      <div class="row">
        <div class="col-5">
          <div class="float-left">
            <p>All Question</p>
            <p>{{listQuestions.length}} Questions</p>
          </div>
        </div>
        <div class="col-7">
          <div class="float-right">
            <div class="row mb-3">
              <router-link :to="'/questions/ask'">
                <b-button size="sm" variant="primary">Ask Question</b-button>
              </router-link>
            </div>
            <div class="row">
              <router-link :to="''">
                <b-card no-body style="width: 6rem;" @click.prevent="sort('newest')">
                  <small>Newest</small>
                </b-card>
              </router-link>
              <router-link :to="''">
                <b-card no-body style="width: 6rem;" @click.prevent="sortingVote">
                  <small>Votes</small>
                </b-card>
              </router-link>
              <router-link :to="''">
                <b-card no-body style="width: 6rem;" @click.prevent="sortingAnswer">
                  <small>Unanswered</small>
                </b-card>
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row mb-3 listquestions" v-for="(question, index) in listQuestions" :key="index">
      <div class="col-3">
        <div class="row">
          <b-card no-body style="width: 4rem;" class="mr-2">
            <p>{{totalVote(question)}}</p>
            <small>Vote</small>
          </b-card>
          <b-card no-body style="width: 4rem;">
            <p>{{totalAnswer(question)}}</p>
            <small>Answer</small>
          </b-card>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <router-link :to="`/questions/${question._id}`">
            <p>{{question.title}}</p>
          </router-link>
        </div>
        <div class="row">
          <b-badge @click.prevent="search(tag)" variant="primary" class="mr-1" v-for="tag in question.tags" :key="tag.id">{{tag}}</b-badge>
        </div>
      </div>
      <div class="col-3">
        <div class="row">
          <img src="../../public/H-logo2.png" alt="avatar" height="30">
          <small>{{question.userId.name}}</small>
        </div>
        <div class="row">
          <small>
            <small>Asked {{moment(question.createdAt).calendar()}}</small>
            <br>
            <small>Updated {{moment(question.updatedAt).calendar()}}</small>
          </small>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "listquestions",
  data() {
    return {};
  },
  methods: {
    totalVote(question){
      if(question.voteUp){
        return (question.voteUp.length - question.voteDown.length)
      } else {
        return 0
      }
    },
    totalAnswer(question){
      if(question.answerId){
        return question.answerId.length
      } else {
        return 0
      }
    },
    search(title){
      this.$store.dispatch('search', {title})
    },
    sort(sort){
      this.$store.dispatch('search', {sort})
    },
    sortingVote(){
      this.listQuestions.sort(function(a, b){ return (a.voteUp.length-a.voteDown.length) - (b.voteUp.length - b.voteDown.length) })
    },
    sortingAnswer(){
      this.listQuestions.sort(function(a, b){ return (a.answerId.length) - (b.answerId.length) })
    }

  },
  computed: mapState(["listQuestions"])
};
</script>

<style>
.listquestions {
  padding-bottom: 3%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
</style>
