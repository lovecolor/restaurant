<template>
  <el-container>
    <el-header><i @click="goToMenu" class="el-icon-back"></i></el-header>
    <el-main>
      <div class="d-flex justify-content-center mb-1">
        <h3>CART</h3>
      </div>
      <el-table :data="cart" border show-summary style="width: 100%">
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="quantity" label="Quantity"> </el-table-column>
        <el-table-column prop="price" label="Price"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              icon="el-icon-minus"
              size="mini"
              type="info"
              @click="handleReduceQuantity(scope.row)"
            ></el-button>
            <el-button
              icon="el-icon-plus"
              size="mini"
              type="info"
              @click="handleIncreaseQuantity(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete-solid"
              @click="handleRemoveProduct(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-center mt-3">
        <el-button type="primary">ORDER</el-button>
      </div>
      <tables></tables>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    goToMenu() {
      this.$router.push("/");
    },
    handleIncreaseQuantity(product) {
      product.quantity++;
    },
    handleReduceQuantity(product) {
      if (product.quantity === 1) return;
      product.quantity--;
    },
    handleRemoveProduct(prodduct) {
      this.cart = this.cart.filter((x) => x.id != prodduct.id);
    },
  },
  created() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    this.cart = cart;
  },
};
</script>

<style>
.el-icon-back {
  font-size: 50px;
}
</style>
