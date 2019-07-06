<style scoped>
    .lm {
        margin-left: 100px;
        width: 400px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }

    .el-input {
        width: 520px;
    }
    >>>.avatar-uploader{
        width: 520px;
    }
    .el-select {
        width: 280px;
    }

    >>> .el-input__inner {
        height: 30px;
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

</style>
<template>
    <div class="lm">
        编辑停车场
        <br/>
        <div>
            <el-form ref="addForm" :model="formInfo" :rules="formRuleValidate" label-width="100px">
                <el-form-item label="所属园区" prop="zoneId">
                    <el-select v-model="formInfo.zoneId" disabled placeholder="请选择园区">
                        <el-option
                                v-for="item in zoneList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item ref="file" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action='this.$_global_$.imgUploadPath'
                            list-type="picture-card"
                            ref="upload"
                            :show-file-list="true"
                            :file-list="imageList"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="color: #f00">建议图片尺寸：290*170</span>
                </el-form-item>
                <el-form-item label="停车场名称" prop="name">
                    <el-input v-model="formInfo.name" placeholder="请输入停车场名称"></el-input>
                </el-form-item>
                <el-form-item label="车位数" prop="placeNumber">
                    <el-input v-model="formInfo.placeNumber" placeholder="请输入车位数"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="formInfo.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="对接厂商" prop="configDescription">
                    <el-input v-model="formInfo.configDescription" placeholder="请输入对接厂商"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="onBack">取 消</Button>
                <Button type="primary" @click="onSure()">确 定</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import {Table, Button, TableColumn, Form, Dialog, Input, FormItem, Select, Upload, Option} from 'element-ui';
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        mixins: [controler],
        components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [TableColumn.name]: TableColumn,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Upload.name]: Upload,
            [Option.name]: Option,
        },
        data() {

            return {
                formInfo: {
                    name: '',
                    address: '',
                    description: '',
                    placeNumber: '',
                    images: '',
                    file: '',
                    configDescription: '',
                    zoneId: '',
                },
                formRuleValidate: {
                    name: [
                        {required: true, message: '请输入停车场名称!', trigger: 'change'},
                        {type: 'string', validator: this.$_validatestr_$, trigger: 'change'},
                        {
                            type: 'string', max: 20, message: '名称不能超过20字', trigger: 'change'
                        }
                    ],
                    placeNumber: [
                        {required: true, message: '车位数不能为空!', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {type: 'string', max: 6, message: '数字不能超过6位数', trigger: 'change'}
                    ],
                    address: [
                        {required: true, message: '地址不能为空!', trigger: 'change'},
                        {type: 'string', max: 200, message: '地址不能超过20字', trigger: 'change'}
                    ],
                    zoneId: [
                        {required: true, message: '园区不能为空!', trigger: 'change'},
                    ],
                },
                $_file_$: [],
                zoneList: [],
                imageList: [],
            };
        },
        created() {
            let row = this.$root.inparams.row;

            this.formInfo = row;
            this.formInfo.placeNumber = row.placeNumber.toString();
            this.zoneList = this.$root.inparams.zoneList;
            for (var i = 0; i < this.formInfo.images.length; i++) {
                this.imageList[i] = {};
                this.imageList[i].url = this.$_global_$.imgPath + this.formInfo.images[i].imageUrl;
                this.imageList[i].response={code:0,data:this.formInfo.images[i].imageUrl,message:""};

                this.$_file_$[i] = {imageUrl: ''};
                this.$_file_$[i].imageUrl = this.formInfo.images[i].imageUrl;
            }
        },
        methods: {
            onSure() {
                this.$set(this.formInfo, "images", this.$_file_$); // 向表单数据中添加图片数组

                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: this.$_global_$.serverPath + `/zone/zone/${this.formInfo.zoneId}/parkinglot`,
                            data: {
                                id: this.formInfo.id,
                                images: this.formInfo.images,
                                name: this.formInfo.name,
                                description: this.formInfo.description,
                                placeNumber: this.formInfo.placeNumber,
                                zoneId: this.formInfo.zoneId,
                                configDescription: this.formInfo.configDescription,
                                address: this.formInfo.address
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('数据更新成功!');
                                    this.onBack();
                                } else {
                                    this.$Message.error('数据更新失败!');
                                }
                            }
                        })
                    } else {
                        this.$Message.error('请按照提示进行修改');
                    }
                })
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.formInfo.file = res.data;
                this.fileChange(fileList);
                // this.$refs.file.clearValidate();
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {};
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
                this.$_file_$.push(a)
            },

            // 阻止upload的自己上传，进行再操作
            beforeupload(file) {
                return this.isLtMB(file);
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {};
                this.$_file_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = {imageUrl:temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                            this.$_file_$.push(a);
                        }
                    }
                }
            }
            ,
            onBack() {
                this.$root.$_Route_$("superadmin", "sssManage", "parkManage",{zoneId:this.formInfo.zoneId});
            }
        },

    };
</script>