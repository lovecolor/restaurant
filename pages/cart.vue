<template>
  <el-container>
    <el-header>
      <nuxt-link to="/"> <i class="el-icon-back"></i></nuxt-link>
    </el-header>
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
        <el-button type="primary" @click="handleOrder">ORDER</el-button>
      </div>
      <transition name="el-zoom-in-center">
        <div v-if="showTable" class="table-wrap">
          <div>
            <i @click="showTable = false" class="el-icon-back"></i>
          </div>
          <div class="d-flex justify-content-center mb-3">
            <h3>Please choose your table !!!</h3>
          </div>
          <tables :tables="tables" @clickTable="handleChooseTable"></tables>
        </div>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      showTable: false,
      loading: null,
      tables: [],
    };
  },
  methods: {
    handleOrder() {
      this.fetchTables();
      this.showTable = true;
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

    async fetchTables() {
      this.startLoading();
      const ref = await this.$fire.database.ref("tables").get();
      const result = ref.val();
      this.tables = result;
      this.stopLoading();
    },

    async handleChooseTable(table) {
      await this.fetchTables();
      if (!!this.tables[table]) {
        this.$message({
          type: "error",
          message: "This table is occupied!!!",
        });
        return;
      }
      await this.$fire.database.ref(`tables/${table}`).set({
        ...this.cart,
      });
      localStorage.clear();
      this.$message({
        type: "success",
        message: "Success",
      });
      this.$router.push(`tables/${table}`);
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
.table-wrap {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-height: 100%;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}
.el-icon-back {
  font-size: 50px;
  color: black;
}
</style>
