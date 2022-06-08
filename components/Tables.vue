<template>
  <el-row :gutter="20">
    <el-col :span="8" :xs="24" v-for="(table, index) in tables" :key="index">
      <div @click="handleClickTable(index)">
        <el-card
          :class="['table-card mb-3', { 'table-be-choose': !!table }]"
          :body-style="{ padding: '0px' }"
        >
          <span class="table-text">
            {{ +index + 1 }}
          </span>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["tables"],
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
.table-be-choose {
  background: #409eff;
}
</style>
