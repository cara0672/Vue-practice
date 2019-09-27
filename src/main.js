import Vue from 'vue'
import app from './App.vue'
import 'mint-ui/lib/style.css'
import './lib/mui-3.7.1/dist/css/mui.min.css'
import './lib/mui-3.7.1/dist/css/icons-extra.css'
import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import VueResource from 'vue-resource';
Vue.use(VueResource);
import {Header, Button, Swipe, SwipeItem} from 'mint-ui'


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

var vm = new Vue({
    el: '#app',
    data: {

    },
    render:c => c(app),
    router
});