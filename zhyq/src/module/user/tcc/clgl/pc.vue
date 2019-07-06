<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 15px 0 15px 15px;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #000;
    }

    .ivu-btn {
        font-size: 14px;
    }

    >>>.el-dialog__body{
        padding:5px 20px
    }
    >>>.el-form-item{
        margin-bottom: 10px;
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
    /**ele弹窗样式修改*/
    >>> .el-input__inner {
        height: 30px;
        font-size: 12px;
    }
    >>> .el-dialog__header {
        border-bottom: 1px solid #e9eaec;
    }
    >>> .el-dialog__title {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #1c2438;
        font-weight: 700;
        overflow-y: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    >>> .el-dialog__footer {
        border-top: 1px solid #e9eaec;
        padding: 12px 18px;
        text-align: right;
    }
    >>> .el-upload--picture-card {
        width: 118px;
        height: 118px;
        line-height: 118px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search" style="background-color: #f5f5f5;padding-left: 15px;">
            <span style="font-size: 14px">车主姓名：</span>
            <Input v-model="$_searchName_$" style="width: 210px;margin-right: 10px" placeholder="请输入车主姓名"></Input>
            &nbsp;&nbsp;<span style="font-size: 14px">公司名称：</span>
            <Input v-model="$_companyName_$" style="width: 210px;margin-right: 10px" placeholder="请输入公司名称"></Input>
            &nbsp;&nbsp;<span style="font-size: 14px">车辆属性：</span>
            <Select v-model="$_selected_$" style="width:210px;margin-right: 10px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 内容 -->
        <div>
            <Row>
                <Col span="24" align="right">
                    <Button type="primary" icon="plus" @click="$_addCl_$('uploads')">新增固定车辆</Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Table ref="selection" :border='false' :columns="$_clTable_$" :data="$_clInfo_$"></Table>
            </Row>
            <br>
            <br>
            <Row>
                <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_totalSize_$}}条数据</span>
                <Page align="right" :total="$_totalSize_$"
                      style="float:right"
                      show-elevator show-sizer
                      @on-page-size-change="$_pageNum_$"
                      @on-change="$_changePage_$"></Page>
            </Row>
        </div>

        <el-dialog :title="modeltitle" :visible.sync="$_addmodal1_$" :show-close="false" :close-on-click-modal="false" width="520px" top="5px">
            <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="车主姓名" prop="name">
                    <el-input v-model="$_addForm_$.name" disabled placeholder="请选择.." style="width:20%;"></el-input>
                    <span v-show="show"> 手机号 </span>
                    <el-input v-show="show" v-model="$_addForm_$.searchmobile" style="width:30%;"></el-input>
                    <Button v-show="show" type="primary" @click="$_searchCl_$()">搜索</Button>
                </el-form-item>
                <div v-show="show" style="margin-left: 100px; margin-bottom: 20px; width: 400px;">请选择：<br/>
                    <p style="margin-left: 20px; margin-top: 10px; cursor: pointer; float: left"
                       v-for="(item,index) in $_searchData_$" :key="index" @click="$_xz_$(index)">
                        {{item.name}}
                    </p>
                    <div style=" clear: both"></div>
                </div>
                <el-form-item label="联系方式" prop="mobile">
                    <el-input v-model="$_addForm_$.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属公司" prop="company">
                    <el-input v-model="$_addForm_$.company" disabled></el-input>
                </el-form-item>
                <el-form-item label="车牌号码" prop="province">
                    <el-select v-model="$_addForm_$.province" disabled placeholder="请选择" style="width:20%;">
                        <el-option
                                v-for="item in provinceList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input class="plate" style="width: 79%;" v-model="$_addForm_$.plateNumber" disabled placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item label="品牌车型" prop="carType">
                    <Input v-model="$_addForm_$.carType" disabled placeholder="请输入" style="width:72%"></Input>
                </el-form-item>
                <el-form-item label="图片">
                    <img :src="$_global_$.imgPath + $_addForm_$.imageUrl" style="width:118px;height: 118px;">
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
                <Button size="large" @click="$_quit_$('addForm')">取 消</Button>
                <Button size="large" type="primary" @click="$_addOK_$()">确 定</Button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    import controler from "./controler.js";
    import expandRow from './expand.vue';
    import axios from 'axios'
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option, DatePicker} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            expandRow,
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
                show: true,
                selectType: 0,
                userInfo: {},
                searchdata: {},
                rowdata: {},
                modeltitle: '',
                baseUrl: this.$_global_$.imgPath,
                $_file_$: [],
                // $_addForm_$: {
                //     file: ''
                // },
                dialogImageUrl: '',
                $_addmodal_$: false,
                $_addmodal1_$: false,
                $_totalSize_$: 0,
                $_file_$: [],
                $_pageSize_$: 10,
                $_searchData_$: '',
                $_searchName_$: '', // 车主姓名
                $_companyName_$: "", // 公司名称
                $_selected_$: "全部", // 默认选中
                $_statusList_$: [
                    {
                        value: '全部',
                        label: "全部"
                    },
                    {
                        value: 0,
                        label: "外来车辆"
                    },
                    {
                        value: 1,
                        label: "临时车辆"
                    },
                    {
                        value: 2,
                        label: "固定车位"
                    }
                ],
                $_clTable_$: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row,
                                }
                            })
                        }

                    },//数据表头
                    {
                        title: "序号",
                        width: 60,
                        type: 'index',
                        align: "center"
                    },
                    {
                        title: "车主姓名",
                        key: "employeeName",
                        align: "center"
                    },
                    {
                        title: "联系方式",
                        key: "mobile",
                        align: "center"
                    },
                    {
                        title: "所属公司",
                        key: "companyName",
                        align: "center"
                    }, {
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
                        width: 130,
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
                $_clInfo_$: [  //虚拟表格数据

                ],
                $_addForm_$: {  // 新增 表单
                    name: '',
                    searchmobile: '',
                    mobile: '',
                    company: '',
                    plateNumber: '',
                    province: '京',
                    carType: '',
                    date: '',
                    file: ''
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
                imageList: [],
                $_addRuleValidate_$: {  // 新增  表单验证
                    //新增图片
                    // image: [
                    //     { required: true, message: '必填', trigger: 'blur' }
                    // ]
                    mobile: [
                        {
                            required: true, type: 'number', message: '请填写正确手机号', trigger: 'blur', transform(value) {
                                var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
                                if (!myreg.test(value)) {
                                    return false
                                } else {
                                    return Number(value)
                                }
                            }
                        }
                    ],
                    company: [
                        {required: true, message: '所属公司不能为空!', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '公司名称不能超过50字', trigger: 'change'},
                    ],
                    province: [
                        {required: true, message: '车牌所属省不能为空!', trigger: 'change'}
                    ],
                    plateNumber: [
                        {required: true, message: '车牌号码不能为空!', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '号码不能超过50字', trigger: 'change'},
                    ],
                    date: [
                        {required: true, message: '有效期不能为空!', trigger: 'change'}
                    ],
                },
                editFormValidate: {
                    $_ls_$: [
                        {required: true, message: 'not null', trigger: 'blur'}
                    ], $_wl_$: [
                        {required: true, message: 'not null', trigger: 'blur'}
                    ]
                },
                $_querycfg_$: {
                    mod: '',
                    params: {}
                }
            };
        },
        watch: {
            starttime: function (value) {
                this.$_addForm_$.$_ysq_$ = value + '-' + this.endtime
            },
            endtime: function (value) {
                this.$_addForm_$.$_ysq_$ = this.starttime + '-' + value
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.searchdata.pageSize = 10;
            this.list();
            this.$_querycfg_$.params.pageNum = 1;
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            //选择员工
            $_xz_$(index) {
                
                this.$_addForm_$.userId = this.$_searchData_$[index].id;
                this.$_addForm_$.name = this.$_searchData_$[index].name;
                this.$_addForm_$.mobile = this.$_searchData_$[index].phoneNumber;
                this.$_addForm_$.company = this.$_searchData_$[index].enterpriseName;
            },
            //列表
            list() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/car/zone/${this.userInfo.zoneId}/list`,
                    data: this.searchdata,
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_clInfo_$ = [];
                            for (let i = 0; i < rsp.data.data.records.length; i++) {
                                let res = this.$_mergeJson_$(rsp.data.data.records[i], rsp.data.data.records[i].carList[0]);
                                res.carList.splice(0, 1);
                                this.$_clInfo_$.push(res);
                            }
                            this.$_totalSize_$ = rsp.data.data.total
                        }
                    }
                })
            },
            //合并json
            $_mergeJson_$(jsonbject1, jsonbject2) {
                let resultJsonObject = {};
                for (let attr in jsonbject1) {
                    resultJsonObject[attr] = jsonbject1[attr];
                }
                for (let attr in jsonbject2) {
                    resultJsonObject[attr] = jsonbject2[attr];
                }
                return resultJsonObject;
            },
            //   搜索
            $_search_$() {
                if (this.$_searchName_$) {
                    this.searchdata.employeeName = this.$_searchName_$;
                } else {
                    //清除搜索项
                    delete this.searchdata.employeeName;
                }
                if (this.$_companyName_$) {
                    this.searchdata.companyName = this.$_companyName_$;
                } else {
                    //清除搜索项
                    delete this.searchdata.companyName;
                }
                if (this.$_selected_$ != '全部') {
                    this.searchdata.carType = this.$_selected_$;
                } else {
                    delete this.searchdata.carType;
                }
                this.list()

            },
            //新增固定搜索
            $_searchCl_$() {
                let senddata = {};
                if(this.$_addForm_$.searchmobile.length === 11){
                    senddata.phoneNum = this.$_addForm_$.searchmobile
                }
                if (this.$_addForm_$.name) {
                    senddata.name = this.$_addForm_$.name;
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/employee/search`,
                    data: senddata,
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_searchData_$ = rsp.data.data.records;
                        } else {
                            this.$_searchData_$ = [{}];
                        }
                    }
                });
            },
            //分页
            $_changePage_$(e) {
                this.searchdata.pageNum = e;
                this.list()
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_pageSize_$ = e;
                this.searchdata.pageSize = this.$_pageSize_$;
                this.list()
            },
            // 新增固定车辆
            $_addCl_$(addForm) {
                this.$root.$_Route_$("user", "jump", "xzgdcl");
            },
            //临时升级固定
            $_upCarType_$(data) {

                this.show = false;
                this.rowdata = data;
                this.modeltitle = '升级为固定车辆';
                this.$_addForm_$.userId = data.userId;
                this.$_addForm_$.name = data.employeeName;
                this.$_addForm_$.mobile = data.mobile;
                this.$_addForm_$.company = data.companyName;
                this.$_addForm_$.carType = data.brand;
                this.$_addForm_$.plateNumber = data.province + data.plateNumber;
                this.$_addForm_$.carid = data.id;
                this.$_addForm_$.province = data.province;
                this.$_addForm_$.plateNumber = data.plateNumber;
                this.$_addForm_$.imageUrl = this.$_global_$.imgPath + data.imageUrl;
                this.selectType = 1;
                this.$_addmodal1_$ = true;
            },
            // 新增 保存
            $_addOK_$() {
                this.$_addForm_$.file = this.$_addForm_$.imageUrl;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/parking/buy`,
                            data: {
                                userId: this.$_addForm_$.userId,
                                startTime: this.$_addForm_$.date[0],
                                endTime: this.$_addForm_$.date[1],
                                selectType: this.selectType,
                                carId: this.$_addForm_$.carid,
                                car: {
                                    province: this.$_addForm_$.province,
                                    plateNumber: this.$_addForm_$.plateNumber,
                                    brand: this.$_addForm_$.carType,
                                    imageUrl: this.$_addForm_$.file
                                }
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.rowdata.carType = 2;
                                    this.rowdata.endTime = this.$_addForm_$.date[1];
                                    this.$Message.success(rsp.data.message);
                                    this.$_addmodal1_$ = false;
                                } else {
                                    this.$Message.error(rsp.data.message)

                                }
                                this.list()
                            }
                            this.$_addmodal_$ = false

                        })
                    }
                })

            },
            //取消弹窗
            $_quit_$(name) {
                this.$_addmodal1_$ = false;
                this.$refs[name].resetFields();
            },
        }
    }
</script>