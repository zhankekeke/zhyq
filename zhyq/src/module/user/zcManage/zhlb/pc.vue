<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .lt {
        float: left;
        width: 40%;
    }

    .rt {
        float: left;
        width: 60%;
    }

    .information {
        color: #000;
        box-sizing: border-box;
        padding: 15px 60px;
        overflow: hidden;
        font-size: 16px;
        font-weight: 400;
    }

    .information .title {
        font-size: 18px;
        padding-bottom: 10px;
    }

    .information .weight {
        font-size: 28px;
    }

    .wrap {
        box-sizing: border-box;
        padding: 30px;
        padding-top: 0px;
    }

    .account {
        background: #f7f7f7;
        box-sizing: border-box;
        padding: 20px 10px;
        font-size: 12px;
    }

    .account button {
        margin-left: 50px;
    }

    .list {
        overflow: hidden;
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 32px;
        padding-bottom: 20px;
    }

    .list .title {
        font-size: 16px;
        color: #333;
        margin: 30px 0 0px 0;
    }

    .list button {
        float: right;
        margin-right: 60px;
    }

    .lm {
        color: blue;
        font-size: 30px;
    }

    .information div {
        overflow: hidden;
    }

    .lt {
        float: left;
        width: 30%;
        line-height: 1;
    }

    .lt p {
        font-size: 14px;
        color: #333333;
        margin-top: 27px;
    }

    .page {
        text-align: right;
        margin-top: 50px;
    }

    .fontgray {
        color: #787878;
    }

    .fontred {
        color: #fe5454;
    }

    .fontblue {
        color: #3399ff;
    }

    .wrap {
        box-sizing: border-box;
        padding: 30px;
    }

    .account {
        background: #f7f7f7;
        box-sizing: border-box;
        padding: 20px 10px;
        font-size: 12px;
    }

    .account span {
        margin-right: 30px;
    }

    .list {
        overflow: hidden;
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 32px;
        padding-bottom: 20px;
    }

    .list .title {
        font-size: 16px;
        color: #333;
        margin: 30px 0 0px 0;
    }

    .list button {
        float: right;
        margin-right: 60px;
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

    .icon {
        width: 3%;
        float: left;
        margin-top: 27px;
        margin-right: 3px;
    }

    .icon img {
        width: 15px;
        float: right;
    }
</style>
<template>
    <div class="container">
        <!-- 基本信息 -->
        <div class="information">

            <p>账户信息</p>

            <div class="lt">
                <p>账户名称：
                    <span class="fontgray">{{$_topdata1_$.accountName}}</span>
                </p>
                <p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：
                    <span class="fontgray" v-if="$_topdata1_$.accountType == 2">园区</span>
                    <span class="fontgray" v-else></span>
                </p>
                <p>积分总存量：
                    <span class="fontgray">{{$_topdata1_$.credits}}</span>
                </p>
            </div>
            <div class="icon">
                <img src="/static/zone/xnzc_add.jpg"/>
            </div>
            <div class="lt">
                <p>
                    <span class="fontblue">积分新增量：{{$_topdata2_$.creditsIncr}}</span>
                </p>
                <p>园区发放：
                    <span class="fontblue">{{$_topdata2_$.creditsGrant}}</span>
                </p>
                <p>充值奖励：
                    <span class="fontblue">{{$_topdata2_$.rechargeAward}}</span>
                </p>
                <p>消费奖励：
                    <span class="fontblue">{{$_topdata2_$.consumeAward}}</span>
                </p>
            </div>
            <div class="icon">
                <img src="/static/zone/xnzc_subtract.jpg"/>
            </div>
            <div class="lt">
                <p>
                    <span class="fontred">积分消耗量：{{$_topdata2_$.creditsDecr}}</span>
                </p>
                <p>积分商场：
                    <span class="fontred">{{$_topdata2_$.consume}}</span>
                </p>
                <p> 业务通道：
                    <span class="fontred">{{$_topdata2_$.transfer}}</span>
                </p>
            </div>

        </div>

        <div class="wrap">

            <div class="search">
                <span>账户名称：</span>
                <Input v-model="name" style="width: 210px" placeholder="请输入账户名称"></Input>

                <span class="ml28">联系方式：</span>
                <Input v-model="phoneNumber" style="width: 210px" placeholder="请输入联系方式"></Input>
                <Button class="ml28" type="primary" @click="search()">搜索</Button>

            </div>

            <!--<Row>-->
            <!--<Col span="7">账户名称：-->
            <!--<Input v-model="name" style="width: 210px;margin-right: 2%" placeholder="请输入账户名称"></Input>-->
            <!--</Col>-->
            <!--<Col span="7">联系方式：-->
            <!--<Input v-model="phoneNumber" style="width: 210px;margin-right: 2%" placeholder="请输入联系方式"></Input>-->
            <!--</Col>-->
            <!--<Col span="4">-->
            <!--<Button type="primary" @click="search()">搜索</Button>-->
            <!--</Col>-->
            <!--</Row>-->
            <!--<br>-->
            <!--<br>-->
            <div>
                <Table :columns="$_columns1_$" :data="$_data1_$"></Table>
            </div>
            <div class="mt40">
                <span style="float: left;">共{{$_num_$}}条数据</span>
                <Page
                        align="right"
                        style="float: right"
                        :total="$_num_$"
                        show-elevator
                        :page-size="$_pageSize_$"
                        @on-page-size-change="$_pageNum_$"
                        @on-change="$_changePage_$"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },

                $_accountList_$: [
                    {
                        label: "个人",
                        value: "personal"
                    },
                    {
                        label: "企业",
                        value: "company"
                    }
                ],
                $_val_$: "个人",
                name: "", // 账户名称
                phoneNumber: "", // 联系方式
                $_num_$: 0, // 数据总数
                $_totalSize_$: "", //数据总数
                $_stratRow_$: 0, //起始条数
                $_total_$: 0, //总条数
                $_pageSize_$: 10, //每页显示
                pageNum: 1,
                $_columns1_$: [
                    // 表头
                    {
                        title: '序号',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.pageNum - 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: "账户名称",
                        key: "accountName"
                    },
                    {
                        title: "联系方式",
                        key: "phoneNumber"
                    },
                    {
                        title: "账户类型",
                        key: "accountType",
                        render: (h, params) => {
                            var a;
                            if (params.row.accountType == 0) {
                                a = "企业";
                            }
                            if (params.row.accountType == 1) {
                                a = "个人";
                            }
                            if (params.row.accountType == 2) {
                                a = "园区";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "所属公司",
                        key: "enterpriseName"
                    },
                    {
                        title: "积分余额",
                        key: "credits"
                    },
                    {
                        title: "一卡通余额/元",
                        key: "balance"
                    },
                    {
                        title: "创建时间",
                        key: "createTime"
                    },
                    {
                        title: "操作",
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
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.detail(params.row); //详情
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ]);
                        }
                    }
                ],
                $_data1_$: [],//table 数据
                $_topdata1_$: {},
                $_topdata2_$: {}

            };
        },
        created() {
            this.$_list_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            // 列表
            $_list_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.params.zoneId = userInfo.zoneId;
                this.$_querycfg_$.mod = "operate/account/page";
                this.$_fquery_$(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data1_$ = rsp.data.data.records;
                            this.$_num_$ = Number(rsp.data.data.total);
                            this.pageNum = rsp.data.data.current
                        }
                    }
                    delete this.$_querycfg_$.params.accountName;
                    delete this.$_querycfg_$.params.phoneNumber;
                });
                //积分账户
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/account/accountInfo`,
                    data: {
                        enterpriseId: userInfo.zoneId,
                        accountType: 2
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_topdata1_$ = rsp.data.data;
                            this.$_sendQuery_$({
                                method: "GET",
                                url: `${this.$_global_$.serverPath}/operate/account/creditsStatistics?accountId=` + rsp.data.data.id,
                            }).then(rsp => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$_topdata2_$ = rsp.data.data;
                                    }
                                }
                            });
                        }
                    }
                });
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_list_$();
            },


            // 搜索
            search() {
                if (this.name) {
                    this.$_querycfg_$.params.accountName = this.name;
                }
                if (this.phoneNumber) {
                    this.$_querycfg_$.params.phoneNumber = this.phoneNumber;
                }
                this.$_list_$();
            },
            // 详情
            detail(row) {
                this.$root.$_Route_$("user", "jump", "zhlbxq", {row: row});
            }
        }
    };
</script>