<template>
  <ul class="list-inline">
    <h5>Tags</h5>
      <li class="list-inline-item" v-for="(tag,index) in tagsGetter" :key="index">
          <a href="#">{{tag.name}}</a>
      </li>
  </ul>
</template>

<style scoped>

</style>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["tagsGetter"]),
  methods: {
    ...mapActions(["fetchTags"])
  },
  created(){
      this.$store.dispatch('fetchTags');
  }
};
</script>

<style>
</style>
