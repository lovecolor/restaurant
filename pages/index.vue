<template>
  <el-container>
    <el-header class="d-flex align-items-center justify-content-between"
      ><el-button @click="goToTables" icon="el-icon-office-building"></el-button
      ><el-badge :value="cart.length">
        <el-button
          @click="goToCart"
          icon="el-icon-shopping-cart-2"
        ></el-button> </el-badge
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
  beforeDestroy() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },

  methods: {
    goToTables() {
      this.$router.push("/tables");
    },

    goToCart() {
      this.$router.push("/cart");
    },
    pickProduct(product) {
      this.$prompt("Please input quantity", "Quantity", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern: /^[1-9]\d*$/,
        inputValue: 1,
        inputErrorMessage: "Invalid Quantity",
      }).then(({ value }) => {
        const exist = this.cart.find((x) => x.id === product.id);
        if (!!exist) {
          exist.quantity += value;
          exist.price += value * product.price;
        } else {
          this.cart.push({
            ...product,
            quantity: value,
            price: product.price * value,
          });
        }

        this.$message({
          showClose: true,
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
