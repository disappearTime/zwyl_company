<template>
    <div id="app">
        <div class="header flex_space_between">
            <img src="../../assets/img/backLastPageGray.png" alt="">
            <div class="center flex_space_center">
                <span :class="current=='1'?['active',appStyle.fontStyle]:''" @click="tabClick('1')">项目</span>
                <span :class="current=='2'?['active',appStyle.fontStyle]:''" @click="tabClick('2')">商品</span>
            </div>
            <div class="right"></div>
        </div>
        <div class="content">
            <div class="project_wrap" v-show="current=='1'">
                <div class="sign_bar">
                    <span @click="projectTabClick('1')" :class="current_p_order_type=='1'?'sign_active':''">全部</span>
                    <span @click="projectTabClick('2')" :class="current_p_order_type=='2'?'sign_active':''">待支付</span>
                    <span @click="projectTabClick('3')" :class="current_p_order_type=='3'?'sign_active':''">待预约</span>
                    <span @click="projectTabClick('4')" :class="current_p_order_type=='4'?'sign_active':''">待服务</span>
                    <span @click="projectTabClick('5')" :class="current_p_order_type=='5'?'sign_active':''">待评价</span>
                    <span @click="projectTabClick('6')" :class="current_p_order_type=='6'?'sign_active':''">退单</span>
                </div>
                <div class="order_box">
                    <div class="order_card margin_b_1rem">
                        <project-info>
                            <span slot="project_name">高血压调理</span>
                            <span slot="shop_card_img">待支付</span>
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
                        <div class="order_buy_time flex_space_between">
                            <span class="left">下单时间：2017-12-12&nbsp;10:30</span>
                            <div class="right">
                                <button>取消订单</button>
                                <button :style="btnStyle">付尾款</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="goods_wrap" v-show="current=='2'">
                <div class="sign_bar">
                    <span @click="goodsTabClick('1')" :class="current_g_order_type=='1'?'sign_active':''">全部</span>
                    <span @click="goodsTabClick('2')" :class="current_g_order_type=='2'?'sign_active':''">待支付</span>
                    <span @click="goodsTabClick('3')" :class="current_g_order_type=='3'?'sign_active':''">待预约</span>
                    <span @click="goodsTabClick('4')" :class="current_g_order_type=='4'?'sign_active':''">待服务</span>
                    <span @click="goodsTabClick('5')" :class="current_g_order_type=='5'?'sign_active':''">待评价</span>
                    <span @click="goodsTabClick('6')" :class="current_g_order_type=='6'?'sign_active':''">退单</span>
                </div>
                <div class="order_box margin_b_1rem">
                    <project-info>
                        <span slot="project_name">高血压调理</span>
                        <span slot="shop_card_img">待支付</span>
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
                    <div class="order_buy_time flex_space_between">
                        <span class="left">下单时间：2017-12-12&nbsp;10:30</span>
                        <div class="right">
                            <button>取消订单</button>
                            <button :style="btnStyle">付尾款</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {styleConfig} from "../../assets/js/config.js"
    import ProjectInfo from "../../components/project_info.vue"
    export default {
        data () {
            return {
                appStyle: styleConfig,
                current: "1",
                current_p_order_type: "1",
                current_g_order_type: "1",
                btnStyle: {
                    'color': styleConfig.themeColor,
                    'borderColor': styleConfig.themeColor
                }
            }
        },
        methods: {
            tabClick (cur) { // 商品切换
                this.current = cur;
            },
            projectTabClick (cur) { // 项目订单类型切换
                this.current_p_order_type = cur;
            },
            goodsTabClick (cur) { // 商品订单类型切换
                this.current_g_order_type = cur;
            }
        },
        components: {
            ProjectInfo
        }
    }
</script>
