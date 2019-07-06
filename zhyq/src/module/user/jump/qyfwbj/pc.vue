<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .zdtb {
        font-size: 12px;
        color: #666;
        margin-left: 100px;
        width: 660px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';

    }

    .bg {

        background: #efefef;
        padding: 10px;
    }

    .mt10 {
        margin-top: 10px;
    }

    .mr5 {
        margin-right: 5px;
    }

    .icon {
        color: rgb(80, 80, 192);
    }

    .bg-lp {
        background: rgba(230, 243, 252, 1);
        padding: 5px;
        border: 1px solid rgba(212, 240, 252, 1);
    }

    .mr5 {
        margin-right: 5px;
    }

    .ivu-icon {
        font-size: 20px;
        vertical-align: middle;
    }

    .top-line span {
        vertical-align: middle;
        width: 40%;
    }

    .top-line Select {
        vertical-align: middle;
    }

    .ivu-input-wrapper {
        vertical-align: middle;
        width: 60%;
    }

    .top-height {
        height: 76px;
    }

    >>>.el-input__inner {
        height: 30px;
        font-size: 12px;
    }
    >>> .el-form-item__label {
        font-size: 12px;
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
    <div class="zdtb">
        <!-- 服务编辑 -->
        新增服务
        <br/>
        <div>
            <el-form ref="editForm" :model="$_editForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="服务名称" prop="name">
                    <el-input v-model="$_editForm_$.name" placeholder="输入服务名称"></el-input>
                </el-form-item>
                <el-form-item ref="file" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            :show-file-list="false"
                            ref="uploads"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="$_file_$.length==1" :src="$_file_$[0]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span  style="color: #f00">建议图片尺寸：124*85</span>
                </el-form-item>
                <el-form-item label="服务分类" prop="classify">
                    <el-select v-model="$_editForm_$.parentId" prop="parent" @change="changeParent" placeholder="请选择">
                        <el-option v-for="item in parentSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_editForm_$.categoryId" prop="child" placeholder="请选择">
                        <el-option v-for="item in childSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务介绍" prop='description'>
                    <quill-editor ref="myTextEditor" v-model="$_editForm_$.description" :options="quillOption"></quill-editor>

                </el-form-item>
                <el-form-item label="服务排序号" prop='sortNum'>
                    <el-input v-model.number="$_editForm_$.sortNum" placeholder="输入服务排序号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="$_editmodal_$()">取 消</Button>
                <Button type="primary" @click="$_editOk_$()">确 定</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import controler from './controler.js';
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option} from 'element-ui';
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'

    export default {
        mixins: [controler],
        components: {
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Upload.name]: Upload,
            [Select.name]: Select,
            [Option.name]: Option,
            quillEditor
        },
        data() {
            const serviceclassify = (rule, value, callback) => {
                if(this.$_editForm_$.parentId){
                    if(this.$_editForm_$.categoryId){
                        callback();
                    }else{
                        callback('请选择二级分类');
                    }
                }else{
                    callback('请选择一级分类');
                }
            };
            const validateimg = (rule, value, callback) => {
                if (this.$_file2_$.length > 0 ) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                quillOption: quillConfig,
                editorOption: {modules: {toolbar: '#toolbar'}},
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '问题名称不能为空', trigger: 'change'},
                        {type: 'string', validator: this.$_validatestr_$, trigger: 'change'},
                        {
                            type: 'string', max: 20, message: '服务名称不能超过20字', trigger: 'change'
                        }
                    ],
                    classify: [
                        {required: true, validator: serviceclassify, trigger: "change"},
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}
                    ],
                    // description: [
                    //     {type: 'string', max: 500, message: '服务介绍不能超过500字', trigger: 'change'}
                    // ],
                    sortNum: [
                        {type: 'number', message: '分类排序必须是数字', trigger: 'change'},
                        {type: 'number', max: 9999, message: '分类排序不能超过9999', trigger: 'change'}
                    ],

                },
                parentSelect: [], // 一级分类列表
                parent: [],
                zoneId: 0,
                categoryId: 0,
                childSelect: [], // 子分类列表
                $_file_$: [], // 图片上传
                $_file2_$: [], // 图片上传数据库
                baseUrl: this.$_global_$.imgPath,
                $_editForm_$: {}, // 编辑表单
                $_userInfo_$: {}, // 编辑表单
                imageList: [], // 编辑用图片回显
                child: 0,  // 子分类id
                parentId: 0,  // 一级分类id
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.zoneId = this.$_userInfo_$.zoneId;
            this.$_editForm_$ = this.$root.inparams.row;
            this.imageList.push({url: this.$_editForm_$.imageUrl});
            this.$_file_$.push(this.$_global_$.imgPath+this.$_editForm_$.imageUrl);
            this.$_file2_$.push(this.$_editForm_$.imageUrl);
            this.$_list_$();
            this.$_xqlist_$();

        },
        methods: {
            //获取服务详情
            $_xqlist_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + '/zone/zone/' + this.$_userInfo_$.zoneId + '/enterprise/service/' + this.$_editForm_$.id,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_editForm_$ = rsp.data.data
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.$_userInfo_$.zoneId}/service/category/${this.$_editForm_$.parentId}/pageList`,
                                data: {},
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        var arr = rsp.data.data.records
                                        this.childSelect = [];
                                        for (var i = 0; i < arr.length; i++) {
                                            var temp = {};
                                            temp = {
                                                label: arr[i].name,
                                                value: arr[i].id
                                            };

                                            this.childSelect.push(temp)
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            },
            // 获取一级分类
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/zone/zone/' + this.$_userInfo_$.zoneId + '/service/category/' + this.categoryId + '/pageList',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records;
                            for (var i = 0; i < arr.length; i++) {

                                if(arr[i]['status']==1){
                                    var select = {};
                                    select = {
                                        value: arr[i].id,
                                        label: arr[i].name
                                    };
                                    this.parentSelect.push(select);
                                }
                            }
                        }
                    }
                })
            },

            // 获取一级分类下的子分类
            changeParent(value) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/service/category/${value}/pageList`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            this.childSelect = []
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };

                                this.childSelect.push(temp);
                                this.$_editForm_$.categoryId = '';
                            }
                        }
                    }
                })
            },
            $_editmodal_$() {
                this.$root.$_Route_$('user', 'bzzx', 'qyfw', {})
            },
            // 编辑保存
            $_editOk_$() {
                this.$_editForm_$.imageUrl = this.$_file2_$.join(';');
                if (this.$_editForm_$.sortNum !== '') {
                    this.$_editForm_$.sortNum = Number(this.$_editForm_$.sortNum)
                } else {
                    this.$_editForm_$.sortNum = 0
                }
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_userInfo_$.zoneId}/enterprise/service/${this.$_editForm_$.id}`,
                            data: {
                                name: this.$_editForm_$.name,
                                imageUrl: this.$_editForm_$.imageUrl,
                                categoryId: this.$_editForm_$.categoryId,
                                description: this.$_editForm_$.description,
                                sortNum: this.$_editForm_$.sortNum
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message);
                                    this.$root.$_Route_$('user', 'bzzx', 'qyfw', {})
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
                this.$_file_$ = [];
                this.$_file2_$ = [];
                this.fileChangeEdit(fileList);
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = '';
                let b = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str;
                                b = temp_str

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
            fileRmoveEdit(fileList) {
                let a = '';
                let b = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str;
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
        },
        props: {
            value: {type: String}, /*上传图片的地址*/
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    }
</script>