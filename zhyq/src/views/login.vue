<style scoped>
    .title{
        font-size: 34px;
        color: #0080ff;
        font-family: AliHYAiHei;
        font-weight: 700;
        margin-bottom: 60px;
    }
    .middle{
        padding: 0 15%;
    }
    .safe{
        text-align:right;
        color: #3399ff;
        font-size: 14px;
        font-family: 'Microsoft YaHei';
    }
    .footer{
        margin-top:45px;
    }
    >>>.ivu-input-group-prepend{
        background-color: #fff;
    }
</style>
<template>
    <div>
        <div style="text-align: right">
            <img src="/static/login/right_pink.png" style="height: 130px;margin-right: 5%"/>
        </div>
        <Row style="text-align: center;">
            <Col span="12">
                <img src="/static/login/left.png" style="height: 380px;" />
            </Col>
            <Col span="12">
                <div style="width: 80%">
                    <div class="title">企业服务平台</div>
                    <div class="middle">
                        <Form ref="login" :model="$_querycfg_$.params" :rules="$_rules_$" @submit.native.prevent
                              style="position: relative; padding:0 14px;">
                            <FormItem prop="username">
                                <Input type="text" v-model="$_querycfg_$.params.username" placeholder="手机号/用户名">
                                    <span slot="prepend"><img src="/static/login/user.png" /></span>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="$_querycfg_$.params.password" placeholder="密码">
                                    <span slot="prepend"><img src="/static/login/pwd.png" /></span>
                                </Input>
                            </FormItem>
                            <div class="safe">忘记密码？</div>
                        </Form>
                    </div>
                    <div class="footer">
                        <Button type="primary" style="width: 48%" shape="circle" size="large" :loading="$_ing_$" @click="$_handleSubmit_$()">登录</Button>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
    <!--<Modal v-model="$_show_$" width="360" :closable="false" :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="key"></Icon>
            <span>请登录系统</span>
        </p>
        <Form ref="login" :model="$_querycfg_$.params" :rules="$_rules_$" @submit.native.prevent
              style="position: relative; padding:0 14px;">
            <FormItem prop="user">
                <Input type="text" v-model="$_querycfg_$.params.username" placeholder="手机号/用户名"/>
            </FormItem>
            <FormItem prop="user">
                <Input type="password" v-model="$_querycfg_$.params.password" placeholder="密码"/>
            </FormItem>
            &lt;!&ndash;<FormItem prop="valid">&ndash;&gt;
            &lt;!&ndash;<p v-if="!$_jv_$.ready">正在加载验证码......</p>&ndash;&gt;
            &lt;!&ndash;<div v-show="$_jv_$.ready" ref="geetest" id="embed-captcha"></div>&ndash;&gt;
            &lt;!&ndash;</FormItem>&ndash;&gt;
        </Form>
        <div slot="footer">
            <Button type="primary" size="large" long :loading="$_ing_$" @click="$_handleSubmit_$()">登录</Button>
        </div>
    </Modal>-->
</template>
<script>
    // require('../libs/gt');
    import Vue from 'vue';
    import {EventBus} from '@/libs/eventbus';

    export default {
        data() {
            return {
                $_ing_$: false,
                $_show_$: false,
                $_rules_$: {
                    username: [{required: true, message: '用户名必填', trigger: 'blur'}],
                    password: [{required: true, message: '密码必填', trigger: 'blur'}],
                },
                $_jv_$: {
                    ready: !1,
                    state: !1,
                    error: !1,
                    instance: void 0,
                },
                $_querycfg_$: {
                    mod: 'user/login',
                    params: {}
                }
            }
        },
        mounted() {
            this.$_OpenLogin_$();
        },
        methods: {
            $_OpenLogin_$() {
                let token = this.$_getCookie_$('m-cjdiirppoem');
                if (!token) {
                    this.$_show_$ = true;
                }
            },
            $_SendCode_$() {
            },
            // $_handleSubmit_$() {
            //     if (!this.$_jv_$.state) {
            //         return void this.$Message.error('请点击验证按钮进行验证');
            //     }
            //     this.$refs.login.validate((valid) => {
            //         if (valid) {
            //             this.$_ing_$ = true;
            //             this.$_querycfg_$.params.cmd = 0;
            //             this.$_querycfg_$.params.jvdata = this.$_jv_$.instance.getValidate();
            //             this.$_fquery_$(({ status, data }) => {
            //                 this.$_ing_$ = false;
            //                 this.$_jv_$.state = false;
            //                 this.$_jv_$.instance.reset();
            //                 if (data && data.status === 0) {
            //                     window.location.reload();
            //                 } else {
            //                     this.$Message.error(data.obj || '登录失败，请尝试重新登录！');
            //                 }
            //             });
            //         } else {
            //             this.$Notice.error({
            //                 title: '存在验证不通过项,请重新填写',
            //             });
            //             return false;
            //         }
            //     })
            // },
            $_handleSubmit_$() {
                this.$refs.login.validate((valid) => {
                    if (valid) {
                        this.$_ing_$ = true;
                        this.$_fquery_$(({status, data}) => {
                            this.$_ing_$ = false;
                            if (data && data.code === 0) {
                                if(this.$_querycfg_$.params.username === 'admin'){
                                    data.data.user.isAdmin = 1
                                }else {
                                    data.data.user.isAdmin = 0
                                }
                                localStorage.removeItem('power');
                                this.$_setCookie_$('m-cjdiirppoem', data.data.token, 120);//10分钟
                                let userInfo = JSON.stringify(data.data.user);
                                this.$_setCookie_$('m-sjwdnnaiowm', userInfo, 120);//10分
                                this.$_sendQuery_$({
                                    method: "GET",
                                    url: `${this.$_global_$.serverPath}/user/user/resources`,
                                }).then((rsp) => {
                                    if (rsp.status === 200) {
                                        if (rsp.data.code === 0) {
                                            if (this.isEmptyObject(rsp.data.data)) {
                                                window.location.href = '/employers';
                                                return
                                            }
                                            if (!window.localStorage) {
                                                this.$Message.error('浏览器不支持,建议使用ie8以上版本');
                                            } else {
                                                let that = this;
                                                this.setLocalStorage('power', rsp.data.data, 1);
                                                setTimeout(function () {
                                                    let power = that.$_getLocalStorage_$('power');
                                                    if (power) {
                                                        let superadmins = 0;
                                                        let users = 0;
                                                        let companys = 0;
                                                        let employers = 0;
                                                        for (let key in power) {
                                                            if (key == 'platform') {
                                                                superadmins = 1;
                                                            }
                                                            if (key == 'zone') {
                                                                users = 1;
                                                            }
                                                            if (key == 'company') {
                                                                companys = 1;
                                                            }
                                                            if (key == 'employee') {
                                                                employers = 1;
                                                            }
                                                        }
                                                        if (superadmins) {
                                                            window.location.href = '/superadmins';
                                                            return
                                                        }
                                                        if (users) {
                                                            window.location.href = '/users';
                                                            return
                                                        }
                                                        if (companys) {
                                                            window.location.href = '/companys';
                                                            return
                                                        }
                                                        if(employers){
                                                            window.location.href = '/employers';
                                                            return
                                                        }
                                                        that.$_show_$ = false;
                                                    } else {
                                                        that.$Message.error('权限列表请求失败');
                                                    }
                                                }, 1000);
                                            }
                                        } else {
                                            this.$Message.error('权限列表请求失败');
                                            setTimeout(function () {
                                            }, 2000);
                                        }
                                    } else {
                                        this.$Message.error('权限列表请求失败');
                                        setTimeout(function () {
                                        }, 2000);
                                    }
                                });
                            } else {
                                this.$Message.error(data.message || '登录失败，请尝试重新登录！');
                            }
                        });
                    } else {
                        this.$Notice.error({
                            title: '存在验证不通过项,请重新填写',
                        });
                        return false;
                    }
                })
            },
            $_setCookie_$(cname, cvalue, exmins) {
                let d = new Date();
                d.setTime(d.getTime() + (exmins * 60 * 1000));
                let expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
            },
            $_getCookie_$(cname) {
                let name = cname + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim();
                    if (c.indexOf(name) == 0) {
                        return decodeURIComponent(c.substring(name.length, c.length));
                    }
                }
                return "";
            },

            /**
             * 设置cookie
             * @param {[type]} key   [键名]
             * @param {[type]} value [键值]
             * @param {[type]} days  [保存的时间（天）]
             */
            setLocalStorage(key, value, days) {
                // 设置过期原则
                if (!value) {
                    localStorage.removeItem(key)
                } else {
                    let Days = days || 1; // 默认保留1天
                    let exp = new Date();
                    localStorage[key] = JSON.stringify({
                        value,
                        expires: exp.getTime() + Days * 60 * 1000
                    })
                }
            },
            isEmptyObject(obj) {
                for (let key in obj) {
                    return false;//返回false，不为空对象
                }
                return true;//返回true，为空对象
            }
        }
    }
</script>