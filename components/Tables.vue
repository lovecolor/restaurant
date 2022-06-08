<template>
  <div class="table-container">
    <div class="d-flex justify-content-center mb-3">
      <span>Please choose the table!!!</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="8" :xs="24" v-for="o in 9" :key="o">
        <el-card class="table-card mb-3" :body-style="{ padding: '0px' }">
          <span class="table-text">
            {{ o }}
          </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.table-container {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-height: 100%;
  z-index: 1000;
  padding: 1rem;
}
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
