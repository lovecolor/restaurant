<template>
  <div class="p-3">
    <div class="mb-3">
      <nuxt-link to="/"> <i class="el-icon-back"></i></nuxt-link>
    </div>
    <el-input
      class="mb-3"
      placeholder="Name"
      v-model="newProduct.name"
    ></el-input>
    <el-input
      class="mb-3"
      placeholder="Image"
      v-model="newProduct.src"
    ></el-input>
    <el-input
      class="mb-3"
      placeholder="Price"
      v-model="newProduct.price"
    ></el-input>
    <div class="d-flex justify-content-center">
      <el-button @click="createNewProduct" type="primary">CREATE</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {
        name: "",
        price: 0,
        src: "",
      },
    };
  },
  methods: {
    createNewProduct() {
      const newPostKey = this.$fire.database.ref("products").push().key;
      console.log(newPostKey);
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates["/products/" + newPostKey] = this.newProduct;

      this.$fire.database.ref().update(updates);
      this.newProduct = {
        name: "",
        price: 0,
        src: "",
      };
    },
  },
};
</script>

<style>
.el-icon-back {
  font-size: 50px;
  font-weight: bold;
}
</style>
