<template>
    <div class="row">
      <div class="col-md-6">
        <h1 align="center">Register Form</h1>

        <form @submit.prevent="register(user)">
            <div class="form-group" >
              <label for="name">Name:</label>
              <input name="name" type="text" class="form-control"placeholder="Your name" v-model="user.name"
              v-validate="'required'"><br>
              <div class="help-block alert alert-danger" v-show="errors.has('name')">
                {{errors.first('name')}}
              </div>
            </div>
            <div class="form-group" >
              <label for="email">Email:</label>
              <input type="email" name="email" class="form-control"  placeholder="Your email" v-model="user.email"
              v-validate="'required|email'"><br>
              <div class="help-block alert alert-danger" v-show="errors.has('email')">
                {{errors.first('email')}}
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password:</label>
              <input v-validate="'required'" type="password" class="form-control" name="password"  placeholder="Your password" v-model="user.password"
              ><br>
              <div class="help-block alert alert-danger" v-show="errors.has('password')">
                {{errors.first('password')}}
              </div>
            </div>

            <div class="form-group">
              <label for="password_confirmation">Password Confirmation:</label>
              <input v-validate="'required'"  type="password" class="form-control" name="password_confirmation"
                     placeholder="Your password confirmation" v-model="user.password_confirmation"><br>
              <div class="help-block alert alert-danger" v-show="errors.has('password_confirmation')">
                {{errors.first('password_confirmation')}}
              </div>
            </div>

          <div class="form-group">
            <button class=" form-control btn btn-info">Register</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
  import  swal from 'sweetalert'
  export default {
    data() {
      return {
        user: {
          name: null,
          email: null,
          password: null,
          password_confirmation: null,
        }
      }
    },
    methods: {
      resetUser() {
        this.user = {
          name: null,
          email: null,
          password: null,
          password_confirmation: null,
        }
      },


      register(user) {

        this.$validator.validateAll().then((result) => {
          if (result){
            this.$http.post('api/register', user)
              .then(response => {
                this.$router.push('/login');
              })
              .catch(error => {
                swal(error.status.toString(), error.body.message, 'error')
              })
          } else
            return false
        })


      }
    },
  }
</script>

<style>
 .row{
   border-radius: 20px;
   border: 1px solid olivedrab;
 }
 .col-md-6{
   margin: 0 auto;
 }
</style>


<!--получение ошибок от сервера напрямую-->

<!--<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1 align="center">Register Form</h1>

        <form @submit.prevent="register(user)">
          <div class="text-left">
            <div class="form-group" :class="{ 'has-error': errors.name.length }">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Your name" v-model="user.name">
              <p class="help-block" v-for="error in errors.name">{{ error }}</p>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.email.length }">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Your email" v-model="user.email">
              <p class="help-block" v-for="error in errors.email">{{ error }}</p>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.password.length }">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Your password" v-model="user.password">
              <p class="help-block" v-for="error in errors.password">{{ error }}</p>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.password_confirmation.length }">
              <label for="password_confirmation">Password Confirmation</label>
              <input type="password" class="form-control" id="password_confirmation" placeholder="Your password confirmation" v-model="user.password_confirmation">
              <p class="help-block" v-for="error in errors.password_confirmation">{{ error }}</p>
            </div>
          </div>

          <div class="text-center">
            <button class="btn btn-info">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          name: null,
          email: null,
          password: null,
          password_confirmation: null,
        },
        errors: {
          name: [],
          email: [],
          password: [],
          password_confirmation: [],
        },
      }
    },
    methods: {
      resetUser() {
        this.user = {
          name: null,
          email: null,
          password: null,
          password_confirmation: null,
        }
      },
      register(user) {
        this.$http.post('api/register', user)
          .then(response => {
            this.resetUser()
            let successMessage = response.data.message
            alert(successMessage)
          })
          .catch(error => {
            let data = error.body.errors
            for(let key in this.errors) {
              // reset all errors
              this.errors[key] = []
              let errorMessage = data[key]
              if(errorMessage)
                this.errors[key] = errorMessage
            }
          })
      }
    },
  }
</script>-->
