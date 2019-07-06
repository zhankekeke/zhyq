<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .ivu-table .demo-table-info-row td {
        background-color: #2db7f5;
        color: #fff;
    }
</style>

<template>
    <div>
        <Row>
            <Col span="4"><span style="font-size:16px; font-weight: bold">分类管理</span></Col>
            <Col span="4" offset="16" align="right">
                <Button style="margin-bottom: 20px;" type="primary" @click="$_addSort_$()">添加分类</Button>
                <Modal v-model="$_modelClass_$" title="添加分类" :mask-closable="false" :closable="false">
                    <Form ref="$_newClass_$" :model="$_newClass_$" :rules="$_ruleValidate_$" :label-width="80">
                        <FormItem label="分类名称" prop="name">
                            <Input v-model="$_newClass_$.name" placeholder="请输入分类名称"></Input>
                        </FormItem>
                        <FormItem label="排序号" prop="sortNum">
                            <Input v-model="$_newClass_$.sortNum" placeholder="请输入排序号"></Input>
                        </FormItem>
                    </Form>
                    <div slot="footer">
                        <Button size="large" @click="$_quit_$('$_newClass_$')">取消</Button>
                        <Button type="primary" size="large" @click="$_createNew_$">确定</Button>
                    </div>
                </Modal>
                <Modal v-model="$_modelClassUP_$" title="编辑分类" :mask-closable="false" :closable="false">
                    <Form ref="$_newRolev_$" :model="$_newRolev_$" :rules="$_ruleValidate_$" :label-width="80">
                        <FormItem label="分类名称" prop="name">
                            <Input v-model="$_newRolev_$.name" placeholder="请输入分类名称"></Input>
                        </FormItem>
                        <FormItem label="排序号" prop="sortNum">
                            <Input v-model="$_newRolev_$.sortNum" placeholder="请输入排序号"></Input>
                        </FormItem>
                    </Form>
                    <div slot="footer">
                        <Button size="large" @click="$_quit_$('$_newRolev_$')">取消</Button>
                        <Button type="primary" size="large" @click="$_updateClassify_$">确定</Button>
                    </div>
                </Modal>
            </Col>

        </Row>
        <Row>
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
        </Row>
    </div>
</template>

<script>
    import controler from './controler.js'
    import expandRow from './tableExpand.vue'

    export default {
        mixins: [controler],
        components: {expandRow},
        data() {
            return {
                $_userInfo_$: '',
                $_newClass_$: {id: '', name: "", sortNum: ''},
                $_newRolev_$: {id: '', name: "", sortNum: ''},
                $_modelClass_$: false,
                $_modelClassUP_$: false,
                // $_paramsID_$: '',
                $_columns7_$: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    $_row_$: params.row.id
                                },
                            })
                        }
                    },
                    {
                        title: '服务分类名称',
                        key: 'name',
                        align: 'center',
                        width: 300,
                    },
                    {
                        title: '排序号',
                        key: 'sortNum',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                        render: (h, params) => {
                            let text='';
                            if(params.row.createTime && params.row.createTime!=''){
                                text=this.FormatAllDate(params.row.createTime)
                            }
                            return h('span', {
                                props: {},
                            }, text)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                             params.status = params.row.putaway == 1 ? '上架' : '下架';
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: "#f56c6c"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params)
                                        }
                                    }
                                }, '删除'),
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
                                            let a = JSON.parse(JSON.stringify(params.row));
                                            this.$_edit_$(a)
                                        }
                                    }
                                }, '编辑'),
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
                                            this.$_change_$(params)
                                        }
                                    }
                                }, params.status),

                            ]);
                        }
                    }
                ],
                $_data6_$: [],
                // 新建角色验证规则
                $_ruleValidate_$: {
                    name: [
                        {required: true,message: '分类名称不能为空', trigger: 'change'},
                        {type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                        {
                          type:'string', max: 20,message: '分类名称不能超过20字',trigger: 'change'
                        }
                    ],
                    sortNum: [
                        {required: true, message: '请输入排序码', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'}
                    ],
                },
            }
        },

        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);

            this.$_queryClassifyList_$();
        },
        methods: {
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
            $_addSort_$() {
                this.$_modelClass_$ = true;
            },
            $_edit_$(params) {
                params.sortNum = params.sortNum + '';
                this.$_newRolev_$ = params;
                this.$_modelClassUP_$ = true;
            },
            $_remove_$(params) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认删除该分类吗</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/classify/delClassify`,
                            data: {id: params.row.id},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_queryClassifyList_$();
                                    this.$Message.success('删除成功');
                                } else {
                                    this.$Message.error('删除失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                    }
                })
            },
            $_change_$(params) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认${params.status}该分类吗</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/classify/upAndDownClassify`,
                            data: {id: params.row.id, putaway: 1-params.row.putaway},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_queryClassifyList_$();
                                    this.$Message.success('操作成功');
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                    }
                })
            },
            $_updateClassify_$(parmas) {
                this.$refs.$_newRolev_$.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/classify/updateClassify`,
                            data: {
                                id: this.$_newRolev_$.id,
                                name: this.$_newRolev_$.name,
                                sortNum: this.$_newRolev_$.sortNum,
                                level: 1,
                                zoneId: this.$_userInfo_$.zoneId,
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_queryClassifyList_$();
                                    this.$Message.success('修改成功!');
                                    this.$_modelClassUP_$ = false;
                                } else {
                                    this.$Message.error('修改失败!');
                                }
                            }
                        })

                    } else {
                        // this.$Message.error('角色创建失败!');
                    }
                })
            },

            $_quit_$(name) {
                this.$_modelClass_$ = false;
                this.$_modelClassUP_$ = false;
                this.$refs[name].resetFields();
                this.$Message.error('已取消!');
            },
            $_createNew_$() {
                this.$refs.$_newClass_$.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/steward/classify/createClassify`,
                            data: {
                                name: this.$_newClass_$.name,
                                sortNum: this.$_newClass_$.sortNum,
                                level: 1,
                                zoneId: this.$_userInfo_$.zoneId,
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('添加分类成功!');
                                    this.$_queryClassifyList_$();
                                    this.$_modelClass_$ = false;
                                    this.$refs['$_newClass_$'].resetFields();
                                } else {
                                    this.$Message.error('添加分类失败!');
                                }
                            }
                        })

                    } else {
                        // this.$Message.error('角色创建失败!');
                    }
                })
            },

            $_queryClassifyList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/steward/classify/queryClassifyList`,
                    data: {zoneId: this.$_userInfo_$.zoneId, level: 1},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
        }
    }
</script>