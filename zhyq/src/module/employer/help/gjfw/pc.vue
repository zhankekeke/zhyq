<style scoped>
    .container {
        font-size: 14px;
        color: #333;
    }

    .bg {
        background: #f5f5f5;
        min-height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        padding: 0 20px;
    }

    .textRight {
        text-align: right;
    }

    .row {
        margin-bottom: 20px;
    }

    .ml20{
        margin-left: 28px;
    }
</style>
<template>
    <div class='container'>
        <Row class="bg row">
            <span>事项名称：</span>
            <Input v-model.trim="$_bianhao_$" placeholder="请输入事项名称" style="width: 200px"></Input>
            <span class="ml20">服务类型：</span>
            <Select placeholder="请选择服务类型" v-model="$_select_$" style="width:200px">
                <Option v-for="item in $_ztList_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="ml20">日期：</span>
            <DatePicker placeholder="请选择检索时间段" type="daterange" v-model="$_rq_$" format="yyyy-MM-dd"
                        style="width: 200px"></DatePicker>
            <Button style="margin-left: 20px" type="primary" @click="$_search_$()">搜索</Button>
        </Row>
        <Row class="row">
            <Col span='24' class="textRight">
                <Button type="primary" style="margin-right:30px;" @click='$_lxgj_$'>联系管家</Button>
            </Col>
        </Row>
        <Row class="row">
            <Table :columns="$_recordTable_$" :data="$_data_$" ref="selection"></Table>
            <!-- 表格 -->
            <!-- <el-table
                    :data="$_data_$"
                    border
                    :data = "dataList"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="id"
                        label="序号">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="事项分类">
                    <template slot-scope="scope">
                        <span v-if="scope.row.recordTypeCode == 1">物业报修</span>
                        <span v-if="scope.row.recordTypeCode == 2">投诉建议</span>
                        <span v-if="scope.row.recordTypeCode == 3">企业服务咨询</span>
                        <span v-if="scope.row.recordTypeCode == 4">留言</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="recordTitle"
                        label="事项名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="recordDesc"
                        label="事项描述">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="提交时间">
                    <template slot-scope="scope">
                                                <span>{{scope.row.commiterPubtime | formatDate}}</span>
                                            
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="受理时间">
                    <template slot-scope="scope">
                                                <span>{{scope.row.handlerRecvtime | formatDate}}</span>
                                            
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="处理时间">
                    <template slot-scope="scope">
                                                <span>{{scope.row.handlerCompletime | formatDate}}</span>
                                            
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="状态">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.recordStatus | formatStatus}}
                        </span>  
                        <Badge dot v-if="scope.row.itemReadStatus==1 && scope.row.itemReadRole == 'c'" >
                         <Icon></Icon>
                     </Badge>
                         <span  style="color: #f00">.</span>                  
                    </template>
                </el-table-column>
                <el-table-column label="操作"
                                 align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-show="scope.row.recordStatus == '0'"
                                @click="$_zcfkbtn_$(scope.row,1)" type="text" size="small">反馈
                        </el-button>
                        <el-button
                                v-show=" scope.row.recordStatus == '1' || scope.row.recordStatus == '2'"
                                @click="$_zcfkbtn_$(scope.row,1)" type="text" size="small">再次反馈
                        </el-button>
                        <el-button
                                v-show="scope.row.recordStatus == '1' || scope.row.recordStatus == '2'"
                                @click="$_zcfkbtn_$(scope.row,2)" type="text" size="small">已解决
                        </el-button>
                        <el-button v-show="scope.row.recordStatus == '3'" @click="$_zcfkbtn_$(scope.row,3)" type="text"
                                   size="small">详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table> -->
        </Row>
        <Row class="row textRight">
            <!-- <Page :total=$_num_$ size="small" show-elevator show-sizer></Page> -->
            <Col span='12' style="text-align: left">共 {{$_num_$}} 条数据</Col>
            <Col span="12">
                <Page
                        :total="$_num_$"
                        show-elevator
                        show-sizer
                        :page-size="$_pageSize_$"
                        @on-page-size-change="$_pageNum_$"
                        @on-change="$_changePage_$"/>
            </Col>

        </Row>
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
        filters: {
            formatStatus(val) {
                if (val == 0) {
                    return '未受理'
                }
                if (val == 1) {
                    return '已受理'
                }
                if (val == 2) {
                    return '处理中'
                }
                if (val == 3) {
                    return '已完成'
                }
            },
            formatDate(val) {
                if (val) {
                    var date = new Date(val);
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
                } else {
                    return ''
                }
            }
        },
        data() {
            return {
                $_pageSize_$: 10,
                $_bianhao_$: '',
                $_select_$: '全部', //默认选项
                $_ztList_$: [  //事项分类
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '物业报修'
                    },
                    {
                        value: 2,
                        label: '投诉建议'
                    },
                    {
                        value: 3,
                        label: '企业服务咨询'
                    },
                    {
                        value: 4,
                        label: '留言'
                    }
                ],
                $_rq_$: [],
                $_recordTable_$: [
                    //数据表头
                    {
                        title: "序号",
                        type: "index",
                        align: "center",
                    },
                    {
                        title: "事项分类",
                        key: "recordTypeName",
                        align: "center",
                        render: (h, params) => {
                            let texts = '';
                            if (params.row.recordTypeCode == 1) {
                                texts = "物业报修"
                            } else if (params.row.recordTypeCode == 2) {
                                texts = "投诉建议"
                            } else if (params.row.recordTypeCode == 3) {
                                texts = "企业服务咨询"
                            } else {
                                texts = "留言"
                            }
                            return h('div', {
                                props: {},
                            }, texts)
                        }
                    },
                    {
                        title: "事项名称",
                        key: "recordTitle",
                        align: "center",
                    },
                    {
                        title: "联系人",
                        key: "commiterName",
                        align: "center"
                    },
                    {
                        title: "公司",
                        key: "commiterEnterpriseName",
                        align: "center",
                    },
                    {
                        title: "管家名称",
                        key: "stewardName",
                        align: "center",
                    },
                    {
                        title: "提交时间",
                        key: "commiterPubtime",
                        align: "center",
                        render: (h, params) => {
                            let text = '';
                            if (params.row.commiterPubtime && params.row.commiterPubtime != '') {
                                text = this.FormatAllDate(params.row.commiterPubtime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "受理时间",
                        key: "handlerRecvtime",
                        align: "center",
                        render: (h, params) => {
                            let text = '';
                            if (params.row.handlerRecvtime && params.row.handlerRecvtime != '') {
                                text = this.FormatAllDate(params.row.handlerRecvtime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "处理时间",
                        key: "handlerCompletime",
                        align: "center",
                        render: (h, params) => {
                            let text = '';
                            if (params.row.handlerCompletime && params.row.handlerCompletime != '') {
                                text = this.FormatAllDate(params.row.handlerCompletime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: "状态",
                        key: "recordStatus",
                        align: "center",
                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            var b;

                            if (params.row.recordStatus == 0) {
                                texts = "未受理"
                            } else if (params.row.recordStatus == 1) {
                                texts = "已受理"
                            } else if (params.row.recordStatus == 2) {
                                texts = "处理中"
                            } else if (params.row.recordStatus == 3) {
                                texts = "已完成"
                            }
                            if (params.row.itemReadStatus == 1 && params.row.itemReadRole == 'c') {
                                return h('div', [
                                    h('span', texts),
                                    h('span', {
                                        style: {
                                            float: 'right',
                                            height: "8px",
                                            width: "8px",
                                            borderRadius: "50%",
                                            // color:"#FF0000"
                                            background: "#FF0000",
                                            display: "block",
                                        }
                                    }, ''),
                                ]);
                            } else {
                                return h('div', [
                                    h('span', texts),
                                ]);
                            }
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 150,
                        render: (h, params) => {
                            var a;
                            var b;
                            var c;
                            var d;
                            if (params.row.recordStatus == '0') {
                                a = "反馈"
                            }
                            if (params.row.recordStatus == '1' || params.row.recordStatus == '2') {
                                b = "再次反馈  "
                            }
                            if (params.row.recordStatus == '1' || params.row.recordStatus == '2') {
                                c = "已解决"
                            }
                            if (params.row.recordStatus == '3') {
                                d = "详情"
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
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_zcfkbtn_$(params.row, 1);
                                            }
                                        }
                                    },
                                    a
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
                                                this.$_zcfkbtn_$(params.row, 1);
                                            }
                                        }
                                    },
                                    b
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
                                                this.$_zcfkbtn_$(params.row, 2);
                                            }
                                        }
                                    },
                                    c
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
                                                this.$_zcfkbtn_$(params.row, 3);
                                            }
                                        }
                                    },
                                    d
                                ),
                            ]);
                        }
                    }
                ],
                $_num_$: 0,  // 数据总条数
                $_data_$: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                userInfo: {}
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_list_$();
        },
        methods: {
            // 请求列表数据
            $_list_$() {
                this.$_querycfg_$.mod = 'steward/steward/queryRecordPageList';
                this.$_querycfg_$.params.zoneId = this.userInfo.zoneId;
                this.$_querycfg_$.params.commiterId = this.userInfo.id;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        //搜索清零
                        delete this.$_querycfg_$.params.recordTypeCode;
                        delete this.$_querycfg_$.params.recordTitle;
                        delete this.$_querycfg_$.params.beginTime;
                        delete this.$_querycfg_$.params.endTime;
                        // 表格数据
                        if (rsp.data.code === 0) {
                            this.$_data_$ = rsp.data.data.records
                            this.$_num_$ = Number(rsp.data.data.total);
                        }

                    }
                })

            },
            $_pageNum_$(e) {
                this.$_querycfg_$.params.size = e;
                this.$_list_$();
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.current = e;
                // this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            },
            //订单搜索
            $_search_$() {
                if (this.$_bianhao_$) {
                    this.$_querycfg_$.params.recordTitle = this.$_bianhao_$;
                }
                if (this.$_select_$ != "全部") {
                    this.$_querycfg_$.params.recordTypeCode = this.$_select_$;
                }
                if (this.$_rq_$[0] !== '') {
                    var beginDate = this.FormatAllDate(this.$_rq_$[0])
                    var endDate = this.FormatAllDate(this.$_rq_$[1])
                    this.$_querycfg_$.params.beginTime = beginDate;
                    this.$_querycfg_$.params.endTime = endDate;
                } else {
                }
                this.$_list_$();
            },
            $_tjBtn_$() {
                this.$root.inparams.id;
            },
            // 格式化时间
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
            // 联系管家
            $_lxgj_$() {
                //先请求员工所在企业有没有管家
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/enterprise/queryAssignedEnterpriseByCondition`,
                    data: {
                        enterprise_id: this.userInfo.enterpriseId,
                        zone_id: this.userInfo.zoneId
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data.length > 0) {
                                this.$root.$_Route_$('employer', 'jump', 'qywtzx', {gjInfo: rsp.data.data[0]})
                            } else {
                                this.$Message.error('所属企业未分配管家')
                            }
                        }
                    }
                });
            },
            // 再次反馈 服务评价 服务详情
            $_zcfkbtn_$(row, id) {
                this.$root.$_Route_$('employer', 'jump', 'zcfg', {row: row, id: id})
            }
        }
    }
</script>