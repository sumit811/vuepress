<template>
    <article class="text-left">
        <div>Route ID = {{this.$route.params.id}}</div>
        <h2>{{onePost.title.rendered}}</h2>
        <h4>{{onePost.author}}</h4>
        <div>{{onePost.content.rendered}}</div>
    </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["onePost"]),
  methods: {
    ...mapActions(["fetchOnePost"])
  },
  created(){
    // this.fetchOnePost(this.$route.params.id);
    this.$store.dispatch( 'fetchOnePost', {
        id: this.$route.params.id
    });
  },
  watch: {
      $route(to, from){
          console.info('to - ',to);
          console.info('from - ',from);
          if(to.name === from.name){
              console.warn('Same Post Component');
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
