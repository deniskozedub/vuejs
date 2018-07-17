<template>
  <div class="header clearfix">
    <nav>
      <ul class="nav nav-pills pull-right">
        <router-link class="btn btn-default" tag="li" to="/login" v-if="! isAuth">
          <a href="">Login</a>
        </router-link>
        <router-link class="btn btn-default"  tag="li" to="/register" v-if="! isAuth">
          <a href="">Register</a>
        </router-link>
        <router-link class="btn btn-default"  tag="li" to="/feed" v-if="isAuth">
          <a href="">Feed</a>
        </router-link>
        <router-link class="btn btn-default"  tag="li" to="/product/create" v-if="isAuth" >
          <a href="" >Create</a>
        </router-link>
        <button @click="logout" class="btn btn-primary" v-if="isAuth">Logout</button>
      </ul>
    </nav>
    <h3 class="text-muted">Project name</h3>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            isAuth: null
          }
        },
      created(){
          this.isAuth = this.$auth.isAuthenticated();
          this.setAuthenticatedUser();
      },

      methods: {
        setAuthenticatedUser () {
          this.$http.get('api/user')
              .then(response => {
                  this.$auth.setAuthenticatedUser(response.body)

                  console.log(this.$auth.getAuthenticatedUser())

              })
        },

        logout () {
          this.$auth.destroyToken();
          this.$router.push('/login');
        }
      }
    }
</script>

<style>
  .btn-success>a{
    color: white;
    text-decoration: none;
  }
  .btn-default{
    border: 1px solid blue;
  }
  .btn-default>a{
    text-decoration: none;
  }
  .btn-primary{
    margin-left: 400px;
  }
  .btn-default{
    margin-left: 5px;
  }
</style>


