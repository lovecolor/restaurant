<template>
  <el-row :gutter="20">
    <product-item
      v-for="(product, index) in products"
      :key="index"
      :product="product"
      @pickProduct="handlePickProduct"
    />
  </el-row>
</template>

<script>
export default {
  props: ["products"],
  methods: {
    handlePickProduct(prodduct) {
      this.$emit("pickProduct", prodduct);
    },
  },
};
</script>

<style></style>
