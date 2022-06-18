<template>
  <div>
    <div>
      <nuxt-link to="/tables"><i class="el-icon-back"></i> </nuxt-link>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <h3>Table {{ +id + 1 }}</h3>
    </div>
    <el-table
      class="my-3"
      :data="meals"
      border
      show-summary
      style="width: 100%"
    >
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="quantity" label="Quantity"> </el-table-column>
      <el-table-column prop="price" label="Price"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meals: [],
      loading: null,
      id: null,
    };
  },
  methods: {
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
    async fetchTable() {
      this.startLoading();
      const res = await this.$fire.database.ref(`tables/${this.id}`).get();
      this.meals = res.val().data || [];
      this.stopLoading();
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchTable();
  },
};
</script>

<style>
.el-icon-back {
  font-size: 50px;
  color: black;
}
</style>
