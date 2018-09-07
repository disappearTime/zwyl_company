<template>
    <div class="sign_gather_compnent">
        <slot name="sign_span"></slot>
    </div>
</template>
<script>
    // 标签组件
    export default {
        
    }
</script>
<style>
    .sign_gather_compnent{
        width: 100%;
        height: 1.875rem;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
    }
    .sign_gather_compnent span{
        display: inline-block;
        line-height: 1.875rem;
        height: 100%;
        font-size: 12px;
        color: #2D2D2D;
        border-radius: 0.9375rem;
        text-align: center;
        padding: 0 0.625rem;
        background: #E7E7E7; 
        margin-right: 0.625rem;
    }
    .sign_gather_compnent span:nth-last-of-type(1){
        margin-right: 0;
    }
    .sign_gather_compnent .sign_active{
        color: #ffffff;
    }
</style>


