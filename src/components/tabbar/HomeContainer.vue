<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotu" :key="item.id">
        <img :src="item.url" alt="轮播图片">
      </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
        <img src="../../images/menu1.png" alt="">
        <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
        <img src="../../images/menu2.png" alt="">
        <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
        <img src="../../images/menu3.png" alt="">
        <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
        <img src="../../images/menu4.png" alt="">
        <div class="mui-media-body">留言反馈</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
        <img src="../../images/menu5.png" alt="">
        <div class="mui-media-body">视频专区</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
        <img src="../../images/menu6.png" alt="">
        <div class="mui-media-body">联系我们</div></router-link></li>

    </ul>
  </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "HomeContainer",
        data:function(){
            return {
                lunbotu:{}
            }
        },
        methods:{
            getlunbotu(){
                this.$http.get('/lunbo.json').then(result => {
                    if (result.body['status'] === 0){
                        this.lunbotu = result.body.images;
                    }else{
                        Toast('加载轮播图失败');
                    }
                })
            }
        },
        created(){
            this.getlunbotu();
        }
    }
</script>

<style scoped>
  .mint-swipe{
    height: 200px;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .mui-grid-view.mui-grid-9{
    background-color: white;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:0;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell img{
    width: 60px;
    height: 60px;
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 13px;
  }
</style>