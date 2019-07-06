<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .stripes-bg {
        background: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
        font-size: 14px;
    }

    .szModal1 .bzxq {
        background: #f7f7f7;
        padding: 10px;
    }

    .szModal1 .bzxq p {
        line-height: 30px;
    }

    .szModal1 .bz {
        float: left;
    }

    .ml28 {
        margin-left: 28px;
    }

    .mt40 {
        margin-top: 40px;
    }
</style>
<template>
    <div class="sz">
        <div class="stripes-bg">
            <span>订单编号：</span>
            <Input v-model="$_order_$" placeholder="请输入订单编号" style="width: 200px"/>
            <span class="ml28">分类：</span>
            <Select v-model="$_classification_$" style="width:200px" placeholder="全部">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="ml28">日期：</span>
            <!-- <DatePicker
                            @on-change="change"
                            format="yyyy-MM-dd"
                            type="daterange"
                            placeholder="请选择日期"
                            style="width: 200px">
                    </DatePicker> -->
            <DatePicker @on-change="$_dateRange_$" type="daterange" format="yyyy-MM-dd" placeholder="请选择日期"
                        style="width: 200px"></DatePicker>
            <Button class="ml28" type="primary" @click="$_search_$">搜索</Button>
        </div>
        <div>
            <Table :columns="$_columns_$" :data="$_data_$"></Table>
            <!-- 送达modal框 -->
            <Modal
                    v-model="$_sdmodal_$"
                    title="提示"
                    @on-ok="$_sdok_$"
                    @on-cancel="$_sdcancel_$"
                    width="300">
                <p>确定已送达给客户?</p>
            </Modal>
            <!-- 备注modal框 -->
            <Modal
                    v-model="$_bzmodal_$"
                    title="备注"
                    @on-ok="$_bzok_$"
                    @on-cancel="$_bzcancel_$"
                    width="400"
                    class="szModal1">
                <ul>
                    <li v-for="(item,index) in bzdata">
                        <div class="bzxq">
                            <p>(<span v-if="item.remarkRole==0">员工</span><span
                                    v-else-if="item.remarkRole==1">管家</span><span v-else>园区管理员</span>)<span>{{item.remarkName}}</span>&nbsp;&nbsp;<span
                                    v-if="index==0">{{item.entName}}</span>&nbsp;<span>{{item.remarkCreateDate}}</span>
                            </p>
                            <p>留言详情:&nbsp;<span
                                    style="word-wrap:break-word;word-break:break-all;">{{item.remarkInfo}}</span></p>
                        </div>
                    </li>
                </ul>

                <br>
                <div><span class="bz">备注</span>&nbsp;&nbsp;<textarea v-model="bzinfo" name="" id="" cols="50"
                                                                     rows="10"></textarea></div>
            </Modal>
        </div>

        <Row class="mt40">
            <div style="float: left">共{{total}}条数据</div>

            <Page align="right" :total="total"
                  show-elevator show-sizer
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_order_$: '',
            userInfo: {},
            total: 0,
            row: {},
            searchdata: {},
            bzdata: {},
            bzinfo: '',
            houseid: '',
            $_classification_$: '全部',
            $_sdmodal_$: false,
            $_bzmodal_$: false,
            $_name_$: "詹咳咳",
            $_company_$: "飞天经纬",
            $_time_$: "2018 8-8 08:08.08",
            cityList: [
                {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '已支付'
                },
                {
                    value: '2',
                    label: '已发货'
                },
                {
                    value: '3',
                    label: '已完成'
                }
            ],
            $_columns_$: [
                {
                    title: '订单编号',
                    key: 'orderNumber',
                    align: "center",
                },
                {
                    title: '商品信息',
                    key: 'goodsName',
                    align: "center",
                    render: (h, params) => {
                        return h("span", {}, params.row.orderGoods[0].goodsName)
                    }
                },
                {
                    title: '单价',
                    key: 'goodsPrices',
                    align: "center",
                    render: (h, params) => {
                        let b = params.row.orderGoods[0];
                        let c = '';
                        if (b.goodsType == 0) {
                            //普通商品
                            c = b.goodsPrices + '元';
                        } else {
                            //积分商品或代金券
                            c = b.goodsCredits + '积分';
                        }
                        return h('span', {}, c)
                    }
                },
                {
                    title: '数量',
                    key: 'goodsCount',
                    align: "center",
                    render: (h, params) => {
                        return h("div", {}, params.row.orderGoods[0].goodsCount);
                    }
                },
                {
                    title: '实付款',
                    key: 'orderPrices',
                    align: "center",
                    render: (h, params) => {
                        let b = params.row.orderGoods[0];
                        let c = '';
                        if (b.goodsType == 0) {
                            //普通商品
                            let op = 0;
                            if (params.row.orderPrices) {
                                op = params.row.orderPrices;
                            }
                            c = op + '元';
                        } else {
                            //积分商品或代金券
                            c = params.row.orderCredits + '积分';
                        }
                        return h('span', {}, c)
                    }
                },
                {
                    title: '用户信息',
                    key: 'commiterName',
                    align: "center",
                    render: (h, params) => {
                        var text = '';
                        text = `${params.row.commiterName} ${params.row.commiterPhone}`;
                        return h("span", {}, text);
                    }
                },
                {
                    title: '创建时间',
                    key: 'commiteTime',
                    align: "center",
                    sortable: true,
                    render: (h, params) => {
                        let d = this.fmtDate(params.row.commiteTime);
                        return h('span', {}, d)
                    }
                },
                {
                    title: '状态',
                    key: 'orderState',
                    align: "center",
                    render: (h, params) => {
                        let d;
                        switch (params.row.orderState) {
                            case 1:
                                d = "已支付";
                                break;
                            case 2:
                                d = "已发货";
                                break;
                            case 3:
                                d = "已送达";
                                break;
                            case 4:
                                d = "已签收";
                                break;
                        }
                        return h('span', {}, d)
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.orderState == 2) {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_service_$(params.row)
                                        }
                                    }
                                }, '送达'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_details_$(params.row)
                                        }
                                    }
                                }, '详情'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_remarks_$(params.row)
                                        }
                                    }
                                }, '备注')
                            ]);
                        } else {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_details_$(params.row)
                                        }
                                    }
                                }, '详情'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_remarks_$(params.row)
                                        }
                                    }
                                }, '备注')
                            ]);
                        }

                    }
                }
            ],
            $_data_$: []

        }
    },
    created() {
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.userInfo = JSON.parse(cookie);
        this.searchdata.zoneId = this.userInfo.zoneId;
        this.searchdata.size = 10;
        this.house();
        // this.orderlist();
    },
    methods: {
        //分页
        $_changePage_$(e) {
            this.searchdata.current = e;
            this.orderlist()
        },
        //页面显示的数据条数
        $_pageNum_$(e) {
            this.searchdata.size = e;
            this.orderlist()
        },
        //获取管家id
        house() {
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/steward/steward/queryStewardDetails`,
                data: {
                    refEmployee: this.userInfo.id
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.houseid = rsp.data.data.id;
                        this.searchdata.stewardId = this.houseid;
                        this.orderlist();
                    }
                }
            })
        },
        //订单列表
        orderlist() {
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/operate/order/queryOrderListByStewardId`,
                data: this.searchdata,
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        var res = rsp.data.data.records;
                        this.$_data_$ = res;
                        this.total = Number(rsp.data.data.total);
                    }
                }
            })
        },
        $_dateRange_$(e) {
            this.searchdata.beginTime = e[0];
            this.searchdata.endTime = e[1];
        },
        //搜索
        $_search_$() {
            if (this.$_order_$) {
                this.searchdata.orderNumber = this.$_order_$;
            } else {
                delete this.searchdata.orderNumber;
            }
            if (this.$_classification_$ != '全部') {
                this.searchdata.orderState = this.$_classification_$;
            } else {
                delete this.searchdata.orderState;
            }
            this.orderlist();
        },
        //送达
        $_service_$(data) {
            this.row = data;
            this.$_sdmodal_$ = true;
        },
        //订单信息
        $_details_$(data) {
            this.$root.$_Route_$('employer', 'jump', 'ddxx', {id: data, type: 'fwsl'})
        },
        //备注
        $_remarks_$(data) {
            this.bzinfo = '';
            this.row = data;
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/operate/order/queryOrderDetailsById`,
                data: {
                    orderId: data.id
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.bzdata = rsp.data.data.orderRemark;
                        this.bzdata[0].entName = rsp.data.data.entName;
                    }
                }
            })
            this.$_bzmodal_$ = true;
        },
        //送达确认
        $_sdok_$() {
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/operate/order/orderComplete`,
                data: {
                    orderId: this.row.id,
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.row.orderState = 3;
                        this.$Message.success('确定送达');
                    } else {
                        this.$Message.error('服务器未响应');
                    }
                }
            })
        },
        //送到取消
        $_sdcancel_$() {
        },
        //备注确认
        $_bzok_$() {
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/operate/order/createOrderRemark`,
                data: {
                    orderId: this.row.id,
                    info: this.bzinfo,
                    name: this.userInfo.name,
                    role: 1
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$Message.success('备注成功');
                    } else {
                        this.$Message.error('服务器未响应');
                    }
                }
            })
        },
        fmtDate(obj) {
            var date = new Date(obj);
            var y = 1900 + date.getYear();
            var m = "0" + (date.getMonth() + 1);
            var d = "0" + date.getDate();
            return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
        },
        //备注取消
        $_bzcancel_$() {
        },
    }
}
</script>