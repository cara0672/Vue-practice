<template>
  <Comment :id="this.$route.params.id"></Comment>
</template>

<script>
  import Comment from './comment.vue'
    export default {
        name: "GoodsComment",
        components:{
            Comment
        }
    }
</script>

<style scoped>

</style>