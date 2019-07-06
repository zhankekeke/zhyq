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
        min-height: 30px !important;
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

    >>> .el-select .el-tag {
        margin: 4px 0 2px 6px;
    }

</style>
<template>
    <div>
        <div title="餐厅基本信息" width="60%">
            <el-form ref="addForm" :model="$_addForm_$" :rules="addFormValidate" label-width="90px">
                <el-form-item ref="file" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="true"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            accept="image/png, image/gif, image/jpg, image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="color: #f00">建议图片尺寸：500*300</span>
                </el-form-item>
                <el-form-item label="餐厅名称" prop="name">
                    <el-input v-model="$_addForm_$.name" placeholder="请输入餐厅名称"></el-input>
                </el-form-item>
                <el-form-item label="地址关联" prop="addressDs">

                    <el-select v-model="$_addForm_$.buildingId" @change="changeBuild"
                               placeholder="请选择">
                        <el-option v-for="item in buildSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addForm_$.floorId" @change="changeFloor"
                               placeholder="请选择">
                        <el-option v-for="item in floorSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addForm_$.roomIds" multiple
                               placeholder="请选择" style="width: 275px">
                        <el-option v-for="item in roomSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="$_addForm_$.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="容纳人数" prop="peopleNumber">
                    <el-input v-model="$_addForm_$.peopleNumber" placeholder="请输入容纳人数"></el-input>
                </el-form-item>
                <el-form-item label="视频地址">
                    <el-radio v-model="$_addForm_$.showVideo" label="0">否</el-radio>
                    <el-radio v-model="$_addForm_$.showVideo" label="1">是</el-radio>
                </el-form-item>
                <el-form-item label="实时人数">
                    <el-radio v-model="$_addForm_$.showPeople" label="0">否</el-radio>
                    <el-radio v-model="$_addForm_$.showPeople" label="1">是</el-radio>
                </el-form-item>
                <el-form-item label="预订电话" prop="telephone">
                    <el-input v-model="$_addForm_$.telephone" placeholder="请输入预订电话"></el-input>
                </el-form-item>
                <el-form-item label="餐厅描述" prop="description">
                    <quill-editor ref="myTextEditor" v-model="$_addForm_$.description" :options="quillOption"></quill-editor>

                </el-form-item>
                <el-form-item label="对接厂商">
                    <el-input v-model="$_addForm_$.configDescription"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="onBack">取 消</Button>
                <Button type="primary" @click="$_save_$()">保 存</Button>
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
        Option,
        Radio
    }
        from "element-ui";
    import controler from "./controler.js";
    import "element-ui/lib/theme-chalk/index.css";
    import quillEditor from '../../../public/quillEditor/index';
    import quillConfig from '../../../public/quillEditor/quill-config'


    export default {
        mixins: [controler],
        components: {
            quillEditor,
            // expandTable,
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Upload.name]: Upload,
            [Option.name]: Option,
            [Radio.name]: Radio
        },
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$.length > 0) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validateadrs = (rule, value, callback) => {
                if (this.$_addForm_$.building != "" && this.$_addForm_$.floorId != "" && this.$_addForm_$.roomIds != "") {
                    callback();
                } else {
                    callback('请选择地址');
                }
            };
            const validatephone = (rule, value, callback) => {
                if (!(/^1[345789]\d{9}$/.test(value))) {
                    callback('请输入正确的手机号');
                } else {
                    callback();
                }
            };
            return {
                quillOption: quillConfig,
                editorOption: {modules: {toolbar: '#toolbar'}},
                row: {},
                zoneSelect: [],// 园区列表
                zoneId: 0, // 园区id
                buildId: 0, // 大楼id
                floorId: 0, // 楼层id

                buildSelect: [], // 大楼列表
                floorSelect: [], //楼层列表
                roomSelect: [], //房间列表
                $_diningInfo_$: [],//表格数据
                imageList: [], // 编辑图片回显

                $_addForm_$: {
                    roomIds: [],
                    showPeople: '0',
                    showVideo: '0'
                },

                addFormValidate: {// 新增验证
                    name: [
                        {required: true, message: "请输入餐厅名称", trigger: "change"},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}],
                    addressDs: [
                        {required: true, validator: validateadrs, trigger: "change"}],
                    address: [
                        {required: true, message: "请输入地址", trigger: "change"},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    peopleNumber: [
                        {required: true, message: "请输入容纳人数", trigger: "change"},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {max: 6, message: '不能超过6位数', trigger: 'change'}],
                    description: [
                        {required: true, message: "请输入餐厅描述", trigger: "change"},
                        // {type: 'string', max: 200, message: '不能超过200字', trigger: 'change'},
                        // {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    telephone: [
                        {required: true, validator: validatephone, trigger: 'change'}
                    ],
                },
                $_file_$: [],

                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                // userInfo:{},  // 当前登录人信息
            };
        },
        created() {
            this.zoneId = this.$root.inparams.zoneId;
            this.$_bList_$();
        },
        methods: {

            onBack() {
                this.$root.$_Route_$("superadmin", "sssManage", "diningManage", {zoneId: this.zoneId});
            },
            // 获取大楼列表
            $_bList_$() {
                this.buildSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {value: arr[i].id, label: arr[i].name}
                                this.buildSelect.push(temp)
                            }
                        } else {
                            this.$Message.error('获取大楼列表失败!');
                        }
                    }
                })
            },
            // 获取楼层列表
            $_fList_$() {
                this.floorSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {value: arr[i].id, label: arr[i].name}
                                this.floorSelect.push(temp)
                            }
                        } else {
                            this.$Message.error('获取楼层列表失败!');
                        }
                    }
                })
            },
            // 获取房间列表
            $_rList_$() {
                this.roomSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i].used == 0) {
                                    //used 为0时，代表该房间未被绑定，可以显示
                                    var temp = {}
                                    temp = {value: arr[i].id, label: arr[i].name}
                                    this.roomSelect.push(temp)
                                }
                            }
                        } else {
                            this.$Message.error('获取房间列表失败!');
                        }
                    }
                })
            },
            // 更改大楼
            changeBuild(value) {
                this.buildId = value;
                this.floorSelect = [];
                this.roomSelect = [];
                this.$_addForm_$.floorId = '';
                this.$_addForm_$.roomIds = [];

                this.$_fList_$()

            },
            // 更该楼层
            changeFloor(value) {
                this.floorId = value;
                this.roomSelect = [];
                this.$_addForm_$.roomIds = [];
                this.$_rList_$()
            },
            // 新增餐厅保存
            $_save_$() {
                this.$set(this.$_addForm_$, "images", this.$_file_$); // 向表单数据中添加图片数组
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/restaurant`,
                            data: {
                                floorId: this.$_addForm_$.floorId,
                                roomIds: this.$_addForm_$.roomIds.join(","),
                                images: this.$_addForm_$.images,
                                peopleNumber: this.$_addForm_$.peopleNumber,
                                name: this.$_addForm_$.name,
                                description: this.$_addForm_$.description,
                                buildingId: this.$_addForm_$.buildingId,
                                configDescription: this.$_addForm_$.configDescription,
                                address: this.$_addForm_$.address,
                                telephone: this.$_addForm_$.telephone,
                                showPeople: Number(this.$_addForm_$.showPeople),
                                showVideo: Number(this.$_addForm_$.showVideo)
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    // this.dList();
                                    this.$Message.success('新增餐厅成功!');
                                    this.$root.$_Route_$("superadmin", "sssManage", "diningManage", {zoneId: this.zoneId});
                                } else {
                                    this.$Message.error('新增餐厅失败!');
                                }
                            }else{
                                this.$Message.error(rsp.data.message);
                            }
                        })

                    } else {
                        this.$Message.error("请填写正确的信息!");
                    }
                });

            },

            beforeupload(file) {
                return this.isLtMB(file)
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_addForm_$.file = res.data;
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.push(a);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {};
                this.$_file_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = {imageUrl: temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                            this.$_file_$.push(a);
                        }
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