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
               <router-link class="dropdown-item" v-for="(link2,index2) in link.child_items" :key="index2" v-bind:to="'/'+link2.object+'/'+link2.object_id">{{link2.title}}-{{link2.object}}</router-link>
            </div>
            <router-link class="nav-link" v-else v-bind:to="'/'+link.object+'/'+link.object_id">{{link.title}}</router-link>
          </li>
          <li>
            <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" v-if="!checkLoggedIn" href="#" v-on:click="openModal('create_account')">Create Account</a>
                <!-- <a class="dropdown-item" v-if="!checkLoggedIn" href="#" v-on:click="openModal('forget_password')">Forget Password</a> -->
                <a class="dropdown-item" v-if="!checkLoggedIn" href="#" v-on:click="openModal('log_in')">Log in</a>
                <a class="dropdown-item" v-if="checkLoggedIn" href="#">Submit Post</a>
                <router-link class="dropdown-item" v-bind:to="'/Profile/'">Profile</router-link>
                <a class="dropdown-item" v-if="checkLoggedIn" href="#" @click="logout">Log Out</a>
              </div>
            </div>
          </li>
        </ul>
        <Search />
      </div>
    </div>
  </nav>
</template>

<script>
import Search from './Search.vue';
  export default {
    components:{
      Search
    },
    computed:{
      headerMenu(){
        return this.$store.state.headerMenu;
      },
      checkLoggedIn(){
        return this.$store.state.loggedinStatus;
      }
    },
    methods:{
      logout: function(){
        this.$store.dispatch('logout');
      },
      openModal: function(m){
        // console.dir(m);
        this.$store.dispatch('fetchModal',m);
        window.$('#signup').modal();
      }
    },
    created(){
      this.$store.dispatch('fetchHeaderMenu');
    }
  }
</script>

<style>
</style>
