import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);
Vue.use(Vuex);

var baseURL = 'http://localhost/wordpress/wp-json'
var fetchURL = baseURL+'/wp/v2/';
var menuURL = baseURL+'/menus/v1/menus/';

export const store = new Vuex.Store({
  state: {
    posts: [],
    postDetail:{},
    postLink:{},
    categories:[],
    tags: [],
    menus: {},
    loading: true,
    loading_footer_menu: true,
    loading_header_menu: true,
  },
  getters: {
    allPosts: state => state.posts,
    onePost: state => state.postDetail,
    categoriesGetters: state => state.categories,
    tagsGetter: state => state.tags,
    menuGetter: state => state.menus,
  },
  actions: {
    fetchMenus({ commit }) {
      console.log('eeeee');
      axios.get(
        menuURL  
      ).then(response => {
        // var menuArr = [];
        console.log('response.data - ',response.data);
        for(let i of response.data){
          axios.get(menuURL+i.slug).then(response2 => {
            console.warn('response2.data - ',response2.data);
            var menuName = i.slug;
            var menuData = response2.data;
            var menuObj= {};
            menuObj[menuName] = menuData
            // var menu = {};
            // menu[i.slug] = response2.data;
            // console.log(menu);
            // menuArr.push(menu);
            commit('setMenus',menuObj);
          });
        }
        
      });
    },
    fetchTags({ commit }) {
      axios.get(
        fetchURL+ 'tags'  
      ).then(response => {
        commit('setTags',response.data);
      });
    },
    fetchCategories({ commit }){
      axios.get(
        fetchURL+ 'categories'  
      ).then(response => {
        commit('setCategories',response.data);
      });
    },
    fetchPosts({ commit }) {
      axios.get(
        fetchURL+ 'posts' 
      ).then(response => { 
        // console.log(response.data);
        commit("setBlogs", response.data);
        commit('changeLoadingState', false);
      });
    },
    fetchOnePost({ commit }, qs){
      // console.log('fetchOnePost');
      // console.info(qs);
        axios.get(fetchURL+'posts/'+qs.id).then(response => {
            // console.log('fetchOnePost start');
            // console.dir(response.data);
            // console.log('fetchOnePost end');
            commit("oneBlog",response.data);
            commit('changeLoadingState', false);
        }).catch(err => {
          console.dir(err);
        })
        // .finally(() => console.log('fetchOnePost completed')
        // );
    }
  },
  mutations: {
    setMenus: (state,menuObj) => { 
      // var a = state;
      //var menuObj = {};
      for (const [key, value] of Object.entries(menuObj)) {
        state.menus[key] = value;
      } 
      return state.menus ;
    },
    setTags: (state, tags) => (state.tags = tags),
    setCategories: (state, categories) => (state.categories = categories),
    setBlogs: (state, posts) => (state.posts = posts),
    oneBlog: (state, postDetail) => (state.postDetail = postDetail),
    changeLoadingState: (state, loading) => (state.loading = loading),
    changeHeaderMenuLoadingState: (state, loading_header_menu) => (state.loading_header_menu = loading_header_menu),
    changeFooterMenuLoadingState: (state, loading_footer_menu) => (state.loading_footer_menu = loading_footer_menu),
  }
});
