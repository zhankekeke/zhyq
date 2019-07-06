<style scoped>

    .zdtb {
        font-size: 12px;
        color: #666;
        margin-left: 100px;
        width: 660px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';

    }
    >>>.el-input__inner {
        height: 30px;
        font-size: 12px;
    }

    .el-select {
        /*width: 280px;*/
    }

    .ql-toolbar.ql-snow {
        padding: 0;
    }

    >>> .el-input__inner {
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
    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }


</style>
<template>
    <div class="zdtb">
        <!-- 新增服务 -->
        新增服务
        <br/>
        <div>
            <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="服务名称" prop="name">
                    <el-input v-model="$_addForm_$.name" placeholder="请输入服务名称"></el-input>
                </el-form-item>
                <el-form-item label="服务图标" prop="file">
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
                    <span  style="color: #f00">建议图片尺寸：124*85</span>
                </el-form-item>
                <el-form-item label="服务分类" prop="classify">
                    <el-select v-model="$_addForm_$.parent" prop="parent" @change="changeParent" placeholder="请选择">
                        <el-option v-for="item in parentSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addForm_$.child" prop="child" placeholder="请选择">
                        <el-option v-for="item in childSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务介绍" prop="description">
                    <quill-editor ref="myTextEditor" v-model="$_addForm_$.description" :options="quillOption"></quill-editor>


                </el-form-item>
                <el-form-item label="服务排序号" prop="sortNum">
                    <el-input v-model.number="$_addForm_$.sortNum" placeholder="服务排序号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="$_addmodal_$()">取 消</Button>
                <Button type="primary" @click="$_addOK_$()">确 定</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import controler from './controler.js';
    //import  this.$_sendQuery_$ from ' this.$_sendQuery_$'
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
            [Option.name]: Option
        },
        data() {
            const serviceclassify = (rule, value, callback) => {
                if(this.$_addForm_$.parent){
                    if(this.$_addForm_$.child){
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
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_addForm_$: {  //新增表单
                    name: '',
                    file: '',
                    parent: '',
                    child: '',
                    description: '',
                    sortNum: ''
                },
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '问题名称不能为空', trigger: 'change'},
                        // {type: 'string', validator: this.$_validatestr_$, trigger: 'change'},
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
                $_editmodal_$: false, // 编辑
                $_editForm_$: {}, // 编辑表单
                $_userInfo_$: {}, // 编辑表单
                imageList: [], // 编辑用图片回显
                child: 0,  // 子分类id
                parentId: 0,  // 一级分类id
            }
        },
        created() {
            // this.$_global_$.serverPath
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.zoneId = this.$_userInfo_$.zoneId;
            this.$_list_$();
        },
        methods: {
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
                               
                                    var select = {};
                                    select = {
                                        value: arr[i].id,
                                        label: arr[i].name
                                    };
                                    this.parentSelect.push(select);
                                
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
                            var arr = rsp.data.data.records;
                            this.childSelect = [];
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.childSelect.push(temp);
                                this.$_addForm_$.child = '';
                            }
                        }
                    }
                })
            },
            $_addmodal_$() {
                this.$root.$_Route_$('user', 'bzzx', 'qyfw', {})
            },
            // 添加确定
            $_addOK_$() {
                this.$_addForm_$.imageUrl = this.$_file2_$.join(';');
                if (this.$_addForm_$.sortNum !== '') {
                    this.$_addForm_$.sortNum = Number(this.$_addForm_$.sortNum)
                } else {
                    this.$_addForm_$.sortNum = 0
                }

                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/enterprise/service`,
                            data: {
                                name: this.$_addForm_$.name,
                                categoryId: this.$_addForm_$.child,
                                imageUrl: this.$_addForm_$.imageUrl,
                                description: this.$_addForm_$.description,
                                sortNum: this.$_addForm_$.sortNum
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
                    } else {
                    }
                })

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
                let a = {};
                let b = {};
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
                this.$_file2_$.push(b)
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {};
                let b = {};
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
                this.$_file_$.pop(a);
                this.$_file2_$.pop(b)
            },
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange() {//内容改变事件
            },
            /*点击上传图片按钮*/
            imgClick() {
                /*内存创建input file*/
                var input = document.createElement('input')
                input.type = 'file'
                input.name = this.fileName
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
                input.onchange = this.onFileChange
                input.click()
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var self = this
                var fileInput = e.target
                if (fileInput.files.length == 0) {
                    return
                }
                this.editor.focus()
                if (fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {confirmButtonText: '确定', type: 'warning',})
                }
                var data = new FormData
                data.append('file', fileInput.files[0]);
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.imgUploadPath,
                    data: data
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', this.$_global_$.imgPath + rsp.data.data);
                        }
                    }
                });
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