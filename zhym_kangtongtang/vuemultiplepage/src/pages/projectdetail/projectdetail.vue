<template>
    <div id="app">
        <div class="header_bar">
            <Header>
                <img slot="head_back_img" src="../../assets/img/backLastPageGray.png" alt="">
                <i slot="head_title_i">项目详情</i>
                <img slot="head_rightContent" src="../../assets/img/shareGray.png" alt="">
            </Header>
        </div>
        <div class="project_img">
            <img src="../../assets/img/katong.jpg" alt="">
        </div>
        <div class="project_content">
            <p class="project_title">小儿感冒推拿调理-适合3周岁以上儿童的健康理疗推拿</p>
            <div class="project_rate_price bor_bott">
                <span>
                    <img :src="appStyle.choosedUrl" alt="">
                    <p class="price">￥100</p>
                    <p class="rate">30分钟/次</p>
                </span>
                <span>
                    <p class="price">￥100</p>
                    <p class="rate">30分钟/次X6次</p>
                </span>
            </div>
            <more-relative v-bind:view_more_relative_sty="view_more_relative_style" @viewMore="goMoreStore">
                <i slot="view_rel_i">中关村店</i>
                <i slot="view_rel_i_class_description" class="description">太原市解放大道11号院8号楼底商</i>
                <i slot="view_rel_i_class_relativeNum" class="relativeNum">23家门店</i>
            </more-relative>
            <more-relative @viewMore="goCouponCenter">
                <i slot="view_rel_i">活动领券</i>
                <i slot="view_rel_i_class_relativeNum" class="relativeNum">新用户50元代金券</i>
            </more-relative>
            <more-relative class="margin_b_1rem" @viewMore="goCommentList">
                <i slot="view_rel_i">用户评价</i>
                <i slot="view_rel_i_class_relativeNum" class="relativeNum">123条评论</i>
            </more-relative>
            <more-relative :view_more_title_sty="view_more_title_style" @viewMore="moreManager">
                <i slot="view_rel_i">健管师</i>
                <i slot="view_rel_i_class_relativeNum" class="relativeNum">查看其他健管师</i>
            </more-relative>
            <div class="health_manager_box">
                <health-manager class="margin_b_1rem" :health_manager_wrapper_h="'6rem'">
                    <img class="health_manager_headimg" @click="goManagerHome" slot="manager_info_left" src="../../assets/img/test/mingxin1.jpg" alt="">
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
            <more-relative :view_more_title_sty="view_more_title_style" @viewMore="goProjectCase">
                <i slot="view_rel_i">项目案例</i>
                <i slot="view_rel_i_class_relativeNum" class="relativeNum">123条项目案例</i>
            </more-relative>
            <!-- <div class="project_case">
                <user-info>
                    <img slot="user_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                    <i slot="user_name_i">柠檬小妞</i>
                    <i slot="user_trends_i">2小时前</i>
                    <span slot="user_btn_span">关注</span>  
                </user-info>
                <p class="illness_describe">
                    我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显......
                </p>
                <ul class="comparison">
                    <li><img slot="user_img" src="../../assets/img/test/mingxin1.jpg" alt=""></li>
                    <li><img slot="user_img" src="../../assets/img/test/mingxin1.jpg" alt=""></li>
                </ul>
                <div class="project_virtue">
                    <span class="btn_span" :class="appStyle.bgStyle">项目</span>
                    <span class="virtue">婴幼儿推拿足部促进血液循环</span>
                </div>
                <div class="project_condition flex_space_between">
                    <span class="left">浏览23456</span>
                    <span class="right">
                        <span class="comment">
                            <img src="../../assets/img/katong.jpg" alt="">
                            评论38
                        </span>
                        <span class="laud">
                            <img src="../../assets/img/katong.jpg" alt="">
                            赞1235
                        </span>
                    </span>
                </div>
            </div> -->
            <diary-case :diary_picture_arr="diaryImg">
                <img slot="avatar_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                <span slot="span_class_name" class="name">张医生</span>
                <span slot="span_class_trendsTime" class="trendsTime">2小时前</span>
                <p slot="p_class_diaryMes" class="diaryMes">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显......</p>
                <i slot="i_class_projectType">项目</i>
                <i slot="i_class_projectTitle">婴幼儿推拿足部促进血液循环</i>
                <span slot="scan_number">23455</span>
                <i slot="i_class_commentNum" class="commentNum">38</i>
                <i slot="i_class_praiseNum" class="praiseNum">12354</i>
            </diary-case>
            <div class="project_detail_title">项目详情</div>
            <div class="project_detail_img">
                <img src="../../assets/img/katong.jpg" alt="">
            </div>
            <div class="project_detail_title">相关项目推荐</div>
            <div class="relative_project">
                <div class="project_item">
                    <project-info class="margin_b_1rem">
                        <span slot="project_name">高血压调理</span>
                        <img :src="appStyle.shopCartUrl"  alt="" slot="shop_card_img">
                        <img src="../../assets/img/test/mingxin2.jpg" slot="project_img" alt="">
                        <p slot="project_rate_p_class_project_rate" class="project_rate">
                            <img src="../../assets/img/timepiece.png" alt="">30分钟/次
                        </p>
                        <p slot="project_area_p_class_project_area" class="project_area">
                            <img src="../../assets/img/local.png" alt="">太原市海珠区8号解放大道11号院8号楼底商
                        </p>
                        <span slot="project_price_span">￥98</span>
                        <span slot="project_distance_span">12km</span>
                    </project-info>
                </div>
                <div class="project_item">
                    <project-info>
                        <span slot="project_name">高血压调理</span>
                        <img :src="appStyle.shopCartUrl"  alt="" slot="shop_card_img">
                        <img src="../../assets/img/test/mingxin2.jpg" slot="project_img" alt="">
                        <p slot="project_rate_p_class_project_rate" class="project_rate">
                            <img src="../../assets/img/timepiece.png" alt="">30分钟/次
                        </p>
                        <p slot="project_area_p_class_project_area" class="project_area">
                            <img src="../../assets/img/local.png" alt="">太原市海珠区8号解放大道11号院8号楼底商
                        </p>
                        <span slot="project_price_span">￥98</span>
                        <span slot="project_distance_span">12km</span>
                    </project-info>
                </div>
            </div>
            <div class="project_detail_title">购买须知</div>
            <div class="purchase_notes">
                <div>
                    <h3>1.如何预约</h3>
                    <p>预约流程按照查看、付款、预约。</p>
                </div>
                <div>
                    <h3>2.消费须知</h3>
                    <p>消费者购买前需要了解本项目的服务适应症。</p>
                </div>
                <div>
                    <h3>3.退款流程</h3>
                    <p>消费者取消订单后，我们的工作人员会在7个工作日内完成退款。</p>
                </div>
            </div>
        </div>
        <div class="place_order">
            <div class="subsciption"></div>
            <div class="add_to_cart">加入购物车</div>
            <div class="buy_order" :class="appStyle.bgStyle">立即下单</div>
        </div>
    </div>
</template>
<script>
    // 项目详情
    import MoreRelative from '../../components/more_relative.vue'
    import HealthManager from '../../components/health_manage_info.vue'
    import UserInfo from '../../components/user_info.vue'
    import ProjectInfo from '../../components/project_info.vue'
    import DiaryCase from '../../components/diary_case.vue'
    import Header from '../../components/header.vue'
    import { styleConfig } from '../../assets/js/config.js'
    import { setWebViewJsBridge } from '../../assets/js/common.js'
    import { mutual } from '../../assets/js/common.js'
    export default {
        data () {
            return {
                view_more_relative_style: {
                    'height': '4rem'
                },
                view_more_title_style: {
                    'font-size': '1rem',
                    'color': '#2D2D2D'
                }, 
                score: 3.5,
                appStyle: styleConfig,
                diaryImg: [
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1725978519,2199747188&fm=27&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3446692726,746203982&fm=27&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=442316529,1166981774&fm=27&gp=0.jpg'
                ],
            }
        },
        computed: {
            
        },
        mounted () {
            this.$nextTick(function(){
                setWebViewJsBridge();
            })
        },
        methods: {
            goMoreStore () { // 查看更多门面
                var json = {
                    url: 'dist/allstore.html'
                }
                mutual(json,'openWebView');
            },
            goCouponCenter () { // 领券中心
                var json = {
                    url: 'dist/couponcenter.html'
                }
                mutual(json,'openWebView');
            },
            goCommentList () { // 评论列表
                var json = {
                    url: 'dist/commentlist.html'
                }
                mutual(json,'openWebView');
            },
            goManagerHome () { // 健管师主页
                var json = {
                    url: 'dist/managerhome.html'
                }
                mutual(json,'openWebView');
            },
            moreManager () { // 更多健管师
                var json = {
                    url: 'dist/otherhealthmanager.html'
                }
                mutual(json,'openWebView');
            },
            goProjectCase () { // 查看更多案例
                var json = {
                    url: 'dist/allcase.html'
                }
                mutual(json,'openWebView');
            }
        },
        components: {
            MoreRelative,
            HealthManager,
            UserInfo,
            ProjectInfo,
            DiaryCase,
            Header
        }
    }
</script>
<style>

</style>


