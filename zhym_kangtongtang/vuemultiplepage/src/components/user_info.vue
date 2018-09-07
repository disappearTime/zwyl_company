<template>
    <div class="userInfo_component flex_space_between">
        <div class="left flex_space_between">
            <slot name="user_img"></slot>
            <div>
                <span class="user_name">
                    <slot name="user_name_i"></slot>
                </span>
                <span class="trends_time">
                    <slot name="user_trends_i"></slot>
                </span>
            </div>
        </div>
        <div :class="['right',appStyle.fontStyle]">
            <slot name="user_btn_span"></slot>
        </div>
    </div>
</template>
<script>
    // 用户组件 最后一个slot插入的是span标签则是按钮样式
    import { styleConfig } from "../assets/js/config.js"
    export default {
        data () {
            return {
                appStyle: styleConfig
            }
        }
    }
</script>
<style>
    .userInfo_component{
        width: 100%;
        height: 2.1875rem;
    }
    .userInfo_component .left{
        height: 100%;
    }
    .userInfo_component .left img{
        height: 100%;
        width: 2.1875rem;
        border-radius: 50%;
        margin-right: 0.625rem;
    }
    .userInfo_component .left>div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .userInfo_component .left>div .user_name{
        font-size: 0.875rem;
        color: #2D2D2D;
    }
    .userInfo_component .left>div .trends_time{
        font-size: 10px;
        color: #8E8E8E; 
        display: inline-block;
        font-size: 12px;
    }
    .userInfo_component .right{
        height: 1.5625rem;
    }
    .userInfo_component .right span{
        display: inline-block;
        height: 100%;
        width: 3.125rem;
        border-radius: 0.78125rem;
        border: 1px solid;
        font-size: 12px;
        text-align: center;
        box-sizing: border-box;
        line-height: 1.5625rem;
    }
</style>

