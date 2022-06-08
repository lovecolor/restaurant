<template>
  <el-row :gutter="20">
    <el-col :span="8" :xs="24" v-for="o in 9" :key="o">
      <div @click="handleClickTable(o)">
        <el-card class="table-card mb-3" :body-style="{ padding: '0px' }">
          <span class="table-text">
            {{ o }}
          </span>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleClickTable(table) {
      this.$emit("clickTable", table);
    },
  },
};
</script>

<style>
.table-card {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-text {
  font-size: 50px;
  font-weight: bold;
}
</style>
