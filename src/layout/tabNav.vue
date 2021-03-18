<template>
  <div class="content-title-box">
    <i @click="collapse" class="el-icon-s-unfold" id="icon-style"></i>
    <i v-text="$route.name" class="navigation">右边导航</i>
  </div>
</template>
<script>
export default {
  name: "tabNav",
  data() {
    return {};
  },
  methods: {
    collapse() {
      this.$store.dispatch("collapse");
    },
  },
  mounted() {},
};
</script>
<style>
.content-title-box {
  z-index: 1000;
  border-bottom: solid 1px #e6e6e6;
  line-height: 40px;
  background-color: #FFFFFF;
  height: 40px;
  top:0;
  position: sticky;
}
#icon-style {
  font-size: 23px;
  margin-left: 15px;
}
.navigation {
  padding: 10px;
  font-style: normal;
  font-size: 22px;
}
</style>
