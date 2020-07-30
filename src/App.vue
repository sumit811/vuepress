<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
    <Modal />
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
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Header,
    // Sidebar,
    Footer,
    Modal
  },
  created(){
    this.$store.dispatch('fetchLoggedinStatus');
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
