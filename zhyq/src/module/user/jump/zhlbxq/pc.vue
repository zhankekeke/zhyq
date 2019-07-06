<style scoped>
    .container {
        font-size: 14px;
        color: #333;
    }

    .top {
        min-height: 80px;
        line-height: 40px;
    }

    .ss {
        font-size: 12px;
        min-height: 80px;
        margin-top: 20px;
    }

    .top input {
        margin: 20px 0;
    }

    .margin {
        margin: 10px 0;
        box-sizing: border-box;
        padding: 0px 20px;
        line-height: 80px;
    }

    .f12 {
        font-size: 12px;
        line-height: 42px;
    }

    .center {
        text-align: center;
    }

    .mes {
        font-size: 16px;
        box-sizing: border-box;
        padding: 10px 20px;
        line-height: 40px;
        margin-bottom: 30px;
    }

    .mes a {
        font-size: 12px;
        color: #0033cc;
        line-height: 18px;
        text-decoration: underline;
    }

    .big {
        font-size: 20px;
        color: #666;
        font-weight: 500;
    }

    .color1 {
        color: #ff9900;
        font-weight: 500;
    }

    .three a {
        margin-left: 20px;
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
</style>
<template>
    <div class="container">
        <Row class="top mes" v-model="$_Mes_$">
            <Row><strong>账户信息</strong></Row>
            <Row style="font-size:14px;">
                <Col span="6">账户名称：{{$_Mes_$.accountName}}</Col>
                <Col span="6">账户编号：{{$_Mes_$.id}}</Col>
                <Col span="6">账户类型：{{$_Mes_$.accountType | formatType}}</Col>
            </Row>
            <Row style="font-size:14px;">
                <Col span="6">
                    余额账户：
                    <span>{{$_Mes_$.balance}}</span>元
                    <!-- <a href="javascript:void(0)" @click="$_chongzhi_$">充值</a> -->
                </Col>
                <Col span="6">
                    积分账户：
                    <span class="color1">{{$_Mes_$.credits}}</span>积分
                    <!-- <a href="javascript:void(0)" @click="$_jfzzBtn_$">积分转赠</a> -->
                </Col>
                <!--<Col span="6">-->
                <!--优惠券：-->
                <!--<span class="color1">{{$_Mes_$.credits}}</span>积分-->
                <!--</Col>-->
            </Row>
            <Row>
                <Col span="6">
                    <Button v-if="isShowQB" shape="circle" type="primary" @click="$_xfTypeFun_$('cash')">钱包账单</Button>
                    <Button v-else shape="circle" type="ghost" @click="$_xfTypeFun_$('cash')">钱包账单</Button>
                </Col>
                <Col span="6">
                    <Button v-if="isShowJF" shape="circle" type="primary" @click="$_xfTypeFun_$('credit')">积分账单</Button>
                    <Button v-else shape="circle" type="ghost" @click="$_xfTypeFun_$('credit')">积分账单</Button>
                </Col>
            </Row>
        </Row>


        <div class="search">
            <span>流水号：</span>
            <Input v-model="$_lsh_$" type="text" style="width:210px" placeholder="请输入流水号"/>

            <span class="ml28">日期：</span>
            <DatePicker
                    @on-change="change"
                    format="yyyy-MM-dd"
                    type="daterange"
                    placeholder="请选择日期"
                    style="width: 210px">
            </DatePicker>
            <Button class="ml28" type="primary" @click="search()">搜索</Button>

        </div>

        <!--<Row class="ss" type="flex" align="middle">-->
        <!--<Col span="7" offset="1">流水号：-->
        <!--<Input v-model="$_lsh_$" type="text" style="width:210px" placeholder="请输入流水号"/>-->
        <!--</Col>-->
        <!--<Col span="9">日期：-->
        <!--<DatePicker-->
        <!--@on-change="change"-->
        <!--format="yyyy-MM-dd"-->
        <!--type="daterange"-->
        <!--placeholder="请选择日期"-->
        <!--style="width: 210px">-->
        <!--</DatePicker>-->
        <!--<Button style="margin-left:20px;" type="primary" @click="search()">搜索</Button>-->
        <!--</Col>-->
        <!--</Row>-->
        <Row class>
            <Table :columns="$_xfType_$ == 'cash'?$_columns_$:$_columns2_$" :data="$_data_$"></Table>
        </Row>
        <Row class="mt40">
            <!-- <Page v-if="this.type == 1" :total="$_num_$"  show-elevator show-sizer></Page> -->
            <span style="float: left;">共{{$_num_$}}条数据</span>
            <Page
                    :total="$_num_$"
                    show-elevator
                    show-sizer
                    align="right"
                    style="float: right"
                    :page-size="$_pageSize_$"
                    @on-page-size-change="$_pageNum_$"
                    @on-change="$_changePage_$"/>
        </Row>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import axios from "axios";

    export default {
        mixins: [controler],
        filters: {
            formatType: function (val) {
                if (val == 0) {
                    return "企业";
                }
                if (val == 1) {
                    return "个人";
                }
                if (val == 2) {
                    return "园区";
                }
            }
        },
        data() {
            return {
                isShowQB: true,
                isShowJF: false,
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_pageSize_$: 10,
                $_num_$: 0,
                type: 0,
                $_columns_$: [
                    // 表头
                    {
                        title: "流水号",
                        key: "code"
                    },
                    {
                        title: "消费项",
                        key: "consumeItem"
                    },
                    {
                        title: "金额",
                        key: "consumeSum",
                        render: (h, params) => {
                            var a;
                            if (params.row.bizType == 0) {
                                a = "-" + params.row.consumeSum
                            }
                            if (params.row.bizType == 1) {
                                a = "-" + params.row.consumeSum
                            }
                            if (params.row.bizType == 2) {
                                a = "-" + params.row.consumeSum
                            }
                            if (params.row.bizType == 3) {
                                a = "+" + params.row.consumeSum
                            }
                            if (params.row.bizType == 4) {
                                a = "+" + params.row.consumeSum
                            }
                            if (params.row.bizType == 5) {
                                a = "+" + params.row.consumeSum
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "时间",
                        key: "opTimeStr"
                    }
                ],
                $_columns2_$: [
                    // 表头
                    {
                        title: "流水号",
                        key: "code"
                    },
                    {
                        title: "消费项",
                        key: "consumeItem"
                    },
                    {
                        title: "积分值",
                        key: "credits",
                        render: (h, params) => {
                            var a;
                            if (params.row.opType == 0) {
                                a = "+" + params.row.credits
                            }
                            if (params.row.opType == 1) {
                                a = "-" + params.row.credits
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "时间",
                        key: "opTimeStr"
                    }
                ],
                $_data_$: [], // 表格数据
                $_searchMes_$: "",
                $_endTime_$: "",
                $_beginTime_$: "",
                $_Mes_$: {},
                row: {},
                $_xfType_$: "cash",
                $_lsh_$: ''
            };
        },
        created() {
            this.detail();
            this.info();
            this.list(this.$_xfType_$);
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            //切换类型
            $_xfTypeFun_$(type) {
                if (type == "cash") {
                    this.isShowQB = true
                    this.isShowJF = false
                    this.$_xfType_$ = "cash";
                    this.list(this.$_xfType_$);
                }
                if (type == "credit") {
                    this.isShowQB = false
                    this.isShowJF = true
                    this.$_xfType_$ = "credit";
                    this.list(this.$_xfType_$);
                }
            },
            // 详情
            detail() {
                this.row = this.$root.inparams.row;
            },
            // 获取账户信息
            info() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/account/accountInfo`,
                    data: {
                        refId: this.row.refId,
                        enterpriseId: this.row.enterpriseId,
                        accountType: this.row.accountType
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_Mes_$ = rsp.data.data;
                        } else {
                        }
                    }
                });
            },
            // 获取列表数据
            list(type) {
                if (type == "cash") {
                    this.type = 0;
                    this.$_querycfg_$.mod = "operate/balanceRecord/page";
                    this.$_querycfg_$.params.accountId = this.row.id;
                    this.$_fquery_$(rsp => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_data_$ = rsp.data.data.records;
                                this.$_num_$ = Number(rsp.data.data.total);
                            }
                        }
                    });
                }
                if (type == "credit") {
                    this.type = 1;
                    this.$_querycfg_$.mod = "operate/creditsRecord/page";
                    this.$_querycfg_$.params.accountId = this.row.id;
                    this.$_fquery_$(rsp => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_data_$ = rsp.data.data.records;
                                this.$_num_$ = Number(rsp.data.data.total);
                            }
                        }
                    });
                }
            },
            $_jfzzBtn_$() {
                this.$root.$_Route_$("company", "qyqb", "jfzz", {id: 1}, "");
            },
            $_chongzhi_$() {
                this.$root.$_Route_$("company", "jump", "zhcz", {id: 1}, "");
            },

            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                if (this.type == 0) {
                    this.list("cash");
                } else {
                    this.list("credit");
                }
            },

            change(res) {
                this.$_beginTime_$ = res[0];
                this.$_endTime_$ = res[1];
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                if (this.type == 0) {
                    this.list("cash");
                } else {
                    this.list("credit");
                }
            },
            // 搜索
            search() {
                //清理历史搜索条件
                if (this.$_querycfg_$.params.code || this.$_querycfg_$.params.beginDate || this.$_querycfg_$.params.endDate) {
                    delete this.$_querycfg_$.params.code;
                    delete this.$_querycfg_$.params.beginDate;
                    delete this.$_querycfg_$.params.endDate;
                }
                if (this.$_lsh_$) {
                    this.$_querycfg_$.params.code = this.$_lsh_$;
                }
                if (this.$_endTime_$) {
                    this.$_querycfg_$.params.beginDate = this.$_beginTime_$;
                    this.$_querycfg_$.params.endDate = this.$_endTime_$;
                }
                this.list(this.$_xfType_$);
            }
        }
    };
</script>