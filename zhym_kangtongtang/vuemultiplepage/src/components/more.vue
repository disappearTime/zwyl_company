<template>
    <div class="view_more flex_space_between">
        <span class="left_text">
            <slot name="view_more_info"></slot>
        </span>
        <img class="left_img" src="../assets/img/viewmore.png" alt="">
    </div>
</template>
<script>
    // 查看更多组件 左边文字，右边箭头
    export default {
        
    }
</script>
<style>
    .view_more{
        width: 100%;
        height: 1.25rem;
        padding: 0.78rem 0;
        border-bottom: 1px solid #E7E7E7;
    }
    .view_more .left_text{
        font-size: 0.875rem;
        color: #2D2D2D;
    }
    .view_more .left_img{
        height: 0.6625rem;
    }
</style>


