<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .top {
        padding: 10px 20px;
        box-shadow: 0 0 10px 0 #1e597e47;
        border-radius: 5px;
    }

    .top .tlt {
        margin-bottom: 20px;
        font-weight: normal;
        /*font-size: 16px;*/
    }

    .top .gr {
        padding: 10px 0 0 10px;

    }

    .top .key {
        color: #000
    }

    .top p, .top li {
        line-height: 30px;
    }

    .top .bold {
        font-size: 16px;
        margin: 0 3px;
        color: #01A0FB;
    }

    .top img {
        width: 84px;
    }

    .screen {
        background: #f5f5f5;
        padding: 15px 10px;
        margin: 35px 0;
        font-size: 14px;
    }

    .table .data {
        line-height: 30px;
    }

    .page {
        text-align: right;
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
        <div class="top">
            <Row>
                <Col span="7">
                    <div class="tlt">管家信息</div>
                    <Row>
                        <Col span="6" style="width: 84px;height:84px">
                            <img style="width: 84px;height:84px" v-if="$_housekeeper_$.image"
                                 :src="$_global_$.imgPath + $_housekeeper_$.image" alt="">
                            <img style="width: 84px;height:84px" v-else src="/static/defaultTX.png" alt="">
                        </Col>
                        <Col span="16">
                            <div class="gr">
                                <p>姓名：<span class="key">{{$_housekeeper_$.name}}</span></p>
                                <p>联系方式：<span class="key">{{$_housekeeper_$.phone_number}}</span></p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span="5" style="margin-top: 2%">
                    <p>服务企业：</p>
                    <ul v-for="item in $_housekeeper_$.enterprise" style="color: #000;font-size: 13px">
                        <li>{{item.enterprise_name}}</li>
                    </ul>
                </Col>
                <Col span="6" style="margin-top: 2%">
                    <p>服务总次数：
                        <span class="bold"
                              v-if="$_housekeeper_$.service_count">{{$_housekeeper_$.service_count}}次</span>
                        <span class="bold" v-else>0次</span>

                    </p>
                    <p>平均响应时间：
                        <span class="bold"
                              v-if="$_housekeeper_$.avg_reply_time">{{$_housekeeper_$.avg_reply_time}}分钟</span>
                        <span class="bold" v-else>0分钟</span>

                    </p>
                    <p>平均处理时间：
                        <span class="bold"
                              v-if="$_housekeeper_$.avg_handle_time">{{$_housekeeper_$.avg_handle_time}}小时</span>
                        <span class="bold" v-else>0小时</span>

                    </p>
                </Col>
                <Col span="6" style="margin-top: 2%">
                    <p style="color: #333">综合得分：
                        <span class="bold" style="color:#FFCC01" v-if="$_housekeeper_$.synthesize">{{$_housekeeper_$.synthesize}}</span>
                        <span class="bold" style="color:#FFCC01" v-else>0</span>
                    </p>
                    <p v-if='$_housekeeper_$.workStatus==0 '>
                        <Button type="primary" @click="$_shangxian_$">上线
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span v-if='xianshi==1'><Button type="primary"
                                                                                                     @click="$_choiceCompany1_$()">管家解绑</Button></span><span
                            v-if='xianshi==0'><Button type="primary" @click="$_choiceCompany_$">管家绑定</Button></span></p>
                    <p v-if='xianshi==1'>备用管家姓名：{{$_data4_$[0].stewardName}}</p>
                    <!-- <p v-if='$_housekeeper_$.workStatus==0'></p> -->
                    <p v-if='$_housekeeper_$.workStatus==1'>
                        <Button type="primary" @click="$_xiaxian_$">下线</Button>
                    </p>
                </Col>
            </Row>
        </div>
        <div class="screen">
            <span>标题：</span>
            <Input v-model="$_order_$" placeholder="请输入标题" style="width: 150px"/>
            <span class="ml28">分类：</span>
            <Select v-model="$_classification_$" style="width:120px" placeholder="全部">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="ml28">开始日期：</span>
            <DatePicker v-model="beginTime" type="date" split-panels placement="bottom" placeholder="请选择日期"
                        style="width: 120px"></DatePicker>
            <span class="ml28">结束日期：</span>
            <DatePicker v-model="endTime" type="date" split-panels placement="bottom" placeholder="请选择日期"
                        style="width: 120px"></DatePicker>
            <Button style="margin-left: 20px" type="primary" @click="$_search_$">搜索</Button>
        </div>
        <div class="table">
            <Table :columns="$_recordTable_$" :data="$_data_$" ref="selection"></Table>
            <!-- 表格 -->
            <!--  <el-table :data="$_data_$" border style="width: 100%">
                 <el-table-column align="center" prop="id" label="序号"></el-table-column>
                 <el-table-column align="center" prop="recordTypeName" label="事项分类">
                     <template slot-scope="scope">
                         <span>
                             {{scope.row.recordTypeCode | formatrecordTypeCode}}
                         </span>  
                      </Badge>
                         <span  style="color: #f00">.</span>                  
                     </template>
                 </el-table-column>
                 <el-table-column align="center" prop="recordTitle" label="标题"></el-table-column>
                 <el-table-column align="center" prop="commiterName" label="联系人"></el-table-column>
                 <el-table-column align="center" prop="commiterDeptName" label="公司"></el-table-column>
                 <el-table-column align="center" prop="commiterPubtime" label="提交时间"></el-table-column>
                 <el-table-column align="center" prop="handlerRecvtime" label="受理时间"></el-table-column>
                 <el-table-column align="center" prop="handlerCompletime" label="处理时间"></el-table-column>
                 <el-table-column align="center" label="状态">
                     <template slot-scope="scope">
                         <span>{{scope.row.recordStatus | formatStatus}}</span>
            </template>

                 <template slot-scope="scope">
                         <span>
                             {{scope.row.recordStatus | formatStatus}}
                         </span>  
                         <Badge dot v-if="scope.row.itemReadStatus==1 && scope.row.itemReadRole == 'h'" >
                          <Icon></Icon>
                      </Badge>
                         <span  style="color: #f00">.</span>                  
                     </template>
                 </el-table-column>
                 <el-table-column label="操作" align="center">
                     <template slot-scope="scope">
                         <el-button v-show="scope.row.recordStatus==0" @click="$_show_$(scope.row)" type="text" size="small"> 受理</el-button>
                         <el-button v-show="scope.row.recordStatus==1" @click="$_remove_$(scope.row)" type="text" size="small">处理</el-button>
                         <el-button v-show="scope.row.recordStatus==2" @click="$_remove_$(scope.row)" type="text" size="small">再次处理</el-button>
                         <el-button v-show="scope.row.recordStatus==3" @click="$_remove_$(scope.row)" type="text" size="small">详情</el-button>
                     </template>
                 </el-table-column>
             </el-table> -->
            <!-- 受理提示 -->
        </div>

        <Row class="mt40">
            <div style="float: left">共{{$_total_$}}条数据</div>

            <Page align="right" :total="$_total_$"
                  show-elevator show-sizer
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>

        <Modal
                v-model="$_acceptance_$"
                title="提示"
                @on-ok="$_ok_$"
                @on-cancel="$_cancel_$"
                width="300">
            <p>确定受理此问题?</p>
        </Modal>
        <Modal
                v-model="$_paymodal3_$"
                title="选择要绑定的管家"
                @on-cancel="$_cancelCompany_$"
                @on-ok="choiceThisCompany"
                width="300"
                :mask-closable="false">
            <RadioGroup v-model="$_thisCompanys_$">
                <Radio class="companyRadio" v-for="item in $_data3_$" :label="item.id">{{item.stewardName}}</Radio>
            </RadioGroup>
        </Modal>

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
            formatrecordTypeCode(val) {
                if (val == 1) {
                    return '物业报修'
                } else if (val == 2) {
                    return '投诉建议'
                } else if (val == 3) {
                    return '企业服务咨询'
                } else {
                    return '留言'
                }
            }
        },
        data() {
            return {
                $_order_$: '',
                $_housekeeper_$: {},
                $_paymodal3_$: false,  //选择管家的弹框
                $_paymodal4_$: false,  //选择管家的弹框
                $_thisCompanys_$: '',  //选择管家的弹框
                $_thisCompanys1_$: [],  //选择管家的弹框
                $_bdgj_$: [],  //选择管家的弹框
                $_data3_$: [],  //选择管家的弹框
                $_data4_$: [],  //选择管家的弹框
                $_row_$: {},
                $_name_$: '王乐乐',
                $_phone_$: 188888888,
                $_score_$: 99,
                $_frequency_$: 88,
                $_corresponding_$: 30,
                $_time_$: 5,
                $_value_$: 2.4,
                $_enterprise_$: [1, 2, 3],
                $_total_$: 0,   //总条数
                $_classification_$: '全部',
                $_acceptance_$: false,  // 受理提示框
                $_data_$: [],   // 表格数据
                cityList: [   // 分类列表
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
                        label: '留言信息'
                    }
                ],
                $_text_$: '', // 提示信息
                $_id_$: 0,
                $_title_$: '',
                xianshi: '',
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
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
                        title: "提交时间",
                        key: "commiterPubtime",
                        align: "center",
                    },
                    {
                        title: "受理时间",
                        key: "handlerRecvtime",
                        align: "center",

                    },
                    {
                        title: "处理时间",
                        key: "handlerCompletime",
                        align: "center",
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
                            if (params.row.itemReadStatus == 1 && params.row.itemReadRole == 'h') {
                                return h('div', [
                                    h('span', texts),
                                    h('span', {
                                        style: {
                                            float: 'right',
                                            height: "10px",
                                            width: "10px",
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
                        render: (h, params) => {
                            var a;
                            var b;
                            if (params.row.recordStatus == '0') {
                                b = "受理"
                            }
                            if (params.row.recordStatus == '1') {
                                a = "处理"
                            }
                            if (params.row.recordStatus == '2') {
                                a = "再次处理"
                            }
                            if (params.row.recordStatus == '3') {
                                a = "详情"
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
                                                this.$_remove_$(params.row);
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
                                                this.$_show_$(params.row);
                                            }
                                        }
                                    },
                                    b
                                ),
                            ]);
                        }
                    }
                ],
                beginTime: '',
                endTime: '',
                userInfo: {}
            }
        },
        methods: {
            guanjialist() {
                this.$_sendQuery_$({//steward/steward/queryStewardByCondition
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/` + this.userInfo.zoneId + `/list`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data3_$ = rsp.data.data;
                        }
                    }
                })
            },
            //选择管家按钮
            $_choiceCompany_$() {
                this.$_paymodal3_$ = true;
            },
            //取消管家列表弹窗
            $_cancelCompany_$() {
                this.$_paymodal3_$ = false;
            },
            $_choiceCompany1_$() {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否解除管家?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/steward/` + this.userInfo.zoneId + `/unbind`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('解除绑定管家成功!');
                                    this.housekeeper();
                                    this.guanjialist();
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            choiceThisCompany() {
                this.$_sendQuery_$({//steward/steward/queryStewardByCondition
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/` + this.userInfo.zoneId + `/bind`,
                    data: {
                        targetId: this.$_thisCompanys_$
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success('绑定管家成功!');
                            this.housekeeper();
                            this.guanjialist();
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_xiaxian_$() {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确认下线?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/steward/offline`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('下线成功!');
                                    this.housekeeper();
                                } else {
                                    this.$Message.error('下线失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            $_shangxian_$() {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确认上线?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/steward/online`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('上线成功!');
                                    this.housekeeper();
                                } else {
                                    this.$Message.error('上线失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            //获取管家详细信息
            housekeeper() {
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
                            this.$_housekeeper_$ = rsp.data.data;
                            this.$_housekeeper_$.star = Math.floor(this.$_housekeeper_$.star / 20 * 10) / 10;
                            this.$_housekeeper_$.synthesize = Math.floor(this.$_housekeeper_$.synthesize / 20 * 10) / 10;
                            //请求列表数据
                            this.$_list_$();
                            this.$_list1_$();
                        }
                    }
                })
            },
            $_list1_$() {

                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/` + this.userInfo.zoneId + `/bind/list`,
                    data: {
                        stewardId: this.$_housekeeper_$.id
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data4_$ = rsp.data.data;
                            if (rsp.data.data.length > 0) {
                                this.xianshi = 1
                            } else {
                                this.xianshi = 0
                            }
                            // this.$_housekeeper_$=rsp.data.data;
                        }
                    }
                })

            },
            //订单搜索
            $_search_$() {
                if (this.$_order_$) {
                    this.$_querycfg_$.params.recordTitle = this.$_order_$;
                } else {
                    delete this.$_querycfg_$.params.recordTitle;
                }
                if (this.$_classification_$ != "全部") {
                    this.$_querycfg_$.params.recordTypeCode = this.$_classification_$;
                } else {
                    delete this.$_querycfg_$.params.recordTypeCode;
                }
                if (this.beginTime) {
                    var d = new Date(this.beginTime);
                    var a = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                    this.$_querycfg_$.params.beginTime = a
                } else {
                    delete this.$_querycfg_$.params.beginTime;
                }
                if (this.endTime) {
                    var b = new Date(this.endTime);
                    var c = b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate()
                    this.$_querycfg_$.params.endTime = c
                } else {
                    delete this.$_querycfg_$.params.endTime;
                }
                this.$_list_$();
            },
            //受理
            $_show_$(row) {
                this.$_row_$ = row;
                this.$_id_$ = row.id;
                this.$_title_$ = row.recordTitle;
                this.$_acceptance_$ = true;

            },
            //处理
            $_remove_$(row) {

                this.$root.$_Route_$('employer', 'jump', 'fwcl', {row: row, hfaceurl: this.$_housekeeper_$.image})
            },
            //受理确定
            $_ok_$() {
                this.$_querycfg_$.mod = 'steward/steward/acceptServiceRecord';
                this.$_querycfg_$.params = {};
                this.$_querycfg_$.params.serviceRecordId = this.$_id_$
                this.$_querycfg_$.params.recordTitle = this.$_title_$
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_text_$ = rsp.data.data;
                            this.$Message.success(this.$_text_$);
                            this.$_row_$.recordStatus = 1;
                            // this.autorecovery();
                        }

                        else {
                            this.$Message.error('服务受理失败');
                        }

                    }
                })

            },
            //系统自动回复
            autorecovery() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/steward/createServiceItem`,
                    data: {
                        recordId: this.$_row_$.id,
                        itemRoler: "h",
                        name: this.$_row_$.stewardName,
                        phoneNumber: this.$_row_$.stewardPhoneNumber,
                        itemTitle: "",
                        itemInfo: "您的问题已经开始处理",
                        image: ""
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {

                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {

                        }
                    }
                })
            },
            // 请求列表数据
            $_list_$() {
                this.$_querycfg_$.mod = 'steward/steward/queryRecordPageList';
                this.$_querycfg_$.params.zoneId = this.userInfo.zoneId;
                // this.$_querycfg_$.params.stewardId = this.userInfo.id;
                this.$_querycfg_$.params.stewardId = this.$_housekeeper_$.id;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        // 表格数据
                        if (rsp.data.code === 0) {
                            this.$_data_$ = rsp.data.data.records
                            for (let i = 0; i < this.$_data_$.length; i++) {
                                if (this.$_data_$[i].commiterPubtime) {
                                    this.$_data_$[i].commiterPubtime = this.formatDate(this.$_data_$[i].commiterPubtime)
                                }
                                if (this.$_data_$[i].handlerRecvtime) {
                                    this.$_data_$[i].handlerRecvtime = this.formatDate(this.$_data_$[i].handlerRecvtime)
                                }
                                if (this.$_data_$[i].handlerCompletime) {
                                    this.$_data_$[i].handlerCompletime = this.formatDate(this.$_data_$[i].handlerCompletime)
                                }
                            }
                            this.$_total_$ = Number(rsp.data.data.total);
                        }

                    }
                })

            },
            //取消
            $_cancel_$() {

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
            },

            //数据下一页
            $_changePage_$(e) {
                if (this.$_order_$) {
                    this.$_querycfg_$.params.recordTitle = this.$_order_$;
                }
                if (this.$_classification_$ != "全部") {
                    this.$_querycfg_$.params.recordTypeCode = this.$_classification_$;
                }
                if (this.beginTime) {
                    var d = new Date(this.beginTime);
                    var a = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                    this.$_querycfg_$.params.beginTime = a
                }
                if (this.endTime) {
                    var b = new Date(this.endTime);
                    var c = b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate()
                    this.$_querycfg_$.params.endTime = c
                }
                this.$_querycfg_$.params.current = e
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.size = e;
                this.$_list_$();
            },
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.$_querycfg_$.params.size = 10
            //获取管家详细信息
            this.housekeeper();
            this.guanjialist();
        }
    }
</script>