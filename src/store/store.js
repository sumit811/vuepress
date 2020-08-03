import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);
Vue.use(Vuex);

var baseURL = 'http://localhost/wordpress/wp-json'
var fetchURL = baseURL+'/wp/v2/';
var menuURL = baseURL+'/menus/v1/menus/';
var commentUrl = baseURL + '/wp/v2/comments/';
// var wpUrl = 'http://localhost/wordpress/wp-json/wp/v2/users';
// var wpAdmUser = 'admin';
// var wpAdmPass = 'admin';
var userurl = fetchURL+'users';
var loginurl = userurl+'/me';
var submitPostUrl = fetchURL+'posts'

export const store = new Vuex.Store({
  state: {
    loggedinStatus: false,
    user:{},
    newUser:{},
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
    comments:{}
  },
  getters: {
    newUser: state => state.newUser,
    getloggedinStatus: state => state.loggedinStatus,
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
    getComment: state => state.comments
  },
  actions: {
    newUserAction({commit},userDetail){
      // console.dir('userDetail-',userDetail);
      axios.post(userurl,userDetail,{
        headers: {
          'Authorization': 'Basic YWRtaW46YWRtaW4='
        }
      }).then(response => {
        console.dir(response);
        commit('setNewUser',response);
      }).catch(error =>{
        console.dir(error);
        commit('setNewUser',error);
      });
      
    },
    logout: ({commit}) => {
      localStorage.removeItem('loggedinVue');
      commit('setLoginStatus',false);
      commit('setUserNull');
    },
    fetchLoggedinStatus({commit}){
      if(localStorage.getItem("loggedinVue")){
        var login = JSON.parse(localStorage.getItem("loggedinVue"));
        if(login.status === "success"){
          commit('setLoginStatus',true);
          commit('setUser', JSON.parse(localStorage.getItem("loggedinVue")));
        } else {
          commit('setLoginStatus',false);
        } 
      }
    },
    fetchUser({commit},user){
      // console.dir(user);
      console.warn('loginurl-',loginurl);
      let auth = 'Basic '+window.btoa(user.email + ':' + user.password);
      // console.log(auth);
      //Authorization':'Basic c3Vic2NyaWJlcjphYmNkMTIzNA=='
      axios.post(loginurl,{},{
        headers: {
          'Authorization': auth
        }
      })
      .then(response => {
        // console.info('-------------loggedin user detail------------ START');
        // console.dir(response.data);
        // console.info('-------------loggedin user detail------------ END');
        response.data.message='You have you successfully loggedin!';
        response.data.auth = auth;
        commit('setUser', {status:'success',data:response.data});
        commit('setLoginStatus',true);

        // commit('setUser', response.data);
      })
      .catch(function (error) {
        commit('setUser', {status:'fail',data:error.response.data});
        commit('setLoginStatus',false);
        // commit('setUser', error.response.data);
        // console.dir(error);
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
    },
    fetchComments({ commit }, ps){
      // console.log(commentUrl+ps.id);
      // http://localhost/wordpress/wp-json/wp/v2/comments?post=68
      commentUrl = commentUrl+'?post='+ps.id;
      console.log('commentUrl-',commentUrl);
      axios.get(commentUrl)
      .then(response => {
        // console.dir(response.data);
        commit("setComments",response.data);
      }).catch(err => {
        console.dir(err);
      })
    },
    postComments({ commit }, cd){
      console.dir(cd);
      cd.author = this.state.user.data.username;
      cd.author_email = this.state.user.data.email;
      cd.author_name = this.state.user.data.name;
      console.warn('------------------');
      console.dir(cd);
      axios.post(commentUrl,cd,{
        headers: {
          'Authorization': this.state.user.data.auth
        }
      }).then(response => {
        console.dir(response);
        commit('setNewUser',response);
      }).catch(error =>{
        console.dir(error);
        commit('setNewUser',error);
      });
    },
    submitPost({ commit }, cd){
      // console.dir(cd);
      // cd.author = this.state.user.data.username;
      // cd.author_email = this.state.user.data.email;
      // cd.author_name = this.state.user.data.name;
      // console.warn('------------------');
      console.dir(cd);
      axios.post(submitPostUrl,cd,{
        headers: {
          'Authorization': this.state.user.data.auth
        }
      }).then(response => {
        console.dir(response);
        commit('setNewUser',response);
      }).catch(error =>{
        console.dir(error);
        // commit('setNewUser',error);
      });
    }
  },
  mutations: {
    setNewUser: (state,newUser) => (state.newUser = newUser),
    // setNewUser: (state,newUser) => {
    //   console.log('New-user mutations');
    //   console.dir(newUser);
    //   state.newUser = newUser;
    //   return state.newUser;
    //   //state.newUser = newUser
    // },
    setLoginStatus: (state,status) => (state.loggedinStatus = status),
    setUserNull: (state) => (state.user={}),
    setUser: (state,user) => { 
      // console.dir(user);
      localStorage.setItem('loggedinVue', JSON.stringify(user));
      if(user.status==='success'){
        state.loggedinStatus = true;
      }
      // state.user = user.data;
      state.user = user;
      
      return state.user;
    },
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
    setComments: (state, c) => (state.comments = c),
  }
});
