<template>
  <div class="commnets-list">
    <div class="media" v-for="(comment,index) in commentsList" :key="index">
      <img v-bind:src="comment.author_avatar_urls[48]" class="mr-3" alt="...">
      <div class="media-body">
        <h5 class="mt-0">{{comment.author_name}}</h5>
        <p>{{ comment.date }}</p>
        <p v-html="comment.content.rendered"></p>
      </div>
    </div>
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
<style lang="scss" scoped>
.commnets-list {
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  padding: 30px 0;
  .media{
      margin-bottom: 20px;
  }
}
</style>
