<template>
    <article class="text-left">
        <div>Route ID = {{this.$route.params.id}}</div>
            <div v-if="loading">
                loading...
            </div>
            <div v-else>
                <!-- <h2>{{postDetail.title.rendered}}</h2> -->
                <!-- <h4>{{postDetail.author}}</h4> -->
                <div v-html="pageContent.content.rendered"></div>
            </div>
    </article>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
       pageContent(){
        //    console.dir(this.$store.state.postDetail);
           return this.$store.state.page;
       },
       loading(){
           console.log('this.$store.state.pageLoading -',this.$store.state.pageLoading);
           return this.$store.state.pageLoading;
       }
  },
//   methods: {
//     ...mapActions(["fetchOnePost"])
//   },
  created(){
    // this.fetchOnePost(this.$route.params.id);
    this.$store.dispatch( 'fetchPage', {
        id: this.$route.params.id
    });
  },
  watch: {
      $route(to, from){
        //   console.info('to - ',to);
        //   console.info('from - ',from);
          if(to.name === from.name){
            //   console.warn('Same Post Component');
              this.$store.dispatch( 'fetchPage', {
                id: this.$route.params.id
              });
          }
      }
  }
};
</script>

<style>

</style>
