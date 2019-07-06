<style scoped>
    /*.spmc {
        text-align: center
    }*/

    .swiper {
        margin-right: 20px;
    }

    .swiper img {
        width: 100%;
        height: 100%;
    }

    .top {
        padding: 20px 15px;
        border: 1px solid #ddd;
    }

    .top p {
        line-height: 26px;
        font-size: 14px;
    }

    .top span, .cont span {
        color: #FF6600;
    }

    .bot {
        border: 1px solid #ddd;
    }

    .bot h2 {
        border-bottom: 1px solid #ddd;
        padding: 10px 15px;
    }

    .bot li {
        overflow: hidden;
        padding: 10px 15px;
    }

    .bot .left {
        float: left;
    }

    .bot .right {
        float: right;
    }

    .cont {
        margin: 15px;
        box-sizing: border-box;
        width: 290px;
        display: inline-block;
    }

    /*.cont li {*/
    /*margin: 15px;*/
    /*box-sizing: border-box;*/
    /*width: 290px;*/
    /*display: inline-block;*/
    /*!*border: 1px solid #f5f5f5;*!*/
    /*}*/

    /*.cont li:hover {*/
    /*box-shadow: 4px 6px 28px #f4f4f4;*/
    /*}*/

    .cont .c-top {
        border: 1px solid #f5f5f5;
        border-bottom: none;
        padding: 10px 15px;
    }

    /*.cont li img {*/
    /*width: 100%;*/
    /*height: 170px;*/
    /*background: #f7f7f7;*/
    /*overflow: hidden;*/
    /*}*/

    .cont .link {
        overflow: hidden;
    }

    .cont .link a {
        width: 50%;
        height: 40px;
        line-height: 40px;
        float: left;
        text-align: center;
        border: 1px solid #ddd;
        border-right: none !important;
    }

    .cont .link .details {
        color: #000;
    }

    .cont .link .exchange {
        color: #fff;
        background: #3399ff;
        border: 1px solid #eaeaea;
    }

    .page {
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: right;
    }

    .bot h2 > img {
        margin-right: 10px;
        height: 20px;
    }

    .crumbs-nav {
        height: 40px;
        line-height: 40px;
    }

    .crumbs-nav-main {
        font-size: 14px;
    }

    .crumbs-nav-main .one-level {
        font-size: 18px;
        font-weight: 700;
        font-family: "microsoft yahei";
    }

    .crumbs-nav-main .one-level a {
        color: #666;
    }

    .one-level a:hover {
        color: #2d8cf0;
    }

    .crumbs-nav-item {
        float: left;
        margin-right: 20px;
    }

    .ivu-input {
        height: 35px !important;
    }

    .hot::-webkit-scrollbar {
        display: none;
    }

    >>> .ivu-card-body {
        padding: 0;
    }

    .img {
        width: 100%;
        height: 170px;
        background: #f7f7f7;
        overflow: hidden;
        border-radius: 2px;
    }
</style>
<template>
    <div style="min-width: 1010px;overflow-x: auto">
        <div style="background-color: #f5f5f5;padding: 15px;">
            <div>
                <span style="font-size: 14px">商品名称：</span>
                <Input v-model="$_value_$"
                       placeholder="请输入商品名称"
                       style="width: 200px;height:35px!important;"/>
                <Button style="margin-left: 20px;height:35px;" type="primary" @click="$_search_$">搜索</Button>
            </div>
        </div>
        <br>
        <Row>
            <Col span="16">
                <Carousel autoplay v-model="$_zmdvalue_$" loop class="swiper">
                    <CarouselItem v-for="(item,index) in $_images_$" :key="index">
                        <div class="demo-carousel" style="min-width: 750px;height: 340px">
                            <a :href="item.pcUrl">
                                <img :src="$_global_$.imgPath + item.image" style="width: 100%;height: 100%" alt="">
                            </a>

                        </div>
                    </CarouselItem>
                </Carousel>
            </Col>
            <Col span="8">
                <Row class="top">
                    <Col span="24">
                        <Row>
                            <Col span="6">
                                <img style="height:66px;width:66px;border-radius:50%;"
                                     :src="$_global_$.imgPath+$_faceurl_$"
                                     alt="">
                            </Col>
                            <Col span="13">
                                <p>{{$_myInfo_$.accountName}}</p>
                                <p style="margin-top:10px;"><img src="/static/employers/jfsc/jf.png"><span
                                        style="font-size:20px;">{{$_myInfo_$.credits}}</span></p>
                            </Col>
                            <Col span="5">
                                <p>&nbsp;<a @click="$_ddxx_$" style="line-height:26px;">订单记录</a></p></Col>
                        </Row>
                    </Col>
                </Row>
                <br>
                <Row class="bot">
                    <Col span="24" style="height:205px;white-space:nowrap;overflow-y:scroll" class="hot">
                        <h2 style="font-size:17px;"><img src="/static/employers/jfsc/h.png">热门兑换</h2>
                        <ol v-if="$_commodity_$.length==0">
                            <li style="text-align: center">暂无数据</li>
                        </ol>
                        <ol v-else v-for="(item,index) in $_commodity_$">
                            <li v-if="index <= 1"><span class="left"><span
                                    style="width:16px;height:16px;line-height:16px;text-align:center;background-color:#ffcc00;color:#fff;border-radius:50%; margin-right:10px;display:inline-block;">{{index+1}}</span>{{item.name}}</span><span
                                    class="right">{{item.salesCount}}</span></li>
                            <li v-else><span class="left"><span
                                    style="width:16px;height:16px;line-height:16px;text-align:center;background-color:#ccc;color:#fff;border-radius:50%; margin-right:10px;display:inline-block;">{{index+1}}</span>{{item.name}}</span><span
                                    class="right">{{item.salesCount}}</span></li>
                        </ol>
                    </Col>
                </Row>
            </Col>
        </Row>
        <br>
        <div style="margin-top:45px;">
            <div class="crumbs-nav">
                <div class="crumbs-nav-main clearfix">
                    <div class="crumbs-nav-item one-level">
                        <a href="javascript:void(0)" @click="$_goodsList_$(0)">全部商品</a>
                        <Icon type="chevron-right" size="14" style="color:#ccc;margin-left:10px;"></Icon>
                    </div>
                    <div class="crumbs-nav-item">
                        <Select :label-in-value="true" v-model="$_choseOne_$"
                                @on-change="$_changeType_$(1,$_choseOne_$)" placeholder="请选择分类" style="width:140px;">
                            <Option v-for="(item,index) in $_goodsTypeList_$" :key="index" :label="item.name"
                                    :value="item.id">
                            </Option>
                        </Select>
                        <Icon type="chevron-right" size="14" style="color:#ccc;margin-left:10px;"></Icon>
                    </div>
                    <div class="crumbs-nav-item">
                        <Select :label-in-value="true" v-model="$_choseTwo_$"
                                @on-change="$_changeType_$(2,$_choseTwo_$)" placeholder="请选择分类" style="width:140px">
                            <Option v-for="(item,index) in $_goodsTypeTwo_$" :key="index" :label="item.name"
                                    :value="item.id">
                            </Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div style="margin-top:15px;">
                <!--<div class="cont">-->
                <!--<ul style="overflow:hidden;">-->
                <!---->
                <!--</ul>-->
                <!--</div>-->
                <Row>
                    <Col class="cont" span="8" v-for="(item,index) in searchdata" :key="index">
                        <Card>
                            <div class="img">
                                <img :src="$_global_$.imgPath+item.image[0]" style="width: 100%;height: 100%"
                                     alt=""/>
                            </div>
                            <div class="c-top">
                                <h3 style="font-size:16px; margin-top:20px;margin-bottom:5px;">{{item.name}}</h3>
                                <p style="font-size:14px;margin-bottom:5px;">
                                    <span style="color:#333;font-size:14px;" v-if="item.goodsType==0">兑换所需金额：</span>
                                    <span style="color:#333;font-size:14px;" v-else>兑换所需积分：</span>
                                    <span style="font-size:15px;" v-if="item.goodsType==0">{{item.prices}}元</span>
                                    <span style="font-size:15px;" v-else>{{item.credits}}积分</span>
                                    <span style="font-size:16px; float:right; margin-right:10px;">
                                            <span style="color:#333;">库存：</span>{{item.repertory-item.salesCount}}</span>
                                </p>
                            </div>
                            <div class="link">
                                <a href="javascript:void(0)" class="details" @click="$_xq_$(item.id)">详情</a>
                                <a href="javascript:void(0)" class="exchange" @click="$_dh_$(item.id)">
                                    <span v-if="item.goodsType==0" style="color:#fff">立即购买</span>
                                    <span v-else style="color:#fff">立即兑换</span>
                                </a>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <div class="page">
                    <Page @on-change="$_changePage_$" :page-size="pagesize" :total="total" show-elevator/>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import controler from './controler.js';
    import axios from 'axios'

    export default {
        mixins: [controler],
        data() {
            return {
                $_faceurl_$: '',
                //轮播
                $_images_$: [],
                //账户信息
                $_myInfo_$: '',
                //商品分类
                $_goodsTypeInfo_$: '',
                //商品分类列表
                $_goodsTypeList_$: {},
                //商品二级分类
                $_goodsTypeTwo_$: [],
                //选择的一级分类
                $_choseOne_$: '',
                //选择的二级分类
                $_choseTwo_$: '',
                //商品列表
                $_goodsListInfo_$: '',
                //当前子账号信息
                $_thisUserInfo_$: '',
                total: 0,
                pagesize: 9,
                //当前标签索引
                $_tabIndex_$: '',
                $_value_$: '',
                $_zmdvalue_$: 0,
                $_integral_$: '66666',
                $_Stock_$: '88',
                $_commodity_$: [],
                searchdata: {},  //搜索结果
            }
        },
        methods: {
            //详情
            $_xq_$(id) {
                this.$root.$_Route_$('employer', 'jump', 'jfscxq', {id: id})
            },
            //兑换
            $_dh_$(id) {
                this.$root.$_Route_$('employer', 'jump', 'jfdh', {id: id})
            },
            //订单信息
            $_ddxx_$() {
                this.$root.$_Route_$('employer', 'jump', 'ddjl')
            },
            //轮播
            $_banner_$() {
                let sendData = {
                    type: "0",
                    publishStatus: "0",
                    typeCode: "1",
                    zoneId: this.$_thisUserInfo_$.zoneId
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
                                    {image: 'http://ftjw-1251053291.file.myqcloud.com/d/file/2018/11-20/9edcd86232001f368a8231d074ed70c9.jpg'},
                                ]
                            }
                        }
                    }
                })
            },
            //热门兑换
            $_hotChange_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/operate/goods/queryGoodsPageListByTags",
                    data: {
                        "tags": '热门兑换',
                        "putaway": 0,
                        "zoneId": this.$_thisUserInfo_$.zoneId,
                        "current": 1,
                        "size": 5
                    },
                }).then((rsp) => {

                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data.records.length > 0) {
                                this.$_commodity_$ = rsp.data.data.records;
                            }

                        }
                    }
                });
            },
            //我的积分信息
            $_myIntegral_$() {
                let sendData = {
                    "refId": this.$_thisUserInfo_$.id,
                    "accountType": 1
                };
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/operate/account/accountInfo",
                    data: sendData,
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_myInfo_$ = rsp.data.data;
                        }
                    }
                })
            },
            //商品分类
            $_goodsType_$() {
                let sendData = {
                    "zoneId": this.$_thisUserInfo_$.zoneId,
                    "visible": 0
                };

                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/operate/catalog/queryCatalogList",
                    data: sendData,
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_goodsTypeList_$ = {};
                            this.$_goodsTypeInfo_$ = rsp.data.data;

                            this.$_goodsTypeList_$ = this.$_getTypeTree_$(this.$_goodsTypeInfo_$);

                        }
                    }
                })
            },
            //处理商品分类，将商品分类改为tree形式
            $_getTypeTree_$(list) {
                let tree = {};
                for (let i = 0; i < list.length; i++) {
                    if (list[i].level == 1) {
                        let typeid = '';
                        typeid = list[i].id;
                        //一级分类
                        tree[typeid] = list[i];
                    }
                }
                for (let i = 0; i < list.length; i++) {
                    if (list[i].level == 2) {
                        let typeid = '';
                        typeid = list[i].parent;

                        //一级分类存在
                        if (tree[typeid].children == undefined) {
                            //children 不存在
                            tree[typeid].children = [];
                        }

                        //二级分类
                        tree[typeid].children.push(list[i]);
                    }
                }
                return tree;
            },
            //商品列表
            $_goodsList_$(id, pageNum = '') {

                let current = '';
                if (pageNum != '') {
                    current = pageNum;
                } else {
                    current = 1;
                }
                if (id == 0) {
                    //默认选择项清空
                    this.$_choseOne_$ = '';
                    this.$_choseTwo_$ = '';

                    //下拉列表清空
                    this.$_goodsTypeList_$ = [];
                    this.$_goodsTypeTwo_$ = [];
                    //获取全部商品
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + "/operate/goods/queryGoodsPageList",
                        data: {
                            "zoneId": this.$_thisUserInfo_$.zoneId,
                            "putaway": "0",
                            "current": current,
                            "size": this.pagesize
                        },
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.total = rsp.data.data.total;
                                this.pagesize = rsp.data.data.size;
                                this.$_goodsListInfo_$ = rsp.data.data.records;
                                for (let i = 0; i < this.$_goodsListInfo_$.length; i++) {
                                    this.$_goodsListInfo_$[i].image = this.$_goodsListInfo_$[i].image.split(';');
                                }

                                this.searchdata = this.$_goodsListInfo_$;

                                this.$_goodsType_$();
                            }
                        }
                    })
                } else {
                    //根据分类id获取商品
                    let sendData = {
                        "catalogId": id,
                        "putaway": "0",
                        "current": current,
                        "zoneId": this.$_thisUserInfo_$.zoneId,
                        "size": this.pagesize
                    };

                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + "/operate/goods/queryGoodsPageListByCatalog",
                        data: sendData,
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.total = rsp.data.data.total;
                                this.pagesize = rsp.data.data.size;
                                this.$_goodsListInfo_$ = rsp.data.data.records;
                                for (let i = 0; i < this.$_goodsListInfo_$.length; i++) {
                                    this.$_goodsListInfo_$[i].image = this.$_goodsListInfo_$[i].image.split(';');
                                }

                                this.searchdata = this.$_goodsListInfo_$;
                            }
                        }
                    })
                }
            },
            //商品搜索
            $_search_$() {
                this.searchdata = this.$_goodsListInfo_$;
                this.searchdata = this.search(this.searchdata, {name: this.$_value_$});
            },
            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            //分类切换
            $_changeType_$(type, id) {
                this.$_tabIndex_$ = id;
                if (id) {
                    if (type == 1) {
                        //一级分类
                        this.$_goodsTypeTwo_$ = this.$_goodsTypeList_$[id].children;
                        if (this.$_goodsTypeTwo_$[0].id !== -1)
                            this.$_goodsTypeTwo_$.unshift({'id': -1, 'name': '全部'});
                        // this.$_goodsTypeTwo_$.reverse();

                        this.$_choseTwo_$ = -1; //清空选择
                    } else if (type == 2) {
                        if (id == -1) {
                            id = this.$_choseOne_$;
                        }
                    }
                    this.$_goodsList_$(id)
                }
            },
            //切换页面
            $_changePage_$(pageNum) {
                this.$_goodsList_$(this.$_tabIndex_$, pageNum);
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_faceurl_$ = JSON.parse(cookie).faceUrl;
            this.$_thisUserInfo_$ = JSON.parse(cookie);
            this.$_banner_$();
            this.$_myIntegral_$();
            this.$_hotChange_$();
            this.$_goodsList_$(0);
            // this.$_goodsType_$();
        },

    }
</script>