<template>
  <div class="container form">
    <b-button type="submit" variant="link" to="/question">See All Question</b-button>
    <hr>
    <b-form>
      <b-form-group label="Title" label-for="titlequestion">
        <b-form-input v-model="question.title" id="titlequestion" type="text" placeholder="Whats your programming question? be specific" required ></b-form-input>
      </b-form-group>
      <b-form-group label="Body" label-for="bodyquestion">
        <wysiwyg v-model="question.body"/>
      </b-form-group>
      <b-form-group label="Tags" label-for="tagquestion">
        <b-form-input id="tagquestion" type="text" placeholder="e.g.(vue-cli, javascript)" v-model="question.tags"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" @click.prevent="editQuestion">Edit Your Question</b-button>
    </b-form>
  </div>
</template>

<script>
import api from "@/api/api.js";
import {mapState} from 'vuex'

export default {
  name: "askquestion",
  data() {
    return {
      isLogin: false,

      question: {
        title: "",
        body: "",
        tags: []
      },
    };
  },
  computed: mapState([
    'checkLogin', 'detailQuestion'
  ]),
  mounted() {
    this.checkStatusLogin()
    this.getDataQuestion()
  },
  methods: {
    checkStatusLogin() {
      if(!this.checkLogin) {
        this.$router.push('/login')
      }
    },
    getDataQuestion(){
      console.log('coba get detail')
      this.$store.dispatch('getDetailsQuestion', this.$route.params.questionId)
    },
    editQuestion() {
      if (this.checkLogin) {
        this.$store.dispatch('editQuestion', {questionId: this.$route.params.questionId, question: this.question})
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  },
  watch: {
    detailQuestion(val){
      this.question = val
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.form {
  text-align: left;
}
</style>

