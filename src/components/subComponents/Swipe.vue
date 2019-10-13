<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="item in lunbotu" :key="item.id">
      <img :src="item.url" alt="轮播图片" :class="{'isFull': full}">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
    export default {
        name: "Swipe",
        data:function(){
            return {
                imageId: this.$route.id
            }
        },
        methods: {
        },
        props:['lunbotu', 'full']
    }
</script>

<style scoped>
  .mint-swipe{
    height: 200px;
    text-align: center;
  }
  img{
    height: 100%;
  }
  .isFull{
    width: 100%;
  }
</style>