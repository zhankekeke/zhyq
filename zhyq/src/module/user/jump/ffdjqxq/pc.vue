<style scoped>
    .container {
        font-size: 15px;
        color: rgb(101, 101, 101);
        font-weight: 500;
        line-height: 50px;
    }

    .container span {
        margin: 0 30px 0 10px;
    }

    .textRight {
        text-align: right;
    }

    .bigstyle {
        font-size: 18px;
        color: #333333;
    }

    .fontWeight {
        font-weight: normal;
        font-size: 14px;
    }

    .box {
        box-sizing: border-box;
        padding: 0 30px;
    }
    .ivu-row {
        line-height: 45px;
    }

    .style3 {
        font-size: 16px;
        color: #000;
        font-weight: 400;
    }

    .style3 span {
        color: #787878;
        font-size: 14px;
    }

</style>
<template>
    <div>
        <div class="style3">
            <Row>
                <p>订单信息</p>
                <p>
                    <span>流水号：{{$_data_$[0].seqno}}</span>
                    <span style="margin-left:30px">创建时间：{{$_data_$[0].grantTimeStr}}</span>
                </p>
                <p>用户信息</p>
                <p>
                    <span>{{$_data_$[0].recvNames}}</span>
                </p>
                <p>发放事由</p>
                <p>
                    <span>{{$_data_$[0].reasons}}</span>
                </p>
            </Row>
            <Table :columns="$_columns_$" :data="$_data_$"></Table>
            <Row>
                <p style="float: left">操作人</p>
                <p style="float: right">金额合计：{{$_data_$[0].sum}}元</p>

                <p style="clear: both">
                    <span>操作人：{{$_data_$[0].granterName}}</span>
                    <span style="margin-left: 30px">操作时间：{{$_data_$[0].createTime}}</span>
                </p>

            </Row>


            <!--<Row class="box"><strong>订单信息：</strong></Row>-->
            <!--<Row class="box"><strong>流水号：</strong>-->
            <!--<span>{{$_data_$[0].seqno}}</span> <strong>创建时间：</strong>-->
            <!--<span class="fontWeight">{{$_data_$[0].grantTimeStr}}</span>-->
            <!--</Row>-->
            <!--<Row class="box"><strong>用户信息：</strong>-->
            <!--<span class="fontWeight" style="width: 500px;">{{$_data_$[0].recvNames}}</span>-->
            <!--</Row>-->
            <!--<Row class="box"><strong>发放是由：</strong>-->
            <!--<span class="fontWeight">{{$_data_$[0].reasons}}</span>-->
            <!--</Row>-->
            <!--<Row class="table">-->
            <!--<Table :columns="$_columns_$" :data="$_data_$"></Table>-->
            <!--</Row>-->
            <!--<Row class="textRight box"><strong>金额合计：</strong>-->
            <!--<span class="bigstyle">{{$_data_$[0].sum}}</span>元-->
            <!--</Row>-->
            <!--<Row class="box"><strong>操作人：</strong>-->
            <!--<span>{{$_data_$[0].granterName}}</span><strong>操作时间：</strong>-->
            <!--<span class="fontWeight">{{$_data_$[0].createTime}}</span>-->
            <!--</Row>-->
            <!--<div align="center">-->
            <!--<Button type="primary" @click="onBack()">返回</Button>-->
            <!--</div>-->
        </div>

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

                $_columns_$: [
                    {
                        title: "代金券名称",
                        key: "voucherName"
                    },
                    {
                        title: "类型",
                        key: "useType"
                    },
                    {
                        title: "使用门槛",
                        key: "threshold"
                    },
                    {
                        title: "有效期",
                        key: "validFlag",
                        width: 200
                    },
                    {
                        title: "代金券描述",
                        key: "info"
                    },
                    {
                        title: "面值",
                        key: "denominationSum"
                    },
                    {
                        title: "数量",
                        key: "grantCount"
                    },
                    {
                        title: "金额合计",
                        key: "sum"
                    }
                ],
                $_data_$: [
                    {
                        seqno: '',
                        grantTimeStr: '',
                        recvName: '',
                        reasons: '',
                        sum: '',
                        granterName: '',
                        createTime: ''
                    }
                ],
                info: "",
                data: ""
            };
        },
        created() {
            this.$_xiangqing_$();
            this.$_list_$();
        },
        methods: {
            onBack() {
                this.$root.$_Route_$("user", "jump", "djqffjl");
            },
            //渲染代金券详情列表
            $_list_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/operate/voucher/info?idStr=${this.info.voucherId}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.info.info = res.data.data.info;
                            if (res.data.data.useType == 0) {
                                this.info.useType = '餐厅'
                            } else if (res.data.data.useType == 1) {
                                this.info.useType = '会议室'
                            } else if (res.data.data.useType == 2) {
                                this.info.useType = '停车场'
                            } else if (res.data.data.useType == 3) {
                                this.info.useType = '商城'
                            }
                            if (res.data.data.threshold == 0) {
                                this.info.threshold = '无门槛'
                            } else {
                                this.info.threshold = '满' + res.data.data.quota + '可用'
                            }
                            if (res.data.data.validFlag == 0) {
                                this.info.validFlag = res.data.data.beginDate + "-" + res.data.data.endDate
                            } else {
                                this.info.validFlag = '领取' + res.data.data.validCount + '日之内'
                            }
                            this.$_data_$ = [];
                            this.$_data_$.push(this.info);
                        }
                    }
                });
            },
            $_xiangqing_$() {
                this.info = this.$root.inparams.id;
                //console.log(this.info);
                this.info.sum = this.info.grantCount * this.info.denominationSum;
            }
        }
    };
</script>