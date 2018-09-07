<template>
    <div class="store_info_compnent">
        <div class="store_name flex_space_between">
            <span class="name">
                <slot name="store_name"></slot>
            </span>
        </div>
        <div class="store_detail" :style="store_detail_compent_h_sty">
            <div class="left" :style="store_detail_left_wid">
                <slot name="store_img"></slot>
            </div>
            <div class="right">
                <slot name="store_order_p_class_store_order"></slot>
                <slot name="store_area_p_class_store_area"></slot>
                <p class="store_distance">
                    <span :class="['distance',appStyle.fontStyle]">
                        <slot name="project_distance_span"></slot>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    // 门店信息组件
    // 不能给slot添加类名 slot使用时通过slot的name值告诉外面slot的标签类型，class名称
    import { styleConfig } from "../assets/js/config.js"
    export default {
        props: {
            store_detail_compent_h: {
                type: String,
                default: '5.625rem'
            }
        },
        data () {
            return {
                appStyle: styleConfig,
                store_detail_compent_h_sty: {
                    'height': this.store_detail_compent_h
                },
                store_detail_left_wid: {
                    'width': this.store_detail_compent_h
                }
            }
        }
    }
</script>
<style>
    .store_info_compnent{
        width: 100%;
        padding: 0.625rem;
        box-sizing: border-box;
        background: #F7F7F7;
    }
    .store_info_compnent .store_name{
        height: 1.4rem;
        margin-bottom: 1.18rem;
    }
    .store_info_compnent .store_name .name{
        font-family: 'PingFangSC-Medium';
        font-size: 0.875rem;
        color: #2D2D2D;
    }
    .store_info_compnent .store_detail{
        width: 100%;
        display: flex;
    }
    .store_info_compnent .store_detail .left{
        height: 100%;
        padding-right: 0.625rem;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .store_info_compnent .store_detail .left img{
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }
    .store_info_compnent .store_detail .right{
        height: 100%;
        flex-grow: 1;
        flex-shrink: 1
    }
    .store_info_compnent .store_detail .right .store_order, .store_info_compnent .store_detail .right .store_area{
        padding: 0.4rem 0 0.4rem 1.09rem;
        position: relative;
        font-size: 12px;
    }
    .store_info_compnent .store_detail .right .store_area{
        line-height: 1.3;
    }
    .store_info_compnent .store_detail .right .store_order img, .store_info_compnent .store_detail .right .store_area img{
        height: 0.8rem;
        position: absolute;
        top: 0.5rem;
        left: 0;
    }
    .store_info_compnent .store_detail .right .store_distance{
        padding: 0 0 0 1.09rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .store_info_compnent .store_detail .right .store_distance .distance{
        font-family: 'PingFangSC-Regular';
        font-size: 12px;
        letter-spacing: 0;
    }
</style>

