import config from "../config/config";

function Api(dataAPI){
    let baseURL = config.env === 'production'?'//api.bi.fumenhu.cn/home/':'//boss.fmh.cn/home/';
    let param = dataAPI.join('/');
    let xhr = new XMLHttpRequest();
    let url = baseURL+'query/'+param;
    xhr.open("GET",url, false);//提交get请求到服务器
    xhr.withCredentials = true; //支持跨域发送cookies
    xhr.send(null);
    let res = JSON.parse(xhr.responseText);
    return res.obj;
}

export default Api