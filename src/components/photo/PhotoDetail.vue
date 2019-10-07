<template>
  <div class="container">
    <h4>{{imageDetail.title}}</h4>
    <div class="subtitle">
      <span class="dateTime">创建时间:{{imageDetail.add_time | timeFormat}}</span>
      <span class="click">点击数:{{imageDetail.click}}</span>
    </div>
      <hr>
      <vue-preview :slides="imageUrlList" class="imageSmall"></vue-preview>
      <p v-html="imageDetail.content" class="text"></p>


      <comment :id="imageId"></comment>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

    export default {
        name: "PhotoDetail",
        data: function(){
            return {
                imageId: this.$route.params.id,
                imageDetail: [],
                imageUrlList:[]
            }
        },
        methods: {
            getPhotoDetail(){
                this.$http.get('api/getimageInfo/' + this.imageId).then(function (result) {
                    if (result.body['status'] === 0){
                        this.imageDetail = result.body['message'][0]
                    }else{
                        Toast('获取图片详情失败')
                    }
                })
            },
            getPhotoUrl(){
                this.$http.get('api/getthumimages/' + this.imageId).then(function (result) {
                    if (result.body['status'] === 0){
                      this.imageUrlList = result.body['message'];
                      this.imageUrlList.forEach(function (item) {
                          item.msrc = item.src;
                          item.w = 600;
                          item.h = 400;
                      })
                    }else{
                        Toast('获取图片失败')
                    }
                })
            }
        },
        created(){
            this.getPhotoDetail();
            this.getPhotoUrl();
        }
    }
</script>

<style scoped>
  .container{
    margin: 0 5px;
  }
  h4{
    font-size: 14px;
    color: #007aff;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .subtitle{
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .text{
    font-size: 13px;
    color: black;
  }
</style>