<template>
    <div class="diary_case_component">
        <div class="user_info flex_space_between">
            <div class="left">
                <div class="user_head">
                    <slot name="avatar_img"></slot>
                </div>
                <div class="user_name">
                    <slot name="span_class_name"></slot>
                    <slot name="span_class_trendsTime"></slot>
                </div>
            </div>
            <div :class="['right',appStyle.fontStyle]">
                <slot name="span_class_followBtn"></slot>
            </div>
        </div>
        <slot name="p_class_diaryMes"></slot>
        <div class="diary_picture" v-if="diary_picture_arr.length>0">
            <div class="picture_box" v-for="item in diary_picture_arr" :style="{'backgroundImage':`url(${item})`}"></div>
        </div>
        <div class="project_name">
            <span class="project_type" :style="{'background':appStyle.themeColor}">
                <slot name="i_class_projectType"></slot>
            </span>
            <span class="project_title">
                <slot name="i_class_projectTitle"></slot>
            </span>
        </div>
        <div class="condition flex_space_between">
            <div class="left">
                浏览<slot name="scan_number"></slot>
            </div>
            <div class="right">
                <img src="../assets/img/comment.png" alt="">评论
                <span class="comment_number"><slot name="i_class_commentNum"></slot></span>
                <img src="../assets/img/praise.png" alt="">赞<span class="praise_number"><slot name="i_class_praiseNum"></slot></span>
            </div>
        </div>
    </div>
</template>
<script>
    // 成功案例组件
    import { styleConfig } from '../assets/js/config.js'
    export default {
        props: {
            diary_picture_arr: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data () {
            return {
                appStyle: styleConfig
            }
        }
    }
</script>
<style>
    .diary_case_component{
        width: 100%;
        background: #F7F7F7;
        padding: 0.625rem;
        box-sizing: border-box;
    }
    .diary_case_component .user_info{
        width: 100%;
        height: 2.1875rem;
    }
    .diary_case_component .user_info .left{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .diary_case_component .user_info .left .user_head{
        height: 100%;
        width: 2.1875rem;
        padding-right: 0.66rem;
    }
    .diary_case_component .user_info .left .user_head img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .diary_case_component .user_info .left .user_name{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .diary_case_component .user_info .left .user_name .name{
        font-family: 'PingFangSC-Medium';
        font-size: 0.875rem;
        color: #2D2D2D;
        letter-spacing: 0;
        padding: 2px 0;
    }
    .diary_case_component .user_info .left .user_name .trendsTime{
        font-size: 12px;
        color: #8E8E8E;
        font-family: 'PingFangSC-Medium';
        padding: 2px 0;
    }
    .diary_case_component .user_info .right{
        height: 1.5625rem;
    }
    .diary_case_component .user_info .right .followBtn{
        height: 100%;
        border: 1px solid;
        padding: 0 0.625rem;
        box-sizing: border-box;
        line-height: 1.5625rem;
        border-radius: 0.78125rem;
        font-size: 12px;
    }
    .diary_case_component .diaryMes{
        padding: 0.5rem 0;
        font-family: 'PingFangSC-Regular';
        font-size: 0.874rem;
        color: #2D2D2D;
        letter-spacing: 0;
        text-align: justify;
        line-height: 1.25rem;
    }
    .diary_case_component .diary_picture{
        width: 100%;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    .diary_case_component .diary_picture .picture_box{
        width: 9.5rem;
        height: 7.03rem;
        border-radius: 4px;
        margin-bottom: 0.625rem;
        background-size: cover;
    }
    .diary_case_component .diary_picture .picture_box:nth-of-type(2n+1){
        float: left;
    }
    .diary_case_component .diary_picture .picture_box:nth-of-type(2n){
        float: right;
    }
    .diary_case_component .project_name{
        width: 100%;
        height: 1.25rem;
        display: flex;
        align-items: center;
        margin-bottom: 0.9375rem;
    }
    .diary_case_component .project_name .project_type{
        height: 100%;
        padding: 0 0.5rem;
        color: #ffffff;
        font-size: 12px;
        line-height: 1.25rem;
        border-radius: 3px;
        margin-right: 7px;
        font-family: 'PingFangSC-Regular';
    }
    .diary_case_component .project_name .project_title{
        font-family: 'PingFangSC-Regular';
        font-size: 12px;
        color: #2D2D2D;
        letter-spacing: 0;
    }
    .diary_case_component .condition{
        width: 100%;
        height: 1.03rem;
        font-family: 'PingFangSC-Regular';
        font-size: 12px;
        color: #8E8E8E;
        letter-spacing: 0;
    }
    .diary_case_component .condition img{
        height: 100%;
        margin-right: 5px;
    }
    .diary_case_component .condition .right{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .diary_case_component .condition .right .comment_number{
        display: inline-block;
        padding-right: 2rem;
    }
</style>


