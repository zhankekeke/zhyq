<style scoped>
    .operation a {
        margin-right: 5px;
    }
</style>
<template>
    <div class="mmdd">
        <div class="mytd">
            <Table :columns="$_columns_$" :data="$_departmentList_$" :show-header=false></Table>
        </div>
        <Modal class='modal' v-model="$_editDepartment_$" title="编辑部门信息" :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="部门名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="部门名称"></Input>
                </FormItem>
                <FormItem label="部门描述" prop="description">
                    <Input v-model="formValidate.description" placeholder="请输入部门描述"></Input>
                </FormItem>
                <FormItem label="上级部门" prop="parentId">
                    <Select v-model="formValidate.parentId" placeholder="请选择上级部门" style="width:260px">
                        <Option v-for="item in $_parentList_$" :value="item.value" :key="item.label">{{ item.label}}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <center><Button type="primary" size="large" @click="$_updatePart_$">保存</Button></center>
                <!-- <Button size="large" @click="$_quit_$">取消</Button>
                <Button type="primary" size="large" @click="$_updatePart_$">确定</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        props: {
            $_row_$: Array,
        },
        data() {
            return {
                $_userInfo_$: '',
                $_editDepartment_$: false,
                formValidate: {
                    id:'',
                    parentId: '',
                    name: '',
                    description: '',
                },
                $_departmentList_$: [],
                $_parentList_$: [],
                $_columns_$: [
                    {
                        title: '序号',
                        key: 'index',
                        align: 'center',

                    }, {
                        title: '部门名称',
                        key: 'label',
                        align: 'center',

                    }, {
                        title: '描述',
                        key: 'description',
                        align: 'center',

                    }, {
                        title: '上级部门',
                        key: 'parentName',
                        align: 'center',

                    }, {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
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
                                            this.$_editPart_$(params.row)
                                        }
                                    }
                                }, '编辑 |'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                         color:'#f00'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],

                // 新建角色验证规则
                ruleValidate: {
                    name: [
                        {required: true, message: '部门名称不能为空', trigger: 'change'},
                        {type:'string',max:20, message: '部门名称不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    description: [
                        {type:'string',max:100, message: '部门描述不能超过100字', trigger: 'change'}
                        
                    ],
                }

            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_departmentList_$ = this.$_row_$[1];
            this.$_parentList_$ = this.$_row_$[0];
        },
        methods: {
            $_quit_$() {
                this.$_editDepartment_$ = false
            },
            $_editPart_$(params) {
                this.formValidate = {
                    id:params.id,
                    parentId: params.parentId,
                    name: params.label,
                    description: params.description,
                };
                this.$_editDepartment_$ = true;
            },
            $_updatePart_$() {
                // this.$refs.formValidate.validate((valid) => {
                //     if (valid) {
                //
                //     }else {
                //         console.log("验证未通过")
                //     }
                // })
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/department`,
                            data: this.formValidate,
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            this.$_quit_$();
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    var arr = rsp.data.data;
                                    this.$root.$_Route_$('company', 'orginza', 'bmmanage', {id: 1})

                                    // this.$_departmentList_$[params.index]=this.formValidate;
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    }
                })
            },
            $_deletePart_$(params) {
                this.$_sendQuery_$({
                    method: "DELETE",
                    url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/department/${params.row.value}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            this.$_departmentList_$.splice(params.index,1)
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_remove_$(params) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认删除该部门吗</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_deletePart_$(params);
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                    }
                })
            },
        }
    }
</script>