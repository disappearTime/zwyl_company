<template>
    <div id="app">
        <div class="header_bar">
            <Header>
                <img slot="head_back_img" src="../../assets/img/backLastPageGray.png" alt="">
                <i slot="head_title_i">领券中心</i>
            </Header>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="coupon_content">
                <div class="coupon_box margin_b_1rem">
                    <coupon>
                        <i slot="coupon_money_i">60</i>
                        <span slot="coupon_rule_span">满200元可用</span>
                        <span slot="coupon_type_span">新人券</span>
                        <span slot="coupon_validity_span">有效期：2018-06-02至2018-06-30</span>
                        <span slot="coupon_rule_explain_span">用券规则说明：限全场商品类使用</span>
                    </coupon>
                </div>
                <div class="coupon_box margin_b_1rem">
                    <coupon>
                        <i slot="coupon_money_i">60</i>
                        <span slot="coupon_rule_span">满200元可用</span>
                        <span slot="coupon_type_span">新人券</span>
                        <span slot="coupon_validity_span">有效期：2018-06-02至2018-06-30</span>
                        <span slot="coupon_rule_explain_span">用券规则说明：限全场商品类使用</span>
                    </coupon>
                </div>
                <div class="coupon_box margin_b_1rem">
                    <coupon>
                        <i slot="coupon_money_i">60</i>
                        <span slot="coupon_rule_span">满200元可用</span>
                        <span slot="coupon_type_span">新人券</span>
                        <span slot="coupon_validity_span">有效期：2018-06-02至2018-06-30</span>
                        <span slot="coupon_rule_explain_span">用券规则说明：限全场商品类使用</span>
                    </coupon>
                </div>
                <div class="coupon_box margin_b_1rem">
                    <coupon>
                        <i slot="coupon_money_i">60</i>
                        <span slot="coupon_rule_span">满200元可用</span>
                        <span slot="coupon_type_span">新人券</span>
                        <span slot="coupon_validity_span">有效期：2018-06-02至2018-06-30</span>
                        <span slot="coupon_rule_explain_span">用券规则说明：限全场商品类使用</span>
                    </coupon>
                </div>
                <div class="coupon_box margin_b_1rem">
                    <coupon>
                        <i slot="coupon_money_i">60</i>
                        <span slot="coupon_rule_span">满200元可用</span>
                        <span slot="coupon_type_span">新人券</span>
                        <span slot="coupon_validity_span">有效期：2018-06-02至2018-06-30</span>
                        <span slot="coupon_rule_explain_span">用券规则说明：限全场商品类使用</span>
                    </coupon>
                </div>
                <div class="coupon_box margin_b_1rem">
                    <coupon :isReceived='true'>
                        <i slot="coupon_money_i">60</i>
                        <span slot="coupon_rule_span">满200元可用</span>
                        <span slot="coupon_type_span">新人券</span>
                        <span slot="coupon_validity_span">有效期：2018-06-02至2018-06-30</span>
                        <span slot="coupon_rule_explain_span">用券规则说明：限全场商品类使用</span>
                    </coupon>
                </div>
                <div class="coupon_box margin_b_1rem">
                    <coupon>
                        <i slot="coupon_money_i">60</i>
                        <span slot="coupon_rule_span">满200元可用</span>
                        <span slot="coupon_type_span">新人券</span>
                        <span slot="coupon_validity_span">有效期：2018-06-02至2018-06-30</span>
                        <span slot="coupon_rule_explain_span">用券规则说明：限全场商品类使用</span>
                    </coupon>
                </div>
            </div>
        </mt-loadmore>
        <loading v-if="isLoadingShow"></loading>
    </div>
</template>
<script>
    // 领券中心
    import Header from '../../components/header.vue'
    import Loading from '../../components/loading.vue'
    import Coupon from '../../components/coupon.vue'
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
            Header,
            Loading,
            Coupon
        }
    }
</script>
<style>

</style>


