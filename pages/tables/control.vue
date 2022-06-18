<template>
  <div class="control-container">
    <el-row class="row-top">
      <el-col :span="15" class="h-100">
        <tables
          :focus="tableShowingIndex"
          :tables="tables"
          @clickTable="handleClickTable"
        ></tables>
      </el-col>
      <el-col :span="9" class="h-100">
        <div
          v-if="!!tableShowing"
          class="d-flex align-items-center m-3 flex-column"
        >
          <h3>Table {{ tableShowing.id }}</h3>
          <div>
            {{ new Date(tableShowing.createdDate).toLocaleTimeString() }}
          </div>
        </div>
        <el-table
          v-if="!!tableShowing"
          :data="tableShowing.data || []"
          border
          show-summary
          style="width: 100%"
        >
          <el-table-column prop="name" label="Name"> </el-table-column>
          <el-table-column prop="quantity" label="Quantity"> </el-table-column>
        </el-table>
        <div class="d-flex justify-content-center mt-3">
          <el-button
            v-if="!!tableShowing"
            type="primary"
            @click="handleCheckout"
            >CHECKOUT</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-row class="row-bot">
      <el-col
        :span="12"
        class="d-flex flex-column justify-content-center h-100"
      >
        <div class="d-flex justify-content-center">
          <el-button
            :type="control === 'GO' ? 'danger' : 'primary'"
            @click="handleChangeControl('GO')"
            >GO</el-button
          >
        </div>
        <div class="pl-3 my-3 d-flex justify-content-center">
          <el-button
            @click="handleChangeControl('LEFT')"
            :type="control === 'LEFT' ? 'danger' : 'primary'"
            >LEFT</el-button
          ><el-button @click="handleChangeControl('STOP')" type="info" circle
            >O</el-button
          ><el-button
            @click="handleChangeControl('RIGHT')"
            :type="control === 'RIGHT' ? 'danger' : 'primary'"
            >RIGHT</el-button
          >
        </div>
        <div class="d-flex justify-content-center">
          <el-button
            @click="handleChangeControl('BACK')"
            :type="control === 'BACK' ? 'danger' : 'primary'"
            >BACK</el-button
          >
        </div>
      </el-col>
      <el-col
        :span="12"
        class="h-100 d-flex flex-column justify-content-center"
      >
        <div class="d-flex justify-content-center mb-3">
          <el-button type="primary" round @click="handleStart">START</el-button>
        </div>
        <div class="d-flex justify-content-center">
          <el-button
            :type="isAuto === 1 ? 'danger' : 'primary'"
            round
            @click="handleChangeMode(1)"
            >AUTO</el-button
          >
          <el-button
            :type="isAuto === 0 ? 'danger' : 'primary'"
            round
            @click="handleChangeMode(0)"
            >MANUAL</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tables from "../../components/Tables.vue";
export default {
  components: { Tables },
  computed: {
    tableShowing() {
      return (
        this.tables.length > 0 &&
        this.tableShowingIndex >= 0 &&
        this.tables[this.tableShowingIndex]
      );
    },
  },
  data() {
    return {
      isAuto: null,
      control: null,
      tables: [],
      loading: null,
      tableShowingIndex: null,
    };
  },
  methods: {
    handleChangeControl(typeControl) {
      if (this.isAuto === 1) {
        this.$message.error("Please, change munual mode to apply control!!!");
        return;
      }
      this.$fire.database.ref("control").set(typeControl);
      this.control = typeControl;
    },
    handleChangeMode(isAuto = 1) {
      this.$fire.database.ref("isAuto").set(isAuto);
      if (isAuto === 1) {
        this.handleChangeControl("STOP");
      }
      this.isAuto = isAuto;
    },
    async handleStart() {
      if (!this.tableShowing) {
        this.$message.error("You haven't choose the table!!!");
      } else {
        this.$fire.database.ref("tableDelivering").set(this.tableShowing.id);
        await this.$fire.database
          .ref(`tables/${this.tableShowing.id - 1}/delivered`)
          .set(true);
        this.fetchTables();
      }
    },
    handleCheckout() {
      this.$fire.database.ref(`tables/${this.tableShowingIndex}`).set("");
      this.fetchTables();
    },
    handleClickTable(table) {
      console.log(table);
      this.tableShowingIndex = table;
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
      const tables = result.map((x, index) => ({ ...x, id: index + 1 }));
      this.tables = [
        ...tables
          .filter((x) => !!x.data)
          .sort((a, b) => a.createdDate - b.createdDate),
      ];
    },
    async fetchControlData() {
      const refMode = await this.$fire.database.ref("isAuto").get();
      const resultMode = refMode.val();
      this.isAuto = resultMode;
      const refControl = await this.$fire.database.ref("control").get();
      const resultControl = refControl.val();
      this.control = resultControl;
    },
  },

  created() {
    this.fetchControlData();
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
