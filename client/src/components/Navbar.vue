<template>
  <div class="marginbottom">
    <b-navbar toggleable="md" type="light" variant="light" class="fixed-top ">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <router-link :to="'/'">
          <img src="../../public/hacktivoverflowLogo.png" alt="" height="35vh">
        </router-link>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link :to="'/'">
              Home
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="mr-5">
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" style="width:500px;"/>
          </b-nav-form>

          <b-navbar-nav class="ml-5 mr-3">
            <b-nav-item href="#">Help Center</b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right v-if="statusLogin">
            <template slot="button-content">
              <i class="fas fa-user"> User</i>
            </template>
            <b-dropdown-item href="#">
              <router-link :to="'/details/order-list'">
                Profile
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
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
export default {
  name: 'navbar',
  data(){
    return {
      statusLogin: true,
    }
  },
  computed: {
    errorMsg(){
      return this.$store.state.errorMsg
    },
    successMsg(){
      return this.$store.state.successMsg
    }
  }
  
};
</script>

<style>
.marginbottom{
  margin-bottom: 8%;
}
</style>

