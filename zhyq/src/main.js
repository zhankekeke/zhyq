import 'babel-polyfill'
import $_MVue_$ from 'vue';
import $_iView_$ from 'iview';
import $_VueRouter_$ from 'vue-router';
import $_Routers_$ from './router';
import $_Vuex_$ from 'vuex';
import $_Util_$ from './libs/util';
import $_Api_$ from './libs/api';
import $_App_$ from './app.vue';
import $_echarts_$ from 'echarts'
import $_global_$ from './libs/Global'
import $_httpPlugin_$ from './libs/http';
import VueQuillEditor from 'vue-quill-editor'

const {unloadAsks: $_unload_ask_$} = require('./config/config').default;

import 'iview/dist/styles/iview.css';
import './css/ft.css';
import './css/gtype.css';
import './css/public.css';
import 'vue-plyr/dist/vue-plyr.css';
import './css/theme.less';
// require styles 引入编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { Message } from 'element-ui';



$_MVue_$.prototype.$echarts = $_echarts_$;
$_MVue_$.prototype.$_global_$ = $_global_$;
$_MVue_$.use(VueQuillEditor);
$_MVue_$.use($_httpPlugin_$);
$_MVue_$.use($_VueRouter_$);
$_MVue_$.use($_Vuex_$);
$_MVue_$.use($_Util_$);
$_MVue_$.use($_Api_$);
$_MVue_$.use($_iView_$);
$_MVue_$.prototype.$_getCookie_$ = function (cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
};
$_MVue_$.prototype.$_validatestr_$ = (rule, value, callback) => {
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    let regCn = /[·！#￥（——）：；“”‘、， |《。》？、【】[\]]/im;
    if (regEn.test(value) || regCn.test(value)) {
        callback('输入包含非法字符');
    } else {
        callback();
    }
};
$_MVue_$.prototype.$_validatenum_$ = (rule, value, callback) => {
    let regNum = /^[0-9]+$/;
    if (!regNum.test(value)) {
        callback('请输入数字');
    } else {
        callback();
    }
};
$_MVue_$.prototype.$_validatepostiveint_$ = (rule, value, callback) => {
    let reg = /^\+?[1-9][0-9]*$/;
    if ((!reg.test(value)) && value) {
        callback("请输入正整数!")
    } else {
        callback()
    }
};
$_MVue_$.prototype.$_validatephone_$ = (rule, value, callback) => {
    if (!(/^1[3465789]\d{9}$/.test(value))) {
        callback('请输入正确的手机号');
    } else {
        callback();
    }
};
$_MVue_$.prototype.$_password_$ = (rule, value, callback) => {
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
$_MVue_$.prototype.isLtMB = (value, callback) => {
    let isLt1M = value.size / 1024 / 1024 < 10;
    if (!isLt1M) {
        Message.error('图片上传最大限度为10MB');
    }
    return isLt1M;
};
$_MVue_$.prototype.isLtMB1 = (value, callback) => {
    let isLt1M = value.size / 1024 / 1024 < 10;
    if (!isLt1M) {
        Message.error('文件上传最大限度为10MB');
    }
    return isLt1M;
};

$_MVue_$.prototype.$_getLocalStorage_$ = (name) => {
    try {
        let o = JSON.parse(localStorage[name]);
        return o.value
        // if (!o || o.expires < Date.now()) {
        //     return null
        // } else {
        //     return o.value
        // }
    } catch (e) {
        return localStorage[name]
    } finally {
    }
};


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: $_Routers_$
};
const router = new $_VueRouter_$(RouterConfig);

//路由拦截器
router.beforeEach((to, from, next) => {
    let token = getCookie('m-cjdiirppoem');
    let userInfo = getCookie('m-sjwdnnaiowm');
    $_iView_$.LoadingBar.start();
    if (to.fullPath == '/login') {
        next();
    } else {
        if (!token) {
            next({
                path: '/login'
            })
        } else {
            let power = $_getLocalStorage_$('power');
            if (typeof(power) !== 'undefined') {
                if (to.params.menu === 'superadmins') {
                    if (power['platform']) {
                        next();
                    }
                }
                if (to.params.menu === 'users') {
                    if (power['zone']) {
                        next();
                    }
                }
                if (to.params.menu === 'companys') {
                    if (power['company']) {
                        next();
                    }
                }
                if (to.params.menu === 'employers') {
                    if (!userInfo.isAdmin) {
                        next();
                    }
                }
                if (to.fullPath === '/myinfo' || to.fullPath === '/mypass') {
                    next();
                }
            } else {
                if (to.params.menu === 'employers') {
                    next();
                }
            }
        }
    }
});

router.afterEach((to, from, next) => {
    $_iView_$.LoadingBar.finish();
    app && app.$emit('$_router_load_$', to.path);
    window.scrollTo(0, 0);
});

const store = new $_Vuex_$.Store({
    state: {
        $_user_$: null,
        $_sourceClass_$: -1,
        $_moduleClass_$: -1,
        $_chartClass_$: -1
    },
    mutations: {
        $_user_$(state, info) {
            state.$_user_$ = info;
        },
        $_sourceClass_$(state, info) {
            state.$_sourceClass_$ = info;
        },
        $_moduleClass_$(state, info) {
            state.$_moduleClass_$ = info;
        },
        $_chartClass_$(state, info) {
            state.$_chartClass_$ = info;
        }
    },
    actions: {}
});

let app = new $_MVue_$({
    el: '#app',
    router: router,
    store: store,
    render: h => h($_App_$)
});
app.$on('$_router_load_$', (path) => {
    for (let i = 0; i < $_unload_ask_$.length; i++) {
        if (($_unload_ask_$[i] instanceof RegExp) && $_unload_ask_$[i].test(path) || path === $_unload_ask_$[i]) {
            return window.addEventListener('beforeunload', unload);
        }
    }
    window.removeEventListener('beforeunload', unload);
});

function unload(event) {
    event = event || window.event;
    if (event) {
        event.returnValue = '系统可能不会保存当前数据';
    }
    return '系统可能不会保存当前数据';
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function $_getLocalStorage_$(name) {
    try {
        let o = JSON.parse(localStorage[name]);
        return o.value
        // if (!o || o.expires < Date.now()) {
        //     return null
        // } else {
        //     return o.value
        // }
    } catch (e) {
        return localStorage[name]
    } finally {
    }
};