<template>
  <div class="commentOuter" v-if="checkLoggedIn">
    <ComponentList />
    <form @submit="commentFrm">
      <h1>Leave a Reply</h1>
      <h3>Logged in as admin. <a href="#" @click="logout">Log out?</a></h3>
      <div class="comment-box">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Example textarea</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
          <button type="submit" class="btn btn-danger">Post Comment</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import ComponentList from './Comments-list';
export default {
  components:{
    ComponentList
  },
  computed:{
    checkLoggedIn(){
        return this.$store.state.loggedinStatus;
      }
  },
  methods: {
    commentFrm: function(e) {
      alert("ddd");
      e.preventDefault();
    },
    logout: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

