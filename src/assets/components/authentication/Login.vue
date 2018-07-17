<template>
  <div class="row">
    <div class="col-md-6">
      <h1 align="center">Login Form</h1>
      <div class="panel panel-default">
        <form @submit.prevent="login">
        <div class="panel-body">
          <div class="form-group">
            <label for="login">Login:</label><br>
            <input name="login" v-model="email" class="form-control" type="email" placeholder="Email"
            v-validate="'required|email'"><br>
            <div class="help-block alert alert-danger" v-show="errors.has('login')">
              {{errors.first('login')}}
            </div>
          </div>
          <div class="form-group">
            <label for="pass">Password:</label><br>
            <input name="pass" v-model="password" class="form-control" type="password" placeholder="Password"
            v-validate="'required'"><br>
            <div class="help-block alert alert-danger" v-show="errors.has('pass')">
              {{errors.first('pass')}}
            </div>
          </div>
          <div class="form-group">
          <button class="form-control btn btn-success pull-right">Login</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>﻿
</template>

<script>
  import  swal from 'sweetalert'
    export default {
        name: "Login",

      data () {
          return{
            email     : '',
            password  : ''
          }
      },
      methods: {
          login (){
            let data = {
              client_id     : 2,
              grant_type    : 'password',
              client_secret : 'q1jdKJ1eZO8vWL6YuDsrJTHV1myYcMtdWp4moQI9',
              username      :  this.email,
              password      :  this.password

            };

            this.$validator.validateAll().then( (result) => {
              if (result) {
                this.$http.post('oauth/token', data)
                  .then(responce => {
                    this.$auth.setToken(responce.body.access_token,responce.body.expires_in + Date.now());
                    this.$router.push('/feed');
                  })
                  .catch (error => {
                    swal(error.status.toString(), error.body.message, 'error')
                  })
              }else
                return false

            })
          }
      }
    }
</script>

<style scoped>
  .row{
    border-radius: 20px;
    border: 1px solid olivedrab;
  }
  .col-md-6{
    margin: 0 auto;
  }

</style>
