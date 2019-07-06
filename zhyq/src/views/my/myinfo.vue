<style scoped>
    .myinfo {
        margin: 5% auto 0 35%;
        text-align: left;
    }

    .myinfo ul {
        margin: 30px auto 0 auto;
    }

    .myinfo ul li {
        margin-top: 30px;
        height: 24px;
        line-height: 24px;
    }

    .avatar-uploader {

    }

    .avatar-uploader-icon {
        color: #2a83ff;
        margin-top: 30px;
        position: absolute;

    }

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-left: 70px;
    }

</style>
<template>
    <div class="MainContent" style="text-align: center">
        <div class="myinfo">
            <div style="font-weight: bold; font-size: 16px; color: #545454">修改个人信息</div>
            <Form style="width: 350px;float: left;margin: 30px" ref="userInfo" :model="userInfo"
                  :rules="$_ruleValidate_$"
                  :label-width="80">
                <FormItem label="姓名：" prop="name">
                    <Input v-model="userInfo.name"></Input>
                </FormItem>
                <FormItem label="性别：" prop="sex">
                    <RadioGroup v-model="userInfo.sex">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机号：" prop="phoneNumber">
                    <Input v-model="userInfo.phoneNumber"></Input>
                </FormItem>
                <FormItem label="邮箱：" prop="emailUrl">
                    <Input v-model="userInfo.emailUrl"></Input>
                </FormItem>
                <FormItem label="生日：" prop="brithday">
                    <DatePicker type="date" placeholder="选择生日" v-model="userInfo.brithday"></DatePicker>
                </FormItem>
                <FormItem label="公司：">
                    <Input v-model="userInfo.enterpriseName" readonly></Input>
                </FormItem>
                <FormItem label="职务：">
                    <Input v-model="userInfo.departmentName" readonly></Input>
                </FormItem>
            </Form>

            <el-upload
                    class="avatar-uploader"
                    :action="$_global_$.imgUploadPath"
                    :show-file-list="false"
                    :before-upload="beforeuploadEdit"
                    :on-success="uploadSuccessEdit"
                     accept="image/png,image/gif,image/jpg,image/jpeg">
                <img v-if="userInfo.faceUrl" :src="$_global_$.imgPath + userInfo.faceUrl" class="avatar">
                <Button type="ghost" class="el-icon-plus avatar-uploader-icon">更换头像</Button>
            </el-upload>
            <div style="clear: both"></div>
        </div>
        <Button type="primary" @click="$_editMyInfo_$()">修改个人信息</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" @click="$_tc_$()">退出</Button>
    </div>
</template>
<script>
    import {Upload} from 'element-ui';

    export default {
        components: {
            [Upload.name]: Upload
        },
        data() {
            return {
                baseUrl: 'http://img.yhcode.com:88/',
                userInfo: {},
                $_ruleValidate_$: {
                    // $_img_$: [
                    //     {required: false, type: 'string', message: '请上传图片', trigger: 'change'}
                    // ],
                    name: [
                        {required: true, type: 'string', message: '请填写姓名', trigger: 'change'}
                    ],
                    sex: [
                        {required: true, type: 'string', message: '请选择性别', trigger: 'change'}
                    ],
                    phoneNumber: [
                        {required: true, message: '请填写手机号', trigger: 'change'},
                        {pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误'}
                    ],
                    emailUrl: [
                        {type: 'email', message: '请填写邮箱地址', trigger: 'change'}
                    ],
                    brithday: [
                        // {required: true, message: '请选择生日', trigger: 'change'}
                    ],
                },
            }
        },
        mounted() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.userInfo.brithday = this.userInfo.brithday.substring(0, 10);
            this.userInfo.sex = ''+this.userInfo.sex
        },
        methods: {
            confirm() {
                this.$Modal.confirm({
                    title: '修改个人信息',
                    content: '是否保存修改？',
                    onOk: () => {
                        this.$_editok_$();
                    },
                    onCancel: () => {

                    }
                });
            },


            $_editMyInfo_$() {
                this.$refs.userInfo.validate((valid) => {
                    if (valid) {
                        this.confirm();
                        this.userInfo.sex = '' + this.userInfo.sex
                    }
                })
            },
            $_tc_$(){
                   window.history.go(-1)
              },
            // 编辑确定
            $_editok_$() {
                if(this.userInfo.brithday){
                    this.userInfo.brithday = this.FormatAllDate(this.userInfo.brithday)
                }else{
                    this.userInfo.brithday = ''
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/user/user/reset/info`,
                    data: {
                        faceUrl: this.userInfo.faceUrl,
                        phoneNumber: this.userInfo.phoneNumber,
                        sex: Number(this.userInfo.sex),
                        brithday: this.userInfo.brithday,
                        emailUrl: this.userInfo.emailUrl,
                        name: this.userInfo.name
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data === 1) {
                                this.$Message.success("更新成功,请重新登录！");
                                let that = this;
                                setTimeout(function () {
                                    localStorage.removeItem('power');
                                    that.delCookie('m-cjdiirppoem');
                                    that.delCookie('m-sjwdnnaiowm');
                                    window.location.href = '/login';
                                }, 2000);
                            }
                        } else {
                            this.$Message.error("更新失败!");
                        }
                    }
                })
            },

            beforeuploadEdit(file) {
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, faceUrl) {
                this.userInfo.faceUrl = this.baseUrl + res.data
            },
            FormatAllDate(sDate) {
                var date = new Date(sDate);
                var seperator1 = "-";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();

                //月
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                //日
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }

                //格式化后日期为：yyyy-MM-dd HH:mm:ss
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " 00:00:00";
                return currentdate;
            },
            delCookie(key) {
                var date = new Date();
                date.setTime(date.getTime() - 1);
                var delValue = this.$_getCookie_$(key);
                if (!!delValue) {
                    document.cookie = key + '=' + delValue + ';expires=' + date.toGMTString();
                }
            },
        }
    }
</script>