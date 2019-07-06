import axios from 'axios';

export const http = axios.create({
    //baseURL: 'http://localhost:8888/api/private/v1/'
});

http.interceptors.request.use(function (config) {
    let token = getCookie('m-cjdiirppoem');
    let userInfo = getCookie('m-sjwdnnaiowm');
    if(!token){
          window.location.href = '/login';
    }else {
        //token存在刷新时间
        $_setCookie_$('m-cjdiirppoem', token, 120);
        $_setCookie_$('m-sjwdnnaiowm', userInfo, 120);
    }
    if (config.url !== '/login' && token) {
       config.headers['Authorization'] = token;
    }
    return config
}, function (error) {

    return Promise.reject(error)
});

const httpPlugin = {};

httpPlugin.install = function (Vue, options) {
    // 3. 添加实例方法
    Vue.prototype.$_sendQuery_$ = http
};

function getCookie (cname) {
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
function $_setCookie_$(cname, cvalue, exmins) {
    let d = new Date();
    d.setTime(d.getTime() + (exmins * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
}
const validatestr = (rule, value, callback) => {
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    let regCn = /[·！#￥（——）：；“”‘、， |《。》？、【】[\]]/im;
    if (regEn.test(value) || regCn.test(value)) {
        callback('名称包含非法字符');
    } else {
        callback();
    }
};
export default httpPlugin;