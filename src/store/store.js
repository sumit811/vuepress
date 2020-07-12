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
    page:{},
    categories:[],
    tags: [],
    socialMenu: {},
    headerMenu: {},
    loading: true,
    socialMenuLoading: true,
    pageLoading: true,
  },
  getters: {
    page: state => state.page,
    allPosts: state => state.posts,
    onePost: state => state.postDetail,
    categoriesGetters: state => state.categories,
    tagsGetter: state => state.tags,
    socialMenuGetter: state => state.socialMenus,
    headerMenuGetter: state => state.headerMenu,
  },
  actions: {
    fetchHeaderMenu({ commit }){
      axios
      .get(menuURL+'header-menu')
      .then(response => {
        commit('setHeaderMenu',response.data);
      })
    },
    fetchSocialMenu({ commit }){
      axios
      .get(menuURL+'social')
      .then(response => {
        commit('setSocialMenu',response.data);
        commit('changeLoadingSocialMenuState', false);
      })
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
    },
    fetchPage({ commit }, qs){
      console.log('fetchPage');
      console.info(qs);
        axios.get(fetchURL+'pages/'+qs.id).then(response => {
            // console.log('fetchOnePost start');
            console.dir(response.data);
            // console.log('fetchOnePost end');
            commit("page",response.data);
            commit('changePageLoadingState', false);
        }).catch(err => {
          console.dir(err);
        })
        // .finally(() => console.log('fetchOnePost completed')
        // );
    }
  },
  mutations: {
    setHeaderMenu: (state, headerMenu) => (state.headerMenu = headerMenu),
    setSocialMenu: (state, socialMenu) => (state.socialMenu = socialMenu),
    setTags: (state, tags) => (state.tags = tags),
    setCategories: (state, categories) => (state.categories = categories),
    setBlogs: (state, posts) => (state.posts = posts),
    oneBlog: (state, postDetail) => (state.postDetail = postDetail),
    page: (state, page) => (state.page = page),
    changeLoadingState: (state, loading) => (state.loading = loading),
    changePageLoadingState: (state, pageLoading) => (state.pageLoading = pageLoading),
    changeLoadingSocialMenuState: (state, socialMenuLoading) => (state.socialMenuLoading = socialMenuLoading),
  }
});
