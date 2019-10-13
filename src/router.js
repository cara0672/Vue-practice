import VueRouter from 'vue-router'

import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import NewsListContainer from "./components/news/NewsListContainer.vue"
import NewDetail from "./components/news/NewDetail.vue";
import PhotoList from "./components/photo/PhotoList.vue";
import PhotoDetail from "./components/photo/PhotoDetail.vue";
import GoodsList from "./components/goods/GoodsList.vue";
import GoodsDetail from "./components/goods/GoodsDetail.vue";
import Goodsdesc from "./components/subComponents/Goodsdesc.vue";
import GoodsComment from "./components/subComponents/GoodsComment.vue";

var router = new VueRouter({
    routes:[
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsListContainer},
        {path: '/home/newslist/:id', component: NewDetail},
        {path: '/home/photolist', component: PhotoList},
        {path: '/home/photolist/:id', component: PhotoDetail},
        {path: '/home/goodslist', component: GoodsList},
        {path: '/home/goodslist/:id', component:GoodsDetail},
        {path: '/home/goodsdesc/:id', component: Goodsdesc, name: 'GoodsDesc'},
        {path: '/home/goodscomment/:id', component: GoodsComment, name: 'GoodsComment'}
    ],
    linkActiveClass: 'mui-active'
});

export default router