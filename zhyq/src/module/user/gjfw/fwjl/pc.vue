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

    .title1 {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
    }
    .title{
        line-height: 30px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <Row type="flex" class="search">
                <span class="title">事项名称：</span>&nbsp;&nbsp;
                <Input placeholder="请输入事项名称" v-model.trim="$_orderNum_$" style="width: 160px"></Input>
                &nbsp;&nbsp;
                <span class="title">问题状态：</span>&nbsp;&nbsp;
                <Select placeholder="请选择" v-model="$_selected_$" style="width:80px">
                    <Option v-for="item in $_classifyList2_$" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                </Select>
                &nbsp;&nbsp;
                <span class="title">服务类型：</span>&nbsp;&nbsp;
                <Select placeholder="请选择服务类型" v-model="$_selected2_$" style="width:120px">
                    <Option v-for="item in $_classifyList_$" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                </Select>
                &nbsp;&nbsp;<span class="title">日期：</span>&nbsp;&nbsp;
                <DatePicker type="daterange" @on-change="change" format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 180px;margin-right: 1%"></DatePicker>
                &nbsp;&nbsp;
                <Button type="primary" @click="$_search_$()">搜索</Button>
        </Row>

        <!-- 列表 -->
        <br>
        <Row>
            <Table ref="selection" :columns="$_recordTable_$" :data="$_recordInfo_$"></Table>
        </Row>
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
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$">
            </Page>
        </Row>
    </div>

</template>
<script>
    import controler from './controler.js';
    import {EventBus} from "@/libs/eventbus.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_orderNum_$: '', // 标题
                $_rq_$:[], // 日期
                $_selected_$: "全部", // 业务类型
                $_selected2_$: "全部",//状态
                $_stratRow_$: 0,//起始条数
                $_total_$: 0,//总条数
                $_pageSize_$: 10,//每页显示

                $_sendInfo_$: '',
                $_classifyList_$: [
                    // 分类值
                    {
                        value: "",
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
                        value: "",
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
                $_recordTable_$: [
                    //数据表头
                    {
                        title: "序号",
                        key: "commiterId",
                        align: "center",
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
                            }else{
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
                        title: "联系人",
                        key: "commiterName",
                        align: "center"
                    },
                    {
                        title: "公司",
                        key: "commiterEnterpriseName",
                        align: "center",
                    },
                    {
                        title: "管家名称",
                        key: "stewardName",
                        align: "center",
                    },
                    {
                        title: "提交时间",
                        key: "commiterPubtime",
                        align: "center",
                        render: (h, params) => {
                            let text='';
                            if(params.row.commiterPubtime && params.row.commiterPubtime!=''){
                                text=this.FormatAllDate(params.row.commiterPubtime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "受理时间",
                        key: "handlerRecvtime",
                        align: "center",
                        render: (h, params) => {
                            let text='';
                            if(params.row.handlerRecvtime && params.row.handlerRecvtime!=''){
                                text=this.FormatAllDate(params.row.handlerRecvtime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "处理时间",
                        key: "handlerCompletime",
                        align: "center",
                        render: (h, params) => {
                            let text='';
                            if(params.row.handlerCompletime && params.row.handlerCompletime!=''){
                                text=this.FormatAllDate(params.row.handlerCompletime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "状态",
                        key: "recordStatus",
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
                                            marginRight: "5px",
                                            color: "#059BFA"
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
                $_recordInfo_$: [
                    //虚拟表格数据
                ],
                $_querycfg_$: {
                    mod: 'steward/steward/queryRecordPageList',
                    params: {}
                },
                userInfo:{}
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            //默认起始条数
            this.$_querycfg_$.params.zoneId = this.userInfo.zoneId;
            this.$_querycfg_$.params.current = 1;
            this.$_querycfg_$.params.size = this.$_pageSize_$;
        },

        methods: {

            change(e){
                this.$_rq_$ = [];
                if (e.length > 0 && e[0] !== "") {
                    // this.$_rq_$ = [e[0] + ' 00:00:00', e[1] + ' 23:59:59'];
                    this.$_rq_$ = e;
                }
            },
            //   搜索
            $_search_$() {
                // if(this.$_rq_$[0] !== ''){
                //     var beginDate = this.FormatAllDate(this.$_rq_$[0])
                //     var endDate = this.FormatAllDate(this.$_rq_$[1])
                //     this.$_querycfg_$.params.beginTime = beginDate;
                //     this.$_querycfg_$.params.endTime = endDate;
                // }else{}


                this.$_querycfg_$.params.beginTime = this.$_rq_$[0];
                this.$_querycfg_$.params.endTime = this.$_rq_$[1];



                if(this.$_orderNum_$ !== ''){
                    this.$_querycfg_$.params.recordTitle = this.$_orderNum_$;
                }else{}
                if(this.$_selected_$ !== '全部'){
                    this.$_querycfg_$.params.recordStatus = this.$_selected_$;    
                }else{}   
                if(this.$_selected2_$ !== '全部'){         
                    this.$_querycfg_$.params.recordTypeCode = this.$_selected2_$; 
                }else{}             
                this.$_fquery_$();
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
            // 详情
            $_detail_$(row) {
                this.$root.$_Route_$('user', 'jump', 'gjxq', {row: row})
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    //搜索清零
                    delete this.$_querycfg_$.params.recordTypeCode;
                    delete this.$_querycfg_$.params.recordTitle;
                    delete this.$_querycfg_$.params.recordStatus;
                    delete this.$_querycfg_$.params.beginTime;
                    delete this.$_querycfg_$.params.endTime;
                    if (rsp.data.code === 0) {
                        this.$_total_$ = rsp.data.data.total;
                        this.$_recordInfo_$ = rsp.data.data.records;
                    }
                }
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.current=e;
                // this.$_querycfg_$.params.current = this.$_pageSize_$ * e - this.$_pageSize_$;
                // this.$_querycfg_$.params.size = this.$_pageSize_$;
                this.$_fquery_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_pageSize_$ = e;
                // this.$_querycfg_$.params.current = 0;
                this.$_querycfg_$.params.size = this.$_pageSize_$;
                this.$_fquery_$();
            }
        },
        mounted() {
            this.$_fquery_$();
        }
    }
</script>