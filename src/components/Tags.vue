<template>
  <ul class="list-inline">
    <h5>Tags</h5>
      <li class="list-inline-item" v-for="(tag,index) in tagsGetter" :key="index">
          <router-link v-bind:to='{name: "Tags", params:{id: tag.id}}'>{{tag.name}}</router-link>
      </li>
  </ul>
</template>

<style scoped>

</style>

<script>
export default {
  // computed: mapGetters(["tagsGetter"]),
  computed:{
      tagsGetter(){
        return this.$store.state.tags;
      }
  },
  created(){
      this.$store.dispatch('fetchTags');
  }
};
</script>

<style>
</style>
