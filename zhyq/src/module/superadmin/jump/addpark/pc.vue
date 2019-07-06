<style scoped>
    .step {
        width: 900px;
        height: 60px;
        margin: 0 auto 20px;
        position: relative;
    }

    .step .stepcont {
        position: absolute;
        top: 0;
        left: 12%;
    }

    .stepBox {
        width: 500px;
        margin: 0 auto;
    }

    .info {
        margin: 30px 0px 30px
    }

    >>> .el-input__inner {
        height: 30px;
    }

    >>> .el-input {
        font-size: 12px;
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
        width: 148px;
        height: 148px;
        display: block;
    }
</style>
<template>
    <div>
        <div class="step">
            <Steps :current="current" class="stepcont">
                <Step title="添加园区"></Step>
                <Step title="添加园区管理企业"></Step>
                <Step title="分配园区与企业管理员"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>
        <div v-show="$_show1_$" class="stepBox">

            <div class="info"> 园区基本信息</div>

            <Form ref="$_addParkValidate_$" :model="$_addParkValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                <FormItem label="园区名称：" prop="$_parkName_$">
                    <Input v-model="$_addParkValidate_$.$_parkName_$" placeholder="请输入园区名称"></Input>
                </FormItem>
                <FormItem label="园区地址：" prop="$_address_$">
                    <!--省-->
                    <el-select v-model="$_addParkValidate_$.sheng" @change="choseProvince" placeholder="省级地区"
                               class="input" style="width:140px">
                        <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addParkValidate_$.shi" @change="choseCity" placeholder="市级地区" class="input"
                               style="width:120px;">
                        <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addParkValidate_$.qu" @change="choseBlock" placeholder="区级地区" class="input"
                               style="width:100px;">
                        <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </FormItem>
                <FormItem label="详细地址：" prop="$_fullAddress_$">
                    <Input v-model="$_addParkValidate_$.$_fullAddress_$" placeholder="请填写详细地址"></Input>
                </FormItem>
                <FormItem align="center">
                    <!--<Button type="primary">暂存</Button>-->
                    <Button type="primary" @click="$_next_$" style="margin:0 auto">下一步</Button>
                </FormItem>
            </Form>

        </div>
        <!--先注释-->
        <div v-show="$_show2_$" class="stepBox">
            <div class="info">
                企业基本信息
            </div>
            <Form ref="$_addFormValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$"
                  :label-width="100"
                  style="width:106%;">
                <FormItem label="企业名称：" prop="$_companyName_$">
                    <Input v-model="$_formValidate_$.$_companyName_$" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="注册地址：" prop="$_registerAddr_$">
                    <Input v-model="$_formValidate_$.$_registerAddr_$" placeholder="请输入注册地址"></Input>
                </FormItem>
                <FormItem label="注册资金：" prop="$_registermoney_$">
                    <Input v-model="$_formValidate_$.$_registermoney_$" placeholder="请输入注册资金" style="width:150px"
                           number></Input>&nbsp;&nbsp;&nbsp;万元
                </FormItem>
                <FormItem label="法人名称：" prop="$_legalPerson_$">
                    <Input v-model="$_formValidate_$.$_legalPerson_$" placeholder="请输入法人名称"></Input>
                </FormItem>
                <FormItem label="经营范围：" prop="$_range_$">
                    <Input v-model="$_formValidate_$.$_range_$" type="textarea" :rows="4" placeholder="请输入经营范围"></Input>
                </FormItem>
                <FormItem label="行业类别：" prop="$_industryCategory_$">
                    <Select v-model="$_formValidate_$.$_industryCategory_$" placeholder="请选择行业类别">
                        <Option v-for="item in this.$_global_$.industry" :key="item.value" :label="item.label"
                                :value="item.value">
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="营业执照:" prop="$_busLicense_$">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="false"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                        <img v-if="$_file_$" :src="$_global_$.imgPath+$_file_$" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="addform"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/jpg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                </FormItem>
                <FormItem label="企业地址：" prop="$_companyAddr_$">
                    <RadioGroup v-model="$_addrtype_$">
                        <Radio label="manual">
                            <span>手动输入</span>
                        </Radio>
                        <Radio label="auto">
                            <span>地址关联</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-show="$_addrShow_$" label="请输入：" prop="$_detailedAddr1_$">
                    <Input v-model="$_formValidate_$.$_detailedAddr1_$" placeholder="请输入详细地址"></Input>
                </FormItem>
                <FormItem v-show="!$_addrShow_$" label="地址关联：">
                    <el-select v-model="$_formValidate_$.building" @change="building" placeholder="建筑" class="input"
                               style="width:100px;">
                        <el-option v-for="item in buildings" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_formValidate_$.floorId" @change="chosefloor" placeholder="楼层" class="input"
                               style="width:140px">
                        <el-option v-for="item in floors" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_formValidate_$.roomIds" @change="roomId" placeholder="房间" class="input"
                               style="width:120px;">
                        <el-option v-for="item in rooms" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </FormItem>
                <FormItem align="center">
                    <!--<Button type="primary">暂存</Button>-->
                    <Button type="primary" @click="$_currenter_$" style="margin:0 auto">上一步</Button>
                    <Button type="primary" @click="$_next_$" style="margin:0 auto">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <div v-show="$_show3_$" class="stepBox">
            <div class="info">
                管理员基本信息
            </div>
            <Form ref="$_adminFormValidate_$" :model="$_adminFormValidate_$" :rules="$_ruleValidate_$"
                  :label-width="100">
                <FormItem label="头像：" prop="$_img_$">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="false"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                        <img v-if="$_file_$" :src="$_global_$.imgPath+$_file_$" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            ref="gly"
                            :show-file-list="true"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :limit="1"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/jpg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                </FormItem>
                <FormItem label="姓名：" prop="$_Name_$">
                    <Input v-model="$_adminFormValidate_$.$_Name_$" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="员工编码：" prop="$_number_$">
                    <Input v-model="$_adminFormValidate_$.$_number_$" placeholder="请输入员工编码"></Input>
                </FormItem>
                <FormItem label="性别：" prop="$_sex_$">
                    <RadioGroup v-model="$_adminFormValidate_$.$_sex_$">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机号：" prop="$_phone_$">
                    <Input v-model="$_adminFormValidate_$.$_phone_$" placeholder="请输入手机号" number></Input>
                </FormItem>
                <!--<FormItem label="登录密码：" prop="$_password_$">-->
                <!--<Input v-model="$_adminFormValidate_$.$_password_$" type="password" placeholder="请输入登录密码"></Input>-->
                <!--</FormItem>-->
                <FormItem label="邮箱：" prop="$_mail_$">
                    <Input v-model="$_adminFormValidate_$.$_mail_$" placeholder="请输入邮箱"></Input>
                </FormItem>
                <FormItem label="生日：" prop="$_birthyday_$">
                    <DatePicker type="date"
                                @on-change="$_dateXz1_$"
                                v-model="$_adminFormValidate_$.$_birthyday_$"
                                placeholder="请选择日期" style="width: 200px">
                    </DatePicker>
                </FormItem>
                <FormItem label="入职日期：" prop="$_workday_$">
                    <DatePicker type="date"
                                @on-change="$_dateXz2_$"
                                v-model="$_adminFormValidate_$.$_workday_$"
                                placeholder="请选择日期" style="width: 200px">
                    </DatePicker>
                </FormItem>
                <FormItem label="角色分配：">
                    <Select
                            v-model="$_roleSort_$"
                            multiple
                            placeholder="请选择角色">
                        <Option v-for="(item,index) in roles"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                            {{item.label}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem align="center">
                    <!--<Button type="primary">暂存</Button>-->
                    <Button type="primary" @click="$_next_$" style="margin:0 auto">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <div v-show="$_show4_$" class="stepBox">
            <div align="center">
                <div align="center">
                    <Icon type="checkmark-circled" color="#248E21" style="font-size:100px;margin-top: 20%"></Icon>
                    <br>
                    <div>添加成功</div>
                    <br>
                    <Button type="primary" @click="$_goBack_$" style="margin-top: 20%">返回列表</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import controler from './controler.js';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import {Button, Select, Option, Table, TableColumn, Upload} from 'element-ui';
    import mapJson from '../../../../data/map.json';

    export default {
        mixins: [controler],
        components: {
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Upload.name]: Upload,
        },
        data() {
            const validateaddr = (rule, value, callback) => {
                if (this.$_addParkValidate_$.sheng != "" && this.$_addParkValidate_$.shi != "" && this.$_addParkValidate_$.qu != "") {
                    callback();
                } else {
                    callback('请选择地址');
                }
            };
            const validateimg = (rule, value, callback) => {
                if (this.$_formValidate_$.$_busLicense_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validateimg2 = (rule, value, callback) => {
                if (this.$_adminFormValidate_$.$_img_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validatecont = (rule, value, callback) => {
                if (this.$_addrtype_$ == 'manual') {
                    if (this.$_formValidate_$.$_detailedAddr1_$ != "") {
                        callback();
                    } else {
                        callback('请输入详细地址');
                    }
                } else {
                    if (this.$_formValidate_$.building != "" && this.$_formValidate_$.floorId != "" && this.$_formValidate_$.roomIds != "") {
                        callback();
                    } else {
                        callback('请选择地址');
                    }
                }
            };
            return {
                imgnum: 0,
                $_zoneId_$: '',
                $_companyId_$: '',
                userInfo: '',
                $_file_$: '',
                repeat: true,//上一步
                $_addrtype_$: 'manual',
                $_addrShow_$: true,
                current: 0,
                $_show1_$: true,
                $_show2_$: false,
                $_show3_$: false,
                $_show4_$: false,
                roles: [],
                $_roleSort_$: [],
                // industry: [
                //     {
                //         value: '金融',
                //         id: '1'
                //     },
                //     {
                //         value: 'IT',
                //         id: '2'
                //     },
                //     {
                //         value: '农业',
                //         id: '3'
                //     }
                // ],
                //传api
                province: [],
                shi1: [],
                qu1: [],
                city: '',
                block: '',
                //房间联动
                buildings: [
                    {
                        value: '默认',
                        id: 1
                    }
                ],
                floors: [
                    {
                        value: '默认',
                        id: 1
                    }
                ],
                rooms: [
                    {
                        value: '默认',
                        id: 1
                    }
                ],
                //企业信息表单
                $_formValidate_$: {
                    $_addrtype_$: '',
                    building: '',
                    floorId: '',
                    roomIds: '',
                    $_companyName_$: '',
                    $_registerAddr_$: '',
                    $_registermoney_$: '',
                    $_legalPerson_$: '',
                    $_range_$: '',
                    $_industryCategory_$: '',
                    $_detailedAddr1_$: '',
                    $_busLicense_$: '',
                },
                $_addParkValidate_$: {
                    sheng: '',
                    shi: '',
                    qu: '',
                    $_parkName_$: "",
                    $_address_$: "",
                    $_fullAddress_$: ""
                },
                $_adminFormValidate_$: {
                    $_img_$: '',
                    $_Name_$: '',
                    $_sex_$: '',
                    $_phone_$: '',
                    $_mail_$: '',
                    $_birthyday_$: '',
                    $_workday_$: '',
                    roleSort: '',
                    $_number_$: '',
                    $_password_$: ''
                },
                $_ruleValidate_$: {
                    $_parkName_$: [
                        //非空验证
                        {required: true, type: 'string', message: '请填写园区名称', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '园区名称不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_address_$: [
                        {required: true, validator: validateaddr, trigger: 'change'},
                    ],
                    $_fullAddress_$: [
                        {required: true, type: 'string', message: '请填写园区详细地址', trigger: 'change'},
                        {type: 'string', max: 100, message: '详细地址不能超过100字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    //企业信息
                    $_companyName_$: [
                        {required: true, type: 'string', message: '请输入企业名称', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '企业名称不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_registerAddr_$: [
                        {required: true, type: 'string', message: '请输入注册地址', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 100, message: '注册地址不能超过100字', trigger: 'change'},
                    ],
                    $_registermoney_$: [
                        {required: true, type: 'number', message: '请填写注册资金,如：1000', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {type: 'number', max: 999999999, message: '注册资金不能超过999999999', trigger: 'change'},
                    ],
                    $_legalPerson_$: [
                        {required: true, type: 'string', message: '请填写法人名称', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '法人名称不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_range_$: [
                        {required: true, type: 'string', message: '请输入经营范围', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 200, message: '经营范围不能超过200字', trigger: 'change'},
                    ],
                    $_industryCategory_$: [
                        {required: true, type: 'string', message: '请选择行业类别', trigger: 'change'}
                    ],
                    // 图片验证
                    $_busLicense_$: [
                        {required: true, validator: validateimg, trigger: 'change'}
                    ],
                    $_companyAddr_$: [
                        {required: true, validator: validatecont, trigger: 'change'}
                    ],
                    $_detailedAddr1_$: [
                        //长度验证
                        {type: 'string', max: 100, message: '详细地址不能超过100字', trigger: 'change'},
                    ],
                    //管理员图片验证
                    // file: [
                    //     {required: true, validator: validateimg2, trigger: 'change'}
                    // ],
                    $_Name_$: [
                        {required: true, type: 'string', message: '请输入姓名', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '姓名不能超过50字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_number_$: [
                        {required: true, type: 'string', message: '请输入员工编码，如：00001', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'}
                    ],
                    $_sex_$: [
                        {required: true, type: 'string', message: '请选择性别', trigger: 'change'}
                    ],
                    $_phone_$: [
                        {required: true, type: 'number', message: '请输入正确手机号', trigger: 'change'},
                        //手机号验证
                        {validator: this.$_validatephone_$, trigger: 'change'}
                    ],
                    $_mail_$: [
                        // { required: true, message: '邮箱地址不能为空', trigger: 'change' },
                        {type: 'email', message: '请输入正确邮箱地址！', trigger: 'blur'}
                    ],
                    // $_password_$: [
                    //     {required: true, message: '请输入密码', trigger: 'change'},
                    //     {validator: this.$_password_$, trigger:'change'},
                    // ],
                    // $_birthyday_$: (rules, value, callback, source, options) => {
                    //     if (!value) return callback('时间格式错误');
                    //     if (value > new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
                    //         return callback('日期开始时间不能在当前时间之后');
                    //     callback()
                    // },
                    // $_workday_$: [
                    //     {required: true, message: '请选择入职日期', trigger: 'blur'},
                    //     {
                    //         validator(rules, value, callback, source, options) {
                    //             if (!value) return callback('时间格式错误');
                    //             if (value > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
                    //                 return callback('日期开始时间不能在当前时间之后');
                    //             callback()
                    //         }
                    //     },
                    // ],

                },
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                positions: [],
            }
        },
        created() {
            this.$_admin_$()
            this.getCityData()
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
        },
        watch: {
            $_addrtype_$(newData, oldData) {
                if (newData == 'auto') {
                    this.$_addrShow_$ = false;
                }
                if (newData == 'manual') {
                    this.$_addrShow_$ = true;
                }
            }
        },

        methods: {
            $_dateXz1_$(e) {
                this.$_adminFormValidate_$.$_birthyday_$ = e
            },
            $_dateXz2_$(e) {
                this.$_adminFormValidate_$.$_workday_$ = e
            },
            $_admin_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/user/role/admin`,
                    data: {
                        pageSize: 999
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data.records;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i].flag == 1 && arr[i].type == 2) {
                                    let temp = {};
                                    temp = {
                                        value: arr[i].id + '',
                                        label: arr[i].name
                                    };
                                    this.roles.push(temp)
                                }

                            }

                        }
                    }
                })
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {

                    }
                }
            },
            //首先获取楼层列表
            building() {
                this.buildings = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.userInfo.zoneId}/building`,
                })
            },
            //更改建筑
            building() {

            },
            //更改楼层
            chosefloor() {

            },
            //更改房间
            roomId() {

            },
            FormatAllDate(sDate) {
                var date = new Date(sDate);
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                //月
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                //日
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                //时
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                //分
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                //秒
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                //格式化后日期为：yyyy-MM-dd HH:mm:ss
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + hours + seperator2 + minutes + seperator2 + seconds;
                return currentdate;
            },
            $_currenter_$() {
                this.current--;
                this.repeat = false;
                this.$_show1_$ = true;
                this.$_show2_$ = false
            },
            $_next_$() {
                //第一步
                if (this.current == 0) {
                    if (this.repeat) {
                        this.$refs.$_addParkValidate_$.validate((valid) => {
                            let that = this;
                            if (valid) {
                                this.$_sendQuery_$({
                                    method: 'POST',
                                    url: this.$_global_$.serverPath + '/zone/zone',
                                    data: {
                                        "name": that.$_addParkValidate_$.$_parkName_$,
                                        "province": that.$_addParkValidate_$.sheng,
                                        "city": that.$_addParkValidate_$.shi,
                                        "county": that.$_addParkValidate_$.qu,
                                        "address": that.$_addParkValidate_$.$_fullAddress_$,
                                        "principal": null,
                                        "tel": null
                                    }
                                }).then(function (rsp) {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            that.$_zoneId_$ = rsp.data.data.id;
                                            that.$Message.success('园区添加成功');
                                            that.current++;
                                            that.$_show1_$ = false;
                                            that.$_show2_$ = true
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        this.$refs.$_addParkValidate_$.validate((valid) => {
                            let that = this;
                            if (valid) {
                                this.$_sendQuery_$({
                                    method: 'PUT',
                                    url: this.$_global_$.serverPath + '/zone/zone',
                                    data: {
                                        "id": that.$_zoneId_$,
                                        "name": that.$_addParkValidate_$.$_parkName_$,
                                        "province": that.$_addParkValidate_$.sheng,
                                        "city": that.$_addParkValidate_$.shi,
                                        "county": that.$_addParkValidate_$.qu,
                                        "address": that.$_addParkValidate_$.$_fullAddress_$,
                                        "principal": null,
                                        "tel": null
                                    }
                                }).then(function (rsp) {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            // that.$_zoneId_$ = rsp.data.data.id;
                                            // that.$Message.success('园区添加成功');
                                            that.current++;
                                            that.$_show1_$ = false;
                                            that.$_show2_$ = true
                                        }
                                    }
                                });
                            }
                        });
                    }

                }
                //第二步
                else if (this.current == 1) {
                    this.$refs.$_addFormValidate_$.validate((valid) => {
                        let that = this;
                        if (valid) {
                            let data = {
                                businessLicense: this.$_formValidate_$.$_busLicense_$,
                                sectors: this.$_formValidate_$.$_industryCategory_$,
                                address: this.$_formValidate_$.$_detailedAddr1_$,
                                city: '',
                                county: '',
                                businessScope: this.$_formValidate_$.$_range_$,
                                scale: this.$_formValidate_$.number,
                                positions: [
                                    {floorId: null, roomIds: null, buildingId: null}
                                ],
                                type: 0,
                                province: '',
                                registerAddress: this.$_formValidate_$.$_registerAddr_$,
                                registeredCapital: this.$_formValidate_$.$_registermoney_$,
                                legalPerson: this.$_formValidate_$.$_legalPerson_$,
                                name: this.$_formValidate_$.$_companyName_$,
                                zoneId: this.$_formValidate_$.zoneName,
                                addressType: 0
                            };
                            this.$_sendQuery_$({
                                method: 'POST',
                                url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/enterprise`,
                                data: data,
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        that.$_companyId_$ = rsp.data.data.id;
                                        that.$Message.success('园区管理企业添加成功');
                                        that.current++;
                                        that.$_show2_$ = false;
                                        that.$_show3_$ = true;
                                        this.$_file_$ = '';
                                    }
                                } else {
                                    that.$Message.error(rsp.data.message);
                                }
                            })
                        }
                    });
                }
                //第三步
                else if (this.current == 2) {
                    this.$_adminFormValidate_$.roleSort = this.$_roleSort_$;
                    this.$_adminFormValidate_$.faceUrl = this.$_file_$;
                    this.$refs.$_adminFormValidate_$.validate((valid) => {
                        let that = this;
                        if (valid) {
                            this.$_sendQuery_$({
                                method: 'POST',
                                url: this.$_global_$.serverPath + `/company/company/${this.$_companyId_$}/employee`,
                                data: {
                                    phoneNumber: this.$_adminFormValidate_$.$_phone_$,
                                    code: this.$_adminFormValidate_$.$_number_$,
                                    loginName: this.$_adminFormValidate_$.$_phone_$,
                                    sex: Number(this.$_adminFormValidate_$.$_sex_$),
                                    loginPassword: this.$_adminFormValidate_$.$_phone_$,
                                    name: this.$_adminFormValidate_$.$_Name_$,
                                    faceUrl: this.$_adminFormValidate_$.$_img_$,
                                    brithday: this.$_adminFormValidate_$.$_birthyday_$,
                                    emailUrl: this.$_adminFormValidate_$.$_mail_$,
                                    createDate: this.$_adminFormValidate_$.$_workday_$,
                                    //position: this.$_adminFormValidate_$.roleSort
                                }
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        let senData = {
                                            add: [rsp.data.data.id]
                                        };
                                        //设置企业管理员
                                        this.$_sendQuery_$({
                                            method: 'POST',
                                            url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/enterprise/${this.$_companyId_$}/admin`,
                                            data: senData
                                        }).then((rsp) => {
                                            if (rsp.status === 200) {
                                                if (rsp.data.code === 0) {
                                                    that.$Message.success('企业设置管理员成功');
                                                }
                                            }
                                        });

                                        if (this.$_roleSort_$.length > 0) {
                                            let arr = [];
                                            for (let i = 0; i < this.$_roleSort_$.length; i++) {
                                                arr.push({
                                                    "id": this.$_roleSort_$[i]
                                                })
                                            }
                                            //授权角色
                                            this.$_sendQuery_$({
                                                method: 'POST',
                                                url: this.$_global_$.serverPath + `/user/user/${rsp.data.data.id}/auths`,
                                                data: arr
                                            }).then((rsp) => {
                                                if (rsp.status === 200) {
                                                    if (rsp.data.code === 0) {
                                                        that.$Message.success('批量授权成功');
                                                        that.current++
                                                        that.$_show3_$ = false
                                                        that.$_show4_$ = true
                                                    }
                                                }
                                            });
                                        } else {
                                            //设置园区管理员
                                            this.$_sendQuery_$({
                                                method: 'POST',
                                                url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/admin`,
                                                data: {
                                                    'add': [
                                                        rsp.data.data.id
                                                    ]
                                                }
                                            }).then((rsp) => {
                                                if (rsp.status === 200) {
                                                    if (rsp.data.code === 0) {
                                                        that.$Message.success('园区管理员授权成功');
                                                        that.current++;
                                                        that.$_show3_$ = false;
                                                        that.$_show4_$ = true
                                                    }
                                                }
                                            })
                                        }

                                    }
                                    else {
                                        that.$Message.error(rsp.data.message);
                                    }
                                }
                            })
                        }
                    });
                }
            },
            getCityData: function () {
                //调用外面的this
                let that = this;
                let data = mapJson;
                that.province = [];
                that.city = [];
                that.block = [];
                // 省市区数据分类
                for (var item in data) {
                    if (item.match(/0000$/)) {//省
                        that.province.push({id: item, value: data[item], children: []})
                    } else if (item.match(/00$/)) {//市
                        that.city.push({id: item, value: data[item], children: []})
                    } else {//区
                        that.block.push({id: item, value: data[item]})
                    }
                }
                //分类市级
                for (var index in that.province) {

                    for (var index1 in that.city) {
                        if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                            that.province[index].children.push(that.city[index1])
                        }
                    }
                }
                // 分类区级
                for (var item1 in that.city) {
                    for (var item2 in that.block) {
                        if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                            that.city[item1].children.push(that.block[item2])
                        }
                    }
                }

            },
            choseProvince: function (e) {
                this.$_addParkValidate_$.shi = '';
                this.$_addParkValidate_$.qu = '';
                for (let index2 in this.province) {
                    if (e === this.province[index2].id) {
                        this.shi1 = this.province[index2].children;
                        this.shi = this.province[index2].children[0].value;
                        this.qu1 = this.province[index2].children[0].children;
                        this.qu = this.province[index2].children[0].children[0].value;
                        this.E = this.qu1[0].id
                    }
                }
            },
            //   // 选市
            choseCity: function (e) {
                this.$_addParkValidate_$.qu = '';
                for (var index3 in this.city) {
                    if (e === this.city[index3].id) {
                        this.qu1 = this.city[index3].children;
                        this.qu = this.city[index3].children[0].value;
                        this.E = this.qu1[0].id;
                    }
                }
            },
            //   // 选区
            choseBlock: function (e) {
                this.E = e;
            },
            $_addCompany_$() {
                this.$root.inparams.id
            },
            $_goBack_$() {
                this.$root.$_Route_$('superadmin', 'system', 'parkmanage', {id: 1})
            },
            beforeupload(file) {
                return this.isLtMB(file);
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                if (this.current == 1) {
                    this.$_formValidate_$.$_busLicense_$ = res.data;
                    this.$_file_$ = this.$_formValidate_$.$_busLicense_$
                } else if (this.current == 2) {
                    this.$_adminFormValidate_$.$_img_$ = res.data;
                    this.$_file_$ = this.$_adminFormValidate_$.$_img_$
                }
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str

                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str

                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
            }
        }
    }
</script>