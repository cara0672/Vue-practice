<template>
  <div>
    <h4>发表评论</h4>
    <hr />
    <div class="commitComment">
      <textarea maxlength="120" placeholder="请输入评论内容(最多120字)"></textarea>
      <mt-button type="primary" size="large">发表评论</mt-button>
    </div>

    <ul>
      <li v-for="(item, id) in commentListPage" :key="id">
        <div class="title">
          第{{id + 1}}楼 用户名: {{item.user_name}} 发表时间: {{item.add_time | timeFormat}}
        </div>
        <p class="commentContent">{{item.content}}</p>
      </li>
      <mt-button type="danger" size="large" plain @click="CommentMore">加载更多</mt-button>
    </ul>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

    export default {
        name: "comment",
        data:function(){
            return {
                commentListPage: [],
                pageindex: 1
            }
        },
        created(){
            this.getCommentPage();
        },
        methods:{
            getCommentPage(){
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(function (data) {
                    if (data.body['status'] === 0){
                        this.commentListPage = this.commentListPage.concat(data.body['message']);
                    }else{
                        console.log(data.body);
                        Toast('获取评论列表出错');
                    }
                })
            },
            CommentMore(){
                this.pageindex++;
                this.getCommentPage();
            }
        },
        props:["id"]
    }
</script>

<style scoped>
  ul,li{
    padding:0;
    list-style: none;
  }
  .title{
    background-color: #cccccc;
    font-size: 13px;
    line-height: 30px;
  }
  .commentContent{
    text-indent:2em;
  }
</style>