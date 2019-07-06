<style scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .info {
        width: 100%;
        margin: 0 auto;
        padding: 10px 0 20px 30px;
        border-radius: 6px;
        box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.15);
    }

    .info .title1 {
        font-size: 14px;
        line-height: 40px;
        font-weight: bold;
    }

    .info .img {
        width: 50px;
        height: 50px;
        background: #f7f7f7;
        float: left;
        margin-right: 10px;
    }

    .info .list {
        width: 23%;
        float: left;
    }

    .info .list p {
        line-height: 30px;
        font-size: 14px;
    }

    .search {
        padding: 20px 0 20px 15px;
        margin: 20px 0 10px 0;
        font-size: 14px;
        color: #404040;
        background-color: #f5f5f5;
    }
    .bule1{
        color: #3399ff;
    }
</style>
<template>
    <div>
        <!-- 管家信息 -->
        <div class="info">
            <p class="title1">管家信息</p>
            <div class="content clear">
                <div class="img"><img style="width: 50px; height: 50px;" :src="$_global_$.imgPath + $_gjInfo_$.image"></div>
                <div class="list">
                    <p>姓名：{{$_gjInfo_$.name}}</p>
                    <p>联系方式：{{$_gjInfo_$.phone_number}}</p>
                </div>
                <div class="list">
                    <p>服务企业：</p>
                    <p v-for="item in $_gjInfo_$.enterprise">{{item.enterprise_name}}</p>
                </div>
                <div class="list">
                    <p v-if="$_gjInfo_$.service_count">服务总次数：<span class="bule1">{{$_gjInfo_$.service_count}}次</span></p>
                    <p v-else>服务总次数：<span class="bule1">0次</span></p>
                    <p v-if="$_gjInfo_$.avg_reply_time">平均响应式：<span class="bule1">{{$_gjInfo_$.avg_reply_time}}分钟</span></p>
                    <p v-else>平均响应式：<span class="bule1">0分钟</span></p>
                    <p v-if="$_gjInfo_$.avg_handle_time">平均处理时间：<span class="bule1">{{$_gjInfo_$.avg_handle_time}}小时</span></p>
                    <p v-else>平均处理时间：<span class="bule1">0小时</span></p>
                </div>
                <div class="list">
                    <p>综合得分：<span style="color:#f5a623;">{{$_gjInfo_$.synthesize}}</span></p>
                    <Rate allow-half v-model="$_gjInfo_$.star"></Rate>
                </div>
            </div>
        </div>
        <!-- 搜索 -->
        <div class="search">
            事项名称：&nbsp;&nbsp;
            <Input placeholder="请输入事项名称" v-model="$_orderNum_$" style="width: 210px;margin-right: 2%"></Input>
            &nbsp;&nbsp;状态：&nbsp;&nbsp;
            <Select v-model="$_selected_$" style="width:210px;margin-right: 2%">
                <Option v-for="item in $_classifyList2_$" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;业务类型：&nbsp;&nbsp;
            <Select v-model="$_selected2_$" style="width:210px;margin-right: 2%">
                <Option v-for="item in $_classifyList_$" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div class="content">
            <!--<Row>共{{$_gjInfo_$.total}}条数据</Row>-->
            <br>
            <Table :columns="$_recordTable_$" :data="$_recordInfo_$"></Table>
        </div>
        <br>
        <br>
        <Row>
            <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_total_$}}条数据</span>
            <Page align="right"
                  style="float: right"
                  :total=$_total_$
                  :page-size="$_pageSize_$"
                  show-sizer
                  show-elevator
                  @on-page-size-change="$_pageNum1_$"
                  @on-change="$_changePage_$">
            </Page>
        </Row>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_pageNum_$:1,
                $_total_$:0,
                $_pageSize_$:10,
                $_orderNum_$: '', // 订单编号
                $_userName_$: '', // 用户名称
                $_rq_$: '', // 日期
                $_totalSize_$: 922, // 数据总量
                $_gjInfo_$: '',
                $_selected_$: "全部", // 业务类型
                $_selected2_$: "全部",//状态
                $_classifyList_$: [
                    // 分类值
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "物业保修"
                    },
                    {
                        value: 2,
                        label: "投诉建议"
                    },
                    {
                        value: 3,
                        label: "企业服务咨询"
                    },
                    {
                        value: 4,
                        label: "留言"
                    }
                ],
                $_classifyList2_$: [
                    // 分类值
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 0,
                        label: "未受理"
                    },
                    {
                        value: 1,
                        label: "处理中"
                    },
                    {
                        value: 2,
                        label: "已解决"
                    },
                    {
                        value: 3,
                        label: "已完成"
                    }
                ],
                $_recordTable_$: [  //表头
                    {
                        title: "序号",
                        key: "commiterId",
                        align: "center"
                    },
                    {
                        title: "事项分类",
                        key: "recordTypeName",
                        align: "center",
                        render: (h, params) => {
                            let texts = '';
                            if (params.row.recordTypeCode == 1) {
                                texts = "物业保修"
                            } else if (params.row.recordTypeCode == 2) {
                                texts = "投诉建议"
                            } else if (params.row.recordTypeCode == 3) {
                                texts = "企业服务咨询"
                            } else {
                                texts = "留言"
                            }
                            return h('div', {
                                props: {},
                            }, texts)
                        }
                    },
                    {
                        title: "事项名称",
                        key: "recordTitle",
                        align: "center"
                    },
                    {
                        title: "联系人",
                        key: "commiterName",
                        align: "center"
                    },
                    {
                        title: "公司",
                        key: "commiterEnterpriseName",
                        align: "center"
                    },
                    {
                        title: "管家名称",
                        key: "stewardName",
                        align: "center"
                    },
                    {
                        title: "提交时间",
                        key: "commiterPubtime",
                        width: 155,
                        align: "center",
                        render: (h, params) => {
                            let text = '';
                            if (params.row.commiterPubtime && params.row.commiterPubtime != '') {
                                text = this.FormatAllDate(params.row.commiterPubtime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "受理时间",
                        key: "handlerRecvtime",
                        width: 155,
                        align: "center",
                        render: (h, params) => {
                            let text = '';
                            if (params.row.handlerRecvtime && params.row.handlerRecvtime != '') {
                                text = this.FormatAllDate(params.row.handlerRecvtime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "处理时间",
                        key: "handlerCompletime",
                        width: 155,
                        align: "center",
                        render: (h, params) => {
                            let text = '';
                            if (params.row.handlerCompletime && params.row.handlerCompletime != '') {
                                text = this.FormatAllDate(params.row.handlerCompletime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "状态",
                        key: "recordStatus",
                        width: 80,
                        align: "center",
                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if (params.row.recordStatus == 0) {
                                texts = "未受理"
                            } else if (params.row.recordStatus == 1) {
                                texts = "处理中"
                            } else if (params.row.recordStatus == 2) {
                                texts = "已解决"
                            } else if (params.row.recordStatus == 3) {
                                texts = "已完成"
                            }
                            return h('div', {
                                props: {},
                            }, texts)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                        style: {
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row.id)
                                            }
                                        }
                                    },
                                    '详情')
                            ])
                        }
                    }
                ],
                $_recordInfo_$: [],
                $_querycfg_$: {
                    mod: "steward/steward/queryStewardDetails",
                    params: {}
                }
            };
        },
        methods: {
            $_record_$() {
                this.$root.inparams.id
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$_gjInfo_$ = rsp.data.data;
                    }
                }
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_pageNum_$ = e;
                this.$_search_$();
            },
            $_pageNum1_$(e) {
                this.$_pageSize_$ = e;
                this.$_search_$();
            },
            // 搜索
            $_search_$() {
                if (this.$_orderNum_$) {
                    this.$_querycfg_$.params.recordTitle = this.$_orderNum_$;
                }
                if (this.$_selected_$ != "全部") {
                    this.$_querycfg_$.params.recordStatus = this.$_selected_$;
                }
                if (this.$_selected2_$ != "全部") {
                    this.$_querycfg_$.params.recordTypeCode = this.$_selected2_$;
                }
                this.$_querycfg_$.params.size = this.$_pageSize_$;
                this.$_querycfg_$.params. current= this.$_pageNum_$;
                this.$_querycfg_$.mod = 'steward/steward/queryRecordPageList';//新地址
                var _this = this;//记录this
                this.$_fquery_$(function (rsp) {
                    if (rsp.status === 200) {
                        //搜索清零
                        delete _this.$_querycfg_$.params.recordTitle;
                        delete _this.$_querycfg_$.params.recordStatus;
                        delete _this.$_querycfg_$.params.recordTypeCode;
                        if (rsp.data.code === 0) {
                            _this.$_recordInfo_$ = rsp.data.data.records;
                            _this.$_total_$ = rsp.data.data.total;
                        }
                    }
                });
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
            // 详情
            $_detail_$(index) {
                let info = '';
                for (let i = 0; i < this.$_recordInfo_$.length; i++) {
                    if (this.$_recordInfo_$[i].id == index) {
                        info = this.$_recordInfo_$[i];
                    }
                }
                // this.$root.$_Route_$('user', 'jump', 'fwjlxq', info)
                this.$root.$_Route_$('user', 'jump', 'gjxq', {row: info})
            }
        },
        created() {
            //获取记录ID
            this.$_querycfg_$.params.stewardId = this.$root.inparams.id;
            this.$_querycfg_$.params.zoneId = this.$root.inparams.zoneId;
        },
        mounted() {
            this.$_fquery_$();
            this.$_search_$()
        }
    };
</script>