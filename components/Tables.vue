<template>
  <el-row :gutter="20" class="p-3">
    <el-col
      :span="8"
      :xs="24"
      v-for="(table, index) in tables"
      :key="table.id || index"
    >
      <div @click="handleClickTable(index)">
        <el-card
          :class="[
            'table-card mb-3',
            {
              'table-delivered':
                !!table.data && !!table.delivered && table.delivered,
            },
            {
              'table-un-delivered': !!table.data && !table.delivered,
            },
            {
              'table-focus': index === focus,
            },
          ]"
          :body-style="{ padding: '0px' }"
        >
          <span class="table-text">
            {{ table.id || index + 1 }}
          </span>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["tables", "focus"],
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
.table-un-delivered {
  background: #f56c6c;
}
.table-delivered {
  background: #67c23a;
}
.table-focus {
  border: 5px solid red;
}
</style>
