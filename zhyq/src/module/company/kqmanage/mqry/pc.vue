<style scoped>
    .container {
        font-size: 16px;
        color: #333;
    }

    .top {
        min-height: 80px;
        background: #f7f7f7;
        line-height: 80px;
    }

    .top input {
        margin: 20px 0;
    }

    .margin {
        margin: 15px 0;
    }

    .f12 {
        font-size: 12px;
        line-height: 42px;
    }

    .center {
        text-align: center;
    }

    .tree {
        border: 1px solid #dddee1;
        width: 250px;
        box-sizing: border-box;
        padding: 15px 20px;
        border-radius: 5px;
        margin: 0 auto;
    }
</style>
<template>
    <div class='container'>
        <Row class='top margin'>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 14px;">员工姓名：</span>
            <Input v-model="$_searchMes_$" placeholder="请输入姓名" style="width: 200px"></Input>
            <Button style="margin-left: 20px;" type="primary" @click="$_search2_$">搜索</Button>
        </Row>
        <Row class='margin f12'>
            <Col span="24" style='text-align:right;'>
                <Button type="primary" @click='$_tjModel_$ = true' style='margin-right:10px; margin-top: 20px;'>＋添加
                </Button>
            </Col>
        </Row>
        <Row class='margin'>
            <Table :columns="$_columns_$" :data="$_data2_$"></Table>
            <!-- 表格 -->
            <!-- <el-table
                    :data="$_data2_$"
                    
                    style="width: 100%">
                <el-table-column
                        align="center"
                        type="index"
                        label="序号">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="性别">
                    <template slot-scope="scope">
                                                <span>{{scope.row.sex | formatStatus}}</span>
                                            
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="orgName"
                        label="所在部门">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="createTime"
                        label="添加时间">
                </el-table-column>
                <el-table-column label="操作"
                                 align="center">
                    <template slot-scope="scope">
                        <el-button @click="$_remove_$(scope.row)" type="text" size="small" ><span style="color: #f00">删除</span></el-button>
                    </template>
                </el-table-column>
            </el-table> -->
        </Row>
        <Row style="margin-top:40px">
            <span style="float: left; font-size: 14px;margin-left: 10px;">共{{$_num_$}}条数据</span>
            <Page align="right"
                  style="float: right"
                  :total="$_num_$"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>

        <!--     添加 -->
        <Modal v-model="$_tjModel_$" :styles="{top: '20px'}" title="添加免签员工" @on-ok="$_tjok_$" @on-cancel="$_tjcancal_$"
               :mask-closable="false">
            <Row class='margin'>
                <div style="float:left; width:45%;overflow-y: auto">
                    部门列表：
                    <Tree ref="tree"
                          :data="$_data_$"
                          @on-select-change="$_choice_$"
                          @on-check-change="$_check_$"
                          show-checkbox>
                    </Tree>
                </div>
                <div style="float: left; margin-left:10%; width: 35%; font-weight: normal;">
                    <span style="font-size: 14px;">所选员工列表：</span>
                    <span v-if="$_ygList_$.length == 0" style="font-size: 12px;"><br/>请选择部门查看</span>
                    <span v-else>
                            <CheckboxGroup @on-change="$_newData_$"
                                           style="margin-top: 8px;overflow-y:auto"
                                           v-model="checkAllGroup">
                                <Checkbox v-for="item in $_ygList_$" :label="item.id">
                                    <span>{{item.name}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                            </span>
                </div>
            </Row>
            <div slot="footer">
                <Button type="ghost" @click='$_tjModel_$ = false'>取消</Button>
                <Button type="primary" @click="$_addMq_$">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {Table, Button, TableColumn} from 'element-ui';
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';
    import axios from 'axios'

    export default {
        mixins: [controler],
        components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [TableColumn.name]: TableColumn
        },
        filters: {
            formatStatus(val) {
                if (val === 0) {
                    return '男'
                }
                if (val === 1) {
                    return '女'
                }
            }
        },
        data() {
            return {
                $_userInfo_$: '', //用户信息
                $_searchMes_$: '',
                $_num_$: 0,
                $_pageSize_$: 10,
                $_pageNum2_$: 1,
                $_data_$: [], // 树形数据
                $_data2_$: [], //列表数据
                $_tjModel_$: false,
                id: 0,
                $_searchMesModel_$: '',
                //
                $_zeId_$: [
                    {
                        voucherId: '',
                        voucherName: ''
                    }
                ],
                $_columns_$: [
                    {
                        title: '序号',
                        align: 'center',
                        type: "index",
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        align: 'center',
                        render: (h, params) => {
                            var g;
                            if (params.row.sex == 0) {
                                g = '男';
                            } else {
                                g = '女'
                            }
                            return h("span", {}, g);
                        }
                    },
                    {
                        title: '所在部门',
                        key: 'orgName',
                        align: 'center',
                    },
                    {
                        title: '添加时间',
                        key: 'createTime',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#f56c6c"

                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params.row)

                                        },
                                    }
                                }, '删除'),
                            ]);
                        }
                    }
                ],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_current_$: 0,
                $_message_$: {
                    name: "",
                    type: ""
                },
                mydata: "",//发放页面的数据
                //员工数量
                $_ygNum_$: 0,
                //发放数量
                $_ffnum_$: 5,
                $_grantCount_$: 0,

                thresholdList: [],
                //代金卷列表
                $_cityList_$: [],
                //代金卷详细信息
                $_djqList_$: [],
                //代金券类型
                $_List_$: [],
                $_model_$: "",
                $_search_$: "",
                myprams: "",
                //部门数据
                $_bumen_$: [],
                $_bumenList_$: '',
                checkAllGroup: [],
                ygname: [],
                $_ygInfo_$: [],
                $_ygList_$: [],
                $_acType_$: '',
                $_ymq_$: ''
            }
        },
        created() {
            //账户信息
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);

            this.$_list_$();
            this.$_yfp_$();
            this.$_bmlist_$();
            this.$_querycfg_$.params.pageNum = this.$_pageNum2_$;
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            $_yfp_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/attendance/exclude/list`,
                    data: {}
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_ymq_$ = rsp.data.data;
                        }
                    }
                });
            },
            $_addMq_$() {
                let ids = '';
                for (let i = 0; i < this.checkAllGroup.length; i++) {
                    ids += this.checkAllGroup[i] + ","
                }
                ids = ids.slice(0, -1);
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/attendance/exclude/add`,
                    data: {
                        employeeIds: ids
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success('添加成功！！！');
                            this.$_tjModel_$ = false;
                            this.$_list_$();
                            this.$_yfp_$();
                        }
                    }
                });
            },
            $_search2_$() {
                if (this.$_querycfg_$.params.employeeName) {
                    delete this.$_querycfg_$.params.employeeName;
                }
                if (this.$_searchMes_$) {
                    this.$_querycfg_$.params.employeeName = this.$_searchMes_$;
                }
                this.$_querycfg_$.mod = 'company/attendance/exclude/page';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data2_$ = rsp.data.data.records;
                            this.$_num_$ = rsp.data.data.total * 1
                        } else {
                            this.$Message.error('获取失败，请重试！！！');
                        }
                    } else {
                        this.$Message.error('获取失败，请重试！！！');
                    }
                })
            },
            $_list_$() {
                this.$_querycfg_$.mod = 'company/attendance/exclude/page';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data2_$ = rsp.data.data.records;
                            this.$_num_$ = rsp.data.data.total * 1;
                        }
                    }
                });
            },
            $_bmlist_$() {
                //部门列表
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/company/${this.$_userInfo_$.enterpriseId}/department`,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            if (res.data.data) {
                                let arr = res.data.data;
                                this.$_bumen_$ = [];
                                for (let i = 0; i < arr.length; i++) {
                                    this.$_bumen_$.push(arr[i]);
                                    if (arr[i].child) {
                                        this.$_hy_$(arr[i]);
                                    }
                                }
                                this.$_data_$ = this.$_digui_$(arr);
                            }
                        }
                    }
                });
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
            // 删除
            $_remove_$(row) {
                this.id = row.employeeId;
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>确定要删除这条记录吗?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/company/attendance/exclude/delete',
                            data: {
                                employeeIds: this.id
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message);
                                    this.$_list_$()
                                } else {
                                    this.$Message.error('数据删除失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            $_tjok_$() {
                this.$Message.info('添加员工成功');
            },
            $_tjcancal_$() {
                this.$Message.info('已取消');
            },
            $_choice_$(rep) {
                this.checkAllGroup = [];
                if (rep.length > 0) {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/company/company/${this.$_userInfo_$.enterpriseId}/department/${rep[0].id}/employee`,
                        data: {}
                    }).then(rsp => {
                        this.$_djqForm_$.recvCount = rsp.data.data.records.length;
                        this.$_ygNum_$ = rsp.data.data.records.length;
                        if (rsp.data.data.records.length > 0) {
                            this.$_ygInfo_$ = rsp.data.data.records;
                            this.$_ygList_$ = rsp.data.data.records;
                        }
                    });
                }
            },
            //展开树形菜单
            /*$_selectTree_$(rep) {
                if (rep.parentId == 'top') {
                    this.$_sendQuery_$({
                        method: "GET",
                        url: `${this.$_global_$.serverPath}/company/company/${rep.id}/department`,
                    }).then(res => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                if (res.data.data) {
                                    this.$_bumen_$ = [];
                                    for (let i = 0; i < res.data.data.length; i++) {
                                        this.$_bumen_$.push(res.data.data[i]);
                                        if (res.data.data[i].child) {
                                            this.$_hy_$(res.data.data[i]);
                                        }
                                    }
                                    let bumen = this.$_dg_$(this.$_bumen_$);
                                    this.$_data_$[rep.index].children = bumen;
                                }
                            }
                        }
                    });
                }
            },*/
            //数据还原
            $_hy_$(node, num = 0) {
                if (!node) {
                    return;
                }
                if (num !== 0) {
                    this.$_bumen_$.push(node);
                }
                num++;
                if (node.child && node.child.length > 0) {
                    let i = 0;
                    for (i = 0; i < node.child.length; i++) {
                        this.$_hy_$(node.child[i], num);
                    }
                }
            },
            //菜单递归
            $_dg_$(data) {
                let val = [];
                // 删除 所有 children,以防止多次调用
                data.forEach(function (item) {
                    delete item.children;
                });

                // 将数据存储为 以 id 为 KEY 的 map 索引数据列
                let map = {};
                data.forEach(function (item) {
                    map[item.id] = item;
                });
                data.forEach(function (item) {
                    item.title = item.name;
                    item.children = [];
                    // 以当前遍历项，parentId,去map对象中找到索引的id
                    let parent = map[item.parentId];
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶
                        val.push(item);
                    }
                });
                return val;
            },
            //处理数组
            change(res) {

                this.$_djqForm_$.validity = res;
            },

            $_check_$(e) {
                this.checkAllGroup = [];
                this.$_ygList_$ = [];
                this.$_ygInfo_$ = [];
                if (e.length > 0) {
                    this.spinShow = true;
                    this.$_current_$ = 1;
                    let resData = [];
                    for (let i = 0; i < e.length; i++) {
                        if (e[i].parentId != "top" && e[i].title != "暂无数据") {
                            resData.push(
                                e[i]
                            )
                        }
                    }
                    let status = 1;
                    for (let i = 0; i < resData.length; i++) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/company/company/${this.$_userInfo_$.enterpriseId}/department/${resData[i].id}/employee`,
                            data: {}
                        }).then(rsp => {
                            if (rsp.status === 200) {
                                status *= 1;
                                if (rsp.data.code === 0) {
                                    if (rsp.data.data.records.length > 0) {
                                        for (let j = 0; j < rsp.data.data.records.length; j++) {
                                            this.$_ygList_$.push(rsp.data.data.records[j]);
                                        }
                                        this.$_ygInfo_$ = this.$_ygList_$;
                                    }
                                }
                            } else {
                                status *= -1;
                            }
                            if (i == resData.length - 1) {
                                if (status > 0) {
                                    this.spinShow = false;
                                } else {
                                    this.$_ygList_$ = [];
                                    this.$_ygInfo_$ = [];
                                    this.spinShow = false;
                                    this.$Message.error("获取失败，请重试！！！！");
                                }
                            }
                        })
                    }
                } else {
                    this.$_current_$ = 0;
                }
            },
            $_digui_$(arr) {
                var children = [];
                for (var i = 0; i < arr.length; i++) {
                    var temp = {
                        title: arr[i].name,
                        enterpriseId: arr[i].enterpriseId,
                        id: 0,
                        parentId: arr[i].parentId,
                    };
                    if (arr[i].id) {
                        temp.id = arr[i].id;
                    }
                    ;
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child)
                    }
                    children.push(temp)
                }
                return children;
            },
            //json数据去重
            UniquePay(paylist) {
                let payArr = [paylist[0]];
                for (let i = 1; i < paylist.length; i++) {
                    let payItem = paylist[i];
                    let repeat = false;
                    for (let j = 0; j < payArr.length; j++) {
                        if (payItem.id == payArr[j].id) {
                            repeat = true;
                            break;
                        }
                    }
                    if (!repeat) {
                        payArr.push(payItem);
                    }
                }
                return payArr;
            },
            $_newData_$(e) {
                let arr = [];
                for (let i = 0; i < e.length; i++) {
                    for (let j = 0; j < this.$_ygList_$.length; j++) {
                        if (e[i] === this.$_ygList_$[j].id) {
                            arr.push(this.$_ygList_$[j]);
                        }
                    }
                }
                this.$_ygInfo_$ = arr;
            }
        },
        watch: {
            checkAllGroup(curVal, oldVal) {
                if (curVal.length > 0) {
                    this.$_current_$ = 1;
                    this.$_ygNum_$ = 0;
                    this.$_ygNum_$ = curVal.length;
                } else {
                    this.$_ygNum_$ = 0;
                    this.$_current_$ = 0;
                }
            },
            $_ygList_$(newData, oldData) {
                if (newData.length > 0) {
                    for (let i = 0; i < newData.length; i++) {
                        for (let j = 0; j < this.$_ymq_$.length; j++) {
                            if (newData[i].id == this.$_ymq_$[j].employeeId) {
                                newData = newData.splice(i, 1);
                            }
                        }
                    }
                    this.$_ygNum_$ = 0;
                    let res = this.UniquePay(newData);
                    this.checkAllGroup = [];
                    this.$_ygNum_$ = res.length;
                    for (let k = 0; k < res.length; k++) {
                        this.checkAllGroup.push(res[k].id);
                    }
                }
            }

        },
    }
</script>