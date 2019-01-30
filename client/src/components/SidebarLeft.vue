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
      <a @click.prevent="search(tag)" href="" class="mr-2" v-for="tag in watchedTags" :key="tag.id">
        <small >{{tag}}</small>
      </a>
    </b-card>
  </div>
</template>

<script>
import api from '@/api/api.js'
import { mapState } from 'vuex';

export default {
  name: "sidebar",
  data(){
    return {
      watchtag: '',
      // listWatchedTags: []
    }
  },
  computed: mapState([
    'watchedTags'
  ]),
  methods: {
    search(tag){
      this.$store.dispatch('search',{title: tag})
    },
    gohome(){
      this.$store.dispatch('getAllQuestions')
      this.$router.push('/')
    },
    add(){
      this.$store.dispatch('addWatchedTags', this.watchtag)
    },
    getDataUser(){
      this.$store.dispatch('getDataUser')
    }
  },
  created(){
    this.getDataUser()
  }
};
</script>

<style>
</style>