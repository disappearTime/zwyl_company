<template>
    <div class="view_more_relative bor_bott flex_space_between" :style="view_more_relative_sty" @click="viewMore">
        <span class="left">
            <span :style="view_more_title_sty">
                <slot name="view_rel_i"></slot>
            </span>
            <slot name="view_rel_i_class_description"></slot>
        </span>
        <span class="right">
            <slot name="view_rel_i_class_relativeNum"></slot>
            <img src="../assets/img/viewmore.png" alt="">
        </span>
    </div>
</template>
<script>
    export default {
        props: {
            view_more_title_sty: {
                type: Object,
                default: function () {
                    return {
                        'font-size': '0.875rem',
                        'color': '#2D2D2D'
                    }
                }
            },
            view_more_relative_sty: {
                type: Object,
                default: function () {
                    return {
                        'height': '2.72rem'
                    }
                }
            }
        },
        data () {
            return {
                
            }
        },
        methods: {
            viewMore () {
                this.$emit('viewMore')
            }
        }
    }
</script>
<style>
    .view_more_relative{
        width: 100%;
    }
    .view_more_relative>span{
        display: inline-block;
        height: 100%;
    }
    .view_more_relative .left{
        display: flex;
        flex-direction: column;
        justify-content: center
    }
    .view_more_relative .left i{
        display: inline-block;
        padding: 2px 0;
    }
    .view_more_relative .left i.description{
        font-size: 12px;
        color: #8E8E8E;
    }
    .view_more_relative .right{
        height: 0.875rem;
        color: #8E8E8E;
        font-size: 12px;
        display: flex;
        align-items: center;
    }
    .view_more_relative .right .relativeNum{
        display: inline-block;
        height: 100%;
        transform: scale(0.8);
    }
    .view_more_relative .right img{
        height: 100%;
        transform: scale(0.76);
    }
</style>


