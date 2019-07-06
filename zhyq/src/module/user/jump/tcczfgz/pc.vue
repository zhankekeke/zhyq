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
        <div style="margin-left: 250px"><h2>停车场支付规则</h2></div>
        <br>
        <div title="停车场支付规则">
            <el-form ref="editForm" :model="$_addForm_$" :rules="addFormValidate" label-width="90px">
                <el-form-item label="规则描述：" prop="payRule">
                    <quill-editor ref="myTextEditor" v-model="$_addForm_$.payRule" :options="quillOption"></quill-editor>

                </el-form-item>
            </el-form>
            <div style="margin-left: 24%">
                <Button type="ghost"  @click="onBack">取 消</Button>
                <Button type="primary" style="margin-left: 20px" @click="$_saveEdit_$()">保 存</Button>
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
                    payRule:'',
                },


                // roomList: [], // 临时保存房间列表
                restaurantSelect: [],  // 餐厅选择

                addFormValidate: {// 新增验证
                    payRule: [
                        // {required: true, message: "请输入餐厅描述", trigger: "change"},
                        {type: 'string', max: 200, message: '不能超过200字', trigger: 'change'},
                        // {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                },
                $_file_$: [],

                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                userInfo:{},  // 当前登录人信息
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.zoneId = this.userInfo.zoneId;
            this.$_bList_$();
        },
        methods: {
            onBack() {
                this.$root.$_Route_$("user", "ssManage", "parkManage");
            },
            // 获取大楼列表
            $_bList_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/parking/rule`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if(rsp.data.data){
                                this.$_addForm_$ = rsp.data.data
                            }else{
                                this.$_addForm_$ = {};
                            }
                           
                        } else {
                            this.$Message.error('获取停车场支付规则失败!');
                        }
                    }
                })
            },

            // 餐厅编辑保存
            $_saveEdit_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/parking/rule`,
                    data: {                               
                        payRule: this.$_addForm_$.payRule,
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            // this.$Message.success("修改餐厅信息成功!")
                            // this.dList()
                            this.$root.$_Route_$("user", "ssManage", "parkManage");
                        } else {
                            this.$Message.error("修改停车场支付规则失败!")
                        }
                    }
                })
                    
            },

            beforeupload(file) {
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.fileChange(fileList);
                this.$refs.file.clearValidate();
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {};
                // let b = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str};
                                // b = {url: this.$_global_$.imgPath + temp_str};
                            }
                        }
                    }
                }
                this.$_file_$.push(a);
                // this.imageList.push(b);
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
                                a = {imageUrl:temp_str};
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