<template>
  <div class="right-content-container">
        <tabNav></tabNav>
    <div class="content-box">
      <router-view></router-view>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "RightContent",
  components: {

  },
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

<style scoped>
/* .content-box {
  padding: 0px;
} */

.right-content-container {
  min-width: 100%;
  min-height: auto;
} 

</style>
