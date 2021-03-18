<template>
  <div id="app">
    <router-view v-if="isRouterAlive"> </router-view>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },

  },
  
};
</script>
<style>
a {
  text-decoration: none;
}
#app {
  min-width: 1140px;
}
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}
.clearfix {
  overflow: auto;
  zoom: 1;
}
</style>
