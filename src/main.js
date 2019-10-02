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
Vue.http.options.root = 'http://www.liulongbin.top:3005';

import moment from 'moment';
import {Header, Button, Swipe, SwipeItem} from 'mint-ui'


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

Vue.filter('timeFormat', function (value, format="YYYY-MM-DD HH:MM:SS") {
    return moment(value).format(format);
});

var vm = new Vue({
    el: '#app',
    data: {

    },
    render:c => c(app),
    router,

});