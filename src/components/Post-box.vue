<template>
  <div>
    <div class="post-box" v-for="(p,i) in postList" :key="i">
      
      <div class="descriipt">
        <h3>{{ p.title.rendered }}</h3>
        <p v-html="p.excerpt.rendered"></p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    postList() {
      console.info(this.$store.state.postList);
    //   return [{},{}];
      return this.$store.state.postList;
    }
  }
};
</script>
