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
        font-size: 20px;
        color: #666;
        margin: 10px 0px 10px 0px
    }

    .build {
        width: 440px;
        padding-top: 10px;
        overflow: scroll;

    }

    .build li {
        width: 434px;
        overflow: scroll;

    }

    .build li span {
        width: 119px;
        display: inline-block;

    }

    .build li button {
        float: right;
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
    <div>
        <div class="step">
            <Steps :current="current" class="stepcont">
                <Step title="添加园区管理企业"></Step>
                <Step title="分配企业管理员"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>
        <!--添加企业-->
        <div v-show="$_show1_$" class="stepBox">
            <div class="info">企业基本信息</div>
            <Form ref="$_addFormValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$"
                  :label-width="100" style="width:106%;">
                <FormItem label="所属园区：" prop="$_zoneName_$">
                    <Select v-model="$_formValidate_$.zoneId" @on-change="chosezone" placeholder="请选择园区" class="input"
                            style="width:140px">
                        <Option v-for="item in zones" :label="item.label" :value="item.value" :key="item.value">
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="企业名称：" prop="$_companyName_$">
                    <Input v-model="$_formValidate_$.$_companyName_$" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="注册地址：" prop="$_registerAddr_$">
                    <Input v-model="$_formValidate_$.$_registerAddr_$" placeholder="请输入注册地址"></Input>
                </FormItem>
                <FormItem label="注册资金：" prop="$_registermoney_$">
                    <Input v-model="$_formValidate_$.$_registermoney_$" placeholder="请输入注册资金" style="width:200px"
                           number></Input>&nbsp;万元
                </FormItem>
                <FormItem label="法人名称：" prop="$_legalPerson_$">
                    <Input v-model="$_formValidate_$.$_legalPerson_$" placeholder="请输入法人名称"></Input>
                </FormItem>
                <!--<FormItem label="员工数量：" prop="number">-->
                <!--<Input v-model="$_formValidate_$.number" placeholder="请输入员工数量" style="width:100px" number></Input>&nbsp;人-->
                <!--</FormItem>-->
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
                    <!-- <el-upload
                             class="avatar-uploader"
                             :action=this.$_global_$.imgUploadPath
                             list-type="picture-card"
                             :show-file-list="true"
                             ref="addform"
                             :limit="1"
                             :before-upload="beforeupload"
                             :on-remove="handleRemove"
                             :on-success="uploadSuccess"
                             :on-exceed ="uploadexceed"
                             accept="image/png,image/gif,image/jpg,image/jpeg">
                             <i class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload> -->

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
                </FormItem>
                <FormItem label="企业地址：" prop="$_companyAddr_$">
                    <Select v-model="$_formValidate_$.addrtype" @on-change="changeAddrType" placeholder="请选择地址类型"
                            class="input" style="width:100px;">
                        <Option v-for="item in addressList" :value="item.value" :key="item.value">{{item.label}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem v-show="$_addrShow_$" label="请输入：">
                    <Input v-model="$_formValidate_$.$_detailedAddr1_$" placeholder="请输入企业地址"></Input>
                </FormItem>
                <FormItem v-show="!$_addrShow_$" label="地址关联：" prop="$_detailedAddr2_$">
                    <Select ref="buildings"
                            :label-in-value="true"
                            :value="$_formValidate_$.building"
                            @on-change="building"
                            placeholder="请选择建筑"
                            class="input" style="width:100px;">
                        <Option v-for="(item,index) in buildings" :key="index" :label="item.label"
                                :value="item.value"></Option>
                    </Select>
                    <Select :label-in-value="true" :value="$_formValidate_$.floorId" @on-change="chosefloor"
                            placeholder="请选择楼层" class="input" style="width:140px">
                        <Option v-for="(item,index) in floors" :key="index" :label="item.label"
                                :value="item.value"></Option>
                    </Select>
                    <Select ref="rooms" :label-in-value="true" @on-change="choseroom" :value="$_formValidate_$.roomIds"
                            placeholder="请选择房间" class="input" style="width:120px;">
                        <Option v-for="(item,index) in rooms" :key="index" :label="item.label"
                                :value="item.value"></Option>
                    </Select>

                    <Button type="primary" style="height:39px;" @click="addRoom">添加</Button>
                    <div style="width:450px;height:200px;overflow-y:scroll;">
                        <ul class="build" v-for="(item,index) in positions" :key="index">
                            <li>
                                <span>楼： {{item.build}}</span>
                                <span v-if="!item.floor == ''">层：{{item.floor}}</span>
                                <span v-if="!item.room == ''">房间： {{item.room}}</span>
                                <Button type="primary" style="height:39px;" @click="delRoom(index)">删除</Button>
                            </li>
                        </ul>
                    </div>

                </FormItem>
                <FormItem align="center">
                    <!--<Button type="primary">暂存</Button>-->
                    <Button type="primary" @click="$_next_$" style="margin:0 auto">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 添加管理员 -->
        <div v-show="$_show2_$" class="stepBox">
            <div class="info">管理员基本信息</div>
            <Form ref="$_adminFormValidate_$" :model="$_adminFormValidate_$" :rules="$_ruleValidate1_$"
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
                        <img v-if="$_facefile_$" :src="$_global_$.imgPath+$_facefile_$" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <el-upload
                        class="avatar-uploader"
                        :action=this.$_global_$.imgUploadPath
                        list-type="picture-card"
                        ref="uploadxls"
                        :show-file-list="true"
                        :before-upload="beforeupload"
                        :on-remove="handleRemove"
                        :limit="1"
                        :on-exceed ="uploadexceed"
                        :on-success="uploadSuccess"
                        accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                </FormItem>
                <FormItem label="姓名：" prop="$_Name_$">
                    <Input v-model.trim="$_adminFormValidate_$.$_Name_$" placeholder="请输入姓名"></Input>
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
                    <Input v-model="$_adminFormValidate_$.$_phone_$" placeholder="请输入手机号码" number></Input>
                </FormItem>
                <!-- <FormItem label="登录密码：" prop="$_password_$">
                    <Input type="password" v-model="$_adminFormValidate_$.$_password_$" placeholder="请输入登录密码"></Input>
                </FormItem> -->
                <FormItem label="邮箱：" prop="$_mail_$">
                    <Input v-model="$_adminFormValidate_$.$_mail_$" placeholder="请输入邮箱"></Input>
                </FormItem>
                <FormItem label="生日：" prop="$_birthyday_$">
                    <DatePicker type="date"
                                v-model="$_adminFormValidate_$.$_birthyday_$"
                                placement="bottom-end"
                                placeholder="请选择日期" style="width: 200px">
                    </DatePicker>
                </FormItem>
                <FormItem label="入职日期：" prop="$_workday_$">
                    <DatePicker type="date"
                                v-model="$_adminFormValidate_$.$_workday_$"
                                placement="bottom-end"
                                placeholder="请选择日期" style="width: 200px">
                    </DatePicker>
                </FormItem>
                <FormItem label="角色分配：" prop="$_roleSort_$">
                    <Select
                            v-model="$_roleSort_$"
                            multiple
                            placeholder="请选择角色">
                        <Option v-for="(item,index) in allot"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                            {{item.label}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem align="center">
                    <!--<Button type="primary">暂存</Button>-->
                    <Button type="primary" @click="$_currenter_$" style="margin:0 auto">上一步</Button>
                    <Button type="primary" @click="$_next_$" style="margin:0 auto">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 完成 -->
        <div v-show="$_show3_$" class="stepBox">
            <div align="center">
                <Icon type="checkmark-circled" color="#248E21" style="font-size:100px;margin-top: 20%"></Icon>
                <br>
                <div>添加成功</div>
                <br>
                <Button type="primary" @click="$_goBack_$" style="margin-top: 20%">返回列表</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import controler from './controler.js';
    import ElementUI from 'element-ui';

    import 'element-ui/lib/theme-chalk/index.css';
    import {Button, Select, Option, Table, TableColumn, Upload} from 'element-ui';

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
            /*const $_zczj_$ = (rule,value,callback) =>{
                let reg = /^\d{1,9}$/;
                if(!reg.test(value)){
                    callback("注册资金不能超过九位数!")
                }
            };*/
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validatecont = (rule, value, callback) => {
                if (this.$_formValidate_$.addrtype == '0') {
                    //手动输入
                    if (this.$_formValidate_$.$_detailedAddr1_$ != "") {
                        callback();
                    } else {
                        callback('请输入企业地址');
                    }
                } else {
                    if (this.positions.length > 0) {
                        callback();
                    } else {
                        callback();
                    }
                }
            };
            /*const $_ygsl_$ = (rule,value,callback) =>{
                var reg = /^\d{1,6}$/
                if(!reg.test(value)){
                    callback("员工数量不能超过六位数!")
                }
            };*/
            const $_password_$ = (rule, value, callback) => {
                let reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
                if (!reg.test(value)) {
                    callback("密码应至少包含字母、数字")
                } else {
                    if (value.length < 6 || value.length > 16) {
                        callback("密码长度为6到16位之间!")
                    } else {
                        callback()
                    }
                }
            };
            return {
                editorOption: {modules: {toolbar: '#toolbar'}},
                $_file_$: '',
                $_facefile_$: '',
                businessLicense: '',
                $_addrShow_$: true,
                current: 0,
                $_show1_$: true,
                $_show2_$: false,
                $_show3_$: false,
                allot: [],
                $_roleSort_$: [],

                addressList: [  // 地址类型
                    {value: 0, label: "手动输入"},
                    {value: 1, label: "地址关联"}
                ],
                //房间联动
                zones: [],
                buildings: [],
                floors: [],
                rooms: [],
                zoneId: 0,
                buildId: 0,
                floorId: 0,
                //企业信息表单
                $_formValidate_$: {
                    addrtype: 0,
                    zoneId: 0,
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
                    number: '',
                    $_busLicense_$: '',
                },
                // 管理员表单
                $_adminFormValidate_$: {
                    $_Name_$: '',
                    $_sex_$: '',
                    $_phone_$: '',
                    $_mail_$: '',
                    $_birthyday_$: '',
                    $_workday_$: '',
                    $_roleSort_$: '',
                    $_number_$: '',
                    $_password_$: '',
                    roleSort: '',
                    $_img_$: '',
                },
                roles: [], // 权限列表
                $_ruleValidate_$: {
                    $_busLicense_$: [
                        {required: true, message: '请上传营业执照', trigger: 'change'}
                    ],
                    $_companyName_$: [
                        {required: true, type: 'string', message: '请输入企业名称', trigger: 'change'},
                        {type: 'string', max: 50, message: '企业名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_registerAddr_$: [
                        {required: true, type: 'string', message: '请输入注册地址', trigger: 'change'},
                        {type: 'string', max: 200, message: '注册地址不能超过200个字', trigger: 'change'}
                    ],
                    $_registermoney_$: [
                        {required: true, type: 'number', message: '请填写注册资金,如：1000', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {type: 'number', max: 999999999, message: '注册资金不能超过999999999', trigger: 'change'},
                    ],
                    $_legalPerson_$: [
                        {required: true, type: 'string', message: '请填写法人名称', trigger: 'change'},
                        {type: 'string', max: 50, message: '法人名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    // number: [
                    //     {required: true,type: 'number', message: '请输入员工数量', trigger: 'change' },
                    //     {validator: this.$_validatepostiveint_$, trigger:'change'},
                    //     {type: 'number', max: 99999999, message: '员工数量不能超过999999', trigger: 'change'},
                    // ],
                    $_range_$: [
                        {required: true, type: 'string', message: '请输入经营范围', trigger: 'change'},
                        {type: 'string', max: 200, message: '经营范围不能超过200个字', trigger: 'change'},
                    ],
                    $_industryCategory_$: [
                        {required: true, type: 'string', message: '请选择一项行业类别', trigger: 'change'}
                    ],
                    $_companyAddr_$: [
                        // {required: true, validator: validatecont, trigger: 'change'}
                    ],
                },
                //管理员图片验证
                $_ruleValidate1_$: {
                    $_Name_$: [
                        {required: true, type: 'string', message: '请输入姓名', trigger: 'change'},
                        {type: 'string', max: 20, message: '姓名不能超过20个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_number_$: [
                        {required: true, type: 'string', message: '请输入员工编码', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'},
                    ],
                    $_sex_$: [
                        {required: true, type: 'string', message: '请选择性别', trigger: 'change'}
                    ],
                    $_phone_$: [
                        {required: true, type: 'number', message: '请输入手机号', trigger: 'change'},
                        {validator: this.$_validatephone_$, trigger: 'change'},
                    ],
                    $_mail_$: [
                        {type: 'email', message: '请输入正确邮箱地址', trigger: 'change'}
                    ],
                    // $_password_$: [
                    //     { required: true, message: '请输入密码', trigger: 'change' },
                    //     {validator: this.$_password_$, trigger:'change'},
                    // ],
                    /*$_birthyday_$: (rules, value, callback, source, options)=>{
                        if(!value) return callback('时间格式错误');
                        if(value>new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
                            return callback('日期开始时间不能在当前时间之后');
                        callback()
                     },   */
                    // $_workday_$: [
                    //     { required: true, message: '请选择入职日期', trigger: 'change' },
                    //     {validator(rules, value, callback, source, options){
                    //         if(!value) return callback('时间格式错误');
                    //         if(value>new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
                    //             return callback('日期开始时间不能在当前时间之后');
                    //         callback()
                    //     }},
                    // ]
                    // $_roleSort_$: [
                    //     { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    // ]
                },
                showAdd: true, // 图片上传加号显示
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                positions: [],
                showList: {
                    build: '',
                    floor: '',
                    room: ''
                },
                submitList: {
                    floorId: null,
                    roomIds: null,
                    buildingId: null
                },
                positionsubmit: [],
                companyId: 0,
                complate: false,
                repeat: true,
            }
        },
        created() {
            if (this.$root.inparams.id) {
                this.companyId = this.$root.inparams.id
            }
            if (this.$root.inparams.count) {
                this.current = 1
                this.$_show1_$ = false;
                this.$_show2_$ = true;
            }
            this.zoneId = this.$root.inparams.zoneId;
            this.$_admin_$();
            this.$_validatestr_$;
            this.zList();
            this.bList();
            this.roleList();
        },
        methods: {
            $_admin_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/user/role/admin`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data.records;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                if (arr[i]['flag'] == 1) {
                                    temp = {
                                        value: arr[i].id + '',
                                        label: arr[i].name
                                    };
                                    this.allot.push(temp)
                                }
                            }
                        }
                    }
                })
            },
            // 获取园区信息
            zList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {pageSize: 999},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data.records;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.zones.push(temp)
                            }
                            this.$_formValidate_$.zoneId = this.$root.inparams.zoneId;
                            if (this.$_formValidate_$.zoneId == 0 || !this.$_formValidate_$.zoneId)
                                this.$_formValidate_$.zoneId = arr[0].id;
                        }
                    }
                })
            },
            //获取楼层列表
            bList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            this.buildings = [];
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.buildings.push(temp)
                            }
                            this.$refs.buildings.reset();

                        }
                    }
                })
            },
            //获取楼层信息
            fList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            this.floors = [];
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.floors.push(temp)
                            }
                            this.chosefloor(this.floors[0]);
                        }
                    }
                })
            },
            //获取房间信息
            rList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            this.rooms = [];
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i].used == 0) {
                                    //used 为0时，代表该房间未被绑定，可以显示
                                    let temp = {};
                                    temp = {
                                        label: arr[i].name,
                                        value: arr[i].id
                                    };
                                    this.rooms.push(temp)
                                }
                            }
                            this.$refs.rooms.reset();
                        }
                    }
                })
            },
            //添加地址信息
            addRoom() {
                //楼宇、楼层、房间必须都存在才可以保存
                if (this.submitList.buildingId && this.submitList.floorId && this.submitList.roomIds) {
                    let addsure = true;  //默认可以进行添加
                    if (this.positionsubmit && this.positionsubmit.length > 0) {
                        for (let i = 0; i < this.positionsubmit.length; i++) {
                            //验证房间号是否相同
                            if (this.positionsubmit[i].roomIds == this.submitList.roomIds) {
                                //房间号相同，不能添加
                                addsure = false;
                                break;
                            }
                            //房间号不同，继续进行循环
                        }
                    }
                    if (addsure) {
                        var sublist = JSON.parse(JSON.stringify(this.submitList));
                        var list = JSON.parse(JSON.stringify(this.showList));
                        this.positionsubmit.push(sublist);
                        this.positions.push(list)
                    }
                } else {
                    this.$Message.error("请正确选择地址!")
                }

            },
            // 删除地址信息
            delRoom(index) {
                this.positions.splice(index, 1);
                this.positionsubmit.splice(index, 1);
            },
            // 更改地址类型
            changeAddrType(value) {
                if (value == 1) {
                    this.$_addrShow_$ = false
                } else {
                    this.$_addrShow_$ = true
                }
            },
            // 更该园区
            chosezone(value) {
                this.zoneId = value;
                this.buildings = [];
                this.floors = [];
                this.rooms = [];
                this.$_formValidate_$.buildingId = '';
                this.$_formValidate_$.floorId = '';
                this.$_formValidate_$.roomIds = '';
                this.bList()
            },
            //更改建筑
            building(value) {
                this.buildId = value.value;
                this.floors = [];
                this.rooms = [];
                this.showList.build = value.label;
                this.submitList.buildingId = value.value;
                this.$_formValidate_$.floorId = '';
                this.fList()
            },
            //更改楼层
            chosefloor(value) {
                if (value) {
                    this.floorId = value.value;
                    this.rooms = [];
                    this.$_formValidate_$.floorId = value.value;
                    this.showList.floor = value.label;
                    this.submitList.floorId = value.value;
                    this.rList()
                } else {
                    this.showList.room = '';
                    this.submitList.roomIds = '';
                    this.$_formValidate_$.roomIds = '';
                }

            },
            // 更改房间
            choseroom(value) {
                if (value) {
                    this.showList.room = value.label;
                    this.submitList.roomIds = value.value;
                    this.$_formValidate_$.roomIds = value.value;
                } else {
                    this.showList.room = '';
                    this.submitList.roomIds = '';
                    this.$_formValidate_$.roomIds = '';
                }
            },
            // 格式化时间
            FormatAllDate(sDate) {
                let date = new Date(sDate);
                let seperator1 = "-";
                let seperator2 = ":";
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
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
                let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + hours + seperator2 + minutes + seperator2 + seconds;
                return currentdate;
            },
            // 获取角色列表
            roleList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/user/role/admin`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                };
                                this.roles.push(temp)
                            }
                        }
                    }
                })
            },
            $_currenter_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/enterprise/` + this.companyId,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            this.$_formValidate_$.addrtype = arr.addressType
                            this.$_formValidate_$.zoneName = arr.zoneId
                            this.$_formValidate_$.building = arr.buildingId

                            this.$_formValidate_$.$_companyName_$ = arr.name
                            this.$_formValidate_$.$_registerAddr_$ = arr.registerAddress
                            this.$_formValidate_$.$_registermoney_$ = arr.registeredCapital * 1
                            this.$_formValidate_$.$_legalPerson_$ = arr.legalPerson
                            this.$_formValidate_$.$_range_$ = arr.businessScope
                            this.$_file_$ = arr.businessLicense
                            this.$_formValidate_$.$_busLicense_$ = this.$_file_$
                            this.$_formValidate_$.$_industryCategory_$ = arr.sectors
                            this.$_formValidate_$.$_detailedAddr1_$ = arr.address
                            this.positionsubmit = [];
                            this.positions = [];
                            if (arr.addressType == 0) { //手动输入
                                this.positionsubmit = []
                            } else {
                                this.positionsubmit = arr.positions;   //地址关联
                                this.positions = positions;
                            }
                            this.bList();
                        }
                    }
                })
                this.current--;
                this.repeat = false;
                this.$_show1_$ = true;
                this.$_show2_$ = false
                // this.$_file_$=this.businessLicense;
            },
            $_next_$() {
                //第一步
                if (this.current == 0) {
                    // this.$_formValidate_$.file = '123';
                    // this.$_formValidate_$.businessLicense=this.$_file_$;
                    if (this.repeat) {
                        this.$refs.$_addFormValidate_$.validate((valid) => {
                            if (valid) {
                                if (this.$_formValidate_$.addrtype == 0) {
                                    //手动输入企业地址
                                    this.$_sendQuery_$({
                                        method: "POST",
                                        url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/enterprise`,
                                        data: {
                                            businessLicense: this.$_formValidate_$.$_busLicense_$,
                                            sectors: this.$_formValidate_$.$_industryCategory_$,
                                            address: this.$_formValidate_$.$_detailedAddr1_$,
                                            registerAddress: this.$_formValidate_$.$_registerAddr_$,
                                            city: '',
                                            county: '',
                                            businessScope: this.$_formValidate_$.$_range_$,
                                            scale: this.$_formValidate_$.number,
                                            positions: [
                                                {floorId: null, roomIds: null, buildingId: null}
                                            ],
                                            type: 0,
                                            province: '',
                                            registeredCapital: this.$_formValidate_$.$_registermoney_$,
                                            legalPerson: this.$_formValidate_$.$_legalPerson_$,
                                            name: this.$_formValidate_$.$_companyName_$,
                                            zoneId: this.$_formValidate_$.zoneId,
                                            addressType: this.$_formValidate_$.addrtype
                                        },
                                        headers: {"Content-type": "application/json"}
                                    }).then((rsp) => {
                                        if (rsp.status === 200) {
                                            if (rsp.data.code === 0) {
                                                this.$Message.success("新增企业成功!")
                                                this.companyId = rsp.data.data.id
                                                this.businessLicense = rsp.data.data.businessLicense;
                                                this.current++;
                                                this.$_show1_$ = false;
                                                this.$_show2_$ = true;
                                            } else {
                                                this.$Message.error(rsp.data.message)
                                            }
                                        }
                                    })
                                } else {
                                    //地址关联企业地址
                                    this.$_sendQuery_$({
                                        method: "POST",
                                        url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/enterprise`,
                                        data: {
                                            businessLicense: this.$_formValidate_$.$_busLicense_$,
                                            // businessLicense: '/biz/1001.png',
                                            sectors: this.$_formValidate_$.$_industryCategory_$,
                                            address: "",
                                            registerAddress: this.$_formValidate_$.$_registerAddr_$,
                                            city: "",
                                            county: '',
                                            businessScope: this.$_formValidate_$.$_range_$,
                                            scale: this.$_formValidate_$.number,
                                            positions: this.positionsubmit,
                                            type: 0,
                                            province: '',
                                            registeredCapital: this.$_formValidate_$.$_registermoney_$,
                                            legalPerson: this.$_formValidate_$.$_legalPerson_$,
                                            name: this.$_formValidate_$.$_companyName_$,
                                            zoneId: this.$_formValidate_$.zoneId,
                                            addressType: this.$_formValidate_$.addrtype
                                        },
                                        headers: {"Content-type": "application/json"}
                                    }).then((rsp) => {
                                        if (rsp.status === 200) {
                                            if (rsp.data.code === 0) {
                                                this.$Message.success("新增企业成功!");
                                                this.companyId = rsp.data.data.id;
                                                this.businessLicense = rsp.data.data.businessLicense;
                                                this.current++;
                                                this.$_show1_$ = false;
                                                this.$_show2_$ = true;
                                            } else {
                                                this.$Message.error(rsp.data.message)
                                            }
                                        }
                                    })
                                }
                            }
                        })

                    } else {
                        //返回上一步后再下一步
                        this.$refs.$_addFormValidate_$.validate((valid) => {
                            if (valid) {
                                if (this.$_formValidate_$.addrtype == 0) {
                                    //手动输入企业地址
                                    this.$_sendQuery_$({
                                        method: "PUT",
                                        url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/enterprise`,
                                        data: {
                                            id: this.companyId,
                                            businessLicense: this.$_formValidate_$.$_busLicense_$,
                                            sectors: this.$_formValidate_$.$_industryCategory_$,
                                            address: this.$_formValidate_$.$_detailedAddr1_$,
                                            registerAddress: this.$_formValidate_$.$_registerAddr_$,
                                            city: '',
                                            county: '',
                                            businessScope: this.$_formValidate_$.$_range_$,
                                            scale: this.$_formValidate_$.number,
                                            positions: [
                                                {floorId: null, roomIds: null, buildingId: null}
                                            ],
                                            type: 0,
                                            province: '',
                                            registeredCapital: this.$_formValidate_$.$_registermoney_$,
                                            legalPerson: this.$_formValidate_$.$_legalPerson_$,
                                            name: this.$_formValidate_$.$_companyName_$,
                                            zoneId: this.$_formValidate_$.zoneId,
                                            addressType: this.$_formValidate_$.addrtype
                                        },
                                        headers: {"Content-type": "application/json"}
                                    }).then((rsp) => {
                                        if (rsp.status === 200) {
                                            if (rsp.data.code === 0) {
                                                this.current++;
                                                this.businessLicense = this.$_formValidate_$.businessLicense;
                                                this.$_show1_$ = false;
                                                this.$_show2_$ = true;
                                            } else {
                                                this.$Message.error(rsp.data.message)
                                            }
                                        }
                                    })
                                } else {
                                    //地址关联企业地址
                                    this.$_sendQuery_$({
                                        method: "PUT",
                                        url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/enterprise`,
                                        data: {
                                            id: this.companyId,
                                            businessLicense: this.$_formValidate_$.$_busLicense_$,
                                            // businessLicense: '/biz/1001.png',
                                            sectors: this.$_formValidate_$.$_industryCategory_$,
                                            address: "",
                                            registerAddress: this.$_formValidate_$.$_registerAddr_$,
                                            city: "",
                                            county: '',
                                            businessScope: this.$_formValidate_$.$_range_$,
                                            scale: this.$_formValidate_$.number,
                                            positions: this.positionsubmit,
                                            type: 0,
                                            province: '',
                                            registeredCapital: this.$_formValidate_$.$_registermoney_$,
                                            legalPerson: this.$_formValidate_$.$_legalPerson_$,
                                            name: this.$_formValidate_$.$_companyName_$,
                                            zoneId: this.$_formValidate_$.zoneId,
                                            addressType: this.$_formValidate_$.addrtype
                                        },
                                        headers: {"Content-type": "application/json"}
                                    }).then((rsp) => {
                                        if (rsp.status === 200) {
                                            if (rsp.data.code === 0) {
                                                this.current++;
                                                this.businessLicense = this.$_formValidate_$.businessLicense;
                                                this.$_show1_$ = false;
                                                this.$_show2_$ = true;
                                            } else {
                                                this.$Message.error(rsp.data.message)
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }

                }
                //第三步
                else if (this.current == 1) {
                    // this.$_adminFormValidate_$.file = '123';
                    // this.$_adminFormValidate_$.file = this.$_file_$;
                    if (this.$_adminFormValidate_$.$_birthyday_$) {
                        this.$_adminFormValidate_$.$_birthyday_$ = this.FormatAllDate(this.$_adminFormValidate_$.$_birthyday_$);
                    } else {
                        this.$_adminFormValidate_$.$_birthyday_$ = "";
                    }
                    if (this.$_adminFormValidate_$.$_workday_$) {
                        this.$_adminFormValidate_$.$_workday_$ = this.FormatAllDate(this.$_adminFormValidate_$.$_workday_$);
                    } else {
                        this.$_adminFormValidate_$.$_workday_$ = "";
                    }
                    this.$refs.$_adminFormValidate_$.validate((valid) => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: 'POST',
                                url: this.$_global_$.serverPath + `/company/company/${this.companyId}/employee`,
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
                                    createDate: this.$_adminFormValidate_$.$_workday_$
                                }
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        let id = [];
                                        id.push(rsp.data.data.id);
                                        // 设置企业管理员
                                        this.$_sendQuery_$({
                                            method: "POST",
                                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/enterprise/${this.companyId}/admin`,
                                            data: {add: id},
                                            headers: {"Content-type": "application/json"}
                                        }).then((rsp) => {
                                            if (rsp.status === 200) {
                                                if (rsp.data.code === 0) {
                                                    if (this.$_roleSort_$.length == 0) {
                                                        // 设置园区管理员
                                                        this.$_sendQuery_$({
                                                            method: "POST",
                                                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/admin`,
                                                            data: {add: id},
                                                            headers: {"Content-type": "application/json"}
                                                        }).then((rsp) => {
                                                            if (rsp.status === 200) {
                                                                if (rsp.data.code === 0) {
                                                                } else {
                                                                    this.$Message.error(rsp.data.data)
                                                                }
                                                            }
                                                        })
                                                    } else {
                                                        let arr = [];
                                                        for (let i = 0; i < this.$_roleSort_$.length; i++) {
                                                            let temp = {};
                                                            temp = {id: this.$_roleSort_$[i]};
                                                            arr.push(temp)
                                                        }
                                                        // 批量授权角色
                                                        this.$_sendQuery_$({
                                                            method: "POST",
                                                            url: `${this.$_global_$.serverPath}/user/user/${id}/roles`,
                                                            data: {add: arr},
                                                            headers: {"Content-type": "application/json"}
                                                        }).then((rsp) => {
                                                            if (rsp.status === 200) {
                                                                if (rsp.data.code === 0) {
                                                                } else {
                                                                    this.$Message.error(rsp.data.data)
                                                                }
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    this.$Message.error(rsp.data.data)
                                                }
                                            }
                                        });
                                        this.current++;
                                        this.$_show2_$ = false;
                                        this.$_show3_$ = true;
                                    } else {
                                        this.$Message.error(rsp.data.message)
                                    }
                                }
                            })
                        }
                    });
                }
            },
            $_addCompany_$() {
                this.$root.inparams.id;
            },
            $_goBack_$() {
                this.$root.$_Route_$('superadmin', 'system', 'companymanage', {zoneId: this.$_formValidate_$.zoneId})
            },
            beforeupload(file) {
                return this.isLtMB(file);
            },
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
                if (this.current == 0) {
                    this.$_formValidate_$.$_busLicense_$ = res.data;
                    this.$_file_$ = this.$_formValidate_$.$_busLicense_$
                } else if (this.current == 1) {
                    this.$_adminFormValidate_$.$_img_$ = res.data;
                    this.$_facefile_$ = this.$_adminFormValidate_$.$_img_$
                }

                // this.fileChange(fileList);
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
                let a = '';
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