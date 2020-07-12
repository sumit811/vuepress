<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link v-bind:to="'/'" class="nav-link">VuePress <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item" v-bind:class="{ dropdown: link.child_items }"  v-for="(link,index) in headerMenu.items" :key="index">
            <a
              v-if="link.child_items"
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{link.title}}</a>
            <div v-if="link.child_items" class="dropdown-menu" aria-labelledby="navbarDropdown">
              <!-- <a class="dropdown-item" href="{{}}" v-for="(link2,index2) in link.child_items" :key="index2">{{link2.title}}</a> -->
               <router-link class="dropdown-item" v-for="(link2,index2) in link.child_items" :key="index2" v-bind:to="'/Page/'+link2.object_id">{{link2.title}}</router-link>
            </div>
            <router-link class="nav-link" v-else v-bind:to="'/Page/'+link.object_id">{{link.title}}</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          >
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    computed:{
      headerMenu(){
        return this.$store.state.headerMenu;
      }
    },
    created(){
      this.$store.dispatch('fetchHeaderMenu');
    }
  }
</script>

<style>
</style>
