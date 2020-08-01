<template>
  <div class="commnets-list">
    <div v-for="(comment,index) in commentsList" :key="index" v-html="comment.content.rendered"></div>
  </div>
</template>
<script>
export default {
  computed: {
    commentsList() {
      return this.$store.state.comments;
    }
  },
  created() {
    this.$store.dispatch("fetchComments", {
      id: this.$route.params.id
    });
  }
};
</script>
<style scoped>
.commnets-list {
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  padding: 30px 0;
}
</style>
