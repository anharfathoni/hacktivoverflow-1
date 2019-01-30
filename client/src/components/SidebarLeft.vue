<template>
  <div class="px-1" style="border; ">
    <b-card header="HacktivOverflow" header-tag="header">
      <b-button href="#" variant="light" @click.prevent="gohome">Home</b-button>
      <br>
      <b-button href="" variant="light">Users</b-button>
    </b-card>
    <b-card header="Watched Tag" header-tag="header">
      <b-form @submit.prevent="add">
        <input type="text" name="" id="" v-model="watchtag" style="width: 8vw;">
      </b-form>
      <a @click.prevent="search(tag)" href="" class="mr-2" v-for="tag in listWatchedTags" :key="tag.id">
        <small >{{tag}}</small>
      </a>
    </b-card>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: "sidebar",
  data(){
    return {
      watchtag: '',
      listWatchedTags: []
    }
  },
  methods: {
    search(tag){
      // console.log("ADDDD",tag)
      this.$store.dispatch('search',{title: tag})
    },
    gohome(){
      this.$store.dispatch('getAllQuestions')
      this.$router.push('/')
    },
    add(){
      console.log('add tag = ', this.watchtag)
      api({
        url: '/users',
        method: 'PUT',
        data: { watchedTags: this.watchtag},
        headers: {
          token: localStorage.token
        }
      })
        .then( ({data}) => {
          this.watchtag = ''
          this.getDataUser()
        })
        .catch( error => {
          console.log(error.response.data)
        })
    },
    getDataUser(){
      console.log('get data user')
      api({
        url: '/users',
        headers: {
          token: localStorage.token
        }
      })
        .then( ({data}) => {
          console.log(data)
          this.listWatchedTags = data.user.watchedTags
        })
        .catch( error => {
          console.log(error.response.data)
        })
    }
  },
  created(){
    this.getDataUser()
  }
};
</script>

<style>
</style>