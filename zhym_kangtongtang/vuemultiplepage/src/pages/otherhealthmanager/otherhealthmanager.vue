<template>
    <div id="app">
        <div class="header_bar">
            <Header>
                <img slot="head_back_img" src="../../assets/img/back.png" alt="">
                <i slot="head_title_i">其他健管师</i>
            </Header>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="manager_content">
                <health-manager class="margin_b_1rem" :health_manager_wrapper_h="'6rem'">
                    <img class="health_manager_headimg" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <i slot='managerName'>张雪华</i>
                    <i slot="manageRole">主任医师</i>
                    <span slot="five_star" v-for="i in 5" class="five_star">
                        <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                        <img v-else :src="appStyle.grayStarUrl" alt="">
                    </span>
                    <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                    <span slot="order_number">108单</span>
                </health-manager>
                <health-manager class="margin_b_1rem" :health_manager_wrapper_h="'6rem'">
                    <img class="health_manager_headimg" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <i slot='managerName'>张雪华</i>
                    <i slot="manageRole">主任医师</i>
                    <span slot="five_star" v-for="i in 5" class="five_star">
                        <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                        <img v-else :src="appStyle.grayStarUrl" alt="">
                    </span>
                    <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                    <span slot="order_number">108单</span>
                </health-manager>
                <health-manager class="margin_b_1rem" :health_manager_wrapper_h="'6rem'">
                    <img class="health_manager_headimg" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <i slot='managerName'>张雪华</i>
                    <i slot="manageRole">主任医师</i>
                    <span slot="five_star" v-for="i in 5" class="five_star">
                        <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                        <img v-else :src="appStyle.grayStarUrl" alt="">
                    </span>
                    <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                    <span slot="order_number">108单</span>
                </health-manager>
                <health-manager class="margin_b_1rem" :health_manager_wrapper_h="'6rem'">
                    <img class="health_manager_headimg" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <i slot='managerName'>张雪华</i>
                    <i slot="manageRole">主任医师</i>
                    <span slot="five_star" v-for="i in 5" class="five_star">
                        <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                        <img v-else :src="appStyle.grayStarUrl" alt="">
                    </span>
                    <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                    <span slot="order_number">108单</span>
                </health-manager>
                <health-manager class="margin_b_1rem" :health_manager_wrapper_h="'6rem'">
                    <img class="health_manager_headimg" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <i slot='managerName'>张雪华</i>
                    <i slot="manageRole">主任医师</i>
                    <span slot="five_star" v-for="i in 5" class="five_star">
                        <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                        <img v-else :src="appStyle.grayStarUrl" alt="">
                    </span>
                    <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                    <span slot="order_number">108单</span>
                </health-manager>
                <health-manager class="margin_b_1rem" :health_manager_wrapper_h="'6rem'">
                    <img class="health_manager_headimg" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <i slot='managerName'>张雪华</i>
                    <i slot="manageRole">主任医师</i>
                    <span slot="five_star" v-for="i in 5" class="five_star">
                        <img v-if="i<=score" :src="appStyle.starUrl" alt="">
                        <img v-else :src="appStyle.grayStarUrl" alt="">
                    </span>
                    <span slot='beGoodAt'>高血压调理，慢性呼吸系统疾病，肝硬化、类风湿性关节炎</span>
                    <span slot="order_number">108单</span>
                </health-manager>
            </div>
        </mt-loadmore>
        <loading v-if="isLoadingShow"></loading>
    </div>
</template>
<script>
    // 更多健管师
    import HealthManager from '../../components/health_manage_info.vue'
    import Header from '../../components/header.vue'
    import Loading from '../../components/loading.vue'
    import { styleConfig } from '../../assets/js/config.js'
    export default {
        data () {
            return {
                score: 3.5,
                appStyle: styleConfig,
                allLoaded: false,
                isLoadingShow: true
            }
        },
        computed: {
            
        },
        methods: {
            loadBottom () { // 加载更多
                // 加载更多数据
                var that = this;
                setTimeout(function(){
                    // that.allLoaded = true;// 若数据已全部获取完毕 接口获取不到数据是allLoaded置为true
                    // 一页10条数据，获取到的数据小于10条时可以认为全部加载完allLoaded置为true。
                    that.$refs.loadmore.onBottomLoaded();
                },2000)    
            } 
        },
        mounted () {
            this.$nextTick(function(){
                var that = this
                setTimeout(function(){
                    that.isLoadingShow = false;
                },1500)
            })  
        },
        components: {
            HealthManager,
            Header,
            Loading
        }
    }
</script>
<style>

</style>


