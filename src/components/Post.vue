<template>
    <article class="text-left">
        <div>Route ID = {{this.$route.params.id}}</div>
            <div v-if="loading">
                loading...
            </div>
            <div v-else>
                <h2>{{postDetail.title.rendered}}</h2>
                <h4>{{postDetail.author}}</h4>
                <div v-html="postDetail.content.rendered"></div>
                <Comment/>
            </div>
    </article>
</template>

<script>
import Comment from './Comment';
export default {
  components:{
      Comment
  },  
  computed: {
       postDetail(){
        //    console.dir(this.$store.state.postDetail);
           return this.$store.state.postDetail;
       },
       loading(){
           return this.$store.state.loading;
       }
  },
//   methods: {
//     ...mapActions(["fetchOnePost"])
//   },
  created(){
    // this.fetchOnePost(this.$route.params.id);
    this.$store.dispatch( 'fetchOnePost', {
        id: this.$route.params.id
    });
  },
  watch: {
      $route(to, from){
        //   console.info('to - ',to);
        //   console.info('from - ',from);
          if(to.name === from.name){
            //   console.warn('Same Post Component');
              this.$store.dispatch( 'fetchOnePost', {
                id: this.$route.params.id
              });
          }
      }
  }
};
</script>

<style>

</style>
