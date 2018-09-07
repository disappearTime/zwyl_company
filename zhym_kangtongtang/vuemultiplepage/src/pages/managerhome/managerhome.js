// 共用
import Vue from 'vue'
import babelpolyfill from 'babel-polyfill'
import fastClick from 'fastclick'
fastClick.attach(document.body)
import '../../assets/css/common.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
// 私有
import './managerhome.css'
import managerhome from './managerhome.vue'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
new Vue({
    el: '#app',
    render: h => h(managerhome),
})