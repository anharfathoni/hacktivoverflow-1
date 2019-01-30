<template>
  <div class="formuser container">
    <div class="row">
      <div class="col-5 mt-5">
        <img src="../../public/H-logo2.png" alt="Logo HacktivOverflow">
        <p>Create your Hacktiv Overflow account.</p>
        <p>It's free and only takes a minute.</p>
      </div>
      <div class="col-7">
        <form class="form-signin text-center">
          <img src="" alt="" width="72" height="72">
          <h1 v-if="formLogin" class="login h3 mb-3 font-weight-normal">Login</h1>
          <h1 v-if="!formLogin" class="register h3 mb-3 font-weight-normal">Register for free</h1>
          <input v-if="!formLogin" v-model="name" type="text" id="inputName" class="form-control" placeholder="Name" autofocus>
          <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
          <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password">
          <button v-if="!formLogin" class="btn btn-lg btn-primary btn-block" @click.prevent='register'>Register</button><br>
          <button v-if="formLogin" class="btn btn-lg btn-primary btn-block" @click.prevent='login'>Login</button><br>
          <br>
          <div v-if="!formLogin" class="register">
            <router-link to="/login">
              <p>Have an Account? <button>Login here</button></p>
            </router-link>
          </div>
          <div v-if="formLogin" class="login">
            <router-link to="/register">
              <p>Don't Have an Account? <button>Register here</button></p>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'
import {mapState} from 'vuex'

export default {
  name:'login-register-form',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      formLogin: false, //login or register,
      status: false
    }
  },
  computed: mapState([
    'checkLogin'
  ]),
  methods: {
    checkStatusLogin(){
      if(this.checkLogin){
        this.$router.push('/')
      }
    },
    login(){
      let user = {
        email: this.email,
        password: this.password
      }
      api({
        url: '/login',
        method: "POST",
        data: user
      })
        .then( ({data}) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.userId)
          swal({
            title: data.message,
            icon: "success",
            timer: 2000
          });
          this.name = '',
          this.email = '',
          this.password = ''
          this.$store.dispatch('login')
          this.checkStatusLogin()
        })
        .catch( error => {
          swal({
            title: error.response.data.message,
            icon: "error",
          });
          this.checkStatusLogin()
        })
    },
    register(){
      let self = this
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      api({
        url: '/register',
        method: "POST",
        data: newUser
      })
        .then( user => {
          this.name = '',
          this.email = '',
          this.password = ''
          swal({
            title: user.data.message,
            icon: "success",
            timer: 3000,
          });
        })
        .catch( error => {
          swal({
            title: error.response.data.message,
            icon: "error",
            timer: 3000
          });
        })
    },
    checkStatusForm(){
      let routes = this.$route.path
      if(routes === '/login'){
        this.formLogin = true
      } else if(routes === '/register'){
        this.formLogin = false
      }
    }
  },
  watch: {
    $route(){
      this.$store.dispatch('checkLogin')
      this.checkStatusForm()
      this.checkStatusLogin()
    }
  },
  created(){
    this.$store.dispatch('checkLogin')
    this.checkStatusForm()
    this.checkStatusLogin()
  }

}
</script>

<style>
.formuser{
  margin-top: 10%;
}
</style>
