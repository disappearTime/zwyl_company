import Vue from 'vue'
import babelpolyfill from 'babel-polyfill'
import fastClick from 'fastclick'
fastClick.attach(document.body)
import '../../assets/css/common.css'
import Carousel from 'vue-m-carousel'
import './appointment.css'
import appointment from './appointment.vue'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
new Vue({
    el: '#app',
    render: h => h(appointment),
})