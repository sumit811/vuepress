<template>
    <article class="text-left">
        <div>Route ID = {{this.$route.params.id}}</div>
        <div>Route Name = {{this.$route.name}}</div>
        <div>Route params = {{this.$route.params}}</div>
        <div>Route path = {{this.$route.path}}</div>
        <Postbox/>    
    </article>
</template>

<script>
import Postbox from './Post-box';
export default {
  components:{
      Postbox
  }, 
  computed:{
      postListType(){
          let p = this.$route.path.split('/'); 
          return p[1];
      },
      postList(){
          return this.$store.state.postList;
      }
  },
  created(){
    // this.$route.name
    this.$store.dispatch( 'fetchPostList', {
        id: this.$route.params.id,
        name: this.postListType
    });
  },
  watch: {
      $route(to, from){
          if(to.name === from.name){
              this.$store.dispatch( 'fetchPostList', {
                id: this.$route.params.id,
                name: this.postListType
            });
          }
      }
  }
};
</script>

<style>

</style>
