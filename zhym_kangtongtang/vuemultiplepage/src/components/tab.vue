<template>
    <div class="tab_component">
        <slot name="tabSpan"></slot>
    </div>
</template>
<script>
    // tab切换组件
    export default {
        
    }
</script>
<style>
    .tab_component{
        width: 100%;
        height: 1.66rem;
        padding: 1rem 0;
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-overflow-scrolling:touch;
        white-space: nowrap;
    }
    .tab_component span{
        display: inline-block;
        height: 100%;
        box-sizing: border-box;
        line-height: 1.66rem;
        margin-right: 2.8rem;
    }
    .tab_component span.tabActive{
        border-bottom: 2px solid;
    }
    .tab_component span:nth-last-of-type(1){
        margin-right: 0px;
    }
</style>


