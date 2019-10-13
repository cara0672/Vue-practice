<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1' :style="'height: ' + height + 'px'">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="count" ref="number" @change="shopCarUpdate" />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
    import mui from '../../lib/mui-3.7.1/dist/js/mui.min.js'

    export default {
        name: "ShopCarNumBox",
        methods: {
            shopCarUpdate(){
                this.$store.commit('shopCarUpdate', {'id': this.goodsId, 'count': this.$refs.number.value});
            }
        },
        mounted() {
            mui('.mui-numbox').numbox()
        },
        props:['height', 'count', 'goodsId']
    }
</script>

<style scoped>
</style>