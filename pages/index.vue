<template>
  <el-container>
    <el-header class="d-flex align-items-center justify-content-center"
      ><el-button @click="goToCart" icon="el-icon-shopping-cart-2"></el-button
    ></el-header>
    <el-main>
      <div class="d-flex justify-content-center mb-1">
        <h3>MENU</h3>
      </div>
      <product-list :products="products" @pickProduct="pickProduct" />
    </el-main>
  </el-container>
</template>

<script>
import ProductItem from "../components/ProductItem.vue";
import Tables from "../components/Tables.vue";
export default {
  components: { ProductItem, Tables },
  name: "IndexPage",
  data() {
    return {
      products: [],
      loading: null,
      productPicking: null,
      cart: [],
    };
  },
  methods: {
    goToCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.$router.push("/cart");
    },
    pickProduct(product) {
      this.$prompt("Please input quantity", "Quantity", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: "Invalid Quantity",
      }).then(({ value }) => {
        this.cart.push({
          ...product,
          quantity: value,
          price: product.price * value,
        });
        this.$message({
          type: "success",
          message: "Success",
        });
      });
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
    getCart() {
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },
  },

  created() {
    this.fetchProducts();
    this.getCart();
  },
};
</script>
<style>
.el-header {
  background: #409eff;
}
.el-message-box {
  min-width: 350px;
}
</style>
