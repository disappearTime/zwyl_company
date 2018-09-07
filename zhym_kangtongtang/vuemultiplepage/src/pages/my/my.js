import Vue from 'vue'
import babelpolyfill from 'babel-polyfill'
import '../../assets/css/common.css'
import './my.css'
import fastClick from 'fastclick'
fastClick.attach(document.body)
import My from './my.vue'
new Vue({
    el: '#app',
    render: h => h(My)
})