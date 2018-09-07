<template>
    <div id="app">
        <div class="header_bar">
            <Header>
                <img slot="head_back_img" src="../../assets/img/backLastPageGray.png" alt="">
                <i slot="head_title_i">全部23家门店</i>
            </Header>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="store_content">
                <store-info class="margin_b_1rem">
                    <i slot="store_name">太原市小太阳儿童中医保健中心</i>
                    <img slot="store_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <p slot="store_order_p_class_store_order" class="store_order">
                        <img src="../../assets/img/order.png" alt="" srcset="">
                        <span>已接单7890</span>
                    </p>
                    <p slot="store_area_p_class_store_area" class="store_area">
                        <img src="../../assets/img/local.png" alt="">
                        <span>太原市中关村大街8号解放大道11号院8号楼底商</span>
                    </p>
                    <span slot="project_distance_span">12km</span>
                </store-info>
                <store-info class="margin_b_1rem">
                    <i slot="store_name">太原市小太阳儿童中医保健中心</i>
                    <img slot="store_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <p slot="store_order_p_class_store_order" class="store_order">
                        <img src="../../assets/img/order.png" alt="" srcset="">
                        <span>已接单7890</span>
                    </p>
                    <p slot="store_area_p_class_store_area" class="store_area">
                        <img src="../../assets/img/local.png" alt="">
                        <span>太原市中关村大街8号解放大道11号院8号楼底商</span>
                    </p>
                    <span slot="project_distance_span">12km</span>
                </store-info>
                <store-info class="margin_b_1rem">
                    <i slot="store_name">太原市小太阳儿童中医保健中心</i>
                    <img slot="store_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <p slot="store_order_p_class_store_order" class="store_order">
                        <img src="../../assets/img/order.png" alt="" srcset="">
                        <span>已接单7890</span>
                    </p>
                    <p slot="store_area_p_class_store_area" class="store_area">
                        <img src="../../assets/img/local.png" alt="">
                        <span>太原市中关村大街8号解放大道11号院8号楼底商</span>
                    </p>
                    <span slot="project_distance_span">12km</span>
                </store-info>
                <store-info class="margin_b_1rem">
                    <i slot="store_name">太原市小太阳儿童中医保健中心</i>
                    <img slot="store_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <p slot="store_order_p_class_store_order" class="store_order">
                        <img src="../../assets/img/order.png" alt="" srcset="">
                        <span>已接单7890</span>
                    </p>
                    <p slot="store_area_p_class_store_area" class="store_area">
                        <img src="../../assets/img/local.png" alt="">
                        <span>太原市中关村大街8号解放大道11号院8号楼底商</span>
                    </p>
                    <span slot="project_distance_span">12km</span>
                </store-info>
                <store-info class="margin_b_1rem">
                    <i slot="store_name">太原市小太阳儿童中医保健中心</i>
                    <img slot="store_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <p slot="store_order_p_class_store_order" class="store_order">
                        <img src="../../assets/img/order.png" alt="" srcset="">
                        <span>已接单7890</span>
                    </p>
                    <p slot="store_area_p_class_store_area" class="store_area">
                        <img src="../../assets/img/local.png" alt="">
                        <span>太原市中关村大街8号解放大道11号院8号楼底商</span>
                    </p>
                    <span slot="project_distance_span">12km</span>
                </store-info>
                <store-info class="margin_b_1rem">
                    <i slot="store_name">太原市小太阳儿童中医保健中心</i>
                    <img slot="store_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <p slot="store_order_p_class_store_order" class="store_order">
                        <img src="../../assets/img/order.png" alt="" srcset="">
                        <span>已接单7890</span>
                    </p>
                    <p slot="store_area_p_class_store_area" class="store_area">
                        <img src="../../assets/img/local.png" alt="">
                        <span>太原市中关村大街8号解放大道11号院8号楼底商</span>
                    </p>
                    <span slot="project_distance_span">12km</span>
                </store-info>
            </div>
        </mt-loadmore>
        <loading v-if="isLoadingShow"></loading>
    </div>
</template>
<script>
    // 更多健管师
    import StoreInfo from '../../components/store.vue'
    import Header from '../../components/header.vue'
    import Loading from '../../components/loading.vue'
    import { styleConfig } from '../../assets/js/config.js'
    export default {
        data () {
            return {
                appStyle: styleConfig,
                allLoaded: false,
                isLoadingShow: true
            }
        },
        computed: {
            
        },
        methods: {
            loadBottom () { // 加载更多
                // 加载更多数据
                var that = this;
                setTimeout(function(){
                    // that.allLoaded = true;// 若数据已全部获取完毕 接口获取不到数据是allLoaded置为true
                    // 一页10条数据，获取到的数据小于10条时可以认为全部加载完allLoaded置为true。
                    that.$refs.loadmore.onBottomLoaded();
                },2000)    
            } 
        },
        mounted () {
            this.$nextTick(function(){
                var that = this
                setTimeout(function(){
                    that.isLoadingShow = false;
                },1500)
            })  
        },
        components: {
            StoreInfo,
            Header,
            Loading
        }
    }
</script>
<style>

</style>


