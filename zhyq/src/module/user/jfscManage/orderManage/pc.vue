<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
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

    .title {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
    }

    .remarks p {
        line-height: 24px;
        background: rgb(235, 235, 235);
        padding: 10px;
    }

    .remarks div {
        margin-top: 20px;
    }

    .remarks .bz span {
        float: left;
        padding-right: 10px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search" style="background-color: #f5f5f5;padding-left: 15px;"><span style="font-size: 14px">订单编号：</span>
            <Input v-model="$_orderNumber_$" style="width: 210px;margin-right: 10px" placeholder="请输入订单编号"></Input>&nbsp;&nbsp;
            <span style="font-size: 14px">用户名称：</span>
            <Input v-model="$_commiterName_$" style="width: 210px;margin-right: 10px" placeholder="请输入用户名称"></Input>&nbsp;&nbsp;
            <span style="font-size: 14px">订单状态：</span>
            <Select v-model="$_selected_$" style="width:210px;;margin-right: 10px">
                <Option
                        v-for="item in $_statusList_$"
                        :value="item.value"
                        :key="item.value"
                        slot
                >{{ item.label }}
                </Option>
            </Select>&nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <br>
        <Row>
            <Table ref="selection" :columns="$_orderTable_$" :data="$_orderInfo_$"></Table>
            <!-- 备注modal框 -->
            <Modal
                    v-model="$_bzmodal_$"
                    title="备注"
                    @on-ok="$_bzok_$"
                    @on-cancel="$_bzcancel_$"
                    :mask-closable="false"
                    width="400"
                    :styles="{top: '10px'}"
                    class="szModal1">
                <ul style="height: 220px;overflow-y: scroll">
                    <li v-for="(item,index) in bzdata">
                        <div class="bzxq">
                            <p>（<span v-if="item.remarkRole==0">员工</span>
                                <span v-else-if="item.remarkRole==1">管家</span>
                                <span v-else>园区管理员</span>）
                                <span>{{item.remarkName}}</span>&nbsp;&nbsp;
                                <span v-if="index==0">{{item.entName}}</span>&nbsp;
                                <span>{{FormatAllDate(item.remarkCreateDate)}}</span>
                            </p>
                            <p>留言详情:&nbsp;<span
                                    style="word-wrap:break-word;word-break:break-all;">{{item.remarkInfo}}</span></p>
                        </div>
                    </li>
                </ul>

                <br>
                <div><span class="bz">备注：
                    <br>
                </span>&nbsp;&nbsp;<textarea v-model="bzinfo" name="" id="" style="resize:none;" cols="60"
                                             rows="10"></textarea></div>
            </Modal>

        </Row>
        <br>
        <br>
        <Row>
            <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_total_$}}条数据</span>
            <Page
                    align="right"
                    style="float: right"
                    :total="$_total_$"
                    :page-size="$_pageSize_$"
                    show-elevator
                    show-sizer
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
                row: {},
                bzinfo: '',
                bzdata: {},
                $_bzmodal_$: false,
                $_orderNum_$: "", // 订单编号
                $_userName_$: "", // 用户名称
                $_selected_$: 0, // 默认选中
                $_modal_$: false, //modal显示状态
                $_loading_$: true,
                myParams: "",
                $_orderNumber_$: "", //订单号
                $_commiterName_$: "", //下单人
                $_statusList_$: [
                    // 状态值
                    {
                        value: 0,
                        label: "全部"
                    }, {
                        value: 1,
                        label: "已支付"
                    }, {
                        value: 2,
                        label: "已发货"
                    }, {
                        value: 3,
                        label: "已送达"
                    }, {
                        value: 4,
                        label: "已签收"
                    }
                ],
                $_totalSize_$: "", //数据总数
                $_stratRow_$: 0, //起始条数
                $_total_$: 0, //总条数
                $_pageSize_$: 10, //每页显示
                formValidate: {},
                $_orderTable_$: [
                    //数据表头
                    {
                        title: "订单编号",
                        key: "orderNumber",
                        align: "center",
                    },
                    {
                        title: "商品名称",
                        key: "img",
                        align: "center",
                        render: (h, params) => {
                            return h("span", {}, params.row.orderGoods[0].goodsName)
                        }
                    },
                    {
                        title: "单价",
                        key: "goodsPrices",
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
                        title: "数量",
                        align: "center",
                        render: (h, params) => {
                            return h("div", {}, params.row.orderGoods[0].goodsCount);
                        }
                    },
                    {
                        title: "实付款",
                        align: "center",
                        render: (h, params) => {
                            let b = params.row.orderGoods[0];
                            let c = '';
                            if (b.goodsType == 0) {
                                //普通商品
                                let op=0;
                                if(params.row.orderPrices){
                                    op=params.row.orderPrices;
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
                        title: "用户信息",
                        key: "commiterName",
                        align: "center",
                        render: (h, params) => {
                            return h("div", {}, [
                                h(
                                    "span",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "10px"
                                        }
                                    },
                                    params.row.commiterName
                                ),

                                h(
                                    "span",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "10px"
                                        }
                                    },
                                    params.row.commiterPhone
                                )
                            ]);
                        }
                    },
                    {
                        title: "创建时间",
                        key: "commiteTime",
                        align: "center",
                        sortable: true,
                        render: (h, params) => {
                            let text='';
                            if(params.row.commiteTime && params.row.commiteTime!=''){
                                text=this.FormatAllDate(params.row.commiteTime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "状态",
                        key: "orderState",
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
                        title: "操作",
                        key: "action",
                        align: "center",
                        render: (h, params) => {
                            let color = "#ccc";
                            if (params.row.orderState == 1) {
                                color = "#4798ed";
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
                                            color: color
                                        },
                                        on: {
                                            click: () => {
                                                if (params.row.orderState == 1) {
                                                    this.$_send_$(params.row);
                                                }
                                            }
                                        }
                                    },
                                    "发货"
                                ),
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
                                ),
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
                                                this.$_remarks_$(params.row);
                                            }
                                        }
                                    },
                                    "备注"
                                )
                            ]);
                        }
                    }
                ],
                $_orderInfo_$: [], // 表格数据
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_userInfo_$: '',
                $_zoneId_$: 0,
                ruleValidate: {
                    info: [
                        {required: true, message: '请输入备注信息', trigger: 'blur'},
                        {type: 'string', min: 20, message: '描述不能少于20个字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                }
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_zoneId_$ = this.$_userInfo_$.zoneId
            // this.$_zoneId_$ = '1073870136848662533';

            this.$_list_$();
            this.$_orderInfo_$ = [];
        },
        methods: {
            //订单列表渲染
            $_list_$() {
                this.$_querycfg_$.mod = `operate/order/queryOrderLimit`;
                this.$_querycfg_$.params.zoneId = this.$_zoneId_$;
                this.$_fquery_$(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_orderInfo_$ = [];
                            this.$_orderInfo_$ = rsp.data.data.records;
                            this.$_total_$ = Number(rsp.data.data.total);
                        }
                    }
                });
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.current = e;
                this.$_querycfg_$.params.size = this.$_pageSize_$;
                this.$_list_$();
            },

            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.size = e;
                this.$_list_$();
            },

            // 全选
            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },
            //   搜索
            $_search_$() {
                this.$_querycfg_$.params = {};

                if (this.$_orderNumber_$) {
                    this.$_querycfg_$.params.orderNumber = this.$_orderNumber_$;
                }
                if (this.$_commiterName_$) {
                    this.$_querycfg_$.params.commiterName = this.$_commiterName_$;
                }
                if (this.$_selected_$ != 0) {
                    this.$_querycfg_$.params.orderState = this.$_selected_$;
                }
                this.$_list_$();
            },

            // 发货
            $_send_$(info) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认发货吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/operate/order/orderDelivered`,
                            data: {
                                orderId: info.id + "",
                                deliver: info.orderNumber,
                                deliverName: info.commiterName
                            },
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_list_$();
                                    this.$Message.success(rsp.data.data)
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        });
                    },
                    onCancel: () => {
                    }
                })


            },

            // 详情
            $_detail_$(data) {
                this.$root.$_Route_$("user", "jump", "ddgl", {id: data});
            },
            // 备注
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
                            this.$_bzmodal_$ = true;
                        } else {
                            this.$Message.error('服务器未响应');
                        }
                    }
                })

            },
            $_quit_$(info) {
                this.$_modal_$ = false;
            },
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

            //备注确认
            $_bzok_$() {
                if (this.bzinfo.length > 100) {
                    this.$Message.warning('备注长度不能超过100个字符');
                    return;
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/order/createOrderRemark`,
                    data: {
                        orderId: this.row.id,
                        info: this.bzinfo,
                        name: this.$_userInfo_$.name,
                        role: 2
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
            //备注取消
            $_bzcancel_$() {
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                    }
                }
            }
        },

    };
</script>
