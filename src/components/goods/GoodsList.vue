<template>
  <div class="goodsListContainer">
    <router-link :to="'/home/goodslist/' + item.id"  class="goodsItem" v-for="item in goodsListByPage" :key="item.id">
      <div>
        <img class="goodsImg" :src="item.img_url" alt="">
        <p class="title">{{item.title}}</p>
      </div>
      <div class="subtitle">
        <p class="price">
          <span class="nowPrice">¥{{item.sell_price}}</span>&nbsp&nbsp&nbsp
          <span class="oldPrice">¥{{item.market_price}}</span>
        </p>
        <p class="sales">
          <span class="hot">热卖中</span>
          <span class="remain">剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>
    <mt-button type="danger" size="large" @click="getGoodslist(pageId++)">加载更多</mt-button>
  </div>
</template>

<script>
    export default {
        name: "GoodsList",
        data:function(){
            return {
                pageId: 1,
                goodsListByPage: []
            }
        },
        methods: {
            getGoodslist(id){
                this.$http.get('api/getgoods?pageindex=' + this.pageId).then(function (data) {
                    if (data.body['status'] === 0){
                        this.goodsListByPage = this.goodsListByPage.concat(data.body['message'])
                    }
                })
            }
        },
        created() {
            this.getGoodslist(this.pageId);
        }
    }
</script>

<style scoped>
  .goodsListContainer{
    display: flex;
    flex-wrap: wrap;
    padding:10px 5px;
    justify-content: space-between;
  }
  .goodsItem{
    width: 49%;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    -moz-box-shadow:0px 0px 1px #333333; -webkit-box-shadow:0px 0px 1px #333333; box-shadow:0px 0px 1px #333333;
  }
  .goodsImg{
    width: 100%;
  }
  .title{
    color: black;
    font-weight:bold;
  }
  .subtitle{
    background-color: #eee;
  }
  .goodsItem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding:2px;
  }
  .price{
    padding: 5px;
  }
  .nowPrice{
    color: red;
    font-size:16px;
    font-weight: bold;
  }
  .oldPrice{
    text-decoration: line-through;
  }
  .sales{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
</style>