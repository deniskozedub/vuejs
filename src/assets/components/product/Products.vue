<template>
  <div class="row">
   <my-product
     v-for="product in products"
     :key="product.id"
     :product="product"
     @delete_product="deleteProduct(product)"
     :authenticatedUser="authenticatedUser"
   >
   </my-product>
  </div>
</template>


<script>
import Product from './Product'
  export default {

    data(){
      return {
        products: [],
        authenticatedUser: this.$auth.getAuthenticatedUser()
      }
    },

    components:{
      'my-product': Product
    },

    created(){
      this.$http.get('api/products')
        .then(response => {
          this.products = response.body
        })
    },

    methods: {

      deleteProduct (product) {


        swal({
          title: "Are you sure?",
          text: "You product will be deleted !!!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              this.$http.delete('api/products/' + product.id)
                .then(response => {

                  let index = this.products.indexOf(product);

                  this.products.splice(index, 1)

                });
              swal("Deleted!", "Your product has been deleted!", "success");
            } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });



      }
    }

  }

</script>


