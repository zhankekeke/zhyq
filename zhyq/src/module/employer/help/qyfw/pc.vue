<style scoped>
    .container {
        /*font-size: 14px;*/
        font-weight: 500;
    }

    .swiper {
        margin-right: 20px;
    }

    .swiper img {
        width: 100%;
        height: 100%;
    }

    .row {
        margin-top: 10px;
        height: 300px;
    }

    .right {
        float: right;
        color: #7d76768a;
    }

    .hot li {
        line-height: 35px;
        color: #333;
    }

    .fenlei {
        background: #f7f7f7;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        line-height: 50px;
        overflow: hidden;
    }

    .rightbtn {
        float: right;
        width: 30%;
        text-align: right;
        line-height: 65px;
    }

    .left {
        float: left;
        width: 30%;
        line-height: 30px;
    }
    .text11{
        width: 100%;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .rmfl img {
        margin-right: 20px;
        float: left;
        width: 100px;
        height: 100px;
    }

    .rmfl li {
        border-bottom: 1px solid #e9e9e9;
        box-sizing: border-box;
        padding: 20px 20px 20px 30px;
        overflow: hidden;
    }

    .quan {
        margin-right: 5px;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50px;
        background: #cccccc;
        color: #fff;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }
</style>
<template>
    <div class="container">
        <Row style="padding: 15px;background-color: #f5f5f5;font-size: 14px">
            服务名称：
            <Input v-model="$_search_$" placeholder="请输入服务名称" style="width: 200px"></Input>
            <Button type="primary" style='margin-left:20px;' @click="search()">搜索</Button>
        </Row>
        <Row class="row">
            <Col span="14">
                <Carousel autoplay v-model="$_zmdvalue_$" loop class="swiper" :height="300">
                    <CarouselItem v-for="(item,index) in $_images_$" :key="index">
                        <div class="demo-carousel" style="min-width: 750px;height: 340px">
                            <a :href="item.pcUrl">
                                <img :src="$_global_$.imgPath+item.image" style="width: 100%;height: 100%" alt="">
                            </a>
                        </div>
                    </CarouselItem>
                </Carousel>
            </Col>
            <Col span="10">
                <Card style="margin-left: 4%;height: 300px">
                    <p slot="title"><Icon style="font-size: 18px; color: #3399ff" type="flame"></Icon> &nbsp;热门服务 </p>
                    <ul class="hot">
                        <li v-for="(item,index) in randomMovieList" :key="index">
                            <span v-if="index<3" class="quan" style="background: #f0ba10">{{index+1}}</span>
                            <span v-else class="quan">{{index+1}}</span>
                            <a href='javascript:void(0);' @click='$_xiangqing_$(item)'>{{ item.name}}</a>
                            <!--<div @click='$_xiangqing_$(item)'>{{ item.name }}</div>-->
                            <span class="right">
                                <Icon type="eye"></Icon>
                                {{ item.viewCount }}
                            </span>
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <Row class='fenlei'>
            <Col span="3" style="text-align: center">热门分类：</Col>
            <Col span="20">
                <Button style="border: 1px solid #3399ff" type="text" @click="classifyList(0)">
                    全部分类
                </Button>
                <Button style="border: 1px solid #3399ff; margin-left: 8px;" type="text" v-for="(item,index) in hotList" :key="index" @click="classifyList(item.id)">
                    {{item.name}}
                </Button>
            </Col>
        </Row>
        <Row>
            <ul class="rmfl">
                <li style="margin-bottom:10px;" v-for="(item,index) in list" :key="index">
                    <div>
                        <img :src='$_global_$.imgPath + item.imageUrl'/>
                        <div class="left">
                            <p style='font-size: 16px;'>{{item.name}}</p>
                            <p class="text11" v-html="item.description"></p>
                        </div>
                        <div class="rightbtn">
                            <Button type="primary" style='margin-right:10px;' @click='$_xiangqing_$(item)'>详 情</Button>
                            <Button type="ghost" @click='$_zixun_$(item)'>咨 询</Button>
                        </div>
                    </div>
                </li>
            </ul>
        </Row>
        <Row style="text-align:right;margin-top: 10px">
            <Page :total="total"
                  show-elevator show-sizer
                  :page-size="pageSize"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';

    export default {
        mixins: [controler],
        data() {
            return {
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_search_$: '',  // 服务名称搜索
                $_userInfo_$: '',
                //轮播
                $_images_$: [],
                $_zmdvalue_$: 0,
                randomMovieList: [],  // 热门服务列表
                list: [], // 所有服务列表
                total: 0, //数据条数
                pageSize: 2,
                hotList: [], // 热门分类列表
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);

            this.$_querycfg_$.params.pageSize = this.pageSize;

            this.$_banner_$();
            this.$_list_$();
            this.$_rList_$();
            this.$_hlist_$()
        },
        methods: {
            //轮播
            $_banner_$() {
                let sendData = {
                    type: "0",
                    publishStatus: "0",
                    typeCode: "2",
                    zoneId: this.$_userInfo_$.zoneId
                };
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/operate/mallCarousel/queryCarouselImageList",
                    data: sendData,
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data.length > 0) {
                                this.$_images_$ = rsp.data.data;
                            } else {
                                this.$_images_$ = [
                                    {image: '/static/employers/qyfw/qyfw.jpg'},
                                ]
                            }
                        }
                    }
                })
            },
            // 获取服务列表
            $_list_$() {
                this.$_querycfg_$.params.status = 1;

                this.$_querycfg_$.mod = `zone/zone/` + this.$_userInfo_$.zoneId + `/category/0/enterprise/service/list`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.list = rsp.data.data.records;
                            this.total = rsp.data.data.total
                        }
                    }
                })
            },
            // 获取热门服务
            $_rList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/` + this.$_userInfo_$.zoneId + `/category/0/enterprise/service/list`,
                    data: {
                        orderBy: 1,
                        status: 1,
                        pageSize: 7
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.randomMovieList = rsp.data.data.records
                            }
                        }
                    }
                })
            },
            // 获取热门分类列表
            $_hlist_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.$_userInfo_$.zoneId}/service/category/0/pageList`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.hotList = rsp.data.data.records
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.pageSize;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_list_$();
            },
            // 搜索
            search() {

                if (this.$_search_$) {
                    this.$_querycfg_$.params.name = this.$_search_$;
                    this.$_list_$();
                } else {
                    if (this.$_querycfg_$.params.name) {
                        delete this.$_querycfg_$.params.name;
                    }
                    this.$_list_$();
                }
            },
            // 分类列表
            classifyList(id) {
                let ids = 0;
                if(id){
                    ids = id;
                }
                this.$_querycfg_$.mod = `zone/zone/${this.$_userInfo_$.zoneId}/category/${ids}/enterprise/service/list`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.list = []
                            this.list = rsp.data.data.records
                            this.total = rsp.data.data.total
                        }
                    }
                })
            },
            // 详情
            $_xiangqing_$(item) {
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/zone/zone/` + item.zoneId + `/enterprise/service/` + item.id + `/view`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                        }
                    }
                })
                this.$root.$_Route_$('employer', 'jump', 'qyfwxq', {item: item})
            },
            // 咨询
            $_zixun_$(item) {
                //先请求员工所在企业有没有管家
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/enterprise/queryAssignedEnterpriseByCondition`,
                    data: {
                        enterprise_id: this.$_userInfo_$.enterpriseId,
                        zone_id: this.$_userInfo_$.zoneId
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data.length > 0) {
                                this.$root.$_Route_$('employer', 'jump', 'qywtzx', {gjInfo: rsp.data.data[0]});
                            } else {
                                this.$Message.error('所属企业未分配管家')
                            }
                        }
                    }
                });
            }

        }
    }
</script>