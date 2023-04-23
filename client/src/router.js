import { createRouter, createWebHashHistory} from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import PostsPage from '@/pages/PostsPage.vue';
import AboutUsPage from '@/pages/AboutUs.vue';
import ContactUsPage from '@/pages/ContactUs.vue';
import LocalPostsPage from '@/pages/LocalPostsPage.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '',
            component: MainPage
        },
        {
            path: '/posts',
            component: PostsPage
        },
        {
            path: '/about',
            component: AboutUsPage
        },
        {
            path: '/contact',
            component: ContactUsPage
        },
        {
            path: '/posts/:id',
            component: LocalPostsPage,
            props: true
        },
    ]
})