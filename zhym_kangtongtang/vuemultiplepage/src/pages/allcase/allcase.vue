<template>
    <div id="app">
        <div class="header">
            <Header>
                <img slot="head_back_img" src="../../assets/img/backLastPageGray.png" alt="">
                <i slot="head_title_i">全部123个案例</i>
            </Header>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="case_content">
                <diary-case :diary_picture_arr="diaryImg" class="margin_b_1rem">
                    <img slot="avatar_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <span slot="span_class_name" class="name">张医生</span>
                    <span slot="span_class_trendsTime" class="trendsTime">2小时前</span>
                    <p slot="p_class_diaryMes" class="diaryMes">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显......</p>
                    <i slot="i_class_projectType">解决方案</i>
                    <i slot="i_class_projectTitle">婴幼儿推拿足部促进血液循环</i>
                    <span slot="scan_number">23455</span>
                    <i slot="i_class_commentNum" class="commentNum">38</i>
                    <i slot="i_class_praiseNum" class="praiseNum">12354</i>
                    <span slot="span_class_followBtn" class="followBtn">已关注</span>
                </diary-case>
                <diary-case :diary_picture_arr="diaryImg" class="margin_b_1rem">
                    <img slot="avatar_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <span slot="span_class_name" class="name">张医生</span>
                    <span slot="span_class_trendsTime" class="trendsTime">2小时前</span>
                    <p slot="p_class_diaryMes" class="diaryMes">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显......</p>
                    <i slot="i_class_projectType">解决方案</i>
                    <i slot="i_class_projectTitle">婴幼儿推拿足部促进血液循环</i>
                    <span slot="scan_number">23455</span>
                    <i slot="i_class_commentNum" class="commentNum">38</i>
                    <i slot="i_class_praiseNum" class="praiseNum">12354</i>
                    <span slot="span_class_followBtn" class="followBtn">已关注</span>
                </diary-case>
                <diary-case :diary_picture_arr="diaryImg" class="margin_b_1rem">
                    <img slot="avatar_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <span slot="span_class_name" class="name">张医生</span>
                    <span slot="span_class_trendsTime" class="trendsTime">2小时前</span>
                    <p slot="p_class_diaryMes" class="diaryMes">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显......</p>
                    <i slot="i_class_projectType">解决方案</i>
                    <i slot="i_class_projectTitle">婴幼儿推拿足部促进血液循环</i>
                    <span slot="scan_number">23455</span>
                    <i slot="i_class_commentNum" class="commentNum">38</i>
                    <i slot="i_class_praiseNum" class="praiseNum">12354</i>
                    <span slot="span_class_followBtn" class="followBtn">已关注</span>
                </diary-case>
            </div>
        </mt-loadmore>
        <loading v-if="isLoadingShow"></loading>
    </div>
</template>
<script>
    // 评论列表
    import Header from "../../components/header.vue"
    import Loading from '../../components/loading.vue'
    import UserInfo from '../../components/user_info.vue'
    import DiaryCase from '../../components/diary_case.vue'
    import { styleConfig } from '../../assets/js/config.js'
    export default {
        data () {
            return {
                appStyle: styleConfig,
                allLoaded: false,
                isLoadingShow: true,
                diaryImg: [
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1725978519,2199747188&fm=27&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3446692726,746203982&fm=27&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=442316529,1166981774&fm=27&gp=0.jpg'
                ],
            }
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
            Header,
            Loading,
            UserInfo,
            DiaryCase
        }
    }
</script>


