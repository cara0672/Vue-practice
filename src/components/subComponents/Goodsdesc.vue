<template>
  <div class="goodsDesc-container">
    <h4 class="descTitle">{{goodsDescData.title}}</h4>

    <hr>

    <p v-html="goodsDescData.content" class="goodsDescContent"></p>
  </div>
</template>

<script>
    export default {
        name: "Goodsdesc",
        data:function(){
            return {
                goodsId: this.$route.params.id,
                goodsDescData: {}
            }
        },
        methods: {
            getGoodsDesc(){
                this.$http.get('api/goods/getdesc/' + this.goodsId).then(function (result) {
                    if (result.body['status'] === 0){
                        this.goodsDescData = result.body['message'][0];
                    }
                })
            }
        },
        created() {
            this.getGoodsDesc();
        }
    }
</script>

<style>
  .goodsDesc-container{
    margin: 0 5px;
  }
  .descTitle{
    font-size: 13px;
    color: #0062cc;
    text-align: center;
    margin: 15px;
  }
  .goodsDescContent img{
    width: 100%;
  }
</style>