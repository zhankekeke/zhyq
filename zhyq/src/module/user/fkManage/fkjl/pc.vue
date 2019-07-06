<style scoped>
    .interview {
        font-size: 14px;
    }

    .manage {
        padding-bottom: 45px;
        font-size: 12px;
        color: #000;
    }

    .export {
        margin-bottom: 10px;

    }

    .export button:first-child {
        float: left;
    }

    .export button:nth-child(2) {
        float: right;
    }

    .mt9 {
        margin-top: 4px;
        margin-bottom: 10px;
    }

    .mt10 {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
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
    <div class="interview">
        <div class="search">
            <span>访客姓名：</span>
            <Input v-model.trim="$_searchText_$" placeholder="请输入访客姓名" style="width: 210px"/>
            <span class="ml28">来访类型：</span>
            <Select v-model="$_type_$" style="width:110px;">
                <Option v-for="item in $_Select_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="ml28">拜访时间：</span>
            <DatePicker type="daterange" @on-change="$_qh_$" ormat="yyyy-MM-dd" placeholder="请选择拜访时间" style="width: 210px;"></DatePicker>
            <Button class="ml28" type="primary" @click="$_searchType_$">搜索</Button>

        </div>
        <Row>
            <!-- 表格 -->
            <Table :columns="$_fkInfoTable_$" :data="$_fkInfo_$"></Table>
        </Row>
        <br>
        <br>
        <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_totalData_$}}条数据</span>
        <Page align="right" :total="$_totalData_$"
              style="float: right"
              show-elevator show-sizer
              :page-size="$_pageSize_$"
              @on-page-size-change="$_pageNum_$"
              @on-change="$_changePage_$"/>
    </div>
</template>
<script>
    import {Table, Button, TableColumn} from 'element-ui';
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        mixins: [controler],
        components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [TableColumn.name]: TableColumn
        },
        filters: {},
        data() {
            return {
                $_rq_$: [],
                $_totalData_$: 0, // 数据总数
                $_num_$: '10',
                $_searchText_$: '',

                $_type_$: '',
                $_Select_$: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '邀请'
                    },
                    {
                        value: 0,
                        label: '拜访'
                    }
                ],
                $_fkInfo_$: [],  //列表数据
                $_fkInfoTable_$: [//数据表头
                    {
                        title: "订单编号",
                        key: "id",
                        align: "center"
                    },
                    {
                        title: "公司名称",
                        key: "visitorCompany",
                        align: "center",
                        render: (h, params) => {
                            let a = params.row.visitorCompany;
                            if (params.row.visitorCompany == '') {
                                a = '-'
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "来访类型",
                        key: "visitorType",
                        align: "center",
                        render: (h, params) => {
                            let a = '';
                            if (params.row.visitorType == 0) {
                                a = '拜访'
                            } else if (params.row.visitorType == 1) {
                                a = '邀请'
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "被访人",
                        key: "employeeName",
                        align: "center"
                    },
                    {
                        title: "访客姓名",
                        key: "visitorName",
                        align: "center"
                    },
                    {
                        title: "联系方式",
                        key: "visitorMobile",
                        align: "center"
                    },
                    {
                        title: "来访事由",
                        key: "visitReason",
                        align: "center"
                    },
                    {
                        title: "拜访时间",
                        key: "visitDate",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "auditStatus",
                        align: "center",
                        render: (h, params) => {
                            let a = '';
                            if (params.row.auditStatus == 0) {
                                a = '待审核'
                            } else if (params.row.auditStatus == 1) {
                                a = '审核通过'
                            } else if (params.row.auditStatus == 2) {
                                a = '审核不通过'
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        align: "center"
                    },
                ],
                $_pageSize_$: 10,
                $_userInfo_$: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                }
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_list_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background:#f8f8f9'
                } else {
                    return ''
                }
            },
            $_list_$() {
                this.$_querycfg_$.mod = 'company/visitor/zone/' + this.$_userInfo_$.zoneId + '/records';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.startVisitDate;
                        delete this.$_querycfg_$.params.endVisitDate;
                        delete this.$_querycfg_$.params.visitorType;
                        delete this.$_querycfg_$.params.visitorName;
                        if (rsp.data.code === 0) {
                            this.$_fkInfo_$ = rsp.data.data.records;
                            this.$_totalData_$ = rsp.data.data.total * 1;
                        } else {
                            this.$Message.error('数据更新失败!');
                        }
                    }
                })
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

            //搜索发送日期
            $_qh_$(e) {
                this.$_rq_$ = [];
                if (e.length > 0 && e[0] !== "") {
                    // this.$_rq_$ = [e[0] + ' 00:00:00', e[1] + ' 23:59:59'];
                    this.$_rq_$=e;
                }

            },
            $_searchType_$() {
                // if (this.$_rq_$[0] !== '') {
                //     var beginDate = this.FormatAllDate(this.$_rq_$[0]);
                //     var endDate = this.FormatAllDate(this.$_rq_$[1]);
                //     this.$_querycfg_$.params.startVisitDate = beginDate;
                //     this.$_querycfg_$.params.endVisitDate = endDate;
                // } else {
                //     this.$_querycfg_$.params.startVisitDate = '';
                //     this.$_querycfg_$.params.endVisitDate = '';
                // }

                this.$_querycfg_$.params.startVisitDate = this.$_rq_$[0];
                this.$_querycfg_$.params.endVisitDate = this.$_rq_$[1];

                this.$_querycfg_$.params.visitorName = this.$_searchText_$;
                this.$_querycfg_$.params.visitorType = this.$_type_$;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_querycfg_$.params.pageNum = 1;
                this.$_list_$();

            },
            // 格式化时间
            FormatAllDate(sDate) {
                var date = new Date(sDate);
                var seperator1 = "-";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                //月
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                //日
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                //格式化后日期为：yyyy-MM-dd HH:mm:ss
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                return currentdate;
            },

        }
    }
</script>