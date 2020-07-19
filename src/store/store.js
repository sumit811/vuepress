import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);
Vue.use(Vuex);

var baseURL = 'http://localhost/wordpress/wp-json'
var fetchURL = baseURL+'/wp/v2/';
var menuURL = baseURL+'/menus/v1/menus/';
// var wpUrl = 'http://localhost/wordpress/wp-json/wp/v2/users';
// var wpAdmUser = 'admin';
// var wpAdmPass = 'admin';
var loginurl = 'http://localhost/wordpress/wp-json/wp/v2/users/me';

export const store = new Vuex.Store({
  state: {
    user:{},
    posts: [],
    postList:[],
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
    modalName:'',
  },
  getters: {
    getUser: state => state.user,
    getModalName: state => state.modalName,
    page: state => state.page,
    postListGetters: state => state.postList,
    allPosts: state => state.posts,
    onePost: state => state.postDetail,
    categoriesGetters: state => state.categories,
    tagsGetter: state => state.tags,
    socialMenuGetter: state => state.socialMenus,
    headerMenuGetter: state => state.headerMenu,
  },
  actions: {
    fetchUser({commit},user){
      console.dir(user);
      axios
      .post(loginurl,{
        auth:{
          'username':user.username,
          'password':user.password
        }
        },
        {
          headers: {
            'Authorization': 'Basic c3Vic2NyaWJlcjphYmNkMTIzNA=='
          }
        }
        )
      .then(response => {
        console.dir(response);
        commit('setUser', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      // commit('setUser');
    },
    fetchModal({ commit} ,m){
      commit('setModal', m);
    },
    fetchPostList({ commit }, qs){
      // console.log(qs);
      let url = fetchURL+'posts?'+qs.name+'='+qs.id;
      // console.log('url-',url);
      axios
      .get(url)
      .then(response => {
        // console.dir(response);
        commit('setPostList',response.data);
      })
    },
    fetchHeaderMenu({ commit }){
      axios
      .get(menuURL+'header-menu')
      .then(response => {
        //console.dir(response.data);
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
    setUser: (state,user) => (state.user = user),
    setModal: (state,modal) => (state.modalName = modal),
    setPostList: (state,postList) => (state.postList = postList),
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
