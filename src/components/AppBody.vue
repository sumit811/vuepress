<template>
  <table class="table table-striped">
    <thead class="thead-dark">
      <th>ID</th>
      <th>Blog</th>
      <th>User</th>
    </thead>
    <tbody>
      <tr v-for="(post,index) in allPosts" :key="index">
        <td>{{index+1}}</td>
        <td class="text-left">
          <router-link v-bind:to="'/Post/'+post.id">{{post.title.rendered}}</router-link>
        </td>
        <td>{{post.id}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="text-center" colspan="3">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchPosts"])
  }
};
</script>

<style>
</style>
