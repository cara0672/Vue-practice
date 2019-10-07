<template>
  <div>

    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id === 0 ? 'mui-active': '']" href="#item1mobile" data-wid="tab-top-subpage-1.html"
             v-for="item in photoCateList" :key="item.id" @click="getPhotoByCate(item.id)">
            {{ item.title }}
          </a>
        </div >
      </div>
    </div>

    <ul>
      <router-link :to="'/home/photolist/' + item.id" v-for="item in list" :key="item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="image_info">
          <div class="image_title">{{item.title}}</div>
          <div class="text">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import mui from '../../lib/mui-3.7.1/dist/js/mui.min.js';
  import {Toast} from 'mint-ui';
    export default {
        name: "PhotoList",
        data: function(){
            return {
                photoCateList: [],
                list:[]
            }
        },
        methods: {
            getPhotoCate(){
              this.$http.get('api/getimgcategory').then(function (data) {
                  if (data.body['status'] === 0){
                      this.photoCateList = data.body['message'];
                      this.photoCateList.unshift({'id': 0, 'title': '全部'})
                  }else{
                      Toast('获取图片类失败');
                  }
              })
            },
            getPhotoByCate(cateId){
                this.$http.get('api/getimages/' + cateId).then(function (data) {
                    if (data.body['status'] === 0){
                        this.list = data.body['message'];
                    }else{
                        Toast('获取图片失败');
                    }
                })
            }
        },
        created(){
            this.getPhotoCate();
        },
        mounted() {
            this.getPhotoByCate(0);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style scoped>
  img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  ul, li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ul{
    text-align: center;
  }
  li{
    position: relative;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .image_info{
    text-align: left;
    background-color: rgba(0,0,0,0.4);
    position: absolute;
    bottom: 0;
  }
  .image_title{
    font-size: 13px;
    color: white;
    max-height: 20%;
  }
  .text{
    font-size: 12px;
    color: white;
  }
  img{
    width: 100%;
    vertical-align:top;
    -moz-box-shadow:2px 0px 5px #333333; -webkit-box-shadow:2px 0px 5px #333333; box-shadow:2px 0px 5px #333333;
  }

</style>