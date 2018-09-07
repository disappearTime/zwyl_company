<template>
    <div id="app">
        <div class="my_info">
            <div class="user flex_space_between">
                <div class="user_head_name flex_space_start">
                    <div class="head">
                        <img src="../../assets/img/katong.jpg" alt="">
                    </div>
                    <div class="name">
                        <p>柠檬小姐</p>
                        <p>864健康值</p>
                    </div>
                </div>
                <div class="code_scan">
                    <img src="../../assets/img/saoyisao.png" alt="">
                </div>
            </div>
            <div class="my_trends">
                <div class="money flex_space_around">
                    <div>
                        <p :class="appStyle.fontStyle">￥200</p>
                        <p>余额</p>
                    </div>
                    <div>
                        <p :class="appStyle.fontStyle">30</p>
                        <p>代金券</p>
                    </div>
                    <div>
                        <p :class="appStyle.fontStyle">1234</p>
                        <p>金币</p>
                    </div>
                </div>
                <div class="trends flex_space_around">
                    <div>
                        <p>344</p>
                        <p>关注</p>
                    </div>
                    <div>
                        <p>1234</p>
                        <p>粉丝</p>
                    </div>
                    <div>
                        <p>8</p>
                        <p>日记</p>
                    </div>
                    <div>
                        <p>34</p>
                        <p>问答</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="my_relative">
            <div class="card oder">
                <div class="card_title flex_space_between">
                    <span>我的订单</span>
                    <span>更多&nbsp;></span>
                </div>
                <ul class="card_content clearfix">
                    <li>
                        <span :class="['num',appStyle.fontStyle]">
                            <span>3</span>
                        </span>
                        <img :src="appStyle.obligationUrl" alt="">
                        <p>待付款</p>
                    </li>
                </ul>
            </div>
            <div class="card serve">
                <div class="card_title flex_space_between">
                    <span>我的服务</span>
                    <span>更多&nbsp;></span>
                </div>
                <ul class="card_content clearfix">
                    <li>
                        <span :class="['num',appStyle.fontStyle]">
                            <span>3</span>
                        </span>
                        <img :src="appStyle.toBeServeUrl" alt="">
                        <p>待预约</p>
                    </li>
                    <li>
                        <img :src="appStyle.toBeRecivedUrl" alt="">
                        <p>待服务收货</p>
                    </li>
                    <li>
                        <img :src="appStyle.toBeEvaluatedUrl" alt="">
                        <p>待评价</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="my_about">
            <div class="flex_box flex_space_around">
                <div class="flex_item">
                    <img src="../../assets/img/healthRecord.png" alt="">
                    <p>健康档案</p>
                </div>
                <div class="flex_item">
                    <img src="../../assets/img/senseData.png" alt="">
                    <p>监测数据</p>
                </div>
                <div class="flex_item">
                    <img src="../../assets/img/trainingCenter.png" alt="">
                    <p>训练中心</p>
                </div>
                <div class="flex_item">
                    <img src="../../assets/img/asADoctor.png" alt="">
                    <p>当健管师</p>
                </div>
            </div>
            <div class="flex_box flex_space_around">
                <div class="flex_item">
                    <img src="../../assets/img/myNews.png" alt="">
                    <p>我的消息</p>
                </div>
                <div class="flex_item">
                    <img src="../../assets/img/healthValue.png" alt="">
                    <p>我的健康值</p>
                </div>
                <div class="flex_item">
                    <img src="../../assets/img/myShopingCart.png" alt="">
                    <p>购物车</p>
                </div>
                <div class="flex_item">
                    <img src="../../assets/img/setting.png" alt="">
                    <p>设置</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // 我的
    import { setWebViewJsBridge } from '../../assets/js/common.js'
    import { mutual } from '../../assets/js/common.js'
    import { setUserInfo } from  '../../assets/js/common.js'
    import { styleConfig } from  '../../assets/js/config.js'
    export default {
        data () {
            return {
                appStyle: styleConfig
            }
        },
        components: {
            
        },
        methods: { 
            getUserInfo () { // 获取用户登录信息
                var json = {}
                mutual(json,'getUserInfo');
            }
        },
        mounted () {
            this.$nextTick(function(){
                window.setUserInfo = setUserInfo;
                this.getUserInfo();
            })
        }
    }
</script>

