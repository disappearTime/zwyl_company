<template>
    <div class="bg_card">
        <slot name='card_content'></slot>
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
    .bg_card{
        width: 100%;
        padding: 0.9375rem;
        box-sizing: border-box;
        background: #F7F7F7;
    }
</style>


