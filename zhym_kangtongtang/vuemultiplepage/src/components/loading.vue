<template>
    <div class="loading">
        <div class="load_img">
            <img src="../assets/img/loading.gif" alt="">
            <p>加载中...</p>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        }
    }
</script>
<style>
    .loading{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: #ffffff;
        text-align: center;
        z-index: 99;
    }
    .loading .load_img{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 3.5rem;
        height: 3.5rem;
    }
    .loading .load_img img{
        width: 3rem;
        height: 3rem;
        margin-bottom: 10px;
    }
    .loading .load_img p{
        font-size: 0.875rem;
    }
</style>


