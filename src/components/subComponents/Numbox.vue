<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1' :style="'height: ' + height + 'px'">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="numChange" ref="number" />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
  import mui from '../../lib/mui-3.7.1/dist/js/mui.min.js'

    export default {
        name: "Numbox",
        methods: {
          numChange(){
              const num = this.$refs.number.value;
              this.$emit('getGoodsNum', parseInt(num));
          }
        },
        mounted() {
            mui('.mui-numbox').numbox()
        },
        props:['height', 'max'],
        watch:{
            max: function (newVal, oldVal) {
                mui('.mui-numbox').numbox().setOption('max',newVal);
            }
        }
    }
</script>

<style scoped>
</style>