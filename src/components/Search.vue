<template>
    <form class="form-inline my-2 my-lg-0"  v-on:submit="searchpost">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchTxt"
          >
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
</template>
<script>
export default {
    data() {
      return {
        searchTxt:''
      }
    },
    methods:{
      searchpost: function(e){
        // console.dir(e);
        e.preventDefault();
        console.log(this.searchTxt);
        this.$router.push('/search/'+this.searchTxt);
      }
    },
}
</script>
