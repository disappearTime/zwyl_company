<template>
    <div id="app">
        <div class="header">
            <Header>
                <img slot="head_back_img" src="../../assets/img/backLastPageGray.png" alt="">
                <i slot="head_title_i">评论列表</i>
            </Header>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="comment_content">
                <div class="statistics">
                    <button :class="[appStyle.bgStyle,'comment_all']">全部(7430)</button>
                    <button class="comment_graph">有图评价(430)</button>
                </div>
                <div class="comment_list">
                    <div class="comment_item bor_bott">
                        <div class="comment_user flex_space_between">
                            <div class="left">
                                <img src="../../assets/img/test/mingxin1.jpg" alt="">
                                <span :class="appStyle.fontStyle">柠檬小姐</span>
                            </div>
                            <div class="right">
                                2小时前
                            </div>
                        </div>
                        <p class="comment_info">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显。</p>
                        <div class="comment_photo">
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin1.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin3.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin2.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin1.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin2.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin3.jpg" alt="">
                            </div>
                            <div class="photo_item_empty"></div>
                            <div class="photo_item_empty"></div>
                        </div>
                    </div>
                    <div class="comment_item bor_bott">
                        <div class="comment_user flex_space_between">
                            <div class="left">
                                <img src="../../assets/img/test/mingxin2.jpg" alt="">
                                <span :class="appStyle.fontStyle">柠檬小姐</span>
                            </div>
                            <div class="right">
                                2小时前
                            </div>
                        </div>
                        <p class="comment_info">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显。</p>
                        <div class="comment_photo">
                        </div>
                    </div>
                    <div class="comment_item bor_bott">
                        <div class="comment_user flex_space_between">
                            <div class="left">
                                <img src="../../assets/img/test/mingxin3.jpg" alt="">
                                <span :class="appStyle.fontStyle">柠檬小姐</span>
                            </div>
                            <div class="right">
                                2小时前
                            </div>
                        </div>
                        <p class="comment_info">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显。</p>
                        <div class="comment_photo">
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin3.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin1.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin2.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin3.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin1.jpg" alt="">
                            </div>
                            <div class="photo_item">
                                <img src="../../assets/img/test/mingxin2.jpg" alt="">
                            </div>
                            <div class="photo_item_empty"></div>
                            <div class="photo_item_empty"></div>
                        </div>
                    </div>
                    <div class="comment_item bor_bott">
                        <div class="comment_user flex_space_between">
                            <div class="left">
                                <img src="../../assets/img/test/mingxin1.jpg" alt="">
                                <span :class="appStyle.fontStyle">柠檬小姐</span>
                            </div>
                            <div class="right">
                                2小时前
                            </div>
                        </div>
                        <p class="comment_info">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显。</p>
                        <div class="comment_photo">
                        </div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <loading v-if="isLoadingShow"></loading>
    </div>
</template>
<script>
    // 评论列表
    import Header from "../../components/header.vue"
    import Loading from '../../components/loading.vue'
    import { styleConfig } from '../../assets/js/config.js'
    export default {
        data () {
            return {
                appStyle: styleConfig,
                allLoaded: false,
                isLoadingShow: true
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
            Loading
        }
    }
</script>


