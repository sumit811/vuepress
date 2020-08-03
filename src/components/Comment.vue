<template>
  <div class="commentOuter" v-if="checkLoggedIn">
    <ComponentList/>
    <form @submit="commentFrm">
      <h1>Leave a Reply</h1>
      <h3>
        Logged in as {{ userDetail.data.name }}.
        <a href="#" @click="logout">Log out?</a>
      </h3>
      <div class="comment-box">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Comment</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" v-model="comment"></textarea>
          <button type="submit" class="btn btn-danger">Post Comment</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
console.log('sadfsdafsadf');
import ComponentList from "./Comments-list";
export default {
  data(){
    return{
      comment:''
    }
  },
  components: {
    ComponentList
  },
  computed: {
    checkLoggedIn() {
      return this.$store.state.loggedinStatus;
    },
    userDetail(){
      return this.$store.getters.getUser
    }
  },
  methods: {
    commentFrm: function(e) {
      e.preventDefault();
      this.$store.dispatch("postComments", {
        content: this.comment,
        post: this.$route.params.id,
        parent:0
      });
    },
    logout: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

