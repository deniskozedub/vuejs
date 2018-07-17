<template>
  <div class="col-md-4" >
    <div class="thumbnail">
      <img :src="'http://localhost:8080/'+ product.image" >
      <div class="caption">
        <h3>{{product.name}}</h3>
        <p>{{product.price}}</p>
        <hr>
        <p>
          <a class="btn btn-info">Wish list</a>
          <a  class="btn btn-success">Buy</a>
        </p>
        <hr>
        <p v-if="product.user_id == authenticatedUser.id">
          <a role="button"  class="btn btn-danger" @click="$emit('delete_product')">
            Delete
          </a>
          <router-link style="position: absolute; right: 95px" class="btn btn-primary" :to="'/product/' + product.id + '/edit'">
            Edit
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
 import  swal from 'sweetalert'
    export default {

      props: ['product','authenticatedUser'],

    }
</script>

<style>
  .col-md-4{
    border: 1px solid gray;
    border-radius: 20px;
  }

  img{
    width: 230px;
    height: 300px;
    margin: 10px -10px 10px -10px;
  }
  .text{
    display: flex;
    justify-content: space-around;
  }
</style>
