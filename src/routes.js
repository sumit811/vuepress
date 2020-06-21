import Home from './views/Home.vue';
import AppBody from "./components/AppBody.vue";
import Post from "./components/Post.vue";
import $404 from "./views/404.vue";

export default [
    { path: '/', name:"Home", component:Home,
        children: [
            {
                path: '',
                component: AppBody
            },
            {
                path: '/Post/:id',
                name: 'Post',
                component: Post
            }
        ]
    },
    { path: '*' , component: $404}
]