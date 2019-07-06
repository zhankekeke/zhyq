<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .top {
        padding: 10px 20px;
        border: 1px solid #ddd;
    }

    .top .tlt {
        margin-bottom: 20px;
        font-weight: normal;
        font-size: 16px;
    }

    .top .gr {
        padding: 10px 0 0 10px;
    }

    .top p, .top li {
        line-height: 30px;
    }

    .top .bold {
        font-size: 30px;
        margin: 0 3px;
    }

    .top .staff {
        width: 100%;
    }

    .screen {
        padding: 20px;
        margin: 20px 0;
    }

    .table .data {
        line-height: 30px;
    }

    .page {
        margin-top: 20px;
        text-align: right;
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
    <div class="sz">
        <div class="search">
            <span>会议室名称：</span>
            <Input v-model="$_name_$" placeholder="请输入会议室名称" style="width:180px"/>
            <span class="ml28">状态：</span>
            <Select v-model="formInline.ztai" style="width:180px">
                <Option v-for="item in formInline.type"
                        :value="item.status"
                        :key="item.status"
                >{{ item.value }}
                </Option>
            </Select>
            <span class="ml28">预约日期：</span>
            <DatePicker @on-change="$_dateRange_$" type="daterange" placeholder="请选择日期"
                        style="width: 180px"></DatePicker>
            <Button class="ml28" type="primary" @click="$_search_$()">搜索</Button>

            <!--<Row>-->
            <!--<Col span="6">-->
            <!--<p>会议室名称：-->
            <!--</p>-->
            <!--</Col>-->
            <!--<Col span="6">-->
            <!--<p>状态：-->
            <!---->
            <!--</p>-->
            <!--</Col>-->
            <!--<Col span="6">-->
            <!--<p>-->
            <!--<span>预约日期：-->
            <!--</span>-->
            <!--</p>-->

            <!--</Col>-->
            <!--<Col span="5">-->
            <!--<p>-->
            <!--</p>-->
            <!--</Col>-->
            <!--</Row>&lt;!&ndash;  &ndash;&gt;-->
            <!-- 头部结束 -->
        </div>
        <div class="table">
            <Table :columns="$_columns_$" :data="$_data_$"></Table>
        </div>
        <!-- 表单结束 -->
        <br>
        <div class="page">
            <span style="float: left;">共{{$_strip_$}}条数据</span>
            <Page :total="$_strip_$" align="right"
                  show-elevator show-sizer
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"></Page>
        </div>
        <!-- 分页结束 -->
        <!-- 模态框 -->
        <Modal v-model="$_modal12_$" draggable scrollable title="提示">
            <div>是否取消</div>
        </Modal>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_modal12_$: false,
            $_name_$: '',
            $_time_$: '',
            cityList: [
                {label: "未开始", value: 1},
                {label: "取消", value: 2},
                {label: "退订", value: 3},
                {label: "过期", value: 4},
                {label: "进行中", value: 5}
            ],
            searchdata: {},
            //搜索数据
            formInline: {
                ztai: "",
                type: [
                    {
                        value: "全部",
                        status: 0
                    },
                    {
                        value: "未开始",
                        status: 1
                    },
                    {
                        value: "进行中",
                        status: 5
                    },
                    {
                        value: "取消",
                        status: 2
                    },
                    {
                        value: "退订",
                        status: 3
                    },
                    {
                        value: "过期",
                        status: 4
                    }
                ]
            },
            $_strip_$: 0,
            $_classification_$: '',
            userInfo: {},
            $_columns_$: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                },
                {
                    title: '会议室名称',
                    key: 'meetingRoomName',
                    align: 'center',
                },
                {
                    title: '会议主题',
                    key: 'meetingTheme',
                    align: 'center',
                },
                {
                    title: '会议地址',
                    key: 'address',
                    align: 'center',
                },
                {
                    title: '参会人数',
                    key: 'attendCount',
                    align: 'center',
                    width: 100,
                },
                {
                    title: '预约日期',
                    key: 'reserveDate',
                    align: 'center',
                },
                {
                    title: '预约时间',
                    key: 'startTime',
                    align: 'center',
                    render: (h, params) => {
                        var text = '';
                        text = `${params.row.startTime}--${params.row.endTime}`;
                        return h(
                            "span",
                            {},
                            text
                        );
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    width: 160,
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                    width: 80,
                    render: (h, params) => {
                        var a;
                        if (params.row.status == 1) {
                            a = "未开始";
                        }
                        if (params.row.status == 2) {
                            a = "取消";
                        }
                        if (params.row.status == 3) {
                            a = "退订";
                        }
                        if (params.row.status == 4) {
                            a = "过期";
                        }
                        if (params.row.status == 5) {
                            a = "进行中";
                        }
                        return h("span", {}, a);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: "#059BFA"
                                },
                                on: {
                                    click: () => {
                                        this.$_toDetails_$(params.row)
                                    }
                                }
                            }, '详情')
                        ]);
                    }
                }
            ],
            $_data_$: [],
            $_querycfg_$: {
                mod: "",
                params: {}
            }
        }
    },
    methods: {
        // 列表
        $_list_$() {

            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/meeting/reserves`,
                data: this.searchdata,
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$_data_$ = rsp.data.data.records
                        this.$_strip_$ = rsp.data.data.total
                    }
                }
            })

        },
        $_dateRange_$(e) {
            this.$_time_$ = [];
            if (e.length > 0 && e[0] !== "") {
                this.$_time_$=e
                // this.$_time_$ = [e[0] + ' 00:00:00', e[1] + ' 23:59:59'];
            }
        },
        //订单搜索
        $_search_$() {
            this.searchdata.startTime = this.$_time_$[0];
            this.searchdata.endTime = this.$_time_$[1];
            if (this.$_name_$) {
                // this.$_querycfg_$.params.meetingRoomName = this.$_name_$
                this.searchdata.meetingRoomName = this.$_name_$;
            } else {
                //清除搜索项
                delete this.searchdata.meetingRoomName;
            }
            if (this.formInline.ztai && this.formInline.ztai != 0) {
                this.searchdata.status = this.formInline.ztai;
            } else {
                delete this.searchdata.status;
            }
            this.$_list_$()
        },
        //数据下一页
        $_changePage_$(e) {
            // this.$_querycfg_$.params.pageNum = e;
            this.searchdata.pageNum = e;
            this.$_list_$();
        },
//页面显示的数据条数
        $_pageNum_$(e) {
            this.searchdata.pageSize = e;
            this.$_list_$();
        },
        //详情
        $_toDetails_$(row) {
            this.$root.$_Route_$("user", "jump", "hysglxq", {row: row})
        },


    },
    created() {
        this.$_global_$.serverPath
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.userInfo = JSON.parse(cookie);
        //请求接口
        this.searchdata.pageSize = 10;
        this.$_list_$()
    }
}
</script>