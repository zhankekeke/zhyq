<style scoped>
    .ivu-table-wrapper {
        border: none
    }

    .ivu-table-row td {
        border: none
    }

    >>> .ivu-table-cell {
        padding: 0;
    }

</style>
<template>
    <div>
        <Table :show-header='false' :border="false" :columns="$_expend_$" :data="boxList" ></Table>
        <!-- 编辑包间 -->
        <el-dialog title="包间基本信息" :visible.sync="$_editdBjModal_$" :close-on-click-modal="closemodal" width="60%">
            <el-form ref="editBjForm" :model="$_editBjForm_$" :rules="editBjFormValidate" label-width="90px">
                <el-form-item ref="file" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="editupload"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                            :file-list="imageList"
                             accept="image/png,image/gif,image/jpg,image/jpeg">

                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="包间名称" prop="name">
                    <el-input v-model="$_editBjForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="包间地址" prop="address">
                    <el-input v-model="$_editBjForm_$.address"></el-input>
                </el-form-item>
                <el-form-item label="容纳人数" prop="peopleNumber">
                    <el-input v-model="$_editBjForm_$.peopleNumber"></el-input>
                </el-form-item>
                <el-form-item label="包间描述" prop="description">
                    <quill-editor ref="myTextEditor" v-model="$_editBjForm_$.description" :options="quillOption"></quill-editor>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_editdBjModal_$ = false">取 消</el-button>
                <el-button type="primary" @click="$_editBj_$()">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        Button,
        Form,
        Dialog,
        Input,
        FormItem,
        Select,
        Upload,
        Option
    } from "element-ui";
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'


    export default {
        components: {
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Upload.name]: Upload,
            [Option.name]: Option,
            quillEditor
        },
        props: {
            boxList: Array,
            restaurantSelect: Array,
            dList: Function,
            value: {type: String}, /*上传图片的地址*/
        },
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                zoneId: 0,
                closemodal: false,  //是否可以通过点击遮罩层关闭 Dialog
                quillOption: quillConfig,

                editorOption: {modules: {toolbar: '#toolbar'}},
                $_expend_$: [
                    //数据表头
                    {
                        title: "序号",
                        type: "index",
                        align: "center",
                    },
                    {
                        title: "缩略图",
                        key: "img",
                        render: (h, params) => {
                            return h("div", {
                                    attrs: {
                                        style: "width:40px;height:40px;"
                                    }
                                },
                                [h("img", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    attrs: {
                                        src: this.$_global_$.imgPath + params.row.images[0].imageUrl,
                                        style: "width: 40px;height: 40px;"
                                    },
                                })]
                            );
                        }
                    },
                    {
                        title: "餐厅名称",
                        key: "name",
                        align: "center"
                    },
                    {
                        title: "地址",
                        key: "address",
                        align: "center"
                    },
                    {
                        title: "容纳人数",
                        key: "peopleNumber",
                        align: "center"
                    },
                    {
                        title: "实时人数",
                        key: "freeCount",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center",
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
                        title: "创建时间",
                        key: "createDate",
                        align: "center",
                        width: 115
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 170,
                        align: "center",
                        render: (h, params) => {
                            var a
                            if (params.row.status == 0) {
                                a = '上架'
                            }
                            if (params.row.status == 1) {
                                a = '下架'
                            }
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                let a = JSON.parse(JSON.stringify(params.row));
                                                this.$_edit_$(a);
                                            }
                                        }
                                    },
                                    "编辑 | "
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        style: {
                                            color: "#f56c6c"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_remove_$(params.row);
                                            }
                                        }
                                    },
                                    "删除"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row);
                                            }
                                        }
                                    },
                                    " | 详情 | "
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                if (params.row.status == 0) {
                                                    this.$_upShelf_$(params.row);
                                                }
                                                if (params.row.status == 1) {
                                                    this.$_abandon_$(params.row);
                                                }
                                            }
                                        }
                                    },
                                    a
                                )

                            ]);
                        }
                    }
                ],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_editdBjModal_$: false,
                $_editBjForm_$: {
                    // 包间表单
                    name: "",
                    address: "",
                    peopleNumber: "",
                    description: ""
                },
                editBjFormValidate: {
                    // 包间新增验证
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}],
                    name: [
                        {required: true, message: "请输入包间名称", trigger: "change"},
                        {type: 'string', max: 50, message: '不能超过50字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    address: [
                        // {required: true, message: "请输入包间地址", trigger: "change"},
                        {type: 'string', max: 100, message: '不能超过100字', trigger: 'change'},],
                    // {validator: this.$_validatestr_$, trigger: 'change'}],
                    description: [
                        {required: true, message: "描述不能为空", trigger: "change"},
                        {type: 'string', max: 200, message: '不能超过200字', trigger: 'change'}],
                    peopleNumber: [
                        {required: true, message: "请输入容纳人数", trigger: "change"},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {max: 6, message: '不能超过6位数', trigger: 'change'}],
                    restaurantId: [
                        {required: true, message: "必填", trigger: "change"},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                },
                $_file_$: [],
                imageList: [],
            };
        },
        created() {
            // this.$_global_$.serverPath
        },
        methods: {
            // 编辑
            $_edit_$(row) {
                this.$root.$_Route_$("user", "jump", "bjbj", {row:row});
                /*this.$_editBjForm_$ = {};
                this.$_editBjForm_$ = row;
                this.zoneId = this.$_editBjForm_$.zoneId;
                // this.restaurantList();
                this.imageList = [];
                this.$_file_$ = [];
                this.$_file_$ = row.images;
                if (row.images.length > 0) {
                    for (let i = 0; i < row.images.length; i++) {
                        this.imageList.push({
                            url: row.images[i].imageUrl
                        })
                    }
                }
                this.$_editdBjModal_$ = true;*/
            },
            // 编辑包间确定
            $_editBj_$() {
                this.$set(this.$_editBjForm_$, 'images', this.$_file_$)
                this.$refs.editBjForm.validate(valid => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_editBjForm_$.zoneId}/restaurant/${this.$_editBjForm_$.restaurantId}/box/${this.$_editBjForm_$.id}`,
                            data: {
                                name: this.$_editBjForm_$.name,
                                peopleNumber: this.$_editBjForm_$.peopleNumber,
                                address: this.$_editBjForm_$.address,
                                description: this.$_editBjForm_$.description,
                                images: this.$_editBjForm_$.images
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message);
                                    this.$_editdBjModal_$ = false;
                                    this.dList();
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    }
                })

            },
            // 删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认删除?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.restaurantId}/box/${row.id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.dList()
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
            // 详情
            $_detail_$(row) {
                this.$root.$_Route_$('user', 'jump', 'bjxq', {row: row})
            },
            // 下架
            $_abandon_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.restaurantId}/box/${row.id}/offline`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("下架成功!")
                                    this.dList()
                                } else {
                                    this.$Message.error("下架失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            // 上架
            $_upShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.restaurantId}/box/${row.id}/online`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("上架成功!")
                                    this.dList()
                                } else {
                                    this.$Message.error("上架失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            beforeuploadEdit(file) {
                return this.isLtMB(file);
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editBjForm_$.file = res.data;
                this.fileChangeEdit(fileList);
                this.$refs.file.clearValidate();
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: this.$_global_$.imgPath + temp_str}
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str}
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
            },
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    };
</script>