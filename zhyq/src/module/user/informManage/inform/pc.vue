<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 15px 0 15px 15px;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #000;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .content {
        font-size: 14px;
        line-height: 25px;
    }

    .content p {
        margin: 0 0 10px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search" style="background-color: #f5f5f5;padding-left: 15px;">
            <span style="font-size: 14px">标题：</span>
            <Input v-model="$_title_$" style="width: 210px;margin-right: 10px" placeholder='请输入标题'></Input>
            &nbsp;&nbsp;<span style="font-size: 14px">发送日期：</span>
            <DatePicker type="daterange" format="yyyy-MM-dd" placeholder="请选择日期和时间"
                        style="width: 210px;margin-right: 10px" @on-change="$_qh_$"></DatePicker>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 内容 -->
        <div>
            <Row>
                <Col align="right" span="24">
                    <Button type="primary" @click="$_addTz_$()">新建通知</Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Table :columns="$_informTable_$" :data="$_informInfo_$"></Table>
            </Row>
            <br>
            <br>
            <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_total_$}}条数据</span>
            <Page align='right'
                  :total="$_total_$"
                  style="float: right"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </div>
        <!-- 详情弹窗 -->
        <Modal v-model="$_detailModal_$" title="通知详情">
            <div class="content">
                <div><span>接收人:</span>&nbsp;&nbsp;{{$_infoDetail_$.receivers}}</div>
                <div><span>标题:</span>&nbsp;&nbsp;{{$_infoDetail_$.title}}</div>
                <div><span>摘要:</span>&nbsp;&nbsp;{{$_infoDetail_$.description}}</div>
                <div>
                    <span>通知内容:</span>
                    <div v-html="$_infoDetail_$.content" style="margin-left: 20px"></div>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="$_close_$()">关闭</Button>
            </div>
        </Modal>
    </div>

</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_title_$: '', // 标题
                $_createDate_$: [], // 日期
                $_informTable_$: [  //数据表头
                    {
                        title: "序号",
                        type: "index",
                        width: 80,
                        align: "center"
                    },
                    {
                        title: "标题",
                        key: "title",
                        align: "center"
                    },
                    {
                        title: "摘要",
                        key: "description",
                        align: "center"
                    },
                    {
                        title: "发起人",
                        key: "createUserName",
                        align: "center"
                    },
                    {
                        title: "接收人",
                        key: "receivers",
                        align: "center",
                        ellipsis: true
                    },
                    {
                        title: "接收人数",
                        key: "receivernum",
                        width: 80,
                        align: "center",
                    },
                    {
                        title: "已读人数",
                        key: "readnum",
                        width: 80,
                        align: "center",
                    },
                    {
                        title: "通知类型",
                        key: "typename",
                        width: 90,
                        align: "center"
                    },
                    {
                        title: "缴费状态",
                        key: "jftz",
                        width: 80,
                        align: "center",
                    },
                    {
                        title: "发送时间",
                        key: "createDate",
                        align: "center",
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 100,
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.type == 1) {
                                a = "转发"
                            }
                            if (params.row.type == 0) {
                                a = "转发"
                            }
                            if (params.row.type == 2) {
                                a = ""
                            }
                            var b;
                            if (params.row.type == 2) {
                                b = "标记缴费"
                            } else {
                                b = ""
                            }
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_repeat_$(params.row);
                                            }
                                        }
                                    },
                                    a
                                ), h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_bjjf_$(params.row);
                                            }
                                        }
                                    },
                                    b
                                ), h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            color: "#059BFA",
                                        },
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row);
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ]);
                        }
                    }
                ],
                $_informInfo_$: [],  //虚拟表格数据
                $_detailModal_$: false,  //详情弹窗
                $_infoDetail_$: {}, //详情对象
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_pageSize_$: 10,//列表显示条数
                $_total_$: 0,//列表总数
            };
        },
        created() {
            this.$_List_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_global_$.serverPath;
        },
        methods: {
            //生成数据列表
            $_List_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.params.zoneId = userInfo.zoneId;
                this.$_querycfg_$.mod = 'company/notice/search';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_informInfo_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total * 1;
                            for (let i = 0; i < this.$_informInfo_$.length; i++) {
                                let js = this.$_informInfo_$[i].users.indexOf("[{");
                                this.$_informInfo_$[i].receivernum = 0;  //接收人数
                                this.$_informInfo_$[i].receivers = '';   //接收人
                                this.$_informInfo_$[i].readnum = 0;      //已读人数


                                if (this.$_informInfo_$[i].type == 0) {
                                    this.$_informInfo_$[i].typename = '普通通知'; //通知类型
                                    this.$_informInfo_$[i].jftz = '-'; //通知类型
                                }
                                if (this.$_informInfo_$[i].type == 1) {
                                    this.$_informInfo_$[i].typename = '活动通知';
                                    this.$_informInfo_$[i].jftz = '-';
                                } else if (this.$_informInfo_$[i].type == 2) {
                                    this.$_informInfo_$[i].typename = '缴费通知';
                                    if (this.$_informInfo_$[i].noticePayment.payStatus == 0) {
                                        this.$_informInfo_$[i].jftz = '否';
                                    }
                                    if (this.$_informInfo_$[i].noticePayment.payStatus == 1) {
                                        this.$_informInfo_$[i].jftz = '是';
                                    }
                                    if (this.$_informInfo_$[i].noticePayment.payStatus == 2) {
                                        this.$_informInfo_$[i].jftz = '是';
                                    }
                                }

                                if (js == -1) {
                                    continue;
                                } else {
                                    let userslist = JSON.parse(this.$_informInfo_$[i].users);
                                    let receivers = [];
                                    let read = 0;
                                    for (let j = 0; j < userslist.length; j++) {

                                        receivers.push(userslist[j].name);
                                        if (userslist[j].read == 1) {
                                            read++;
                                        }

                                        this.$_informInfo_$[i].receivernum = receivers.length;
                                        if (this.$_informInfo_$[i].type == 2) {
                                            this.$_informInfo_$[i].receivers = this.$_informInfo_$[i].noticePayment.companyName;
                                        } else {
                                            this.$_informInfo_$[i].receivers = receivers.join('；');
                                        }
                                        this.$_informInfo_$[i].readnum = read;
                                    }
                                }
                            }
                        }
                    }
                })
            },
            $_bjjf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确认是否标记缴费?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/company/notice/noticeMarkPayment/` + row.id,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('标记');
                                    this.$_List_$();
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_List_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_List_$();
            },
            //搜索发送日期
            $_qh_$(e) {
                this.$_createDate_$ = [];
                if (e.length > 0 && e[0] !== "") {
                    this.$_createDate_$ = [e[0] + ' 00:00:00', e[1] + ' 23:59:59'];
                }

            },
            // 搜索
            $_search_$() {
                this.$_querycfg_$.params.title = this.$_title_$;
                this.$_querycfg_$.params.startDate = this.$_createDate_$[0];
                this.$_querycfg_$.params.endDate = this.$_createDate_$[1];

                this.$_List_$();
            },
            // 新建通知
            $_addTz_$() {
                this.$root.$_Route_$('user', 'jump', 'xjtz', {})
            },
            // 详情
            $_detail_$(row) {
                this.$root.$_Route_$('user', 'jump', 'tzxq', {row: row});
            },
            // 转发
            $_repeat_$(item) {
                this.$root.$_Route_$('user', 'jump', 'tzzf', {row: item})
            },
            // 关闭
            $_close_$() {
                this.$_detailModal_$ = false
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {

                    }
                }
            }
        }
    };
</script>