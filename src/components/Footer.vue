<template>
  <footer class="footer mt-auto py-3">
    <div class="container">
      <ul class="list-inline">
        <!-- <li class="list-inline-item" v-for="(social,index) in footerMenu['social'].items" :key="index">
          <a v-bind:href="social.url" target="_blank">{{ social.post_title }}</a>
        </li> -->
      </ul>
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
import { mapState } from 'vuex'
export default {
  computed: mapState({
    footerMenu: state => state.menus,
  })
};
</script>

<style>
</style>
