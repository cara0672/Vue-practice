<template>
  <div class="goodsdetail-container">
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
    >
      <div class="ball" v-show="isBallShow" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <Lunbotu :lunbotu="lunbotu" :full="false"></Lunbotu>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价: <span class="oldPrice">¥ {{goodsInfo.market_price}}</span>&nbsp
            销售价: <span class="nowPrice">¥ {{goodsInfo.sell_price}}</span>
          </p>
          <p class="sellNum">购买数量: &nbsp<Numbox :height="23" :max="goodsInfo.stock_quantity" @getGoodsNum="getGoodsNum"></Numbox></p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号 : {{goodsInfo.goods_no}}</p>
          <p>库存情况 : {{goodsInfo.stock_quantity}}</p>
          <p>上架时间 : {{goodsInfo.add_time | timeFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goGoodsIntroduction(goodsId)">图文介绍</mt-button>
        <mt-button class="goodsCommentButton" type="danger" size="large" plain @click="goGoodsComment(goodsId)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Lunbotu from '../subComponents/Swipe.vue';
  import Numbox from "../subComponents/Numbox.vue";

    export default {
        name: "GoodsDetail",
        data:function(){
            return {
                goodsId: this.$route.params.id,
                lunbotu: [],
                goodsInfo: {},
                isBallShow:false,
                goodsNum: 1
            }
        },
        methods: {
            getGoodsImage(){
                this.$http.get('api/getthumimages/' + this.goodsId).then(function (result) {
                    if (result.body['status'] === 0 ){
                        this.lunbotu = result.body['message'];
                        this.lunbotu.forEach(function (item) {
                            item.url = item.src;
                        })
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/' + this.goodsId).then(function (result) {
                    if (result.body['status'] === 0){
                        this.goodsInfo = result.body['message'][0]
                    }
                })
            },
            goGoodsIntroduction(id){
              this.$router.push({name:'GoodsDesc', params: {id}});
            },
            goGoodsComment(id){
              this.$router.push({name: 'GoodsComment', params:{id}})
            },
            addToCar(){
                var goodsInfo = {
                  id: this.goodsId,
                  count: this.goodsNum,
                  price: this.goodsInfo['sell_price'],
                  selected:true
                };
                this.$store.commit('addToCar', goodsInfo);
                this.isBallShow = !this.isBallShow;
            },
            getGoodsNum(num){
                this.goodsNum = num;
            },
            beforeEnter(el){
              el.style.transform = "translate(0, 0)";
            },
            enter(el, done){
              el.offsetWidth;

              const ballPosition = this.$refs.ball.getBoundingClientRect();
              const badgePosition = document.getElementById('badge-num').getBoundingClientRect();

              const left = badgePosition.left - ballPosition.left;
              const top = badgePosition.top - ballPosition.top;

              el.style.transform = "translate(" + left + "px," + top + "px";
              el.style.transition = 'all 0.3s ease';
              done();
            },
            afterEnter(){
              this.isBallShow = !this.isBallShow;
            }
        },
        created(){
            this.getGoodsImage();
            this.getGoodsInfo();
        },
        components:{
            Lunbotu,
            Numbox
        }
    }
</script>

<style scoped>
  .goodsdetail-container{
    overflow: hidden;
  }
  .mui-card-content-inner p{
    color: black;
  }
  .sellNum{
    display: flex;
  }
  .oldPrice{
    text-decoration-line: line-through;
  }
  .nowPrice{
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  .mui-card-footer{
    flex-direction: column;
    justify-content: space-between;
  }
  .goodsCommentButton{
    margin-top: 10px;
  }
  .ball{
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 15px;
    position: absolute;
    left: 146px;
    top: 383px;
    z-index: 99;
  }
</style>