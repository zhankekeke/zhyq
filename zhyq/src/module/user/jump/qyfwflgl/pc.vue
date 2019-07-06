<style scoped>
    .ivu-table .demo-table-info-row td {
        background-color: #2db7f5;
        color: #fff;
    }

    /**ele弹窗样式修改*/
    >>> .el-input__inner {
        height: 32px;
        line-height: 32px;
    }

    >>> .el-dialog__header {
        border-bottom: 1px solid #e9eaec;
    }

    >>> .el-dialog__title {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #1c2438;
        font-weight: 700;
        overflow-y: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    >>> .el-dialog__footer {
        border-top: 1px solid #e9eaec;
        padding: 12px 18px;
        text-align: right;
    }

    >>> .el-upload--picture-card {
        width: 118px;
        height: 118px;
        line-height: 118px;
    }
    /*上传图片样式*/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 18px;
        color: #8c939d;
        width: 118px;
        height: 118px;
        line-height: 118px;
        text-align: center;
    }

    .avatar {
        width: 116px;
        height: 116px;
        display: block;
    }
</style>

<template>
    <div>
        <Row>
            <Col span="4"><span style="font-size:16px; font-weight: bold">分类管理</span></Col>
            <Col span="12" offset="8" align="right">
                <Button type="primary" @click="$_addSort_$()">添加分类</Button>
                <!-- <Button type="primary" @click="$_addChildSort_$()">添加子分类</Button> -->
            </Col>
        </Row>
        <br>
        <Row>
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
        </Row>
        <!-- 添加分类 -->
        <el-dialog title="添加分类" :visible.sync="$_addmodal_$" :show-close="false" :close-on-click-modal="false" width="520px" top="40px">
            <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="分类名称" prop="name" placeholder="请输入分类名称">
                    <el-input v-model="$_addForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            :show-file-list="false"
                            ref="uploads"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="$_file_$.length==1" :src="$_file_$[0]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNum" placeholder="请输入排序号">
                    <el-input v-model="$_addForm_$.sortNum"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-select v-model="$_addForm_$.parentId" prop="parentId" placeholder="请选择">
                        <el-option v-for="item in parentSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <Button size="large" @click="$_quit_$('addForm')">取 消</Button>
                <Button size="large" type="primary" @click="$_addOK_$()">确 定</Button>
            </div>
        </el-dialog>
        <!-- 编辑分类 -->
        <el-dialog title="编辑分类" :visible.sync="$_editmodal_$" :show-close="false" :close-on-click-modal="false" width="520px" top="40px">
            <el-form ref="editForm" :model="$_editForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="$_editForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            :show-file-list="false"
                            ref="uploads"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="$_file_$.length==1" :src="$_file_$[0]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNum">
                    <el-input v-model="$_editForm_$.sortNum"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <Button size="large" @click="$_quit_$('editForm')">取 消</Button>
                <Button size="large" type="primary" @click="$_addEdit_$()">确 定</Button>
            </div>
        </el-dialog>
        <!-- 新增子分类 -->
        <el-dialog title="新增子分类" :visible.sync="$_addChildmodal_$" :show-close="false" :close-on-click-modal="false" width="520px" top="100px">
            <el-form ref="addCForm" :model="$_addcForm_$" :rules="$_addChildRuleValidate_$" label-width="90px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="$_addcForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNum">
                    <el-input v-model="$_addcForm_$.sortNum"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-select v-model="$_addcForm_$.parentId" prop="parentId" placeholder="请选择">
                        <el-option v-for="item in parentSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <Button size="large" @click="$_quit_$('addCForm')">取 消</Button>
                <Button size="large" type="primary" @click="$_addChild_$()">确 定</Button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import controler from './controler.js'
    import expandRow from './tableExpand.vue'
    import axios from 'axios'
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            expandRow,
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Upload.name]: Upload,
            [Select.name]: Select,
            [Option.name]: Option
        },
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file2_$.length > 0 ) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                $_file_$: [], //图片
                $_file2_$: [], //图片上传数据库
                baseUrl: this.$_global_$.imgPath,
                $_columns7_$: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                on: {
                                    getparentlist:this.list
                                },
                                props: {
                                    $_row_$: params.row.id,
                                    $_parentSelect_$: this.parentSelect
                                },
                            })
                        }
                    },
                    {
                        title: '服务分类名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '图标',
                        key: 'icon',
                        align: 'center',
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: this.$_global_$.imgPath + params.row.icon,
                                    width: "40px",
                                    height: "40px"
                                }
                            })
                        }
                    },
                    {
                        title: '排序号',
                        key: 'sortNum',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createDate',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if (params.row.status == 0) {
                                a = "下架";
                            }
                            if (params.row.status == 1) {
                                a = "上架";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            var a
                            if (params.row.status == 0) {
                                a = '上架'
                            }
                            if (params.row.status == 1) {
                                a = '下架'
                            }
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
                                            this.$_remove_$(params.row)
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
                                            if (params.row.status == 0) {
                                                this.$_upShelf_$(params.row)
                                            }
                                            if (params.row.status == 1) {
                                                this.$_downShelf_$(params.row)
                                            }
                                        }
                                    }
                                }, a),

                            ]);
                        }
                    }

                ],
                $_data6_$: [], // 表格数据
                id: 0, // 展开时获取
                zoneId: 0,  // 展开时获取
                $_addmodal_$: false, // 添加分类
                $_addForm_$: {  // 新增表单
                    name: '',
                    sortNum: ''
                },
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '分类名称不能为空', trigger: 'change'},
                        {type: 'string', validator: this.$_validatestr_$, trigger: 'change'},
                        {type: 'string', max: 20, message: '分类名称不能超过20字', trigger: 'change'}
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}
                    ],
                    sortNum: [
                        {required: true, message: '请输入排序码', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'},
                        {max: 6, message: '分类排序不能超过6位数', trigger: 'change'}
                    ],
                },
                $_editmodal_$: false, // 编辑分类
                $_editForm_$: {}, // 编辑表单
                $_userInfo_$: {},
                $_addChildmodal_$: false, // 新增子分类
                $_addcForm_$: {
                    parentId: '',
                    name: '',
                    sortNum: ''
                },
                $_addChildRuleValidate_$: {
                    name: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ], parentId: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                },
                parentSelect: []
            }
        },
        created() {
            this.$_global_$.serverPath
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.list();
            // this.$_list_$()
        },
        methods: {
            // 列表数据
            list() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/zone/zone/' + this.$_userInfo_$.zoneId + '/service/category/0/pageList',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data.records;
                            this.$_data6_$ = arr;
                            this.parentSelect = [];
                            for (let i = 0; i < arr.length; i++) {
                                let select = {};
                                select = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                };
                                this.parentSelect.push(select)
                            }
                        }
                    }
                })
            },
            //取消弹窗
            $_quit_$(name) {
                this.$_addmodal_$ = false;
                this.$_editmodal_$ = false;
                // this.$_addChildmodal_$ = false;
                if(name=='addForm'){
                    this.$_file_$ = [];
                    this.$_file2_$ = [];
                }
                this.$refs[name].resetFields();
                this.$Message.error('已取消!');
            },
            // 添加分类
            $_addSort_$() {
                this.$refs["addForm"].clearValidate();
                
                for (let key in this.$_addForm_$) {
                    this.$_addForm_$[key] = ''
                }
                this.$_addmodal_$ = true
            },
            // 添加分类确定
            $_addOK_$() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        let Data = {
                            name: this.$_addForm_$.name,
                            sortNum: Number(this.$_addForm_$.sortNum),
                            icon: this.$_file2_$[0]
                        };
                        if (this.$_addForm_$.parentId) {
                            Data.parentId = this.$_addForm_$.parentId;
                        } else {
                            Data.parentId = 0;
                        }
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/` + this.$_userInfo_$.zoneId + `/service/category`,
                            data: Data,
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_addmodal_$ = false;
                                    this.list();
                                    this.$Message.success(rsp.data.message);
                                    this.$refs['addForm'].resetFields();
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    }
                })
            },
            // 删除分类
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认删除该分类吗</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/service/category/${row.id}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.list()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                })
            },
            // 编辑
            $_edit_$(row) {
                this.$_file_$ = [];
                this.$_file2_$ = [];
                row.sortNum = row.sortNum+'';
                this.$_editForm_$ = row;
                if(row.icon){
                    this.$_file_$.push(this.$_global_$.imgPath + row.icon);
                    this.$_file2_$.push(row.icon);
                }
                this.$_editmodal_$ = true
            },
            // 编辑确定
            $_addEdit_$() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: this.$_global_$.serverPath + `/zone/zone/${this.$_editForm_$.zoneId}/service/category/${this.$_editForm_$.id}`,
                            data: {
                                parentId: this.$_editForm_$.parentId,
                                name: this.$_editForm_$.name,
                                sortNum: Number(this.$_editForm_$.sortNum),
                                icon: this.$_file2_$[0]
                            },
                            headers: {"COntent-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.list();
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                                this.$_editmodal_$ = false
                            }
                        })
                    }
                })

            },
            // 分类上线  
            $_upShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/service/category/${row.id}/online`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.list()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            // 分类下线
            $_downShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/service/category/${row.id}/offline`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.list()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                });
            },

            // upload的自己上传
            beforeupload(file) {
                return this.isLtMB(file);
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_file_$ = [];
                this.$_file2_$ = [];
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = '';
                let b = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str;
                                b = temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.push(a);
                this.$_file2_$.push(b);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = '';
                let b = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str;
                                b = temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.pop(a);
                this.$_file2_$.pop(b)
            },

        }
    }
</script>