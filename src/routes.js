import Home from './views/Home.vue';
import AppBody from "./components/AppBody.vue";
import Post from "./components/Post.vue";
import Page from "./components/Page.vue";
import PostList from "./components/Post-list.vue";
import Profile from "./components/Profile.vue";
import SubmitPost from "./components/Create-a-post.vue";
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
            },
            {
                path: '/Page/:id',
                name: 'Page',
                component: Page
            },
            {
                path: '/tags/:id',
                name: 'Tags',
                component: PostList
            },
            {
                path: '/categories/:id',
                name: 'Category',
                component: PostList
            },
            {
                path: '/Search/:id',
                name: 'Search',
                component: PostList
            },
            {
                path: '/Profile/',
                name: 'Profile',
                component: Profile
            },
            {
                path: '/Create-a-post/',
                name: 'SubmitPost',
                component: SubmitPost
            }
        ]
    },
    { path: '*' , component: $404}
]