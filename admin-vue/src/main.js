/**
 * start
 */
require('./bootstrap');

import VueRouter from "vue-router";
//import auth from "./auth";
import App from "./components/App.vue";
import Container from "./components/Container.vue";
import SetupContainer from "./components/SetupContainer.vue";
import Dashboard from "./components/Default/Dashboard.vue";
import Login from "./components/Auth/Login.vue";
import Notfound from "./components/Default/Notfound.vue";
import Confroom from "./components/Default/Confroom.vue";
import Register from "./components/Auth/Register.vue";
import ForgotPassword from "./components/Auth/ForgotPassword.vue";
import Todos from "./components/Articles/Todos.vue";
import AddArticle from "./components/Articles/AddArticle.vue";
import Articles from "./components/Articles/Articles.vue";
import Home from "./components/Default/Home.vue";
var VueResource = require('vue-resource');
//var VueTables = require('vue-tables-2');
//import VueSummernote from 'vue-summernote'
/*
 * import
 * components
 * */
import VuexRouterSync from 'vuex-router-sync';
import store from './store/store';


Vue.use(VueResource);
Vue.use(VueRouter);
//Vue.use(VueTables.client);
//Vue.use(VueTables.server);

/**
 * We'll register a HTTP interceptor to attach the "CSRF" header to each of
 * the outgoing requests issued by this application. The CSRF middleware
 * included with Laravel will automatically verify the header's value.
 */
//
//Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');
Vue.http.interceptors.push((request, next) => {
    request.headers['X-CSRF-TOKEN'] = Laravel.csrfToken;
   // request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('user_token');
    next();
});
//Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user_token');

const Default = {template: '<div>default</div>'}
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}
const Baz = {template: '<div>baz</div>'}


const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            path: '/',
            component: Container,
            meta: {},
            children: [
                // an empty path will be treated as the default, e.g.
                // components rendered at /parent: Root -> Parent -> Default
                {path: '', component: Home},
                {path: 'todos', component: Todos},
                {path: 'bar', component: Bar},
                // components rendered at /parent/foo: Root -> Parent -> Foo
              
            ]
        },

        {
            path: '/setup',
            component: SetupContainer,
            meta: {requiresAuth: true},
            children: [

                {path: '', component: Dashboard},
                {path: 'add', component: AddArticle},
                {path: 'confroom', component: Confroom},
                // NOTE absolute path here!
                // this allows you to leverage the component nesting without being
                // limited to the nested URL.
                // components rendered at /baz: Root -> Parent -> Baz
                {path: 'articles', component: Articles}
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/forgot-password',
            component: ForgotPassword
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/logout',
            beforeEnter (to, from, next) {
              //  auth.logout();
                store.dispatch('logout')
                next('/')
            }
        },
        {
            path: '*',
            component: Notfound
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        let token = localStorage.getItem('user_token');
        if (!token) {
             next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
           // Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user_token');
            next()
        }
    } else {
        next(); // make sure to always call next()!
    }
});

VuexRouterSync.sync(store, router);

// Vue.http.interceptors.push((request, next) => {
//     // continue to next interceptor
//     next((response) => {
//         if (response.status == 401) {
//             auth.logout();
//         }
//     });
//
// });


new Vue(Vue.util.extend({router,store}, App)).$mount('#app');

/*
 * end
 *
 * */