<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .message {
        font-size: 20px;
        color: #666;
        font-weight: 500;
        box-sizing: border-box;
        padding: 0 30px;
    }

    .style1 {
        font-size: 12px;
        line-height: 42px;
    }

    .style2 {
        font-size: 18px;
        color: #ff9900;
        margin: 0 10px;
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

    .ivu-row {
        line-height: 45px;
    }

    .message a {
        font-size: 12px;
        color: rgb(0, 51, 204);
        margin-right: 50px;
        text-decoration: underline;
    }
</style>
<template>
    <div>
        <div class="style3">
            <Row>
                <p>订单信息</p>
                <p>
                    <span>流水号：{{$_data1_$[0].seqNo}}</span>
                    <span style="margin-left:30px">创建时间：{{$_data1_$[0].createTime}}</span>
                </p>
                <p>用户信息</p>
                <p>
                    <span>{{$_data1_$[0].recvNames}}</span>
                </p>
                <p>发放事由</p>
                <p>
                    <span>{{$_data1_$[0].grantReason}}</span>
                </p>
            </Row>
            <Table :columns="$_columns1_$" :data="$_data1_$"></Table>
            <Row>
                <p style="float: left">操作人</p>
                <p style="float: right">合计发放：{{$_data1_$[0].grantCount * $_data1_$[0].recvCount}}</p>

                <p style="clear: both">
                    <span>操作人：{{$_data1_$[0].granterName}}</span>
                    <span style="margin-left: 30px">操作时间：{{$_data1_$[0].grantTime}}</span>
                </p>

            </Row>
        </div>
        <div align="center">
            <Button type="primary" @click="onBack()">返回</Button>
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
                    mod: "module",
                    params: {
                        cmd: 4
                    }
                },

                $_columns1_$: [
                    {
                        title: "积分发放原因",
                        key: "grantReason",
                    },
                    {
                        title: "每人发放",
                        key: "grantCount",
                    },
                    {
                        title: "发放人数",
                        key: "recvCount"
                    },
                    {
                        title: "合计",
                        key: "status",
                        render: (h, params) => {
                            let a = params.row.grantCount * params.row.recvCount;
                            return h("span", {}, a);
                        }
                    }
                ],
                $_data1_$: [],
                info: ""
            };
        },
        created() {
            this.$_xiangqing_$();
        },
        methods: {
            onBack() {
                this.$root.$_Route_$("user", "zcManage", "jfmanage");
            },

            $_xiangqing_$() {
                this.info = this.$root.inparams.id;
                this.$_data1_$.push(this.info);
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                        this.list = rsp.data.obj;
                    }
                }
            }
        }
    };
</script>