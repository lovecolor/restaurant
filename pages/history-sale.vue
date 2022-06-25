<template>
  <div class="p-3">
    <div class="position-relative d-flex justify-content-center">
      <nuxt-link class="position-absolute btn-back" to="/tables/control"
        ><el-button icon="el-icon-back" type="primary"
          >Back</el-button
        ></nuxt-link
      >
      <el-date-picker v-model="month" type="month" placeholder="Pick a month">
      </el-date-picker>
    </div>
    <div class="my-3"></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Ngày"> </el-table-column>
      <el-table-column
        v-for="product in products"
        :key="product.id"
        :prop="product.id"
        :label="product.name"
      >
      </el-table-column>
      <el-table-column prop="total" label="Tổng số lượng"> </el-table-column>
      <el-table-column prop="sum" label="Tổng số tiền"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: new Date(),
      tableData: [],
      products: [],
    };
  },
  computed: {
    header() {},
  },
  methods: {
    async fetchTable() {
      const [year, month] = this.month.toLocaleDateString("en-ZA").split("/");

      const ref = await this.$fire.database
        .ref(`historySales/${year}/${month}`)
        .get();
      const result = ref.val();
      if (result) {
        this.tableData = Object.values(result);
      } else {
        this.tableData = [];
      }
    },
    async fetchProducts() {
      const ref = await this.$fire.database.ref(`products`).get();
      const result = ref.val();
      if (result) {
        this.products = Object.values(result);
      }
    },
  },
  created() {
    this.fetchProducts();
    this.fetchTable();
  },
  watch: {
    month() {
      this.fetchTable();
    },
  },
};
</script>

<style>
.btn-back {
  left: 0;
}
</style>
