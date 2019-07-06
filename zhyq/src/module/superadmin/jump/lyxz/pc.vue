<style scoped>
    .lm {
        margin-left: 100px;
        width: 400px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
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

    .avatar {
        width: 98px;
        height: 98px;
        display: block;
    }
</style>
<template>
    <div class="lm">
        添加楼宇
        <br/>
        <br/>
        <br/>
        <!-- 新增包间 -->
        <div>
            <!-- 添加楼宇 -->
            <Form ref="buildInfo" :model="buildInfo" :rules="$_ruleValidate_$" :label-width="100">
                <FormItem label="所属园区" prop="zoneId">
                    <Select v-model="buildInfo.zoneId" placeholder="请选择">
                        <Option v-for="item in zoneList" :value="item.value" :key="item.value" slot>{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="楼宇名称" prop="name">
                    <Input v-model="buildInfo.name" placeholder="请输入楼宇名称"></Input>
                </FormItem>
                <FormItem label="预览图:" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            :show-file-list="false"
                            ref="addform"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="images.length>0" :src="$_global_$.imgPath + images[0].url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="color: #f00">建议图片尺寸：166*103</span>
                </FormItem>
                <FormItem label="建筑面积" prop="area">
                    <Input v-model="buildInfo.area" placeholder="请输入建筑面积m²" number></Input>
                </FormItem>
                <FormItem label="建成时间">
                    <DatePicker @on-change="$_onChange_$" type="date" placement="bottom" placeholder="请选择建成时间"
                                style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="备注信息" prop="description">
                    <Input v-model="buildInfo.description" type="textarea" placeholder="请填写备注信息"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="$_back_$">取 消</Button>

                <Button type="primary" @click="$_save_$('add')">保 存</Button>
            </div>
        </div>
    </div>
</template>
<script>

    import controler from "./controler.js";
    import 'element-ui/lib/theme-chalk/index.css';
    import {Upload} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            [Upload.name]: Upload,
        },
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.images != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validateaddr = (rule, value, callback) => {
                if (this.buildInfo.zoneId != "") {
                    callback();
                } else {
                    callback('请选择所属园区');
                }
            };
            return {
                zoneList: [], // 园区选择
                images: [],
                buildInfo: {
                    zoneId: "",
                    name: "",
                    area: "",
                    buildDate: "",
                    description: ""
                },
                $_ruleValidate_$: {
                    file: [
                        {required: true, validator: validateimg, trigger: 'change'}
                    ],
                    zoneId: [
                        {validator: validateaddr, trigger: 'change'}
                    ],
                    name: [
                        {required: true, type: 'string', message: '请输入楼宇名称', trigger: 'blur'},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    area: [
                        {required: true, type: 'number', message: '必须是数字'},
                        {type: 'number', max: 999999999, message: '面积不能超过999999999', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请输入备注信息', trigger: 'blur'},
                        {type: 'string', max: 200, message: '不能超过200字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ]
                },
            };
        },
        created() {
            this.zoneList = this.$root.inparams.zoneList;
            this.buildInfo.zoneId = this.$root.inparams.zoneId;

        },
        methods: {
            //新增保存
            $_save_$(type) {
                this.$refs.buildInfo.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.buildInfo.zoneId}/building`,
                            data: {
                                name: this.buildInfo.name,
                                area: Number(this.buildInfo.area),
                                images: [{imageUrl: this.images[0].url}],
                                buildDate: this.buildInfo.buildDate,
                                description: this.buildInfo.description
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("添加楼宇成功!")
                                    this.$_back_$()
                                } else {
                                    this.$Message.error("添加楼宇失败!")
                                }
                            }
                        })
                    } else {
                        this.$Message.error('保存失败');
                    }
                })
            },

            beforeupload() {
                return this.isLtMB(file);
            },
            // 上传超出限制
            uploadexceed(file, fileList) {
                if (file.length == 1) {
                    this.$Message.error("只能上传一张!")
                }
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.images = [];
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = {url: temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.images.push(a);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.$_global_$.imgPath + temp_str;
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.images.pop()
            },
            $_back_$() {
                this.$root.$_Route_$("superadmin", "sssManage", "buildManage", {zoneId: this.buildInfo.zoneId});
            },
            $_onChange_$(res) {
                if(res){
                    this.buildInfo.buildDate = res + " 00:00:00";
                }else{
                    this.buildInfo.buildDate = "";
                }

            },
        },


    };
</script>