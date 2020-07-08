<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/app.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>

<script>
import Header from "./components/Header.vue";
// import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  created(){
    this.$store.dispatch( 'fetchMenus');
  },
  components: {
    Header,
    // Sidebar,
    Footer
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
