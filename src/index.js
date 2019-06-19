import Vue from 'vue';
import App from './App.vue';
import router from './router';
import _ from 'lodash';
import ElementUI from 'element-ui';

// axios.defaults.baseURL = 'http://127.0.0.1:5230/';

Vue.use(ElementUI);

new Vue({
    el: '#app',
    template: '<App />',
    components: {
        App
    },
    router
})
