<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .bg {
        background: #f5f5f5;
        padding: 10px;
    }

    .ivu-modal-body {
        padding: 0;
    }

    .ivu-form-item {
        margin-bottom: 0px;
    }

    .hysbox li {
        line-height: 24px;

        height: 24px;
    }

    .dialog-footer {
        padding-top: 10px;
        text-align: right;
    }
</style>
<template>
    <div>
        <div class="bg">
            <Row type="flex" align="middle">
                <Col span="24">
                    <div style="display: inline-block;margin-right: 28px;">
                        <span>访客姓名：</span>
                        <Input v-model="$_fangkeName_$" placeholder="请输入访客姓名" style="width:200px"></Input>
                    </div>
                    <div style="display: inline-block;margin-right: 28px;">
                        <span>拜访日期：</span>
                        <DatePicker @on-change="$_dateRange_$" type="daterange" format="yyyy-MM-dd" placeholder="请选择日期"
                                    style="width: 200px"></DatePicker>
                    </div>
                    <div style="display: inline-block;margin-right: 20px;">
                        <span>来访类型：</span>
                        <Select v-model="$_selected_$" style="width:200px">
                            <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{
                                item.label}}
                            </Option>
                        </Select>
                    </div>
                    <div style="display: inline-block">
                        <Button type="primary" @click="$_search_$()">搜索</Button>
                    </div>
                </Col>
            </Row>
        </div>
        <br>
        <Row>
            <Col align="right">
                <Button type="primary" @click="$_newInvite_$()">+ 新建邀请</Button>
            </Col>
        </Row>
        <Row style="margin-top: 20px">
            <!-- 表格 -->
            <Table :columns="$_fkInfoTable_$" :data="$_data6_$"></Table>
        </Row>
        <!-- <Row>
          <el-table
        :data="$_data6_$"
        :border="false"
        style="width: 100%">
         <el-table-column
                align="center"
                label="序号"
                width="50">
                 <template scope="scope"><span>{{scope.$index+(pageNo - 1) * $_pageSize_$ + 1}} </span></template>
        </el-table-column>
        <el-table-column
        prop="visitorType"
        label="来访类型"
        align="center">
              <template slot-scope="scope">
                <span>{{scope.row.visitorType | visitorType}}</span>
              </template>
        </el-table-column>
        <el-table-column prop="visitorName" label="来访名称" align="center">
            </el-table-column>
            <el-table-column prop="employeeMobile" label="联系方式" align="center">
            </el-table-column>
            <el-table-column prop="visitorOrg" label="单位名称" align="center">
            </el-table-column>
            <el-table-column prop="visitReason" label="来访事由" align="center">
            </el-table-column>
            <el-table-column prop="visitDate" label="拜访时间" align="center">
            </el-table-column>
            <el-table-column prop="meetingRoomName" label="会议室" align="center">
            </el-table-column>
             <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.auditStatus | formatStatus}}</span>
              </template>
            </el-table-column>
         <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button v-show ="!scope.row.visitorType == 1" @click="$_agree_$(scope.row.id)" type="text" size="small">同意</el-button>
                            <el-button v-show ="!scope.row.visitorType == 1" @click="$_disagree_$(scope.row.id)" type="text" size="small">不同意</el-button>
                            <el-button  @click="$_show_$(scope.row)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
      </el-table>
        </Row> -->
        <br>
        <br>
        <Row>
            <Col style="text-align: left" span="12">共有{{$_totalSize_$}}条数据</Col>
            <Page align="right"
                  :total="$_totalSize_$"
                  :page-size="$_pageSize_$"
                  show-elevator show-sizer
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
        <!-- 详情 -->

        <!--不同意原因-->
        <Modal v-model="$_modalDisagree_$" title="不同意原因">
            <div slot="footer" align="center">
                <Form ref="editform" :rules="editFormValidate" :model="$_editform_$" :label-width="80">
                    <FormItem label="不通过原因">
                        <Input type="textarea" v-model="$_editform_$.textarea"></Input>
                    </FormItem>
                </Form>
                <div slot="footer" class="dialog-footer">
                    <Button type="primary" @click="$_handleReason_$()">确定</Button>
                    <Button type="primary" @click="$_handleCancel_$()">取消</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import {Button, Select, Option, Table, TableColumn} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn
        },
        filters: {
            formatStatus(val) {
                if (val === 0) {
                    return '待审核'
                }
                if (val === 1) {
                    return '审核通过'
                }
                if (val === 2) {
                    return '审核不通过'
                }
            },

            visitorType(val) {
                if (val === 0) {
                    return '拜访'
                }
                if (val === 1) {
                    return '邀请'
                }
            }
        },
        data() {
            return {
                scope: {
                    $index: 1,
                },
                pageNo: 1,
                myobj: {},
                id: 0,
                status: '',
                $_totalSize_$: 0,
                $_modalxq_$: false,
                $_modalDisagree_$: false,
                $_fangkeName_$: "",
                $_myRecord_$: "",
                $_selected_$: "全部",
                $_rq_$: [],
                $_pageSize_$: 5,//默认
                $_ruleValidate_$: {},
                $_editform_$: {
                    textarea: ''
                },
                editFormValidate: {
                    textarea: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ]
                },
                $_statusList_$: [
                    // 状态值
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 0,
                        label: "拜访"
                    },
                    {
                        value: 1,
                        label: "邀请"
                    }
                ],
                $_data6_$: [],
                $_fkInfoTable_$: [//数据表头
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                    },
                    {
                        title: "来访名称",
                        key: "visitorName",
                        align: "center"
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
                        title: "会议室",
                        key: "meetingRoomName",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.meetingRoomName) {
                                a = params.row.meetingRoomName
                            } else {
                                a = '-'
                            }
                            return h("span", {}, a);
                        }
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
                        title: "拜访日期",
                        key: "visitDate",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.visitDate) {
                                a = params.row.visitDate.substr(0, 10)
                            } else {
                                a = '-'
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: "单位名称",
                        key: "visitorOrg",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            if (params.row.visitorOrg) {
                                a = params.row.visitorOrg
                            } else {
                                a = '-'
                            }
                            return h("span", {}, a);
                        }
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
                        title: "操作",
                        key: "createTime",
                        align: "center",
                        render: (h, params) => {
                            var a;
                            var b;
                            if (params.row.visitorType == 0 && params.row.auditStatus == 0) {
                                a = "同意  |";
                                b = "不同意  |";
                            } else {
                                a = "";
                                b = ""
                            }
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '4px',
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            // let a = JSON.parse( JSON.stringify(params.row) );
                                            this.$_agree_$(params.row.id)
                                        }
                                    }
                                }, a),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "4px",
                                        // color: "#f56c6c"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_disagree_$(params.row.id)
                                        },
                                    }
                                }, b),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_show_$(params.row)
                                        }
                                    }
                                }, '详情'),
                            ]);
                        }
                    },
                ],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
            };
        },

        created() {
            this.$_list_$();
            this.$_global_$.serverPath
            this.$_querycfg_$.params.pageNum = 1;
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {

            //封装
            $_list_$() {
                //debugger
                this.$_querycfg_$.mod = 'company/visitor/employee/records';
                //   this.$_querycfg_$.params.pageNum = 1;
                // this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                var _this = this;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.visitorName;
                        delete this.$_querycfg_$.params.startVisitDate;
                        delete this.$_querycfg_$.params.endVisitDate;
                        delete this.$_querycfg_$.params.visitorType;
                        if (rsp.data.code === 0) {
                            this.pageNo = rsp.data.data.current;
                            this.$_data6_$ = rsp.data.data.records;
                            this.$_totalSize_$ = rsp.data.data.total * 1;
                        }
                    }
                })
            },
            $_dateRange_$(e) {
                this.$_querycfg_$.params.startVisitDate = e[0];
                this.$_querycfg_$.params.endVisitDate = e[1];
            },
            //搜索
            $_search_$() {
                if (this.$_fangkeName_$) {
                    this.$_querycfg_$.params.visitorName = this.$_fangkeName_$;
                }

                this.$_querycfg_$.params.startVisitDate
                this.$_querycfg_$.params.endVisitDate
                if (this.$_selected_$ != "全部") {
                    this.$_querycfg_$.params.visitorType = this.$_selected_$;
                }
                this.$_list_$()
            },
            $_newInvite_$() {
                this.$root.$_Route_$("employer", "jump", "xjyq", {});
            },
            //同意修改
            $_agree_$(id) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
              <p>确认同意吗</p><br>        
          `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/visitor/audit/pass/${id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("审核通过!")
                                    this.$_list_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                })
                // this.$_querycfg_$.mod = `company/visitor/audit/pass/${id}`;
                // this.$_querycfg_$.params = {};
                // //var _this = this;
                // this.$_fquery_$((rsp) => {
                //   if (rsp.status === 200) {
                //     if (rsp.data.code === 0) {
                //       this.$Message.success("修改成功");
                //       // // 刷新列表
                //       this.$_list_$()

                //     }
                //     else {
                //       this.$Message.error(rsp.data.message);
                //     }
                //   }
                // })
            },
            //不同意
            $_disagree_$(id) {
                this.id = id;
                this.$refs.editform.resetFields();
                this.$_modalDisagree_$ = true

            },
            $_handleReason_$() {
                this.$_sendQuery_$({
                    method: 'POST',
                    url: `${this.$_global_$.serverPath}/company/visitor/audit/nopass/${this.id}`,
                    data: {
                        "auditDesc": this.$_editform_$.textarea
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.$Message.success("修改成功");
                        this.$_modalDisagree_$ = false
                        this.$_list_$();
                    } else {
                        this.$Message.error(res.data.message);
                        this.$_modalDisagree_$ = false
                    }
                    for (let key in this.$_editform_$) {
                        this.$_editform_$[key] = ''
                    }
                });

                this.$_list_$()
            },
            //取消
            $_handleCancel_$() {
                this.$_modalDisagree_$ = false;
                this.$_editform_$ = ''
            },
            $_show_$(row) {
                //  this.id =id
                // this.$root.$_Route_$('employer', 'jump', 'scyqxq', {id:this.id})
                this.$root.$_Route_$('employer', 'jump', 'scyq', {row: row})

            },
            //分页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$()
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_pageSize_$ = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$()
            },
        }
    };
</script>