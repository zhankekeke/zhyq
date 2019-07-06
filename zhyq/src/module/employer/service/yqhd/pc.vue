<style scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .search {
        background: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
        font-size: 14px;
    }

    .item {
        margin: 15px;
        box-sizing: border-box;
        width: 290px;
        display: inline-block;
        /*border: 1px solid #f7f7f7;*/
        /*border-radius: 6px;*/
        /*margin-left: 3%;*/
    }

    .title {
        line-height: 40px;
        font-size: 16px;
    }

    .title .name {
        float: left;
        font-weight: bold;
        font-size: 16px;
        color: #333333;
    }

    .title .status {
        float: right;
        color: #3399ff;
        text-align: right;
        font-size: 14px;
    }

    .title .status .bm {
        border-right: 1px solid #3399ff;
        padding: 0 7px 0 0;
    }

    .title .status span {
        padding: 0 0 0 7px;
    }

    .sjdd {
        font-size: 14px;
        line-height: 30px;
    }

    .sjdd .sjwrap {
        float: left;
    }

    .sjdd .sj {
        padding-right: 10px;
    }

    .sjdd .ddwrap {
        float: right;
        text-align: right;
    }

    .img {
        width: 100%;
        height: 170px;
        background: #f7f7f7;
        overflow: hidden;
    }

    .content {
        margin: 7px 0;
        font-size: 14px;
        line-height: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .item .ivu-btn {
        display: block;
        margin: 0 auto;
        border: none;
        background: #f5f5f5;
        border-radius: 0;
        font-size: 14px;
        height: 48px;
        border-radius: 0 0 4px 4px;
        color: #333;
    }

    .item .ivu-btn:hover {
        color: #3399ff;
    }

    .ml28 {
        margin-left: 28px;
    }

    >>> .ivu-card-body {
        padding: 0;
    }
</style>
<template>
    <div style="min-width: 1010px;overflow-x: auto">
        <!-- 搜索 -->
        <div class="search">
            <span>活动名称：</span>
            <Input v-model="$_title_$" style="width: 210px" placeholder="请输入活动名称"></Input>
            <span class="ml28">发布时间：</span>
            <DatePicker v-model="$_time_$" type="daterange" split-panels placeholder="发布时间"
                        style="width: 200px"></DatePicker>
            <Button style="margin-left: 20px" type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div>
            <Row>
                <Col class="item" span="8" style="" v-for="(item,index) in hdbm" :key="index">
                    <Card>
                        <div class="img">
                            <img :src="$_global_$.imgPath+item.images[0]" alt="" style="width: 100%;height: 100%">
                        </div>
                        <div style="padding: 16px;border: 1px solid #f2f2f2">
                            <div class="title clear">
                                <p class="name" :title="item.title"
                                   style="width: 47%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                    {{item.title}}</p>
                                <p class="status">
                                    <span class="bm" v-if="item.apply==0">无需报名</span>
                                    <span class="bm" style="color: #C7C7C7;border-right: 1px solid #C7C7C7;"
                                          v-else-if="item.userApply==true">已报名</span>
                                    <span class="bm" v-else>未报名</span>
                                    <span v-if="item.couponId==0">无代金券</span>
                                    <span v-else-if="item.userCoupon==true" style="color: #C7C7C7">已领取</span>
                                    <span v-else>未领取</span>
                                </p>
                            </div>
                            <div class="sjdd clear">
                                <p class="sjwrap">
                                    <span class="sj">时间:</span>
                                    <span>{{item.beginDate}}</span>
                                </p>
                                <br/>
                                <p :title="item.address"
                                   style="width: 47%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                    <span class="sj">地点:</span>
                                    <span>{{item.address}}</span>
                                </p>
                            </div>
                        </div>
                        <!--<p class="content">{{item.content}}</p>-->
                        <Button type="ghost" long @click="$_detail_$(item)">查看详情</Button>
                    </Card>
                </Col>

            </Row>
        </div>
        <br>
        <!-- 分页 -->
        <Row>
            <Page align='right' :total="$_total_$"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        filters: {
            getimg(val) {

                let img = JSON.parse(val);
                return img[0];


                // if(val){
                //     var img=JSON.parse(val);
                //     if(img.length>0){
                //         return img[0].imageUrl;
                //     }else{
                //         return '';
                //     }
                //
                // }
            }
        },
        data() {
            return {
                $_total_$: 0,
                $_pageSize_$: 6,
                $_title_$: '', // 标题
                $_time_$: '', // 发布时间
                hdbm: [
                    {
                        title: '',
                        createDate: '',
                        address: '',
                        content: '',
                        images: "[]"
                    }
                ],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                }
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_querycfg_$.params.zoneId = userInfo.zoneId;
            this.$_List_$();
        },
        methods: {
            //列表
            $_List_$() {
                this.$_querycfg_$.mod = 'company/activity/search';
                this.$_querycfg_$.params.status = 1;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_total_$ = Number(rsp.data.data.total);
                            this.hdbm = rsp.data.data.records;
                            for (let i = 0; i < this.hdbm.length; i++) {
                                this.hdbm[i].images = JSON.parse(this.hdbm[i].images)
                            }
                        }
                    }
                })
            },
            //   搜索
            $_search_$() {
                if (this.$_title_$) {
                    this.$_querycfg_$.params.name = this.$_title_$;
                    this.$_List_$();
                } else {
                    delete this.$_querycfg_$.params.name;
                    this.$_List_$();
                }
                if (this.$_time_$[0] !== '') {
                    var beginDate = this.FormatAllDate(this.$_time_$[0]);
                    var endDate = this.FormatAllDate(this.$_time_$[1]);
                    endDate = endDate.replace('00:00:00', '23:59:59');
                    this.$_querycfg_$.params.beginDate = beginDate;
                    this.$_querycfg_$.params.endDate = endDate;
                    this.$_List_$();
                } else {
                    delete this.$_querycfg_$.params.beginDate;
                    delete this.$_querycfg_$.params.endDate;
                    this.$_List_$();
                }
            },
            FormatAllDate(sDate) {
                var date = new Date(sDate);
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                //月
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                //日
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                //时
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                //分
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                //秒
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                //格式化后日期为：yyyy-MM-dd HH:mm:ss
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + hours + seperator2 + minutes + seperator2 + seconds;
                return currentdate;
            },
            // 查看详情
            $_detail_$(item) {
                this.$root.$_Route_$('employer', 'jump', 'yqhdxq', {row: item})
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.hdbm = rsp.data.data.records
                    }
                }
            },

            $_receive_$() {

            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_List_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_List_$();
            },
        }
    };
</script>