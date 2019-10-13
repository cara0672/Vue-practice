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

import Comment from './components/subComponents/comment.vue'
Vue.component('Comment', Comment);

import {Header, Button, Swipe, SwipeItem, Lazyload, Switch} from 'mint-ui'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);

import VuePreview from 'vue-preview'

Vue.use(VuePreview);

import Vuex from 'vuex'
Vue.use(Vuex);

var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar(state, goodsinfo){
            var flag = false;
            state.car.some(function (item) {
                if (item['id'] === goodsinfo['id']){
                    item['count'] = item['count'] + goodsinfo['count'];
                    flag = true;
                    return true;
                }
            });

            if (flag === false){
                state.car.push(goodsinfo);
            }

            localStorage.setItem('car', JSON.stringify(state.car));
        },
        shopCarUpdate(state, goodsInfo){
            state.car.some(function (item) {
                if(item['id'] == goodsInfo['id']){
                    item['count'] = parseInt(goodsInfo['count']);
                    return true;
                }
            });
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        deleteShopCarGoods(state, id){
            state.car.some(function (item,index) {
                if (item['id'] == id){
                    state.car.splice(index, 1);
                    return true;
                }
            });
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updataGoodsSelected(state, info){
            state.car.some(function (item) {
                if(item['id'] == info['id']){
                    item['selected'] = info['selected'];
                }

            });
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters:{
        getAllCount(state){
            var count = 0;
            state.car.forEach(function (item) {
                count = count + item['count'];
            });

            return count;
        },
        shopCarGoodsList(state){
            var count = {};
            state.car.forEach(function (item) {
                count[item.id] = item['count'];
            });
            return count;
        },
        totalPrice(state){
            var price = 0;
            state.car.forEach(function (item) {
                if(item['selected'] == true){
                    price += item['price'] * item['count'];
                }
            });
            return price;
        },
        goodsSelected(state){
            var selected = {};

            state.car.forEach(function (item) {
                selected[item.id] = item['selected'];
            });

            return selected;
        },
    }
});

Vue.filter('timeFormat', function (value, format="YYYY-MM-DD HH:MM:ss") {
    return moment(value).format(format);
});

var vm = new Vue({
    el: '#app',
    data: {

    },
    render:c => c(app),
    router,
    store

});