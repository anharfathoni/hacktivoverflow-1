<template>
  <div class="container form">
    <b-button type="submit" variant="link" to="/">See All Question</b-button>
    <hr>
    <b-form>
      <b-form-group label="Title" label-for="titlequestion">
        <b-form-input id="titlequestion" type="text" placeholder="Whats your programming question? be specific" required v-model="question.title"></b-form-input>
      </b-form-group>
      <b-form-group label="Body" label-for="bodyquestion">
        <wysiwyg v-model="question.body"/>
      </b-form-group>
      <vue-tags-input
        placeholder="e.g.(vue-cli, javascript)"
        v-model="tag"
        :tags="question.tags"
        :autocomplete-items="filteredItems"
        @tags-changed="newTags => question.tags = newTags"
        @submit.prevent="createTag"
      />
      <br>
      <b-button type="submit" variant="primary" @click.prevent="postQuestion">Post Your Question</b-button>
    </b-form>
  </div>
</template>

<script>
import api from "@/api/api.js";
import {mapState} from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input';

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
      statusTag: null,

      tag: '',
      autocompleteItems: [{
        text: 'javascript',
      }, {
        text: 'nodejs',
      }],
    };
  },
  computed: {
    filteredItems(){
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
      })
    },
    checkLogin(){
      return this.$store.state.checkLogin
    }
  },
  watch: {
    tag(val){
      let data = this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(val.toLowerCase()) !== -1
      })
    }
  },
  mounted() {
    this.checkStatusLogin()
    this.getTags()
  },
  methods: {
    checkStatusLogin() {
      if(!this.checkLogin) {
        this.$router.push('/login')
      }
    },
    postQuestion() {
      if (this.checkLogin) {
        this.$store.dispatch('postQuestion', this.question)
        this.createTag()
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    },
    getTags(){
      api({
        url: '/tags'
      })
        .then( ({data}) => {
          this.autocompleteItems = data.tags
        })
        .catch( error => {
          console.log(error.response.data)
        })
    },
    createTag(){ 
      this.question.tags.forEach(e => {
        api({
          url: '/tags',
          method: "post",
          data: {text: e.text}
        })
          .then( ({data}) => {
            this.getTags()
          })
          .catch( error => {
            console.log(error.response.data)
          })
      });
      
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

