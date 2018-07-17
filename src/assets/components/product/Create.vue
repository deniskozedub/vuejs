<template>
  <div class="row">
      <div class="col-md-6 ">
        <div class="panel panel-default">
          <div class="panel-body">
            <form @submit.prevent="create">
              <div class="form-group">
                <label>Name:</label>
                <input   type="file" class="form-control" @change="imageChanged" >

              </div>
            <div class="form-group">
              <label>Name:</label>
              <input  name="name" type="text" class="form-control" v-model="product.name"
              v-validate="'required'"><br>
              <div class="help-block alert alert-danger" v-show="errors.has('name')">
                    {{errors.first('name')}}
              </div>
            </div>
            <div class="form-group">
              <label>Price:</label>
              <input type="number" class="form-control" name="price"
                     v-validate="'max_value:50|min_value:5'"
                     v-model="product.price">
              <div class="help-block alert alert-danger"
              v-show="errors.first('price')">
                        {{errors.first('price')}}
              </div>
            </div>
            <div class="form-group">
              <label>Description:</label>
              <textarea
                v-validate="'required'" name="description"
                type="number" class="form-control"  v-model="product.description"></textarea>
              <div class="help-block alert alert-danger"
              v-show="errors.first('description')">
                {{errors.first('description')}}
              </div>
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-success form-control" value=" Create"/>
            </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    export default {

      data(){
        return {
          product: {
            name: '',
            price: 0,
            description: '',
            image: ''
          }

        }


      },
      methods: {

        imageChanged (e) {

          console.log(e.target.files[0])
            let fileReader = new FileReader();

            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = (e) => {
              this.product.image = e.target.result;
            }

            console.log(this.product)
        },

        create(){

          this.$validator.validateAll().then( (result) => {
            if (result) {
              this.$http.post('api/products',this.product)
                .then(response => {
                  this.$router.push('/feed');
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
