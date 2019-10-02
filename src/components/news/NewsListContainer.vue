<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.id">
        <router-link :to="'/home/newslist/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h2>{{item.title}}</h2>
            <p class="mui-ellipsis">
              <span>{{item.add_time | timeFormat}}</span>
              <span>点击数: {{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "NewsListContainer",
        data:function(){
            return {
                newList:[]
            }
        },
        created(){
            this.getNewList();
        },
        methods:{
            getNewList(){
                this.$http.get('api/getnewslist').then(function (data) {
                    if(data.body['status'] === 0){
                        this.newList = data.body.message;
                    }else{
                      Toast('获取新闻列表失败');
                    }
                })
            }
        }
    }
</script>

<style scoped>
  h2{
    font-size: 16px;
  }
  .mui-ellipsis{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
</style>