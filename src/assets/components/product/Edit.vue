<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-conrtol" v-model="product.name">
          </div>
          <div class="form-group">
            <label>Price:</label>
            <input type="number" class="form-conrtol" v-model="product.price">
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea type="number" class="form-conrtol" v-model="product.description"></textarea>
          </div>
          <button @click="update" v-show="product.name && product.price && product.description" class="btn btn-success">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    created () {
      this.getProduct()
    },

    data(){
      return {
        product: {}

      }


    },
    methods: {
      getProduct () {
        this.$http.get('api/products/' + this.$route.params.product)
          .then(resposnse => {
            this.product = resposnse.body
          })
          .catch(response => {
                this.$router.push('/feed')
          })
      },

      update(){
        this.$http.put('api/products/' + this.$route.params.product, this.product)
          .then(response => {
            swal("Updated!", "Your product has been updated", "success")
            this.$router.push('/feed')

          })
      }
    }

  }
</script>

<style scoped>

</style>
