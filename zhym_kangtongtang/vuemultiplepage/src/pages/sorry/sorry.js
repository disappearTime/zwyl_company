// 共用
import Vue from 'vue'
import babelpolyfill from 'babel-polyfill'
import '../../assets/css/common.css'
// 私有
import sorry from './sorry.vue'
new Vue({
    el: '#app',
    render: h => h(sorry),
})