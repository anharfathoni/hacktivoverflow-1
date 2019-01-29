<template>
  <div class="formuser container">
    <div class="row">
      <div class="col-5 mt-5">
        <img src="../../public/H-logo2.png" alt="Logo HacktivOverflow">
        <p>Create your Stack Overflow account.</p>
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
          <p>Continue with </p>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Sign in with Google
          </g-signin-button>
          <br><br>
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

export default {
  name:'login-register-form',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      formLogin: false, //login or register
      googleSignInParams: {
        client_id: '828992207061-gs9c21tstsirf52de5io3i6bopr6ijls.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      console.log('signed in')
      const profile = googleUser.getBasicProfile()
      var id_token = googleUser.getAuthResponse().id_token;
      api
          .post('/users/fblogin', {token: id_token} )
          .then( user => {
            console.log(user)
            this.success = true
            this.successMsg = user.data.message
            localStorage.setItem('token',user.data.token)
            localStorage.setItem('userId', user.data.user._id)
            setTimeout(() => {
              this.clearMessage()
              this.clearForm()
              this.isLogin = true
            }, 2000);
          })
          .catch( error => {
            console.log(error)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.clearMessage()
              // this.clearForm()
            }, 3000);
          })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
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
        .then( user => {
          console.log(user)
          let token = user.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('role', user.data.role)
          swal({
            title: user.data.message,
            icon: "success",
            timer: 2000
          });
          this.$emit('login')
          this.$router.push('/')
        })
        .catch( error => {
          swal({
            title: error.response.data.message,
            icon: "error",
          });
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
          console.log(error.response.data)
          swal({
            title: error.response.data.message,
            icon: "error",
            timer: 3000
          });
        })
    },
    checkStatusForm(){
      console.log("state:", this.$route.params.state)
      let routes = this.$route.params.state
      if(routes === 'login'){
        console.log('lagi login nih')
        this.formLogin = true
      } else if(routes === 'register'){
        console.log('lagi register nih')
        this.formLogin = false
      }
    }
  },
  watch: {
    $route(){
      console.log('cek route lagi dong')
      // console.log(this.$route)
      this.checkStatusForm()
    }
  },
  created(){
    this.checkStatusForm()
  }

}
</script>

<style>
.formuser{
  margin-top: 10%;
}
</style>
