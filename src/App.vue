<template>
  <div class="content">
  <!--Heaer-->
    <mt-header fixed title="Header">
        <span @click="goback" slot="left" v-show="!flag">
            <mt-button icon="back">返回</mt-button>
        </span>
    </mt-header>

    <!--continer-->
    <transition>
      <router-view></router-view>
    </transition>

    <!--tabbar-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item " to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge-num">{{this.$store.getters.getAllCount}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
    export default {
        name: "login",
        data:function(){
            return {
                flag: false
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        },
        created(){
            this.flag = this.$route.path == '/home' ? true: false;
        },
        watch:{
            '$route.path':function (newVal) {
                if (newVal == '/home'){
                    this.flag = true;
                }else{
                    this.flag = false;
                }
            }
        }
    }
</script>

<style scoped>
  *{
    touch-action: pan-y;
  }
  .content{
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
  }
  .mint-header.is-fixed{
    z-index: 99;
  }

  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity:0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active, .v-leave-active{
    transition: all 0.5s ease;
  }
</style>