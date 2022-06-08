<template>
  <el-container>
    <el-header>
      <nuxt-link to="/"> <i class="el-icon-back"></i></nuxt-link
    ></el-header>
    <el-main>
      <product-list :products="products" @pickProduct="changeProduct" />
    </el-main>
    <el-form v-if="showFormChangeProduct" class="form-change-product">
      <el-input
        class="mb-3"
        placeholder="Name"
        v-model="newProductData.name"
      ></el-input>
      <el-input
        class="mb-3"
        placeholder="Image"
        v-model="newProductData.src"
      ></el-input>
      <el-input
        class="mb-3"
        placeholder="Price"
        v-model="newProductData.price"
      ></el-input>
      <div class="d-flex justify-content-center">
        <el-button @click="handleChangeProduct" type="primary"
          >CHANGE</el-button
        >
      </div>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      showFormChangeProduct: false,
      loading: null,
      newProductData: {
        name: "",
        price: 0,
        src: "",
      },
    };
  },
  methods: {
    handleChangeProduct() {
      this.$fire.database
        .ref(`products/${this.newProductData.id}`)
        .set(this.newProductData);
      this.showFormChangeProduct = false;
    },
    startLoading() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    stopLoading() {
      this.loading.close();
    },
    changeProduct(product) {
      this.newProductData = product;
      this.showFormChangeProduct = true;
    },
    async fetchProducts() {
      this.startLoading();
      const ref = await this.$fire.database.ref("products").get();
      const result = ref.val();

      this.products = Object.keys(result).reduce(
        (rs, e) => (rs.push({ ...result[e], id: e }), rs),
        []
      );
      this.stopLoading();
    },
  },

  created() {
    this.fetchProducts();
  },
};
</script>

<style>
.el-icon-back {
  font-size: 50px;
  font-weight: bold;
}
.form-change-product {
  position: fixed;
  top: 50%;
  z-index: 1000;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: white;
  border: 1px solid lightgrey;
  padding: 1rem;
}
</style>
