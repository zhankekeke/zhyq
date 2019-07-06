<style scoped>
</style>
<template>
    <Row>
        <Col span="10" style="margin-top: 20px;">
        <Form :model="formItem" ref="formItem" :label-width="120" :rules="ruleCustom" @submit.native.prevent>
            <FormItem label="登录手机号" prop="phone">
                <Input v-model="formItem.phone" placeholder="请您输入手机号"></Input>
            </FormItem>
            <FormItem label="用户密码" prop="pass">
                <Input type="password" v-model="formItem.pass" placeholder="请您输入密码"></Input>
            </FormItem>
            <FormItem label="密码确认" prop="notpass">
                <Input type="password" v-model="formItem.notpass" placeholder="请您密码确认"></Input>
            </FormItem>
            <FormItem label="用户名称" prop="name">
                <Input v-model="formItem.name" placeholder="请您输入用户名称"></Input>
            </FormItem>
            <FormItem label="电子邮箱" prop="email">
                <AutoComplete
                        v-model="formItem.email"
                        @on-search="$_handleSearch_$"
                        placeholder="请您输入电子邮箱"
                    >
                    <Option v-for="item in data" :value="item" :key="item">{{ item }}</Option>
                </AutoComplete>
            </FormItem>
            <FormItem label="设置管理">
                <Switch v-model="formItem.admin" size="large" @on-change="$_SetAdmin_$"></Switch>
            </FormItem>
            <FormItem label="角色选择">
                <Select v-model="model1" :disabled="$_sdisabled_$">
                    <Option v-for="item in role" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">立即提交</Button>
                <Button type="ghost" style="margin-left: 8px" v-on:click="$_Back_$">返回</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>
</template>
<script>
    export default {
        data() {
            const validatePhone = (rule, value, callback) => {
                let phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|186)+\d{8})$/;
                if (!phonereg.test(this.formItem.phone)) {
                    callback(new Error('手机号码有误'));
                }
                callback();
            };
            const validatePass = (rule, value, callback) => {
                if (this.formItem.pass.length < 6 || this.formItem.pass.length > 30) {
                    callback(new Error('密码需在6-30位之间'));
                }
                callback();
            };
            const validateNotPass = (rule, value, callback) => {
                if(this.formItem.pass == ''){
                    callback(new Error('密码不能为空'));
                }else{
                    if(this.formItem.pass != this.formItem.notpass){
                        callback(new Error('密码与密码确认不一致'));
                    }
                }
                callback();
            };
            const validateName = (rule, value, callback) => {
                if (this.formItem.name.length < 2 || this.formItem.pass.length > 20) {
                    callback(new Error('名称需在2-20位之间'));
                }
                callback();
            };
            return {
                formItem: {
                    name: '',
                    pass: '',
                    phone: '',
                    notpass: '',
                    email:''
                },
                ruleCustom: {
                    phone: [
                        {required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    pass: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    notpass: [
                        { required: true,validator: validateNotPass, trigger: 'blur' }
                    ],
                    name: [
                        { required: true,validator: validateName, trigger: 'blur' }
                    ],
                },
                data:[],
                role: [{
                    name: '',
                    id: ''
                }],
                $_sdisabled_$:false,
                model1: '',
                $_querycfg_$: {
                    mod: 'user',
                    params: {
                        cmd: '0',
                    }
                }
            }
        },
        mounted: function() {
            this.$_querycfg_$.params.cmd = '3';
            this.$_fquery_$();
        },
        methods: {
            $_Back_$() {
                this.$root.$_GoBack_$();
            },
            $_SetAdmin_$(val){
                if(val){
                    this.$_sdisabled_$ = true;
                }else{
                    this.$_sdisabled_$ = false;
                }
            },
            $_handleSearch_$ (value) {
                this.data = !value || value.indexOf('@') >= 0 ? [] : [
                    value + '@ftjw.cn',
                    value + '@126.com',
                    value + '@qq.com',
                    value + '@sina.com',
                    value + '@163.com'
                ];
            },
            handleSubmit (name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let name = this.formItem.name;
                        let pass = this.formItem.pass;
                        let phone = this.formItem.phone;
                        let email = this.formItem.email;
                        let isadmin = this.formItem.admin;
                        let role = this.model1;
                        let admin = '';
                        let emailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                        if(email != ''){
                            if (!emailreg.test(email)) {
                                this.$Notice.error({
                                    title: '电子邮箱有误',
                                });
                                return false;
                            }
                        }

                        admin = isadmin ?  1 : 0;
                        this.$_querycfg_$.params.cmd = '0';
                        this.$_querycfg_$.params.name = name;
                        this.$_querycfg_$.params.pass = pass;
                        this.$_querycfg_$.params.phone = phone;
                        this.$_querycfg_$.params.email = email;
                        this.$_querycfg_$.params.admin = admin;
                        this.$_querycfg_$.params.role = role;
                        this.$_fquery_$();
                    } else {
                        this.$Notice.error({
                            title: '存在验证不通过项,请重新填写',
                        });
                        return false;
                    }
                })
            },
            $_receive_$(rsp) {

                if (rsp.data.status == 0) {
                    if (rsp.data.cmd == '3') {
                        this.role = rsp.data.obj;
                    } else {
                        this.$root.$_GoBack_$();
                    }
                } else if (rsp.data.status == -1) {
                    this.$Notice.error({
                        title: rsp.data.obj,
                    });
                }


            }

        }
    }
</script>