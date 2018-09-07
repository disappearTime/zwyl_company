<template>
    <div class="coupon_component" :style="couponStyle">
        <span class="RMB_symbol">￥</span>
        <div class="coupon_info flex_space_between">
            <div class="left">
                <div class="left_top flex_space_between">
                    <span class="left">
                        <slot name='coupon_money_i'></slot>
                    </span>
                    <span class="right">
                        <p class="coupon_rule">
                            <slot name='coupon_rule_span'></slot>
                        </p>
                        <p class="coupon_type">
                            <slot name='coupon_type_span'></slot>
                        </p>
                    </span>
                </div>
                <div class="left_bottom">
                    <p class="coupon_validity">
                        <slot name='coupon_validity_span'></slot>
                    </p>
                    <p class="coupon_rule_explain">
                        <slot name='coupon_rule_explain_span'></slot>
                    </p>
                </div>
            </div>
            <div class="right">{{ isReceived?'已领取':'领取' }}</div>
        </div>
    </div>
</template>
<script>
    // 优惠券组件
    import { styleConfig } from "../assets/js/config.js"
    export default {
        props: {
            isReceived: { // 是否已领取
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                couponStyle: {
                    'backgroundImage': `url(${ this.isReceived ? styleConfig.receivedCouponUrl : styleConfig.couponUrl })`,
                    'color': `${ this.isReceived ? styleConfig.receivedCouponFontstyle : styleConfig.couponFontstyle }`,
                },
            }
        },
        mounted () {
            this.$nextTick(function(){
            })
        }
    }
</script>
<style>
    .coupon_component{
        width: 20.9375rem;
        height: 6.68125rem;
        margin: 0 auto;
        background-size: cover;
        position: relative;
        padding: 0 2.125rem;
        box-sizing: border-box;
    }
    .coupon_component .RMB_symbol{
        position: absolute;
        font-family: 'PingFangSC-Medium';
        font-size: 0.875rem;
        letter-spacing: 0;
        left: 0.6rem;
        top: 0.3525rem;
    }
    .coupon_component .coupon_info{
        width: 100%;
        height: 100%;
    }
    .coupon_component .coupon_info .right{
        font-family: 'PingFangSC-Medium';
        font-size: 1rem;
        letter-spacing: 0;
        line-height: 1.25rem;
        width: 1.375rem;
    }
    .coupon_component .coupon_info .left{
        width: 11.5rem;
        height: 100%;
    }
    .coupon_component .left_top{
        width: 100%;
        height: 50%;
        border-bottom: 1px solid;
        box-sizing: border-box;
    }
    .coupon_component .left_top .left{
        height: 100%;
        width: 3.15625rem;
        font-family: 'Helvetica-Bold';
        font-size: 2.8125rem;
        letter-spacing: 0;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 0.375rem;
    }
    .coupon_component .left_top .right{
        height: 100%;
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .coupon_component .left_top .right .coupon_rule{
        font-size: 12px;
        transform: scale(0.8);
    }
    .coupon_component .left_top .right .coupon_rule span{
        display: inline-block;
        transform: translateX(-1rem);
    }
    .coupon_component .left_top .right .coupon_type{
        font-size: 12px;
    }
    .coupon_component .left_bottom{
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
    }
    .coupon_component .left_bottom p{
        white-space: nowrap;
        padding: 0.156rem 0;
        transform: scale(0.8);
    }
    .coupon_component .left_bottom p span{
        display: inline-block;
        transform: translateX(-1.3125rem);
    }
</style>


