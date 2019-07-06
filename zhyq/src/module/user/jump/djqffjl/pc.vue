<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .title {
        box-sizing: border-box;
        padding: 15px;
        margin-bottom: 20px;
        font-size: 14px;
        color: #000;
        font-weight: bold;
    }

    .search {
        background: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
        font-size: 14px;
    }

    .ml28 {
        margin-left: 28px;
    }

    .mt40 {
        margin-top: 40px;
    }

    .nobg {
        background: none;
        padding: 0px;
    }

    .textrt {
        text-align: right;
        padding-bottom: 20px;

        /*margin-right: 60px;*/
    }
</style>
<template>
    <div>
        <Row class="title">
            <Col span="24">代金券发放记录</Col>
        </Row>


        <div class="search">
            <span>流水号：</span>
            <Input v-model="$_searchData_$.seqno" placeholder="请输入" style="width: 210px"></Input>

            <span class="ml28">日期：</span>
            <DatePicker
                    @on-change="change"
                    split-panels
                    type="datetimerange"
                    style="width:210px"
                    placeholder="请选择日期"
                    format="yyyy-MM-dd"
            >
            </DatePicker>

            <Button class="ml28" type="primary" @click="$_search_$">搜索</Button>

        </div>

        <!--<Row class="search">-->
        <!--<Col span="7">流水号：-->
        <!--<Input v-model="$_searchData_$.seqno" placeholder="请输入" style="width: 210px"></Input>-->
        <!--</Col>-->
        <!--<Col span="7">日期：-->
        <!--<DatePicker-->
        <!--@on-change="change"-->
        <!--split-panels-->
        <!--type="datetimerange"-->
        <!--style="width:210px"-->
        <!--placeholder="请选择日期"-->
        <!--format="yyyy-MM-dd"-->
        <!--&gt;-->
        <!--</DatePicker>-->
        <!--</Col>-->

        <!--<Col span="2" align="right">-->
        <!--<Button type="primary" @click="$_search_$">搜索</Button>-->
        <!--</Col>-->
        <!--</Row>-->

        <Row class="textrt">
            <Button type="primary" @click="$_ffdjq_$">发放代金券</Button>
        </Row>

        <Table :columns="$_columns1_$" :data="$_data1_$" width="auto"></Table>

        <Row class="mt40">
            <span style="float: left;">共{{$_totalSize_$}}条数据</span>
            <Page
                    align="right"
                    style="float: right"
                    :total="$_totalSize_$"
                    :page-size="$_pageSize_$"
                    show-elevator
                    @on-page-size-change="$_pageNum_$"
                    @on-change="$_changePage_$"
            />
        </Row>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import axios from "axios";

    export default {
        mixins: [controler],
        data() {
            return {
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },

                $_List_$: [
                    {
                        value: "all",
                        label: "全部"
                    },
                    {
                        value: "zhijie",
                        label: "直减"
                    },
                    {
                        value: "manjian",
                        label: "满减"
                    }
                ],
                $_columns1_$: [
                    {
                        title: "流水号",
                        key: "seqno",
                        align: "center"
                    },
                    {
                        title: "代金券名称",
                        key: "voucherName",
                        align: "center"
                    },
                    {
                        title: "面值",
                        key: "denominationSum",
                        align: "center"
                    },
                    {
                        title: "发放数量",
                        key: "grantCount",
                        align: "center"
                    },
                    {
                        title: "有效期",
                        key: "grantTimeStr",
                        align: "center"
                    },
                    {
                        title: "发放是由",
                        key: "reasons",
                        align: "center"
                    },
                    {
                        title: "操作人",
                        key: "granterName",
                        align: "center"
                    },
                    {
                        title: "发放时间",
                        key: "grantTimeStr",
                        align: "center"
                    },
                    {
                        title: "操作记录",
                        key: "caozuo",
                        align: "center",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_xiangqing_$(params.row);
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ]);
                        }
                    }
                ],

                $_data1_$: [],
                $_searchData_$: {
                    seqno: ""
                },
                $_totalSize_$: 0, //数据总数
                $_stratRow_$: 0, //起始条数
                $_total_$: 0, //总条数
                $_pageSize_$: 10, //每页显示
                beginDate: "",//起始时间
                endDate: "",
                myParams: "",
                $_rq_$: [],
            };
        },
        created() {
            this.$_querycfg_$.params.pageNum = 1;
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
            this.$_list_$();
        },
        methods: {
            $_fafang_$() {
                this.$root.inparams.id;
            },
            radio(res) {
                //console.log(res)
            },

            //渲染当前列表
            $_list_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.params.zoneId = userInfo.zoneId;
                this.$_querycfg_$.mod = `operate/voucherGrant/page`;
                this.$_fquery_$(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            //console.log(rsp);
                            this.$_data1_$ = [];
                            this.$_data1_$ = rsp.data.data.records;
                            //console.log(this.$_data1_$);
                            this.$_totalSize_$ = rsp.data.data.total * 1;
                        }
                    }
                });
            },
            //change
            change(e) {
                this.$_rq_$ = [];
                if (e.length > 0 && e[0] !== "") {
                    // this.$_time_$ = [e[0] + ' 00:00:00', e[1] + ' 23:59:59'];
                    this.$_rq_$ = e;
                }

            },
            //搜索
            $_search_$() {
                this.$_querycfg_$.params = {};
                this.$_querycfg_$.params.pageNum = 1;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                if (this.$_searchData_$.seqno != "") {

                    this.$_querycfg_$.params.seqno = this.$_searchData_$.seqno

                }
                this.$_querycfg_$.params.beginDate = this.$_rq_$[0]
                this.$_querycfg_$.params.endDate = this.$_rq_$[1]

                //console.log(this.$_querycfg_$.params)
                this.$_list_$();
            },

            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                // this.$_pageSize_$ * e - this.$_pageSize_$;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            },

            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_pageSize_$ = e;
                // this.$_querycfg_$.params.current = 0;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            },

            $_ffdjq_$() {
                this.$root.$_Route_$("user", "jump", "ffdjq", {id: 1}, "");
            },
            // 详情
            $_xiangqing_$(myParams) {
                this.$root.$_Route_$("user", "jump", "ffdjqxq", {id: myParams});
            }
        }
    };
</script>