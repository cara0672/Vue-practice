<template>
  <div class="newDetailContainer">
    <h5 class="newTitle">{{newDetail.title}}</h5>
    <span class="subtitle">
      <span class="">发表时间: {{newDetail.add_time | timeFormat}}</span><span>点击数: {{newDetail.click}}</span>
    </span>


    <hr>

    <p v-html="newDetail.content"></p>
    <comment :id="this.newId"></comment>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import Comment from '../subComponents/comment.vue'

    export default {
        name: "NewDetail",
        data:function(){
            return {
                newId: this.$route.params.id,
                newDetail: []
            }
        },
        created(){
            this.getNewDetail();
        },
        methods:{
            getNewDetail(){
                this.$http.get('api/getnew/' + this.newId).then(function(data){
                    if (data.body['status'] === 0){
                        this.newDetail = data.body['message'][0];
                    }else{
                        Toast('获取新闻详情出错');
                    }
                })
            }
        },
        components:{
            comment:Comment
        }
    }
</script>

<style scoped>
  .newDetailContainer{
    padding:5px;
  }
  .newTitle{
    font-weight: bold;
    color: red;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
</style>