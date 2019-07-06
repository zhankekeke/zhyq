<style scoped>
    .form {
        width: 460px;
        margin: 0 auto;
    }

    .el-select {
        width: 65px !important;
    }

    .plate {
        width: 60% !important;
    }

    >>> .ivu-input {
        height: 38px !important;
        border: none;
        border-bottom: 1px solid #dddee1;
        border-radius: 0;
        width: 278px;

    }

    /*上传图片样式*/
    .avatar-uploader {
        position: relative;
        left: 24px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
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
        width: 145px;
        height: 145px;
        display: block;
    }
</style>
<template>
    <div>
        <Form class="form" ref="$_editForm_$" :model="$_editForm_$" :rules="$_addRuleValidate_$">
            <FormItem label=" " prop="plateNumber">
                <Select v-model="$_editForm_$.province" style="width:58px;position: relative;right: 12px" disabled>
                    <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input class="plate" v-model="$_editForm_$.plateNumber" placeholder="请输入车牌号" readonly></Input>
            </FormItem>
            <FormItem label="品牌车型:" prop="brand">
                <Input style="width:64%;left: 12px;" v-model="$_editForm_$.brand" placeholder="请输入品牌车型"></Input>
            </FormItem>
            <FormItem label="车辆图片:" prop="file">
                <el-upload
                        class="avatar-uploader"
                        :action="$_global_$.imgUploadPath"
                        :show-file-list="false"
                        :before-upload="beforeuploadEdit"
                        :on-success="uploadSuccessEdit"
                         accept="image/png,image/gif,image/jpg,image/jpeg">
                    <img v-if="$_editForm_$.imageUrl" :src="$_global_$.imgPath+$_editForm_$.imageUrl" class="avatar">

                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>


                <!--<img v-if="$_editForm_$.imageUrl" :src="$_global_$.imgPath+$_editForm_$.imageUrl" class="avatar">-->
            </FormItem>
            <FormItem label="车辆属性：">
                <div style="width:64%;left: 12px;">{{$_editForm_$.attribute}}</div>

            </FormItem>
            <FormItem label="绑定时间：">
                <div style="width:64%;left: 12px;">{{$_editForm_$.createDate}}</div>

            </FormItem>
        </Form>
        <Row>
            <Col span="24" align="center">
                <Button type="primary" @click="$_editOk_$()">保存</Button>
                <Button type="primary" @click="$_remove_$()">解除绑定</Button>
            </Col>
        </Row>

    </div>
</template>
<script>
    import {
        Table,
        Button,
        TableColumn,
        Form,
        Dialog,
        Input,
        FormItem,
        Select,
        Option,
        Tag,
        Radio,
        Upload
    } from "element-ui";
    import controler from "./controler.js";
    import "element-ui/lib/theme-chalk/index.css";
    import axios from "axios";

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
            [Option.name]: Option,
            [Tag.name]: Tag,
            [Radio.name]: Radio,
            [Upload.name]: Upload
        },

        data() {
            const check = (rule, value, callback) => {
                if (!value) {
                    callback('车牌号不能为空')
                } else {
                    const reg = /^[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
                    if (reg.test(value)) {

                        callback()
                    } else {
                        callback('请输入正确的车牌号')
                    }
                }
            };
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片');
                }
            };
            return {
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_editForm_$: {
                    plateNumber: "",
                    province: "",
                    brand: "",
                    imageUrl: ""
                },
                provinceList: [
                    {value: "京", label: "京"},
                    {value: "津", label: "津"},
                    {value: "冀", label: "冀"},
                    {value: "晋", label: "晋"},
                    {value: "蒙", label: "蒙"},
                    {value: "辽", label: "辽"},
                    {value: "吉", label: "吉"},
                    {value: "黑", label: "黑"},
                    {value: "沪", label: "沪"},
                    {value: "苏", label: "苏"},
                    {value: "浙", label: "浙"},
                    {value: "皖", label: "皖"},
                    {value: "闽", label: "闽"},
                    {value: "赣", label: "赣"},
                    {value: "鲁", label: "鲁"},
                    {value: "豫", label: "豫"},
                    {value: "鄂", label: "鄂"},
                    {value: "湘", label: "湘"},
                    {value: "粤", label: "粤"},
                    {value: "桂", label: "桂"},
                    {value: "琼", label: "琼"},
                    {value: "渝", label: "渝"},
                    {value: "川", label: "川"},
                    {value: "黔", label: "黔"},
                    {value: "滇", label: "滇"},
                    {value: "藏", label: "藏"},
                    {value: "陕", label: "陕"},
                    {value: "甘", label: "甘"},
                    {value: "青", label: "青"},
                    {value: "宁", label: "宁"},
                    {value: "新", label: "新"},
                    {value: "台", label: "台"},
                    {value: "港", label: "港"},
                    {value: "澳", label: "澳"}
                ],
                baseUrl: "http://img.yhcode.com:88/",


                $_addRuleValidate_$: {
                    brand: [
                        {required: true, message: "品牌车不能为空", trigger: "change"},
                        {type: 'string', validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    plateNumber: [
                        {required: true, message: "车牌号不能为空", trigger: "change"},
                        {type: 'string', validator: check, trigger: 'change'}
                    ],
                    file: [
                        {validator: validateimg, trigger: 'change'}
                    ]

                }
            };
        },
        created() {
            // this.$_global_$.serverPath
            // this.$_global_$.imgPath
            this.$_editForm_$ = this.$root.inparams.carInfo;
            this.$_editForm_$.attribute = this.formatType(this.$_editForm_$);
        },
        methods: {
            formatType(val) {
                if (val.carType == 0) {
                    return '外来车位' + '标准收费'
                }
                if (val.carType == 1) {
                    return '临时车位' + '标准收费'
                }
                if (val.carType == 2) {
                    return '固定车位' + val.startTime.substr(0, 10) + "-" + val.endTime.substr(0, 10)
                }
            },
            // 编辑提交
            $_editOk_$() {
                if (!this.$_editForm_$.brand) {
                    this.$Message.error('品牌车型不能为空!');
                    return
                }
                this.$refs.$_editForm_$.validate((valid) => {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/zone/car/update/${this.$_editForm_$.id}`,
                        data: {
                            brand: this.$_editForm_$.brand,
                            imageUrl: this.$_editForm_$.imageUrl
                        },
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        // console.log(rsp)
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$Message.success('数据更新成功!');
                                this.$root.$_Route_$('employer', 'service', 'tccfw', {})
                            } else {
                                this.$Message.error('数据更新失败!');
                            }
                        }
                    })
                })

            },
            // 解绑
            $_remove_$(id) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认解绑?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/car/remove/${this.$_editForm_$.id}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            // console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('解绑成功!');
                                    this.$root.$_Route_$('employer', 'service', 'tccfw', {})
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info("取消成功");
                    }
                });

            },
            beforeuploadEdit(file) {
                return this.isLtMB(file);
                // console.log(this.$_editForm_$)
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editForm_$.imageUrl = res.data

            },

        }
    };
</script>