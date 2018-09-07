<template>
    <div class="project_info_compnent">
        <div class="project_name flex_space_between">
            <span class="name">
                <slot name="project_name"></slot>
            </span>
            <span :class="['shop_cart',appStyle.fontStyle]">
                <slot name="shop_card_img"></slot>
            </span>
        </div>
        <div class="project_detail" :style="project_detail_compent_h_sty">
            <div class="left" :style="project_detail_left_wid">
                <slot name="project_img"></slot>
            </div>
            <div class="right">
                <slot name="project_rate_p_class_project_rate"></slot>
                <slot name="project_area_p_class_project_area"></slot>
                <p class="project_price">
                    <span class="price">
                        <slot name="project_price_span"></slot>
                    </span>
                    <span :class="['distance',appStyle.fontStyle]">
                        <slot name="project_distance_span"></slot>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    // 项目信息组件
    // 不能给slot添加类名 slot使用时通过slot的name值告诉外面slot的标签类型，class名称
    import { styleConfig } from "../assets/js/config.js"
    export default {
        props: {
            project_detail_compent_h: {
                type: String,
                default: '5.625rem'
            }
        },
        data () {
            return {
                appStyle: styleConfig,
                project_detail_compent_h_sty: {
                    'height': this.project_detail_compent_h
                },
                project_detail_left_wid: {
                    'width': this.project_detail_compent_h
                }
            }
        }
    }
</script>
<style>
    .project_info_compnent{
        width: 100%;
        padding: 0.625rem;
        box-sizing: border-box;
        background: #F7F7F7;
    }
    .project_info_compnent .project_name{
        height: 1.4rem;
        margin-bottom: 1.18rem;
    }
    .project_info_compnent .project_name .name{
        font-family: 'PingFangSC-Medium';
        font-size: 0.875rem;
        color: #2D2D2D;
    }
    .project_info_compnent .project_name .shop_cart{
        display: inline-block;
        height: 1.4rem;
        font-size: 0.875rem;
        line-height: 1.4rem;
    }
    .project_info_compnent .project_name .shop_cart img{
        height: 100%;
        border-radius: 50%;
    }
    .project_info_compnent .project_detail{
        width: 100%;
        display: flex;
    }
    .project_info_compnent .project_detail .left{
        height: 100%;
        padding-right: 0.625rem;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .project_info_compnent .project_detail .left img{
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }
    .project_info_compnent .project_detail .right{
        height: 100%;
        flex-grow: 1;
        flex-shrink: 1
    }
    .project_info_compnent .project_detail .right .project_rate, .project_info_compnent .project_detail .right .project_area{
        padding: 0.4rem 0 0.4rem 1.09rem;
        position: relative;
        font-size: 12px;
    }
    .project_info_compnent .project_detail .right .project_area{
        line-height: 1.3;
        white-space: normal;
    }
    .project_info_compnent .project_detail .right .project_rate img, .project_info_compnent .project_detail .right .project_area img{
        height: 0.8rem;
        position: absolute;
        top: 0.5rem;
        left: 0;
    }
    .project_info_compnent .project_detail .right .project_price{
        padding: 0 0 0 1.09rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .project_info_compnent .project_detail .right .project_price .price{
        font-family: 'PingFangSC-Regular';
        font-size: 0.875rem;
        color: #EB0000;
        letter-spacing: 0;
    }
    .project_info_compnent .project_detail .right .project_price .distance{
        font-family: 'PingFangSC-Regular';
        font-size: 12px;
        letter-spacing: 0;
    }
</style>

