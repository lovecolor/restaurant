<template>
  <div @click="handleClickProduct">
    <el-col class="mb-3" :span="8" :xs="24">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="product.src" class="image" />
        <div style="padding: 14px">
          <span>{{ product.name }}</span>
          <div class="bottom clearfix">
            <span class="time">{{ product.price }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    handleClickProduct() {
      console.log("asd");
      this.$emit("pickProduct", this.product);
    },
  },
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  object-fit: cover;
  height: 300px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
