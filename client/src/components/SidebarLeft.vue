<template>
  <div class="px-1" style="border; ">
    <b-card header="HacktivOverflow" header-tag="header">
      <b-button href="#" variant="light" @click.prevent="gohome">Home</b-button>
      <br>
      <b-button href="" variant="light">Users</b-button>
    </b-card>
    <b-card header="Watched Tag" header-tag="header">
      <input type="text" name="" id="" v-model="watchtag" style="width: 8vw;">
      <!-- <small v-for="tag in watchtag" :key="tag.id">{{tag}}</small> -->
    </b-card>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  methods: {
    gohome(){
      this.$store.dispatch('getAllQuestions')
      this.$router.push('/')
    },
  }
};
</script>

<style>
</style>