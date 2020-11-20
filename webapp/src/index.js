import Vue from 'vue';
import VeeValidate from 'vee-validate';
import firebase from 'firebase/app';
import { store } from './_store';
import { router } from './_helper';
import App from './app/App.vue';

// setup fake backend
import { configureFakeBackend } from './_helper';

Vue.use(VeeValidate);
configureFakeBackend();

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCADELKvTb6lSc7Qpd2i-fIDlybrkuEPrE',
      authDomain: 'quizapp-dd309.firebaseapp.com',
      databaseURL: 'https://quizapp-dd309.firebaseio.com',
      projectId: 'quizapp-dd309',
      storageBucket: 'quizapp-dd309.appspot.com',
      messagingSenderId: '352083113485',
      appId: '1:352083113485:web:038022835159e7359ec744',
      measurementId: 'G-WJ01HRSZLJ',
    });
  },
});
