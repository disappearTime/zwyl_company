<template>
    <div id="app">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="banner" ref="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item>
                        <img src="../../assets/img/test/veer-1.jpg" alt="">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../../assets/img/test/veer-2.jpg" alt="">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../../assets/img/test/veer-3.jpg" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="appoin_content">
                <tab-bar>
                    <span slot="tabSpan" @click="tabClick('1')" :class="current=='1'?['tabActive',appStyle.fontStyle]:''">门店</span>
                    <span slot="tabSpan" @click="tabClick('2')" :class="current=='2'?['tabActive',appStyle.fontStyle]:''">健管师</span>
                    <span slot="tabSpan" @click="tabClick('3')" :class="current=='3'?['tabActive',appStyle.fontStyle]:''">项目</span>
                </tab-bar>
                <div v-if="current=='1'" class="tabitem store">
                    <!-- <div class="store_card content_card" @click="goStoreDetail">
                        <div class="card_title">太原市慢性病康复中心</div>
                        <list-cell :cellHeight="cellHeight">
                            <img slot="cell_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                            <p slot="cell_right" class="orderNum">
                                <img src="../../assets/img/order.png" alt="">已接单7890
                            </p>
                            <p slot="cell_right" class="area">
                                <img src="../../assets/img/local.png" alt="">太原市海珠区8号解放大道11号院8号楼低商
                            </p>
                            <p slot="cell_right" class="distance">
                                <span></span>12km
                            </p>
                        </list-cell>
                    </div>
                    <div class="store_card content_card" @click="goStoreDetail">
                        <div class="card_title">太原市慢性病康复中心</div>
                        <list-cell :cellHeight="cellHeight">
                            <img slot="cell_left" src="../../assets/img/test/mingxin2.jpg" alt="">
                            <p slot="cell_right" class="orderNum">
                                <img src="../../assets/img/order.png" alt="">已接单7890
                            </p>
                            <p slot="cell_right" class="area">
                                <img src="../../assets/img/local.png" alt="">太原市海珠区8号解放大道11号院8号楼低商
                            </p>
                            <p slot="cell_right" class="distance">
                                <span></span>12km
                            </p>
                        </list-cell>
                    </div>
                    <div class="store_card content_card" @click="goStoreDetail">
                        <div class="card_title">太原市慢性病康复中心</div>
                        <list-cell :cellHeight="cellHeight">
                            <img slot="cell_left" src="../../assets/img/test/mingxin3.jpg" alt="">
                            <p slot="cell_right" class="orderNum">
                                <img src="../../assets/img/order.png" alt="">已接单7890
                            </p>
                            <p slot="cell_right" class="area">
                                <img src="../../assets/img/local.png" alt="">太原市海珠区8号解放大道11号院8号楼低商
                            </p>
                            <p slot="cell_right" class="distance">
                                <span></span>12km
                            </p>
                        </list-cell>
                    </div> -->
                    <div class="store_box" @click="goStoreDetail">
                        <store-info>
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
                </div>
                <div v-if="current=='2'" class="tabitem health_manager">
                    <health-manager class="margin_b_1rem">
                        <img class="health_manager_headimg" @click="goManagerHome" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                        <i slot='managerName'>张雪华</i>
                        <i slot="manageRole">主任医师</i>
                        <span slot="five_star" v-for="i in 5" class="five_star">
                            <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                            <img v-else :src="appStyle.grayStarUrl" alt="">
                        </span>
                        <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                        <span slot="order_number">108单</span>
                        <button slot="appoinment_seek_btn" :class="appStyle.fontStyle">在线咨询</button>
                        <button slot="appoinment_seek_btn" :class="appStyle.fontStyle">立即预约</button>
                    </health-manager>
                    <health-manager class="margin_b_1rem">
                        <img class="health_manager_headimg" @click="goManagerHome" slot="manager_info_left" src="../../assets/img/test/mingxin2.jpg" alt="">
                        <i slot='managerName'>张雪华</i>
                        <i slot="manageRole">主任医师</i>
                        <span slot="five_star" v-for="i in 5" class="five_star">
                            <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                            <img v-else :src="appStyle.grayStarUrl" alt="">
                        </span>
                        <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                        <span slot="order_number">108单</span>
                        <button slot="appoinment_seek_btn" :class="appStyle.fontStyle">在线咨询</button>
                        <button slot="appoinment_seek_btn" :class="appStyle.fontStyle">立即预约</button>
                    </health-manager>
                    <health-manager class="margin_b_1rem">
                        <img class="health_manager_headimg" @click="goManagerHome" slot="manager_info_left" src="../../assets/img/test/mingxin3.jpg" alt="">
                        <i slot='managerName'>张雪华</i>
                        <i slot="manageRole">主任医师</i>
                        <span slot="five_star" v-for="i in 5" class="five_star">
                            <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                            <img v-else :src="appStyle.grayStarUrl" alt="">
                        </span>
                        <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                        <span slot="order_number">108单</span>
                        <button slot="appoinment_seek_btn" :class="appStyle.fontStyle">在线咨询</button>
                        <button slot="appoinment_seek_btn" :class="appStyle.fontStyle">立即预约</button>
                    </health-manager>
                </div>
                <div v-if="current=='3'" class="tabitem project">
                    <div class="project_box" @click="goProjectDetail">
                        <project-info class="margin_b_1rem">
                            <span slot="project_name">高血压调理</span>
                            <img :src="appStyle.shopCartUrl"  alt="" slot="shop_card_img">
                            <img src="../../assets/img/test/mingxin3.jpg" slot="project_img" alt="">
                            <p slot="project_rate_p_class_project_rate" class="project_rate">
                                <img src="../../assets/img/timepiece.png" alt="">30分钟/次
                            </p>
                            <p slot="project_area_p_class_project_area" class="project_area">
                                <img src="../../assets/img/local.png" alt="">太原市海珠区8号解放大道11号院8号楼底商太原市海珠区8号
                            </p>
                            <span slot="project_price_span">￥98</span>
                            <span slot="project_distance_span">12km</span>
                        </project-info>
                    </div>
                    <div class="project_box" @click="goProjectDetail">
                        <project-info class="margin_b_1rem">
                            <span slot="project_name">高血压调理</span>
                            <img :src="appStyle.shopCartUrl"  alt="" slot="shop_card_img">
                            <img src="../../assets/img/test/mingxin2.jpg" slot="project_img" alt="">
                            <p slot="project_rate_p_class_project_rate" class="project_rate">
                                <img src="../../assets/img/timepiece.png" alt="">30分钟/次
                            </p>
                            <p slot="project_area_p_class_project_area" class="project_area">
                                <img src="../../assets/img/local.png" alt="">太原市海珠区8号解放大道11号院8号楼底商太原市海珠区8号
                            </p>
                            <span slot="project_price_span">￥98</span>
                            <span slot="project_distance_span">12km</span>
                        </project-info>
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <loading v-if="isloadingShow"></loading>
    </div>
</template>
<script>
    // 预约
    import Carousel from 'vue-m-carousel'
    import ListCell from '../../components/list_cell.vue'
    import Loading from '../../components/loading.vue'
    import HealthManager from '../../components/health_manage_info.vue'
    import StoreInfo from '../../components/store.vue'
    import ProjectInfo from '../../components/project_info.vue'
    import TabBar from '../../components/tab.vue'
    import { styleConfig } from '../../assets/js/config.js'
    import { setWebViewJsBridge } from '../../assets/js/common.js'
    import { mutual } from '../../assets/js/common.js'
    export default {
        data () {
            return {
                current: '1',
                cellHeight: '5.625rem',
                allLoaded: false,
                isloadingShow: true,
                score: 3.5,
                appStyle: styleConfig
            }
        },
        mounted () {
            this.$nextTick(function(){
                setWebViewJsBridge();
                var that = this;
                setTimeout(function(){
                    that.isloadingShow = false;
                },1500)
            })  
        },
        methods: {
            tabClick (cur) { // tab切换
                this.current = cur;
            },
            loadBottom () { // 加载更多
                // 加载更多数据
                var that = this;
                setTimeout(function(){
                    // that.allLoaded = true;// 若数据已全部获取完毕 接口获取不到数据是allLoaded置为true
                    // 一页10条数据，获取到的数据小于10条时可以认为全部加载完allLoaded置为true。
                    that.$refs.loadmore.onBottomLoaded();
                },2000)    
            },
            goStoreDetail () { // 跳往门店详情页
                var json = {
                    url: 'dist/storedetail.html?storeId=1'
                }
                mutual(json,'openWebView');
            },
            goManagerHome () { // 跳往健管师主页
                var json = {
                    url: 'dist/managerhome.html'
                }
                mutual(json,'openWebView');
            },
            goProjectDetail () { // 跳往健管师主页
                var json = {
                    url: 'dist/projectdetail.html'
                }
                mutual(json,'openWebView');
            }
        },
        components: {
            Carousel,
            ListCell,
            Loading,
            HealthManager,
            TabBar,
            StoreInfo,
            ProjectInfo
        }
    }
</script>

