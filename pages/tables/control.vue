<template>
  <div class="control-container">
    <el-row class="row-top">
      <el-col :span="15" class="h-100">
        <tables :tables="tables" @clickTable="handleClickTable"></tables>
      </el-col>
      <el-col :span="9" class="h-100"
        ><el-table
          v-if="tableShowing >= 0"
          :data="tables[tableShowing] || []"
          border
          show-summary
          style="width: 100%"
        >
          <el-table-column prop="name" label="Name"> </el-table-column>
          <el-table-column prop="quantity" label="Quantity"> </el-table-column>
        </el-table>
        <div class="d-flex justify-content-center mt-3">
          <el-button type="primary" @click="handleCheckout">CHECKOUT</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-bot">
      <el-col
        :span="12"
        class="d-flex flex-column justify-content-center h-100"
      >
        <div class="d-flex justify-content-center">
          <el-button type="primary">GO</el-button>
        </div>
        <div class="pl-3 my-3 d-flex justify-content-center">
          <el-button type="primary">LEFT</el-button
          ><el-button type="info" circle>O</el-button
          ><el-button type="primary">RIGHT</el-button>
        </div>
        <div class="d-flex justify-content-center">
          <el-button type="primary">BACK</el-button>
        </div>
      </el-col>
      <el-col
        :span="12"
        class="h-100 d-flex flex-column justify-content-center"
      >
        <div class="d-flex justify-content-center mb-3">
          <el-button type="primary" round>START</el-button>
        </div>
        <div class="d-flex justify-content-center">
          <el-button type="primary" round>AUTO</el-button>
          <el-button type="primary" round>MANUAL</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tables from "../../components/Tables.vue";
export default {
  components: { Tables },
  data() {
    return {
      tables: [],
      loading: null,
      tableShowing: null,
    };
  },
  methods: {
    handleCheckout() {
      this.$fire.database.ref(`tables/${this.tableShowing}`).set("");
      this.fetchTables();
    },
    handleClickTable(table) {
      this.tableShowing = table;
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
      const ref = await this.$fire.database.ref("tables").get();
      const result = ref.val();
      this.tables = result;
    },
  },

  created() {
    this.fetchTables();
    setInterval(this.fetchTables, 5000);
  },
};
</script>

<style>
.control-container {
  width: 100vw;
  height: 100vh;
}
.row-top {
  height: 60vh;
}
.row-bot {
  border-top: 1px solid lightgray;
  height: 40vh;
}
.control-container > .el-row > .el-col:first-child {
  border-right: 1px solid lightgray;
}
</style>
