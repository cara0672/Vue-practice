import Vue from 'vue'
import {Header, Button} from 'mint-ui'
import app from './App.vue'
import 'mint-ui/lib/style.css'
import './mui-3.7.1/dist/css/mui.min.css'

Vue.component(Header.name, Header);

var vm = new Vue({
    el: '#app',
    data: {

    },
    render:c => c(app)
});