<template>
  <div class="marginbottom">
    <b-navbar toggleable="md" type="light" variant="light" class="fixed-top ">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <!-- <router-link :to="'/'"> -->
          <img @click="gohome" src="../../public/hacktivoverflowLogo.png" alt="" height="35vh">
        <!-- </router-link> -->
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="search" class="mr-5" v-if="(this.$route.path !== '/register' && this.$route.path !== '/login')">
            <b-form-input v-model="title" size="sm" class="mr-sm-2" type="text" placeholder="Search Title or Tag" style="width:500px;"/>
          </b-nav-form>

          <b-navbar-nav class="ml-5 mr-3">
            <b-nav-item href="#">Help Center</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-3 mr-2" v-if="!checkLogin">
            <b-button to="/login" variant="success" size="sm" class="mr-3"> SignIn</b-button>
            <b-button to="/register" variant="primary" size="sm"> Register </b-button>
          </b-navbar-nav>

          <b-nav-item-dropdown right v-if="checkLogin">
            <template slot="button-content">
              <i class="fas fa-user"> User</i>
            </template>
            <b-dropdown-item href="#">
              <router-link :to="'/'">
                Profile
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br><br>
    <div class="fixed-top" style="margin-top: 8vh;">
      <div v-if="successMsg" class="alert alert-success" role="alert">{{successMsg}}</div>
      <div v-if="errorMsg" class="alert alert-danger" role="alert">{{errorMsg}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'navbar',
  data(){
    return {
      title: ''
    }
  },
  computed: mapState([
    'errorMsg', 'successMsg', 'checkLogin'
  ]),
  methods: {
    logout(){
      this.$store.dispatch('logout')
    },
    gohome(){
      this.$store.dispatch('getAllQuestions')
      this.$router.push('/')
    },
    search(){
      this.$store.dispatch('search',{title: this.title})
    }
  }
  
};
</script>

<style>
.marginbottom{
  margin-bottom: 5%;
}
</style>

