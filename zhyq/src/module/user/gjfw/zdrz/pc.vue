<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 20px 0 20px 15px;
        margin-bottom: 15px;
        font-size: 14px;
        color: #000;
        background-color: #f5f5f5;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .bg-lp {
        background: rgba(230, 243, 252, 1);
        padding: 5px;
        border: 1px solid rgba(212, 240, 252, 1);
        font-size: 12px;
    }

    .mt10 {
        margin-top: 10px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            事项名称：
            <Input placeholder="请输入事项名称" v-model.trim="$_recordTitle_$" style="width: 200px; margin-right: 2%"></Input>
            &nbsp;&nbsp;
            管家名称：
            <Input placeholder="请输入管家名称" v-model.trim="$_stewardName_$" style="width: 200px; margin-right: 2%"></Input>
            &nbsp;&nbsp;时间：
            <DatePicker type="daterange" @on-change="change" ormat="yyyy-MM-dd" placeholder="请选择时间"
                        style="width: 200px;margin-right: 2%"></DatePicker>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <br>
        <Row>
            <Table ref="selection" :columns="$_jfjlTable_$" :data="$_jfjlInfo_$"></Table>
        </Row>
        <br>
        <br>
        <Row>
        <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_total_$}}条数据</span>
        <Page align='right' :total="$_total_$"
              style="float: right"
              show-elevator show-sizer
              @on-page-size-change="$_pageNum_$"
              @on-change="$_changePage_$"/>
        </Row>
    </div>
</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_total_$: 0,//数据总数
                $_recordTitle_$: '',//数据总数
                $_stewardName_$: '',
                $_rq_$: [],
                $_selected_$: '全部', // 默认选中
                $_statusList_$: [
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "上线"
                    },
                    {
                        value: 0,
                        label: "下线"
                    }
                ],
                $_jfjlTable_$: [
                    //数据表头
                    {
                        title: "序号",
                        type: "index",
                        align: "center"
                    },
                    {
                        title: "管家姓名",
                        key: "stewardName",
                        align: "center"
                    },
                    {
                        title: "管家联系方式",
                        key: "stewardPhoneNumber",
                        align: "center"
                    },
                    // {
                    //   title: "员工名称",
                    //   key: "commiterName",
                    //   align: "center"
                    // },
                    // {
                    //   title: "员工联系电话",
                    //   key: "commiterPhoneNumber",
                    //   align: "center"
                    // },
                    {
                        title: "事项类型",
                        key: "recordTypeCode",
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
                        align: "center",
                    },
                    {
                        title: "公司名称",
                        key: "commiterEnterpriseName",
                        align: "center"
                    },
                    {
                        title: "问题状态",
                        key: "recordStatus",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.recordStatus == 0) {
                                a = "未受理";
                            }
                            if (params.row.recordStatus == 1) {
                                a = "处理中";
                            }
                            if (params.row.recordStatus == 2) {
                                a = "已解决";
                            }
                            if (params.row.recordStatus == 3) {
                                a = "已完成";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "提交时间",
                        key: "commiterPubtime",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row.id);
                                            }
                                        }
                                    },
                                    "详情列表"
                                )
                            ]);
                        }
                    }
                ],
                $_jfjlInfo_$: [],
                userInfo: {},
                $_pageSize_$:10,
                $_querycfg_$: {
                    mod: "",
                    params: {
                        pageSize: 10
                    }
                }
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_List_$();

        },
        methods: {
            //生成数据
            $_List_$() {
                this.$_querycfg_$.mod = 'steward/steward/' + this.userInfo.zoneId + '/recordTransferList';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.stewardName
                        delete this.$_querycfg_$.params.recordTitle
                        delete this.$_querycfg_$.params.startTime
                        delete this.$_querycfg_$.params.endTime
                        if (rsp.data.code === 0) {
                            this.$_jfjlInfo_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total * 1;
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_List_$();
            },
            $_detail_$(id) {
                this.$root.$_Route_$('user', 'jump', 'zdxq', {id: id});
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_List_$();
            },
            // 格式化时间
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
            change(e){
                this.$_rq_$ = [];
                if (e.length > 0 && e[0] !== "") {
                    // this.$_rq_$ = [e[0] + ' 00:00:00', e[1] + ' 23:59:59'];
                    this.$_rq_$ = e;
                }
            },
            // 搜索
            $_search_$() {
                // if (this.$_rq_$[0] !== '') {
                //     var beginDate = this.FormatAllDate(this.$_rq_$[0])
                //     var endDate = this.FormatAllDate(this.$_rq_$[1])
                //     this.$_querycfg_$.params.startTime = beginDate;
                //     this.$_querycfg_$.params.endTime = endDate;
                // } else {
                //     this.$_querycfg_$.params.startTime = '';
                //     this.$_querycfg_$.params.endTime = '';
                // }

                this.$_querycfg_$.params.startTime = this.$_rq_$[0];
                this.$_querycfg_$.params.endTime = this.$_rq_$[1];


                this.$_querycfg_$.params.recordTitle = this.$_recordTitle_$;
                this.$_querycfg_$.params.stewardName = this.$_stewardName_$;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_querycfg_$.params.pageNum = 1;
                this.$_List_$();
            }
        }
    };
</script>