<template>
    <div class="cell flex_space_between" :style="cellHeightStyle">
        <div class="cell-left" :style="cellLeftWidthStyle">
            <slot name="cell_left"></slot>
        </div>
        <div class="cell-right">
            <slot name="cell_right"></slot>
        </div>
    </div>
</template>
<script>
    // 左右结构的弹性布局
    export default {
        props: {
            cellHeight: {
                type: String,
                default: '0px'
            },
        },
        data () {
            return {
                cellHeightStyle: {
                    height: this.cellHeight
                },
                cellLeftWidthStyle: {
                    width: this.cellHeight
                }
            }
        }
    }
</script>
<style>
    .cell{
        width: 100%;
    }
    .cell-left{
        height: 100%;
        border-radius: 4px;
        padding-right: 0.625rem;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .cell-left img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .cell-right{
        height: 100%;
        flex-shrink: 1;
        flex-grow: 1;
    }
    .cell-right p{
        padding: 0.25rem 0;
        line-height: 1.2;
    }
</style>


