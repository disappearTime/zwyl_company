<template>
    <div class="health_manager_info">
        <div class="info_wrapper" :style="info_wrapper_height">
            <div class="info_left" :style="info_left_width">
                <img class="identiy" :src="health_manager_style_class.authorityUrl" alt="">
                <span class="managerHeadimg" :style="manager_head_img_h">
                    <slot name="manager_info_left"></slot>
                </span>
            </div>
            <div class="info_right">
                <p class="doctorInfo">
                    <span class="doctorName">
                        <slot name="managerName"></slot>
                    </span>
                    <span class="doctorRole">
                        <slot name="manageRole"></slot>
                    </span>
                </p>
                <p class="score">
                    <span>评分</span>
                    <span class="score_star">
                        <slot name="five_star"></slot>
                    </span>
                    
                </p>
                <p class="beGoodAt">
                    <span>擅长:</span>
                    <slot name="beGoodAt"></slot>
                </p>
                <div class="single_numble">
                    <p>已接单</p>
                    <span :class="health_manager_style_class.fontStyle">
                        <slot name="order_number"></slot>
                    </span>
                </div>
                <p class="btn">
                    <slot name="appoinment_seek_btn"></slot>
                </p> 
            </div>
        </div>
    </div>
</template>
<script>
    // 健管师信息组件
    import { styleConfig } from "../assets/js/config.js"
    export default {
        props: {
            health_manager_wrapper_h: {
                type: String,
                default:'7.85rem'
            },
            health_manager_head_w: {
                type: String,
                default:'3.125rem'
            }
        },
        data () {
            return {
                info_wrapper_height: {
                    'height': this.health_manager_wrapper_h
                },
                info_left_width: {
                    'width': this.health_manager_head_w
                },
                manager_head_img_h: {
                    'height': this.health_manager_head_w
                },
                health_manager_style_class: styleConfig
            }
        }
    }
</script>
<style>
    .health_manager_info{
        width: 100%;
        padding: 0.9375rem;
        box-sizing: border-box;
        background: #F7F7F7;
    }
    .health_manager_info .info_wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .health_manager_info .info_left{
        height: 100%;
        padding-right: 0.625rem;
        flex-grow: 0;
        flex-shrink: 0;
        position: relative;
    }
    .health_manager_info .identiy{
        width: 0.94rem;
        height: 0.94rem;
        border-radius: 50%;
        position: absolute;
        top: -2px;
        right: 0.3125rem;
    }
    .health_manager_info .info_right{
        flex-shrink: 1;
        flex-grow: 1;
        height: 100%;
        position: relative;
    }
    .health_manager_info .info_right .doctorInfo{
        line-height: 1.625rem;
    }
    .health_manager_info .info_right .doctorInfo .doctorName{
        color: #2D2D2D;
        font-size: 0.875rem;
    }
    .health_manager_info .info_right .doctorInfo .doctorRole{
        font-size: 12px;
        color: #ccc;
        display: inline-block;
        transform: scale(0.8)
    }
    .health_manager_info .info_right .score{
        font-size: 12px;
        color: #2D2D2D;
        padding: 0.18rem 0;
    }
    .health_manager_info .info_right .score span{
        display: inline-block;
        vertical-align: middle;
    }
    .health_manager_info .info_right .beGoodAt{
        font-size: 12px;
        color: #2D2D2D;
        line-height: 1.25rem;
        padding: 0.25rem 0;
    }
    .health_manager_info .info_right .btn{
        margin-top: 3px;
    }
    .health_manager_info button{
        width: 4.375rem;
        height: 1.5625rem;
        border-radius: 0.78125rem;
        border: 1px solid;
        font-size: 12px;
        background: none;
        box-sizing: border-box;
        margin-right: 10px;
    }
    .health_manager_info .managerHeadimg{
        width: 100%;
        height: 100%;
        display: inline-block;
    }
    .health_manager_info .managerHeadimg img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .health_manager_info .score_star{
        display: inline-block;
        vertical-align: middle;
    }
    .health_manager_info .score_star img{
        width: 0.9375rem;
        height: 0.9375rem;
        padding: 0 2px;
        vertical-align: middle;
    }
    .health_manager_info .single_numble{
        position: absolute;
        text-align: center;
        font-size: 12px;
        right: 1rem;
        top: 0.5rem;
    }
    .health_manager_info .single_numble>p{
        font-size: 12px;
        color: #8E8E8E;
        transform: scale(0.8);
    }
</style>


