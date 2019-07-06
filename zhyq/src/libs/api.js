import axios from 'axios';
import iview from 'iview';
import $_BaseUrl_$ from '../config/api-server-host'

var $_SelSchenma_$;
var $_NologinNotice_$ = true;
export default {
    install: (Vue, options) => {
        Vue.mixin({
            data() {
                return {
                    $_BaseUrl_$: $_BaseUrl_$,
                    $_SelSchenma_$: ''
                }
            },
            methods: {
                $_fquery_$(fn) {
                    this.$_Api_$(this.$_querycfg_$).then(rsp => {
                        if (rsp.status == 200) {
                            if (rsp.data && rsp.data.status > 0) {
                                if (rsp.data.status == 2) {
                                    return this.$_Login_$();
                                } else {
                                    if (rsp.data.obj == '登录信息已过期') {
                                        if ($_NologinNotice_$) {
                                            $_NologinNotice_$ = false;
                                            this.$Notice.info({
                                                title: rsp.data.obj,
                                            });
                                            setTimeout(function () {
                                                $_NologinNotice_$ = true;
                                            }, 5000)
                                        }

                                    } else {
                                        this.$Notice.info({
                                            title: rsp.data.obj,
                                        });
                                    }

                                    return (typeof fn === 'function') && fn(rsp);
                                }
                            }
                            if (typeof fn === 'function') {
                                fn(rsp);
                            } else if (typeof this.$_receive_$ === 'function') {
                                this.$_receive_$(rsp);
                            }
                        }
                    }).catch(e => {
                        let rsp;
                        let errcode;
                        if (errcode = /status code (\d+)/.exec(e.message)) {
                            rsp = {
                                status: Number(errcode[1]),
                                data: {
                                    status: 1,
                                    obj: e.message
                                }
                            }
                        } else {
                            rsp = {
                                status: 500,
                                data: {
                                    status: 1,
                                    obj: e.message
                                }
                            }
                        }
                        if (typeof fn === 'function') {
                            fn(rsp);
                        } else if (typeof this.$_receive_$ === 'function') {
                            this.$_receive_$(rsp);
                        }
                    });
                }
            }
        })
        Vue.prototype.$_ChageSchenma_$ = (id) => {
            $_SelSchenma_$ = id;
        };
        Vue.prototype.$_GetSchenma_$ = (id) => {
            return $_SelSchenma_$;
        };
        Vue.prototype.$_ApiUrl_$ = (url = '') => {
            return $_BaseUrl_$ + url;
        };

        Vue.prototype.$_Api_$ = ($_querycfg_$) => {
            iview.LoadingBar.start();
            function getCookie(cname) {
                let name = cname + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim();
                    if (c.indexOf(name) == 0) {
                        return decodeURIComponent(c.substring(name.length, c.length));
                    }
                }
                return "";
            }
            function $_setCookie_$(cname, cvalue, exmins) {
                let d = new Date();
                d.setTime(d.getTime() + (exmins * 60 * 1000));
                let expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
            }

            let token = getCookie('m-cjdiirppoem');
            let userInfo = getCookie('m-sjwdnnaiowm');
            if (token) {
                //token存在刷新时间
                $_setCookie_$('m-cjdiirppoem', token, 120);
                $_setCookie_$('m-sjwdnnaiowm', userInfo, 120);
            }
            return new Promise((resolve, reject) => {
                axios({
                    baseURL: $_BaseUrl_$,
                    method: 'POST',
                    url: '/' + $_querycfg_$.mod,
                    data: Object.assign($_querycfg_$.params, {schenma: $_SelSchenma_$}),
                    timeout: 15000,
                    withCredentials: true,
                    headers: {
                        "Authorization": token
                    }
                }).then((rsp) => {
                    iview.LoadingBar.finish();
                    if (rsp.data && rsp.data.status == 2 || rsp.status === 401) {
                        Vue.User = null;
                    }
                    resolve(rsp);
                }).catch(e => {
                    iview.LoadingBar.finish();
                    new Vue().$Notice.error({
                        title: '请求服务器失败'
                    });
                    reject(e);
                });
            });
        };

    },
    $_BaseUrl_$: $_BaseUrl_$
}
