<template>
  <div>
    <h1>Create a Post</h1>
    <div
      class="alert alert-success"
      v-bind:class="{ 'alert-success': this.postStatus.status, 'alert-danger': !this.postStatus.status }"
      role="alert"
      v-if="Object.keys(this.postStatus).length"
    >
      {{ this.postStatus.msg }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form v-on:submit="submitPost">
      <div class="form-group">
        <label>Post Title</label>
        <input type="text" class="form-control" placeholder="Post Title" v-model="post_title">
      </div>
      <div class="form-group">
        <label>Content</label>
        <textarea class="form-control" rows="3" v-model="post_content"></textarea>
      </div>
      <button type="submit" class="btn btn-primary float-left">Submit</button>
      <!-- <button type="reset" class="btn float-right" @click="reset">Clear</button> -->
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      post_title: "",
      post_content: ""
    };
  },
  methods: {
    submitPost(e) {
      e.preventDefault();
      this.$store.dispatch("submitPost", {
        title: this.post_title,
        content: this.post_content
      });
    }
  },
  computed: {
    postStatus() {
      return this.$store.state.submitPostStatus;
    }
  }
};
</script>