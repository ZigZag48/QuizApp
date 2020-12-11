import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import LoginPage from '../login/LoginPage.vue';
import Quiz from '../login/Quiz.vue';
import Main from '../login/Main.vue';
import RegisterPage from '../register/RegisterPage.vue';
// import ForgotPassword from '../forgotpassword/ForgotPassword.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/quiz', component: Quiz },
    { path: '/main', component: Main },
    { path: '/register', component: RegisterPage },
    // { path: '/forgotpassword', component: ForgotPassword },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
});
