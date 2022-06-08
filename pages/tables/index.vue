<template>
  <el-container>
    <el-header class="d-flex align-items-center">
      <nuxt-link to="/"> <i class="el-icon-back"></i></nuxt-link
    ></el-header>
    <el-main>
      <tables :tables="tables" @clickTable="handleChooseTable"></tables>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tables: [],

      loading: null,
    };
  },
  methods: {
    handleChooseTable(table) {
      this.$router.push(`tables/${table}`);
    },
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
    async fetchTables() {
      this.startLoading();
      const ref = await this.$fire.database.ref("tables").get();
      const result = ref.val();
      console.log(result);
      this.tables = result;
      this.stopLoading();
    },
  },

  created() {
    this.fetchTables();
  },
};
</script>

<style>
.el-icon-back {
  font-size: 50px;
  color: black;
}
</style>
