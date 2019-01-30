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
      <!-- <b-form-group label="Tags" label-for="tagquestion">
        <b-form-input id="tagquestion" type="text" placeholder="e.g.(vue-cli, javascript)" v-model="question.tags"></b-form-input>
      </b-form-group> -->
      <vue-tags-input
        placeholder="e.g.(vue-cli, javascript)"
        v-model="tag"
        :tags="question.tags"
        :autocomplete-items="filteredItems"
        @tags-changed="newTags => question.tags = newTags"
        @submit.prevent="createTag"
      />
      <br>
      <b-button type="submit" variant="primary" @click.prevent="editQuestion">Edit Your Question</b-button>
    </b-form>
  </div>
</template>

<script>
import api from "@/api/api.js";
import {mapState} from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: "askquestion",
  components: {
    VueTagsInput
  },
  data() {
    return {
      isLogin: false,

      question: {
        title: "",
        body: "",
        tags: []
      },

      tag: '',
    };
  },
  computed: mapState([
    'checkLogin', 'detailQuestion'
  ]),
  computed: {
    checkLogin(){
      return this.$store.state.checkLogin
    },
    detailQuestion(){
      return this.$store.state.detailQuestion
    },
    autocompleteItems(){
      return this.$store.state.autocompleteItems
    },
    filteredItems(){
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
      })
    },
  },
  mounted() {
    this.checkStatusLogin()
    this.getDataQuestion()
    this.getTags()
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
        this.createTag()
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    },
    getTags(){
      this.$store.dispatch('getTags')
    },
    createTag(){ 
      this.question.tags.forEach(e => {
        let a = this.autocompleteItems.filter( item => item.text === e)
        if(a.length === 0){
          api({
            url: '/tags',
            method: "post",
            data: {text: e}
          })
            .then( ({data}) => {
              this.getTags()
            })
            .catch( error => {
              console.log(error.response.data)
            })
        }
      }); 
    }
  },
  watch: {
    detailQuestion(val){
      this.question = val
      this.question.tags = []
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

