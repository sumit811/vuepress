<template>
  <aside class="text-left">
    <h3>Recent Posts</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="(post,index) in allPosts" :key="index">
        <router-link v-bind:to='{name: "Post", params:{id: post.id}}'>{{post.title.rendered}}</router-link>
        </li>
    </ul>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchPosts"])
  },
  created(){
      this.fetchPosts();
  }
};
</script>

<style>
</style>
