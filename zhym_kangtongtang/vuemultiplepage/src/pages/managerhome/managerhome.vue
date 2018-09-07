<template>
    <div id="app">
        <div class="header_bar">
            <Header>
                <img slot="head_back_img" src="../../assets/img/backLastPageGray.png" alt="">
                <i slot="head_title_i">健管师主页</i>
                <img slot="head_rightContent" src="../../assets/img/shareGray.png" alt="">
            </Header>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="managerhome_content">
                <div class="manager_picture">
                    <img src="../../assets/img/test/mingxin1.jpg" alt="">
                </div>
                <div class="manager_relative">
                    <div class="manager_info">
                        <div class="managername flex_space_between">
                            <div class="left_flex">
                                <span class="name">张晓霞</span>
                                <span class="is_online" :style="backgroundColor">在线</span>
                                <span class="manager_role">主任医师</span>
                            </div>
                            <div class="right_flex">
                                <span :style="fontColor" class="follow_btn">关注</span>
                            </div>
                        </div>
                        <div class="manager_service flex_space_between">
                            <div class="left_flex">
                                <div class="left">
                                    <img :src="appStyle.doctorUrl" alt="">
                                </div>
                                <div class="right">
                                    <p>一对一咨询</p>
                                    <p>30/次</p>
                                </div>
                            </div>
                            <div class="right_flex">
                                <div class="left">
                                    <img :src="appStyle.advisoryIcons" alt="">
                                </div>
                                <div class="right">
                                    <p>在线咨询</p>
                                    <p>免费</p>
                                </div>
                            </div>
                        </div>
                        <div class="manager_good_at manager_mes">
                            <span class="sign">擅长</span>
                            <span class="message">小儿感染性发热、呼吸道感染、支气管炎、肺炎、小儿咳嗽、小儿感染性发热、呼吸道感染、支气管炎、肺炎、小儿咳嗽</span>
                        </div>
                        <div class="manager_in_store manager_mes">
                            <span class="sign">所属门店</span>
                            <span class="message">北京市海淀区推拿中心附属医院</span>
                        </div>
                        <div class="manager_area manager_mes">
                            <span class="sign">地址</span>
                            <span class="message">北京市海淀区中关村大厦</span>
                        </div>
                        <div class="service_quality">
                            <More>
                                <i slot="view_more_info">服务资质</i>
                            </More>
                        </div>
                    </div>
                    <h3 class="service_project">服务项目</h3>
                    <div class="relative_project">
                        <div class="project_item" @click="goProjectDetail">
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
                        <div class="project_item" @click="goProjectDetail">
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
                    <div class="manager_about">
                        <button @click="tabClick('1')" :class="current=='1'?'active':''" :style="current=='1'?backgroundColor:''">用户评价</button>
                        <button @click="tabClick('2')" :class="current=='2'?'active':''" :style="current=='2'?backgroundColor:''">医师日记</button>
                        <button @click="tabClick('3')" :class="current=='3'?'active':''" :style="current=='3'?backgroundColor:''">成功案例</button>
                    </div>
                    <div v-show="current=='1'" class="user_evaluation">
                        <div class="user_box bor_bott">
                            <user-info>
                                <img slot="user_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                                <i slot="user_name_i">柠檬小妞</i>
                                <i class="trends_time" slot="user_btn_span">2小时前</i>
                            </user-info>
                            <p class="evaluation_mes">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显。</p>
                        </div>
                        <div class="user_box bor_bott">
                            <user-info>
                                <img slot="user_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                                <i slot="user_name_i">柠檬小妞</i>
                                <i class="trends_time" slot="user_btn_span">2小时前</i>
                            </user-info>
                            <p class="evaluation_mes">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显。</p>
                        </div>
                        <div class="user_box bor_bott">
                            <user-info>
                                <img slot="user_img" src="../../assets/img/test/mingxin1.jpg" alt="">
                                <i slot="user_name_i">柠檬小妞</i>
                                <i class="trends_time" slot="user_btn_span">2小时前</i>
                            </user-info>
                            <p class="evaluation_mes">我的宝宝过几天2岁，前阵子一直频繁感冒发烧，在刘医师那做了几次推拿后，效果很明显。</p>
                        </div>
                    </div>
                    <div v-show="current=='2'" class="manager_diary">
                        <div class="diary_box">
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
                        </div>
                    </div>
                    <div v-show="current=='3'" class="success_case">
                        <div class="case_box">
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
                        </div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <loading v-if="isLoadingShow"></loading>
    </div>
</template>
<script>
    // 健管师主页
    import Header from '../../components/header.vue'
    import Loading from '../../components/loading.vue'
    import More from '../../components/more.vue'
    import ProjectInfo from '../../components/project_info.vue'
    import UserInfo from '../../components/user_info.vue'
    import DiaryCase from '../../components/diary_case.vue'
    import { setWebViewJsBridge } from '../../assets/js/common.js'
    import { mutual } from '../../assets/js/common.js'
    import { styleConfig } from '../../assets/js/config.js'
    export default {
        data () {
            return {
                appStyle: styleConfig,
                allLoaded: false,
                isLoadingShow: true,
                current: '1',
                diaryImg: [
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1725978519,2199747188&fm=27&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3446692726,746203982&fm=27&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=442316529,1166981774&fm=27&gp=0.jpg'
                ],
                backgroundColor: {
                    'background': styleConfig.themeColor
                },
                fontColor:{
                    'color': styleConfig.themeColor
                }
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
            },
            tabClick (cur) {
                this.current = cur;
            },
            goProjectDetail () { // 项目详情
                var json = {
                    url: 'dist/projectdetail.html'
                }
                mutual(json,'openWebView');
            },
        },
        mounted () {
            this.$nextTick(function(){
                var that = this;
                setWebViewJsBridge();
                setTimeout(function(){
                    that.isLoadingShow = false;
                },1500)
            })  
        },
        components: {
            Loading,
            Header,
            More,
            ProjectInfo,
            UserInfo,
            DiaryCase
        }
    }
</script>
<style>

</style>


