<template>
  <div class="wrapper">
    <div class="header">
      <image :src="logo" class="logo" />
    </div>
    <div class="section">
      <text class="greeting">The environment is ready! hello world，你好</text>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    }
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    -ms-flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .header{
    width: 750px;
    height: 93.75px;
    flex-grow: 0;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .section{
    flex-grow: 1;
    flex-shrink: 1;
    background: #eee;
  }
  .footer{
    width: 750px;
    height: 93.75px;
    flex-shrink: 0;
    flex-grow: 0;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
