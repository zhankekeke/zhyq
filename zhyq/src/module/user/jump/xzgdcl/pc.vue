<style scoped>
    .lm {
        margin-left: 100px;
        width: 520px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }

    >>>.avatar-uploader{
        width: 520px;
    }

    .el-select {
        width: 280px;
    }
    >>> .el-input__inner {
        height: 30px;
        font-size: 12px;
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

    .plateNumber >>>.el-input__inner{
        text-transform: uppercase;
    }

</style>
<template>
    <div class="lm">
        新增固定车辆
        <br/>
        <div>
            <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="手机号" prop="name">
                    <el-input v-show="show" v-model="$_addForm_$.searchmobile" placeholder="手机号搜索" style="width:30%;">
                    </el-input>
                    &nbsp;&nbsp;<span v-show="show"> 车主姓名</span>&nbsp;&nbsp;
                    <el-input v-model="$_addForm_$.name" placeholder="姓名"  style="width:34%;"></el-input>
                    &nbsp;&nbsp;<Button v-show="show" type="primary" @click="$_searchCl_$()">搜索</Button>
                </el-form-item>
                <div v-show="show" style="margin-left: 100px; margin-bottom: 20px; width: 400px;">请选择：<br/>
                    <p style="margin-left: 20px; margin-top: 10px; cursor: pointer; float: left"
                       v-for="(item,index) in $_searchData_$" :key="index" @click="$_xz_$(index)">
                        {{item.name}}
                    </p>
                    <div style=" clear: both"></div>
                </div>
                <el-form-item label="联系方式" prop="mobile">
                    <el-input v-model="$_addForm_$.mobile" :disabled="true" placeholder="请填写联系方式"></el-input>
                </el-form-item>
                <el-form-item label="所属公司" prop="company" placeholder="请填写公司名称">
                    <el-input v-model="$_addForm_$.company" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="车牌号码" prop="province">
                    <el-select v-model="$_addForm_$.province" placeholder="请选择" style="width:20%;">
                        <el-option
                                v-for="item in provinceList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input class="plateNumber" style="width: 79%;" v-model="$_addForm_$.plateNumber" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item label="品牌车型" prop="carType">
                    <el-input v-model="$_addForm_$.carType" placeholder="请输入品牌车型"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" ref="file" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="uploads"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="有效期" prop="date">
                    <el-date-picker type="daterange"
                                    value-format="yyyy-MM-dd hh:mm:ss"
                                    v-model="$_addForm_$.date"
                                    :start-date="new Date(new Date().getFullYear(),
                            new Date().getMonth()+1, new Date().getDate())"
                                    placement="bottom-end"
                                    placeholder="Select date" style="width: 100%"></el-date-picker>

                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <Button type="ghost" @click="onBack">取 消</Button>
                <Button type="primary" @click="$_addOK_$">确 定</Button>
            </div>
        </div>
    </div>
</template>
<script>

    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option, DatePicker} from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';

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
            const plateNumber = (rule, value, callback) => {
                if (this.$_addForm_$.plateNumber && this.$_addForm_$.province) {
                    let express = /^[A-Za-z][A-Za-z0-9]{4,5}[a-zA-Z0-9挂学警港澳]$/;
                    if ((express.test(this.$_addForm_$.plateNumber))) {
                        this.$_addForm_$.plateNumber = this.$_addForm_$.plateNumber.toUpperCase();
                        callback();
                    }else{
                        callback('请输入正确的车牌号')
                    }
                } else {
                    callback('请填写车牌号码');
                }
            };
            const validateimg = (rule, value, callback) => {
                if (this.$_file1_$.length > 0) {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };

            return {
                userInfo: '',
                show: true,
                $_searchData_$: '',
                imageList: [],
                baseUrl: this.$_global_$.imgPath,
                $_file_$: [],
                $_file1_$: [],
                // 新增 固定车位表单
                $_addForm_$: {
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
                //新增 固定车辆表单验证
                $_addRuleValidate_$: {
                    //新增图片
                    // image: [
                    //     { required: true, message: '必填', trigger: 'blur' }
                    // ]
                    mobile: [
                        {
                            required: true, type: 'number', message: '请填写正确手机号', trigger: 'change', transform(value) {
                                var myreg = /^[1][345678][0-9]{9}$/;
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
                        {required: true, message: '请填写车牌号!', trigger: 'change'},
                        {validator: plateNumber, trigger: 'change'},
                    ],
                    plateNumber: [
                        {required: true, message: '车牌号码不能为空!', trigger: 'change'},
                        //长度验证
                        {type: 'string', max: 50, message: '号码不能超过50字', trigger: 'change'},
                    ],
                    date: [
                        {required: true, message: '有效期不能为空!', trigger: 'change'}
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}
                        ],
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
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
        },
        methods: {
            //选择员工
            $_xz_$(index) {
                this.$_addForm_$.userId = this.$_searchData_$[index].id;
                this.$_addForm_$.name = this.$_searchData_$[index].name;
                this.$_addForm_$.mobile = this.$_searchData_$[index].phoneNumber;
                this.$_addForm_$.company = this.$_searchData_$[index].enterpriseName;
            },
            //新增固定车辆搜索
            $_searchCl_$() {
                this.$refs['addForm'].resetFields();
                this.$_searchData_$ = '';
                let senddata = {};
                if(this.$_addForm_$.searchmobile.length === 11){
                    senddata.phoneNum = this.$_addForm_$.searchmobile
                }else{
                    senddata.phoneNum = ''
                }
                if (this.$_addForm_$.name) {
                    senddata.name = this.$_addForm_$.name;
                }else{
                     senddata.name = ''
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

            // 新增 保存
            $_addOK_$() {
                if(this.$_file1_$.length > 0){
                    this.$_addForm_$.file = this.$_file1_$[0]['imageUrl'];
                }else{
                    this.$_addForm_$.file = '';
                }
                // console.log(this.$_addForm_$.file);return;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/parking/buy`,
                            data: {
                                userId: this.$_addForm_$.userId,
                                startTime: this.$_addForm_$.date[0],
                                endTime: this.$_addForm_$.date[1],
                                selectType: 0,
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
                                    this.$Message.success(rsp.data.message);
                                    this.onBack();
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }

                        })
                    }
                })

            },

            // upload的自己上传
            beforeupload(file) {
                return this.isLtMB(file);
                this.$set(this.$_addForm_$, 'images', this.$_file_$) // 向表单数据中添加图片数组
            },
            // 移除
            handleRemove(file, fileList) {
                this.imageList.pop();
                this.fileRmove(fileList);

                if (this.imageList.length == 0) {
                    $('.el-upload--picture-card').css('display', 'inline-block');
                }
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.imageList.push(1);
                $('.el-upload--picture-card').css('display', 'none');
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str}

                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                        }
                    }
                }
                this.$_file1_$.push(a);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {};
                this.$_file1_$ = [];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = {imageUrl:temp_str};
                            }else{
                                this.$Message.error(fileList[i].response.message);
                            }
                            this.$_file1_$.push(a);
                        }
                    }
                }
            },

            onBack() {
                this.$root.$_Route_$("user", "tcc", "clgl");
            }
        },

    };
</script>