<template>
    <div class="shopCar-container">
        <div class="mui-content" v-for="item in goodslist" :key="item.id">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="g[item.id]" @change="selectedChanged(item.id, g[item.id])"></mt-switch>
                        <div class="goodsItem">
                            <img :src="item.thumb_path" alt="">
                            <div class="goodsinfo">
                                <h4>{{item.title}}</h4>
                                <span>¥{{item.sell_price}}</span>
                                <ShopCarNumBox height="25" class="numbox" :goodsId="item.id" :count="$store.getters.shopCarGoodsList[item.id]"></ShopCarNumBox>
                                <a href="#" @click.prevent="deleteGoods(item.id)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner bill">
                    <div class="goodsCountAndPrice">
                        <p>总计(不包含运费)</p>
                        <p>已勾选商品<span>{{this.$store.getters.getAllCount}}</span>件, 总价<span>¥{{this.$store.getters.totalPrice}}</span></p>
                    </div>
                    <div class="bill-button">
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ShopCarNumBox from "../subComponents/ShopCarNumBox.vue";

    export default {
        name: "ShopcarContainer",
        data:function(){
            return {
                goodslist: [],
                g:this.$store.getters.goodsSelected
            }
        },
        methods: {
            getShopCarList(){
                var shopCarList = [];

                if (this.$store.state.car.length > 0){
                    this.$store.state.car.forEach(function (item) {
                        shopCarList.push(item.id)
                    });

                    this.$http.get('api/goods/getshopcarlist/' + shopCarList.join(',')).then(function (result) {
                        if (result.body['status'] === 0){
                            this.goodslist = result.body['message'];
                        }else{
                            console.log('获取购物车数据出错');
                        }
                    })
                }
            },
            deleteGoods(id,index){
                this.goodslist.splice(index,1);
                this.$store.commit('deleteShopCarGoods', id);
            },
            selectedChanged(id, val){
                this.$store.commit('updataGoodsSelected', {'id': id, 'selected': val});
            }

        },
        created(){
            this.getShopCarList();
        },
        components:{
            ShopCarNumBox
        }
    }
</script>

<style scoped>
    .mui-card-content-inner{
        display: flex;
        align-items: center;
    }
    .mui-card-content-inner img{
        float: left;
        width: 60px;
        height: 60px;
    }
    h4{
        font-size: 14px;
    }
    .goodsinfo{
        float: right;
    }
    .numbox{
        display: inline-block
    }
    .bill{
        display: flex;
        justify-content: space-between;
    }
    .goodsCountAndPrice span{
        color: red;
    }
</style>