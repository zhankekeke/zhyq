<style scoped>

</style>

<template>
    <Row>
        <Col span="8" style="margin-top: 20px;">
        <Form :model="formItem" :label-width="120">
            <FormItem label="用户名称">
                <Input v-model="formItem.name" placeholder="请您输入用户的名称"></Input>
            </FormItem>
            <FormItem label="用户密码">
                <Input type="password" v-model="formItem.pass" placeholder="不修改,无需填写"></Input>
            </FormItem>
            <FormItem label="密码确认">
                <Input type="password" v-model="formItem.notpass" placeholder="如填写密码,需填写密码确认"></Input>
            </FormItem>
            <FormItem label="电子邮箱">
                <AutoComplete
                        v-model="formItem.email"
                        @on-search="$_handleSearch_$"
                        placeholder="请您输入电子邮箱">
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
                <Button type="primary" v-on:click="$_Submit_$">立即提交</Button>
                <Button type="ghost" style="margin-left: 8px" v-on:click="$_Back_$">返回</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>
</template>

<script>
    export default {
        data () {
            return {
                formItem: {
                    name: this.$root.inparams.$_DataName_$,
                    pass: '',
                    notpass: '',
                    phone: this.$root.inparams.$_DataPhone_$,
                    admin: this.$root.inparams.$_DataAdmin_$ ? true : false,
                    email: this.$root.inparams.$_DataEmail_$
                },
                data:[],
                role: [{
                    name: '',
                    id: ''
                }],
                $_sdisabled_$:this.$root.inparams.$_DataAdmin_$ ? true : false,
                model1: '',
                $_querycfg_$: {
                    mod: 'user',
                    params: {
                        cmd: '2',
                        id: this.$root.inparams.$_DataId_$,
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
            $_Submit_$() {
                let name = this.formItem.name;
                let pass = this.formItem.pass;
                let notpass = this.formItem.notpass;
                let isadmin = this.formItem.admin;
                let email = this.formItem.email;
                let role = this.model1;
                let admin = '';
                let emailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

                if(name.length < 2 || name.length > 20){
                    this.$Notice.error({
                        title: '用户名需在2-20位之间',
                    });
                    return false;
                };

                if(pass != ''){
                    if(pass.length < 6 || pass.length > 30){
                        this.$Notice.error({
                            title: '密码需在6-30位之间',
                        });
                        return false;
                    };

                    if(pass != notpass){
                        this.$Notice.error({
                            title: '密码与密码确认不一致',
                        });
                        return false;
                    };
                }else{
                    pass = '';
                }



                if(email != ''){
                    if (!emailreg.test(email)) {
                        this.$Notice.error({
                            title: '电子邮箱有误',
                        });
                        return false;
                    }
                }

                admin = isadmin ?  1 : 0;
                this.$_querycfg_$.params.cmd = '2';
                this.$_querycfg_$.params.name = name;
                this.$_querycfg_$.params.pass = pass;
                this.$_querycfg_$.params.admin = admin;
                this.$_querycfg_$.params.email = email;
                this.$_querycfg_$.params.role = role;
                this.$_fquery_$();
            },
            $_receive_$(rsp){
                if (rsp.data.status == 0) {
                    if (rsp.data.cmd == '3') {
                        if(!this.$root.inparams.$_DataAdmin_$){
                            this.model1 = this.$root.inparams.$_DataRoleId_$;
                        }
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