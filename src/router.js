import VueRouter from 'vue-router'

import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import NewsListContainer from "./components/news/NewsListContainer.vue"
import NewDetail from "./components/news/NewDetail.vue";

var router = new VueRouter({
    routes:[
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsListContainer},
        {path: '/home/newslist/:id', component: NewDetail}
    ],
    linkActiveClass: 'mui-active'
});

export default router