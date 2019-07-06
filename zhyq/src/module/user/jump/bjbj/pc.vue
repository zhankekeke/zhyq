<style scoped>
    .el-input {
        width: 520px;
    }

    .el-select {
        width: 118px;
    }

    .quill-editor {
        width: 520px;
    }

    .ql-toolbar.ql-snow {
        padding: 0;
    }

    >>> .el-input__inner {
        height: 30px!important;
        font-size: 12px;
    }

    >>> .el-form-item__label {
        font-size: 12px;
    }

    >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

    >>> .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }
    >>>.el-select .el-tag{
        margin:4px 0 2px 6px;
    }

</style>
<template>
    <div>
        <div title="更新餐厅信息">
            <el-form ref="editBjForm" :model="$_editBjForm_$" :rules="editBjFormValidate" label-width="90px">
                <el-form-item ref="file" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
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
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="onBack">取 消</Button>
                <Button type="primary" @click="$_editBj_$()">保 存</Button>
            </div>
        </div>
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
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片');
                }
            };
            return {
                quillOption: quillConfig,

                editorOption: {modules: {toolbar: '#toolbar'}},
                row: {},
                zoneId: 0, // 园区id

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

                imageList: [], // 编辑图片回显
                $_file_$: [],

            };
        },
        created() {
            this.$_edit_$();
        },
        methods: {
            //编辑
            $_edit_$() {

                this.$_editBjForm_$ = {};
                this.$_editBjForm_$ = this.$root.inparams.row;
                this.zoneId = this.$_editBjForm_$.zoneId;

                this.imageList = [];
                this.$_file_$ = [];
                this.$_file_$ = this.$_editBjForm_$.images;
                if (this.$_editBjForm_$.images.length > 0) {
                    for (let i = 0; i < this.$_editBjForm_$.images.length; i++) {
                        this.imageList.push({
                            url: this.$_global_$.imgPath + this.$_editBjForm_$.images[i].imageUrl,
                            response:{code:0,data:this.$_editBjForm_$.images[i].imageUrl,message:""}
                        })
                    }
                }
            },
            onBack() {
                this.$root.$_Route_$("user", "ssManage", "diningManage");
            },

            // 餐厅编辑保存
            $_editBj_$() {
                this.$set(this.$_editBjForm_$, 'images', this.$_file_$);
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
                                    this.onBack();
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    }
                })

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
                this.fileChangeEdit(fileList);
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl:temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.push(a);
            },
            // 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = {};
                this.$_file_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response.code === 0) {
                            temp_str = fileList[i].response.data;
                            a = {imageUrl:temp_str};
                        }else{
                            this.$Message.error(fileList[i].response.message);
                        }
                        this.$_file_$.push(a);
                    }
                }

            },
        },
        props: {
            value: {type: String}, /*上传图片的地址*/
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    };
</script>