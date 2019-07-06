<style scoped>
</style>
<template>
    <div>
        <Row>
            <Col span="24" style="font-weight:bold;">订单信息:</Col>
        </Row>
        <br>
        <Row>
            <Col span="4">序号:{{info.serialNum}}</Col>
            <Col span="4">创建时间：{{info.createTime}}</Col>
        </Row>
        <br>
        <Row>
            <Col span="8">
                <span style="font-weight:bold;">用户信息：</span>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="4">公司：{{userInfo.enterpriseName}}</Col>
            <Col span="4">姓名：{{userInfo.name}}</Col>
            <Col span="4">联系方式：{{userInfo.phoneNumber}}</Col>
        </Row>
        <br>
        <Table  :columns="$_columns7_$" :data="data"></Table>
        <br><br>
        <Row v-show="$_show_$">

            <Col span="8">&nbsp;</Col>
            <Col span="8" offset="8">
                <div class="info" style="text-align: center;display:block;">退款信息</div>
                <Table :columns="$_columns8_$" :data="data"></Table>
            </Col>

        </Row>
    </div>

</template>
<script>
    import controler from './controler.js';

    export default {
        mixins: [controler],
        data() {
            return {
                row: {},
                userInfo: {},
                data: [],
                info: {},
                $_columns8_$: [
                    {
                        title: '退款信息',
                        key: 'attendCount',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', '积分:' + params.row.rewardDerate + '    代金券:' + params.row.couponPoint + '元');
                        }

                    },
                    {
                        title: '退款金额',
                        key: 'createTime',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', params.row.meetingUnsubscribe.refundBalance);
                        }

                    },
                    {
                        title: '状态',
                        key: 'createTime',
                        align: 'center',
                        render: (h, params) => {
                            let text = '';
                            if (params.row.meetingUnsubscribe.status == 0) {
                                text = '处理中';
                            } else if (params.row.meetingUnsubscribe.status == 1) {
                                text = '已完成';
                            }
                            return h('div', {}, text);
                        }

                    }
                ],
                $_show_$: false,
                $_columns7_$: [
                    {
                        title: '会议室信息',
                        key: 'address',
                        align: 'center',
                        width: 300,
                        render: (h, params) => {
                            return h("div", [
                                h("img", {
                                    attrs: {
                                        src: this.$_global_$.imgPath + params.row.images[0].imageUrl,
                                        width: "40px",
                                        height: "40px",
                                    }, style: {
                                        marginRight: "5px",
                                        verticalAlign: "bottom"
                                    }
                                }),
                                h("span", {
                                    style: {
                                        marginRight: "5px",
                                        fontSize: "14px",
                                        color: 333,
                                    }
                                }, params.row.meetingRoomName),
                                h("span", {
                                    style: {
                                        marginRight: "5px",
                                        fontSize: "14px",
                                        color: 333,
                                    }
                                }, params.row.address)
                            ])
                        }
                    },
                    {
                        title: '会议主题',
                        key: 'meetingTheme',
                        align: 'center'
                    }, {
                        title: '时间',
                        key: 'startTime',
                        align: 'center',
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h("span", {
                                    style: {
                                        marginRight: "5px",
                                        fontSize: "14px",
                                        color: 333,
                                    }
                                }, params.row.reserveDate),
                                h("span", {
                                    style: {
                                        marginRight: "5px",
                                        fontSize: "14px",
                                        color: 333,
                                    }
                                }, params.row.startTime + '-' + params.row.endTime)
                            ])
                        }
                    }, {
                        title: '参会人数',
                        key: 'attendCount',
                        align: 'center'
                    },
                    {
                        title: '参会人员',
                        key: 'employeeList',
                        align: 'center',
                        render: (h, params) => {

                            return h('div', this.data[params.index].employeeList.map(item => {

                                return h('div', item.name + "、")
                            }))
                        }
                    }, {
                        title: '应付金额',
                        key: 'totalPrice',
                        align: 'center'
                    }, {
                        title: '优惠',
                        key: 'attendCount',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', '积分:' + params.row.rewardDerate + '    代金券:' + params.row.couponPoint + '元');
                        }
                    }, {
                        title: '实付金额',
                        key: 'finalPrice',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            let text = '';
                            if (params.row.status == 4) {
                                text = '已结束';
                            } else if (params.row.status == 1) {
                                text = '已预约';
                            } else if (params.row.status == 2) {
                                this.$_show_$ = true;
                                text = '已取消';
                            } else if (params.row.status == 3) {
                                this.$_show_$ = true;
                                text = '已退订';
                            } else if (params.row.status == 5) {
                                text = '进行中';
                            }
                            return h('div', {}, text);
                        }
                    }


                ],
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_toDetails_$()
            this.getInfo()
        },
        methods: {
            $_toDetails_$() {
                this.row = this.$root.inparams.row
            },
            getInfo() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/meeting/${this.row.meetingId}/reserve/${this.row.id}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.data.push(rsp.data.data)
                            this.info = rsp.data.data
                        }
                    }
                })
            }
        }
    }
</script>