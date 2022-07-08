<template>
  <div class="control-container">
    <el-dialog title="Error" :visible.sync="dialogVisible" width="30%">
      <i class="el-icon-warning"></i>
    </el-dialog>
    <el-row class="row-top">
      <el-col :span="15" class="h-100">
        <tables
          :focus="tableShowingIndex"
          :tables="tables"
          @clickTable="handleClickTable"
        ></tables>
      </el-col>
      <el-col :span="9" class="h-100 overflow-auto">
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
          height="250"
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
        class="h-100 d-flex flex-column justify-content-center position-relative"
      >
        <div
          class="btn-view-history-sale d-flex justify-content-end position-absolute w-100 p-3"
        >
          <nuxt-link to="/history-sale">
            <el-button icon="el-icon-view" round type="primary"
              >View History Sale</el-button
            >
          </nuxt-link>
        </div>
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
    currentDate() {
      return new Date().toLocaleDateString("en-ZA");
    },
    currentDateVN() {
      return new Date().toLocaleDateString("vi");
    },
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
      dialogVisible: false,
      interval: null,
      isAuto: null,
      control: null,
      tables: [],
      loading: null,
      tableShowingIndex: null,
    };
  },
  methods: {
    async fetchError() {
      const ref = await this.$fire.database.ref("error").get();
      const result = ref.val();
      this.dialogVisible = result === 1 ? true : false;
    },
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
    async handleCheckout() {
      this.$fire.database.ref(`tables/${this.tableShowing.id - 1}`).set("");
      this.modifyHistorySale();
      this.fetchTables();
    },
    async modifyHistorySale() {
      const ref = this.$fire.database.ref(`historySales/${this.currentDate}`);
      const result = await ref.get();
      const val = result.val() || {
        total: 0,
        sum: 0,
        date: this.currentDateVN,
      };
      const newData = this.tableShowing.data.reduce(
        (rs, e) => (
          (rs = {
            ...rs,
            [e.id]: rs[e.id] ? rs[e.id] + e.quantity : e.quantity,
            total: rs.total + e.quantity,
            sum: rs.sum + e.price,
          }),
          rs
        ),
        val
      );
      ref.set(newData);
    },
    handleClickTable(table) {
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
    this.fetchError();
    const vueInstance = this;
    this.interval = setInterval(() => {
      vueInstance.fetchTables();
      vueInstance.fetchError();
    }, 5000);
  },
  beforeDestroy() {
    this.interval && clearInterval(this.interval);
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
.btn-view-history-sale {
  top: 0;
}
.el-icon-warning {
  font-size: 300px;
  color: red;
}
.el-dialog__body {
  display: flex;
  justify-content: center;
}
.el-dialog__title {
  color: red;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  justify-content: center;
}
</style>
