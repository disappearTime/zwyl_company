<template>
    <div class="header_component flex_space_between" :style="head_component_bg_sty">
        <span class="left" :style="head_component_leftbg" @click="backPrePage">
            <slot name="head_back_img"></slot>
        </span>
        <span class="center over_ellipsis">
            <slot name="head_title_i"></slot>
        </span>
        <span class="right">
            <slot name="head_rightContent"></slot>
        </span>
    </div>
</template>
<script>
    // 页面头部组件，只适用于右边是返回箭头的
    import { setWebViewJsBridge } from '../assets/js/common.js'
    import { mutual } from '../assets/js/common.js'
    export default {
        props: {
            head_component_bg: {
                type: String,
                default: '#FFFFFF'
            },
            head_component_leftbg: {
                type: String,
                default: '#FFFFFF'
            }
        },
        data () {
            return {
                head_component_bg_sty: {
                    background: this.head_component_bg + ';'
                }
            }
        },
        mounted () {
            this.$nextTick(function(){
                setWebViewJsBridge();
            })  
        },
        methods: {
            backPrePage () { // 返回上一页
                var json = {}
                mutual(json,'backPage');
            }
        }
    }
</script>
<style>
    .header_component{
        width: 100%;
        height: 2.75rem;
        padding: 0 1.25rem;
        box-sizing: border-box;
    }
    .header_component .left{
        flex-grow: 0;
        flex-shrink: 0;
        width: 2.1875rem;
        height: 2.1875rem;
        border-radius: 50%;
        margin-right: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .header_component .left img{
        height: 2.1875rem;
    }
    .header_component .right{
        width: 2.1875rem;
        height: 2.1875rem;
        margin-left: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .header_component .right img{
        height: 2.1875rem;
    }
    .header_component .center{
        flex-shrink: 1;
        flex-grow: 1;
        font-family: 'PingFangSC-Medium';
        font-size: 1.4375rem;
        color: #2D2D2D;
        letter-spacing: 0;
        text-align: center;
    }
</style>


