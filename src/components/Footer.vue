<template>
  <footer class="footer mt-auto py-3">
    <div class="container">
      <div v-if="footerLoading">
          socialMenuLoading...
      </div>
      <div v-else>
          <ul class="list-inline">
            <li class="list-inline-item" v-for="(social,index) in socialMenu.items" :key="index">
              <a v-bind:href="social.url" target="_blank">{{ social.post_title }}</a>
            </li>
          </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer{
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>

<script>
export default {
  computed: {
    socialMenu(){
      // console.dir(this.$store.state.socialMenu.data.items);
      return this.$store.state.socialMenu;
    },
    footerLoading(){
        return this.$store.state.socialMenuLoading;
    }
  },
  created(){
      this.$store.dispatch('fetchSocialMenu');
  }
};
</script>

<style>
</style>
