import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    posts: [],
    postDetail:{},
    postLink:{},
    loading: true
  },
  getters: {
    allPosts: state => state.posts,
    onePost: state => state.postDetail,
  },
  actions: {
    fetchPosts({ commit }) {
      axios.get(
        'http://localhost/wordpress/wp-json/wp/v2/posts' 
      ).then(response => { 
        // console.log(response.data);
        commit("setBlogs", response.data);
        commit('changeLoadingState', false);
      });
    },
    fetchOnePost({ commit }, qs){
      // console.log('fetchOnePost');
      // console.info(qs);
        axios.get('http://localhost/wordpress/wp-json/wp/v2/posts/'+qs.id).then(response => {
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
    setBlogs: (state, posts) => (state.posts = posts),
    oneBlog: (state, postDetail) => (state.postDetail = postDetail),
    changeLoadingState: (state, loading) => (state.loading = loading)
  }
});
