<style scoped>

</style>
<template>
    <div style="padding-right:50px">
        <Row>
            <Col span="18" style="margin-left:31.5%">
                <Table height="200" :show-header='false' :border="false" :columns="columns1" :data="data2"></Table>
            </Col>
        </Row>
        <!-- 新增固定车辆 -->
        <el-dialog title="升级为固定车辆" :visible.sync="$_addmodal_$" :show-close="false" :close-on-click-modal="false" width="520px" top="5px">
            <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="车主姓名" prop="name">
                    <el-input v-model="$_addForm_$.name" disabled readonly></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="mobile">
                    <el-input v-model="$_addForm_$.mobile" disabled readonly></el-input>
                </el-form-item>
                <el-form-item label="所属公司" prop="company" readonly>
                    <el-input v-model="$_addForm_$.company" disabled ></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <Input class="plate" readonly v-model="$_addForm_$.plateNumber" disabled placeholder="请输入"
                           style="width:55%;height:41px;"></Input>
                </el-form-item>
                <el-form-item label="品牌车型" prop="carType">
                    <Input v-model="$_addForm_$.carType" disabled readonly placeholder="请输入" style="width:72%"></Input>
                </el-form-item>
                <el-form-item label="图片">
                    <img :src="$_global_$.imgPath + otherInfo.imageUrl" style="width:118px;height: 118px;">
                </el-form-item>
                <el-form-item label="有效期" prop="date">
                    <el-date-picker type="daterange"
                                    value-format="yyyy-MM-dd hh:mm:ss"
                                    v-model="$_addForm_$.date"
                                    :start-date="new Date(new Date().getFullYear(),
                            new Date().getMonth()+1, new Date().getDate())"
                                    placement="bottom-end"
                                    placeholder="Select date" style="width: 300px"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_quit_$('addForm')">取 消</el-button>
                <el-button type="primary" @click="$_addOK_$()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option, DatePicker} from 'element-ui';

    export default {
        components: {
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Upload.name]: Upload,
            [Select.name]: Select,
            [Option.name]: Option,
            [DatePicker.name]: DatePicker

        },
        data() {
            return {
                userInfo:{},
                $_addmodal_$: false,
                rowdata:{},
                $_addForm_$: {  // 新增 表单
                    name: '',
                    mobile: '',
                    company: '',
                    carType: '',
                    plateNumber: '',
                    province: '京',
                    date: ''

                },
                $_addRuleValidate_$: {  // 新增  表单验证
                    date:[
                        {required: true, message: '有效期不能为空!', trigger: 'change'}
                    ],
                    // date: (rules, value, callback, source, options) => {
                    //     if (!value || value.length != 2) return callback('时间格式错误');
                    //     if (value[0] < new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
                    //         return callback('日期开始时间不能在当前时间之前');
                    //     for (let i = 0; i < 2; i++) if (!(value[i] instanceof Date)) return callback('时间格式错误')
                    //     callback()
                    // },
                },
                columns1: [
                    {
                        title: "车辆属性",
                        key: "carType",
                        align: "center",
                        render: (h, params) => {
                            let texts = '';
                            if (params.row.carType == 0) {
                                texts = "外来车辆"
                            } else if (params.row.carType == 1) {
                                texts = "临时车辆"
                            } else if (params.row.carType == 2) {
                                texts = "固定车位"
                            }
                            return h('div', {
                                props: {},
                            }, texts)
                        }
                    }, {
                        title: "车牌号",
                        key: "plateNumber",
                        align: "center",
                        render: (h, params) => {
                            let texts = params.row.province + "  " + params.row.plateNumber;
                            return h('div', {
                                props: {},
                            }, texts)
                        }
                    }, {
                        title: "品牌车型",
                        key: "brand",
                        align: "center"
                    },
                    {
                        title: "车辆图片",
                        key: "imageUrl",
                        render: (h, params) => {
                            return h('div', {
                                attrs: {
                                    style: 'width:40px;height:40px;'
                                },
                            }, [
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    attrs: {
                                        src: this.$_global_$.imgPath + params.row.imageUrl,
                                        style: 'width:40px;height:40px;'
                                    },
                                    style: {}
                                })
                            ])
                        }
                    },
                    {
                        title: "有效期",
                        key: "endTime",
                        align: "center"
                    },
                    {
                        title: "违约数",
                        key: "",
                        align: "center",
                    },
                    {
                        title: "创建时间",
                        key: "createDate",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            if (params.row.carType == 1) {
                                return h("div", [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "primary",
                                                size: "small"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$_upCarType_$(params.row);
                                                }
                                            }
                                        },
                                        "升级为固定车位"
                                    )
                                ]);
                            }
                        }
                    },
                ],
                data2: [],
                rowInfo: '',
                otherInfo:{}
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.data2 = this.row.carList;
            this.rowInfo = this.row;
        },
        props: {
            row: Object
        },
        methods: {
            //临时升级固定
            $_upCarType_$(data) {
                this.rowdata=data;
                this.$_addForm_$.name = this.rowInfo.employeeName;
                this.$_addForm_$.mobile = this.rowInfo.mobile;
                this.$_addForm_$.company = this.rowInfo.companyName;
                this.$_addForm_$.carType = data.brand;
                this.$_addForm_$.plateNumber = data.province + data.plateNumber;
                this.otherInfo.carid = data.id;
                this.otherInfo.province = data.province;
                this.otherInfo.plateNumber = data.plateNumber;
                this.otherInfo.imageUrl = data.imageUrl;
                this.$_addmodal_$ = true
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str}
                            }
                        }
                    }
                }
                this.$_file_$.pop(a);
                this.$set(this.$_addForm_$, 'images', this.$_file_$)
            },
            // 新增 保存
            $_addOK_$() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/zone/zone/'+this.userInfo.zoneId+'/parking/buy',
                            data: {
                                userId: this.rowInfo.userId,
                                startTime: this.$_addForm_$.date[0],
                                endTime: this.$_addForm_$.date[1],
                                selectType: 1,
                                carId: this.otherInfo.carid,
                                car: {
                                    province: this.otherInfo.province,
                                    plateNumber: this.otherInfo.plateNumber,
                                    brand: this.$_addForm_$.carType,
                                    imageUrl:this.otherInfo.imageUrl
                                }
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.rowdata.carType=2;
                                    this.rowdata.endTime=this.$_addForm_$.date[1];
                                    this.$Message.success(rsp.data.message)
                                } else {
                                    this.$Message.error(rsp.data.message)

                                }
                            }
                            this.$_addmodal_$ = false

                        })
                    }
                })
            },
            //取消弹窗
            $_quit_$(name) {
                this.$_addmodal_$ = false;
                this.$refs[name].resetFields();
            },
        }
    }
    ;
</script>