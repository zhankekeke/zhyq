<style scoped>
    .lm {
        margin-left: 100px;
        width: 520px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
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
    >>>.el-date-editor .el-range__icon{
        line-height: 22px;
    }
    >>>.el-date-editor .el-range-separator{
        line-height: 22px;
    }
    >>>.el-date-editor .el-range__close-icon{
        line-height: 22px;
    }

    >>> .el-form-item__label {
        font-size: 12px;
    }

    >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

    >>> .el-upload--picture-card {
        width: 148px;
        height: 148px;
        line-height: 148px;
    }

    .plateNumber >>>.el-input__inner{
        text-transform: uppercase;
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
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }

    .avatar {
        width: 146px;
        height: 146px;
        display: block;
    }

</style>
<template>
    <div class="lm">
        新增商品分类
        <br/>
        <div>
            <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="$_addForm_$.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="预览图">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            :show-file-list="false"
                            ref="uploads"
                            :before-upload="beforeupload"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="$_file_$.length==1" :src="$_file_$[0]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类级别" prop="level">
                    <el-select v-model="$_addForm_$.level" placeholder="请选择">
                        <el-option
                                v-for="item in levelList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属父级" v-if="this.$_addForm_$.level == 2">
                    <el-select v-model="$_addForm_$.parent" placeholder="请选择">
                        <el-option
                                v-for="item in catlogList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="可见性" prop="visible">
                    <el-select v-model="$_addForm_$.visible" placeholder="请选择">
                        <el-option
                                v-for="item in visibleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序码" prop="sortNum">
                    <el-input v-model="$_addForm_$.sortNum" placeholder="商品分类排序码（越大越靠前）"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" prop="info">
                    <el-input v-model="$_addForm_$.info" placeholder="请输入分类描述"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="onBack">取 消</Button>
                <Button type="primary" @click="$_addOK_$()">保 存</Button>
            </div>
        </div>
    </div>
</template>
<script>

    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option} from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        components: {
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
            return {
                userInfo: '',
                zoneId: '',
                $_file_$: [], //图片
                $_file2_$: [], //图片上传数据库
                baseUrl: this.$_global_$.imgPath,
                $_addForm_$: {
                    name: '',
                    info: '',
                    level: '',
                    parent: '',
                    visible: '',
                    sortNum: '',
                    image: ''
                },
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '请输入分类名称', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'},
                        {max: 20,message: '长度不能超过20', trigger: 'change'},
                    ],
                    level: [
                        {required: true, message: '请选择分类级别', trigger: 'change'}],
                    visible: [
                        {required: true, message: '请选择是否可见', trigger: 'change'},
                    ],
                    sortNum: [
                        {required: true, message: '请输入排序码', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'}
                    ],
                    info:[
                        {max: 100,message: '长度不能超过100', trigger: 'change'},
                    ]
                },
                levelList: [
                    {value: '1', label: '一级分类'},
                    {value: '2', label: '二级分类'}
                ],
                visibleList: [
                    {value: '0', label: '可见'},
                    {value: '1', label: '不可见'}
                ],
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.zoneId = this.userInfo.zoneId;
            this.$_list_$();
        },
        methods: {
            // 获取分类列表
            $_list_$() {
                this.catlogList = [];
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/catalog/queryCatalogList`,
                    data: {
                        'level': '1',
                        'zoneId': this.zoneId,
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {
                                    value: arr[i].id + '',
                                    label: arr[i].name
                                };
                                if (arr[i].level == 1) {
                                    this.catlogList.push(temp)
                                }
                            }
                        }else{
                            this.$Message.error(rsp.data.message)
                        }
                    }
                })
            },

            // 添加确定
            $_addOK_$() {
                this.$_addForm_$.image = this.$_file2_$.join(';');
                this.$_addForm_$.zoneId = this.zoneId;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        if (this.$_addForm_$.level == 2 && this.$_addForm_$.parent != '') {
                            this.addF()
                        } else if (this.$_addForm_$.level == 1) {
                            this.$_addForm_$.parent != ''
                            this.addF()
                        } else {
                            this.$Message.success("父分类必填")
                        }
                    }
                })
            },
            // 添加请求方法
            addF() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/catalog/createCatalog`,
                    data: this.$_addForm_$,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success(rsp.data.data);
                            this.onBack();
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            //取消
            onBack() {
                this.$root.$_Route_$("user", "jump", "jfspgl", {zoneId:this.zoneId});
            },

            // upload的自己上传
            beforeupload(file) {
                return this.isLtMB(file);
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

        },

    };
</script>