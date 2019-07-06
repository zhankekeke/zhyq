<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 15px 0 15px 15px;
        background: #f5f5f5;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        color: #404040;
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

    >>>.ivu-btn-default{
        background-color: #fff;
        border: 1px solid #3399ff;
        color: #3399ff;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            标题：
            <Input v-model="$_title_$" style="width: 200px;margin-right: 28px;" placeholder='请输入标题'></Input>
            日期：&nbsp;&nbsp;
            <DatePicker type="daterange" format="yyyy-MM-dd" placeholder="请选择日期和时间" style="width: 200px;margin-right: 20px" @on-change="$_qh_$"></DatePicker>
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 内容 -->
        <div>
            <Row>
                <Col align="left" span="18">
                    <Button :type="$_btSend_$" @click="$_sendList_$()">发送列表</Button>
                    <Button :type="$_btReceive_$" @click="$_receiveList_$()">接收列表</Button>
                </Col>
                <Col align="right" span="6">
                    <Button type="primary" @click="$_addTz_$()">新建通知</Button>
                </Col>
            </Row>
            <br>
            <Row v-show="$_showSend_$">
                <Table  :columns="$_informTableSend_$" :data="$_informInfo_$"></Table>
            </Row>
            <Row v-show="$_showReceive_$">
                <Table  :columns="$_informTableReceive_$" :data="$_informInfo_$"></Table>
            </Row>
            <br>
            <Row>
                <Col style="text-align: left" span="12">共有{{$_total_$}}条通知</Col>
                <Page align='right' :total="$_total_$"
                      show-elevator show-sizer
                      :page-size="$_pageSize_$"
                      @on-page-size-change="$_pageNum_$"
                      @on-change="$_changePage_$"/>
            </Row>

        </div>
        <!-- 详情弹窗 -->
        <Modal v-model="$_detailModal_$" title="通知详情">
            <div class="content">
                <div><span>接收人:</span>&nbsp;&nbsp;{{$_infoDetail_$.receivers}}</div>
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
                $_showSend_$: true,
                $_showReceive_$: false,
                $_btSend_$: "primary",
                $_btReceive_$: "default",

                $_title_$: '', // 标题
                $_createDate_$: '', // 日期
                $_informTableSend_$: [  //数据表头
                    {
                        title: "序号",
                        type: "index",
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
                        title: "接收人",
                        key: "receivers",
                        align: "center"
                    },
                    {
                        title: "接收人数",
                        key: "receivernum",
                        align: "center"
                    },
                    {
                        title: "已读人数",
                        key: "readnum",
                        align: "center"
                    }, {
                        title: "发送时间",
                        key: "createDate",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
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
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row);
                                            }
                                        }
                                    },
                                    "详情 | "
                                ),

                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_repeat_$(params.row);
                                            }
                                        }
                                    },
                                    "转发"
                                )
                            ]);
                        }
                    }
                ],
                $_informTableReceive_$: [  //数据表头
                    {
                        title: "序号",
                        type: "index",
                        align: "center"
                    },
                    {
                        title: "发件人",
                        key: "createUserName",
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
                        title: "通知类型",
                        key: "typename",
                        align: "center"
                    },
                    {
                        title: "接收时间",
                        key: "createDate",
                        align: "center"
                    },  {
                        title: "状态",
                        key: "read",
                        align: "center",
                        render: (h, params) => {
                            let text =params.row.read?"已读":"未读";
                            return h("div", text)}
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
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
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row);
                                            }
                                        }
                                    },
                                    "详情 | "
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_repeat_$(params.row);
                                            }
                                        }
                                    },
                                    "转发"
                                )
                            ]);
                        }
                    }
                ],
                $_informInfo_$: [], //虚拟表格数据

                $_detailModal_$: false,  //详情弹窗
                $_infoDetail_$: {}, //详情对象
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_pageSize_$: 5,//列表显示条数
                $_total_$: 0,//列表总数
            };
        },
        created() {
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_List_$();
            this.$_global_$.serverPath;
        },
        methods: {
            //生成数据列表
            $_List_$() {
                if (this.$_showSend_$ && !this.$_showReceive_$) {
                    //发送列表
                    this.$_querycfg_$.mod = 'company/notice/created';
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
                                            if(this.$_informInfo_$[i].type==2){
                                                this.$_informInfo_$[i].receivers=this.$_informInfo_$[i].noticePayment.companyName;
                                            }else{
                                                this.$_informInfo_$[i].receivers=receivers.join('；');
                                            }
                                            this.$_informInfo_$[i].readnum = read;
                                        }
                                    }
                                }
                            }
                        }
                    })
                } else {
                    //接收列表
                    this.$_querycfg_$.mod = 'company/notice/receive';
                    this.$_fquery_$((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_informInfo_$ = rsp.data.data.records;
                                this.$_total_$ = rsp.data.data.total * 1;

                                for (let i = 0; i < this.$_informInfo_$.length; i++) {
                                    let js = this.$_informInfo_$[i].users.indexOf("[{");
                                    this.$_informInfo_$[i].receivers = '';   //接收人
                                    if(this.$_informInfo_$[i].type==0){
                                        this.$_informInfo_$[i].typename = '普通通知'
                                    }
                                    if(this.$_informInfo_$[i].type==1){
                                        this.$_informInfo_$[i].typename = '活动通知'
                                    }
                                    if(this.$_informInfo_$[i].type==2){
                                        this.$_informInfo_$[i].typename = '缴费通知'
                                    }

                                    if (js == -1) {
                                        continue;
                                    } else {
                                        let userslist = JSON.parse(this.$_informInfo_$[i].users);
                                        let receivers = [];
                                        for (let j = 0; j < userslist.length; j++) {

                                            receivers.push(userslist[j].name);

                                            this.$_informInfo_$[i].receivers = receivers.join('；');
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
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
                this.$_createDate_$ = e;
            },
            // 搜索
            $_search_$() {
                this.$_querycfg_$.params.title = this.$_title_$;
                if(this.$_createDate_$){
                    this.$_querycfg_$.params.startDate = this.$_createDate_$[0]+' 00:00:00';
                    this.$_querycfg_$.params.endDate = this.$_createDate_$[1]+' 23:59:59';
                }
                

                this.$_List_$();
            },
            // 新建通知
            $_addTz_$() {
                this.$root.$_Route_$('employer', 'jump', 'xjtz', {})
            },
            //发送列表
            $_sendList_$() {
                this.$_showSend_$ = true;
                this.$_showReceive_$ = false;
                this.$_btSend_$ = "primary";
                this.$_btReceive_$ = "default";

                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_List_$();
            },
            //接收列表
            $_receiveList_$() {
                this.$_showSend_$ = false;
                this.$_showReceive_$ = true;
                this.$_btSend_$ = "default";
                this.$_btReceive_$ = "primary";

                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_List_$();
            },
            // 详情
            $_detail_$(row) {
                if(row.type==1){
                    this.$root.$_Route_$('employer','jump','yqhdxq',{row:row})
                }else{
                    this.$root.$_Route_$('employer', 'jump', 'tzxq', {id: row, type: this.$_showReceive_$});
                }
                
            },
            // 转发
            $_repeat_$(item) {
                this.$root.$_Route_$('employer', 'jump', 'tzzf', {row: item})
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