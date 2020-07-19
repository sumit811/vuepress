<template>
  <aside class="text-left">
    <h3>Recent Posts</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="(post,index) in allPosts" :key="index">
        <router-link v-bind:to='{name: "Post", params:{id: post.id}}'>{{post.title.rendered}}</router-link>
        </li>
    </ul>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Categories List
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <router-link class="dropdown-item" v-for="(category,index) in categoriesGetters" :key="index" v-bind:to='{name: "Category", params:{id: category.id}}'>{{category.name}}</router-link>
      </div>
    </div>
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
    <Tags />
  </aside>
</template>

<script>

import Tags from "./Tags.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components:{
    Tags
  },
  computed: mapGetters(["allPosts","categoriesGetters"]),
  methods: {
    ...mapActions(["fetchPosts","fetchCategories"])
  },
  created(){
      this.fetchPosts();
      this.$store.dispatch('fetchCategories');
  }
};

</script>

<style>
</style>
