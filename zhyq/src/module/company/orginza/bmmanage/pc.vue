<style scoped>
    .right {
        text-align: right;
        box-sizing: border-box;
        padding-right: 20px;
        margin: 20px 0;
    }

    .modal p {
        line-height: 50px;
        box-sizing: border-box;
        padding-left: 50px;
    }

    .modal p i {
        color: red;
        font-size: 12px;
        margin-right: 10px;
    }

    .modal p textarea {
        vertical-align: text-top;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #495060;
        cursor: text;
    }
</style>
<template>
    <div>
        <Row >
            <Button type="primary" @click="$_addPart_$"  style="float: right">＋新增部门</Button>
        </Row>
        <br>
        <Row>
            <Table :columns="$_columns_$" :data="$_departmentList_$"></Table>
        </Row>
        <!--<Row class="right">-->
        <!--<Col span="14" offset="10">-->
        <!--<Page align="right" :total="total"-->
        <!--show-elevator-->
        <!--@on-change="$_changePage_$"/>-->
        <!--</Col>-->
        <!--</Row>-->

        <!--新增部门 -->
        <Modal class='modal' v-model="$_addDepartment_$" title="增加部门信息">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="部门名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入部门名称"></Input>
                </FormItem>
                <FormItem label="部门描述">
                    <Input v-model="formValidate.description" placeholder="请输入部门描述"></Input>
                </FormItem>
                <FormItem label="上级部门" prop="parentId">
                    <Select v-model="formValidate.parentId" placeholder="请选择上级部门" style="width:260px">
                        <Option v-for="item in $_departmentList1_$" :value="item.value" :key="item.label">{{ item.label}}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <center><Button type="primary" size="large" @click="$_createPart_$">保存</Button></center>
                <!-- <Button size="large" @click="$_quit_$">取消</Button>
                <Button type="primary" size="large" @click="$_createPart_$">确定</Button> -->
            </div>

        </Modal>
        <!-- 编辑 -->
        <Modal class='modal' v-model="$_editDepartment_$" title="编辑部门信息" :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="部门名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入部门名称"></Input>
                </FormItem>
                <FormItem label="部门描述">
                    <Input v-model="formValidate.description" placeholder="请输入部门描述"></Input>
                </FormItem>
                <FormItem label="上级部门" prop="parentId">
                    <Select v-model="formValidate.parentId" placeholder="请选择上级部门" style="width:260px">
                        <Option v-for="item in $_departmentList1_$" :value="item.value" :key="item.label">{{ item.label}}
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
    import controler from './controler.js';
    import expandRow from './tableExpand.vue'

    export default {
        mixins: [controler],
        components: {expandRow},

        data() {
            return {
                $_userInfo_$: '',
                total: 0,
                $_addDepartment_$: false,
                $_editDepartment_$: false,
                formValidate: {
                    id: '',
                    parentId: '',
                    name: '',
                    description: '',
                },
                $_departmentList_$: [],
                $_departmentList1_$: [],


                $_querycfg_$: {
                    mod: 'module',
                    params: {
                        cmd: 4
                    }
                },
                $_columns_$: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    $_row_$: [this.$_departmentList_$, params.row.children, params.index]
                                },
                            })
                        }
                    },
                    {
                        title: '序号',
                        key: 'index',
                        align: 'center',

                    }, {
                        title: '部门名称',
                        key: 'label'
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
                            var a; var b;
                                if(params.row.label == '未分配员工'){
                                  a=""
                                  b=''
                                }else{
                                    a = "编辑 | "
                                    b = '删除'
                                }
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
                                }, a),
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
                                            this.$_remove_$(params.row.value)
                                        }
                                    }
                                }, b)
                            ]);
                        }
                    }
                ],
                ruleValidate: {
                    name: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    id: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],

                }

            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_queryDepartmentList_$()
        },
        methods: {
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                        this.list = rsp.data.obj;
                    }
                }
            },
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_queryDepartmentList_$();
            },
            $_quit_$() {
                this.$_addDepartment_$ = false;
                this.$_editDepartment_$ = false
            },
            $_addPart_$() {
                this.formValidate = {};
                this.$_addDepartment_$ = true;
            },
            $_editPart_$(params) {
                this.formValidate = {
                    id: params.id,
                    parentId: params.parentId,
                    name: params.label,
                    description: params.description,
                };
                this.$_editDepartment_$ = true;
            },
            $_createPart_$() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/department`,
                            data: this.formValidate,
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            this.$_quit_$();
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    var arr = rsp.data.data;
                                    this.$_queryDepartmentList_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    } else {
                    }
                })

            },
            $_updatePart_$() {
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
                                    this.$_queryDepartmentList_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    }
                })
            },
            $_deletePart_$(departmentId) {

                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/department/${departmentId}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    var arr = rsp.data.data;
                                    this.$_queryDepartmentList_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })

            },
            $_remove_$(departmentId) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认删除该部门吗</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_deletePart_$(departmentId);
                    },
                    onCancel: () => {
                    }
                })
            },
            $_queryDepartmentList_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/department`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            
                            for(let i=0;i<arr.length;i++){
                                if(arr[i].name=='未分配员工'){
                                    arr.splice(i,1);
                                }
                            }
                            this.$_departmentList_$ = this.$_digui_$(arr);
                            this.$_departmentList1_$ = this.$_digui_$(arr);
                            // console.log(this.$_departmentList1_$); 
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_digui_$(arr) {
                var children = [];
                for (var i = 0; i < arr.length; i++) {
                    var temp = {
                        value: arr[i].id,
                        enterpriseId: arr[i].enterpriseId,
                        label: arr[i].name,
                        parentId: arr[i].parentId,
                        id: arr[i].id,
                        description: arr[i].description,
                        index: i + 1
                    };
                    if (arr[i].parentName == null) {
                        temp.parentName = "-"
                    }
                    if (arr[i].child != null) {
                        temp.children = this.$_digui_$(arr[i].child)
                    }
                    children.push(temp)
                }
                return children;
            },
        }
    }
</script>