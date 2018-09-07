<template>
    <div id="app">
        <div class="header_bar">
            <Header>
                <img slot="head_back_img" src="../../assets/img/backLastPageGray.png" alt="">
                <i slot="head_title_i">门店详情</i>
            </Header>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore_data">
            <div class="store_introduce">
                <img src="../../assets/img/katong.jpg" alt="">
            </div> 
            <div class="store_detail">
                <div class="storeInfo">
                    <h3>太原市慢性病康复中心</h3>
                    <p class="order_number">已接单7800</p>
                    <p class="area_distance flex_space_between">
                        <span class="area">太原市海珠区8号解放大道11号院8号楼底商太原市海珠区8号</span>
                        <span :class="[appStyle.fontStyle,'distance']">12km</span>
                    </p>
                </div>
                <view-more>
                    <i slot="view_more_info">门店介绍</i>
                </view-more> 
                <tab-bar>
                    <span @click="tabClick('1')" :class="current=='1'?['tabActive',appStyle.fontStyle]:''" slot="tabSpan">预约健管师</span>
                    <span @click="tabClick('2')" :class="current=='2'?['tabActive',appStyle.fontStyle]:''" slot="tabSpan">预约项目</span>
                </tab-bar>
                <div class="health_manager" v-show="current=='1'">
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
                </div>
                <div class="project" v-show="current=='2'">
                    <sign-gather>
                        <span slot="sign_span" :class="sign_current=='1'?['sign_active',appStyle.bgStyle]:''">高血压调理</span>
                        <span slot="sign_span" :class="sign_current=='2'?['sign_active',appStyle.bgStyle]:''">高血压调理</span>
                        <span slot="sign_span" :class="sign_current=='3'?['sign_active',appStyle.bgStyle]:''"> 慢性呼吸系统疾病</span>
                        <span slot="sign_span" :class="sign_current=='4'?['sign_active',appStyle.bgStyle]:''">老人保健</span>
                        <span slot="sign_span" :class="sign_current=='5'?['sign_active',appStyle.bgStyle]:''">高血压调理</span>
                        <span slot="sign_span" :class="sign_current=='6'?['sign_active',appStyle.bgStyle]:''">高血压调理</span>
                    </sign-gather>
                    <!-- 项目分类 -->
                    <div class="project_class">
                        <div :class="[appStyle.fontStyle,'project_class_name']">脾胃调理特色项目</div>
                        <div class="project_box" @click="goProjectDetail">
                            <project-info class="margin_b_1rem">
                                <span slot="project_name">高血压调理</span>
                                <img :src="appStyle.shopCartUrl"  alt="" slot="shop_card_img">
                                <img src="../../assets/img/test/mingxin1.jpg" slot="project_img" alt="">
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
                    <div class="project_class">
                        <div :class="[appStyle.fontStyle,'project_class_name']">心肺调理康复项目</div>
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
                    </div>
                </div>
            </div>   
        </mt-loadmore>
    </div>
</template>
<script>
    // 门店详情
    import ViewMore from "../../components/more.vue"
    import TabBar from "../../components/tab.vue"
    import HealthManager from '../../components/health_manage_info.vue'
    import BgCard from '../../components/bg_card.vue'
    import SignGather from '../../components/sign_gather.vue'
    import Header from '../../components/header.vue'
    import ProjectInfo from '../../components/project_info.vue'
    import { styleConfig } from '../../assets/js/config.js'
    import { setWebViewJsBridge } from '../../assets/js/common.js'
    import { mutual } from '../../assets/js/common.js'
    export default {
        data () {
            return {
                allLoaded: false,
                appStyle: styleConfig,
                current: '1',
                managerInfoHeight: '8.125rem',
                managerinfoLeftWidth: '3.125rem',
                score: 3.5,
                sign_current: '1',
            }
        },
        methods: {
            loadBottom () { // 加载更多
                // 加载更多数据
                var that = this;
                setTimeout(function(){
                    //that.allLoaded = true;// 若数据已全部获取完毕 接口获取不到数据是allLoaded置为true
                    that.$refs.loadmore_data.onBottomLoaded();    
                },2000)    
            },
            tabClick (cur) { // 
                this.current = cur;
            },
            goManagerHome () { // 健管师主页
                var json = {
                    url: 'dist/managerhome.html'
                }
                mutual(json,'openWebView');
            },
            goProjectDetail () { // 健管师主页
                var json = {
                    url: 'dist/projectdetail.html'
                }
                mutual(json,'openWebView');
            },
        },
        mounted () {
            this.$nextTick(function(){
                setWebViewJsBridge();
            })
        },
        components: {
            ViewMore,
            TabBar,
            HealthManager,
            BgCard,
            SignGather,
            ProjectInfo,
            Header
        }
    }
</script>

