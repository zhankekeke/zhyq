<style>
/*
#ModuleContent{margin: 0!important;padding: 0!important;}
.MainContent{top:0!important;}
body{background: #e9e9e9;position: static;}
.container{font-size:16px;color:#000;font-weight: 400;}
.header{height: 50px;line-height: 50px;text-align: center;font-size: 20px;font-weight: 500;position: fixed;top:0;width: 100%;background: #fff;}
.footer{position: fixed;bottom: 0;left: 0;width: 100%;background: #fff;padding: 10px 0;}
.wrap{padding:50px 0px 75px 0;}
.footer  .active{color:#7599ff;}
.wrap img{width: 100%;}
.right{float: right;color: #5064d4;}
.box{border-radius: 10px;background: #fff;margin: 10px;box-sizing: border-box;padding: 15px;}
.bangong {overflow: hidden;margin-top:10px;}
.bangong li img{width: 35px;height: 35px;}
.bangong li{float: left;width: 33.33%;text-align: center;color: #717171;margin:10px 0;line-height: 30px;}
.bangong li span{display: inline-block;padding: 10px 10px 4px 10px;background: #fff;box-shadow: 0 0 10px #c5baba;border-radius: 5px;}
.footer ul{overflow: hidden;}
.footer ul li{float: left;width: 33.33%;text-align: center;}
.footer ul li img{width: 25px;height: 25px;}
.footer ul li p{height: auto;}
.header .tishi{width: 25px;position: absolute;top:10px;right: 20px;}*/
</style>
<template>
   
    <div class="container" ref="aa"> <!--  
        <div class='header'>首页<img class="tishi" src="@/imgs/mobile/tishi.png" alt=""></div>
        <div class="wrap">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542780119548&di=ec391bd48e1341ddf938e2c7af24d656&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d1d257747cce0000012e7e28e6ef.jpg%402o.jpg" alt="">
           
            <div class="box">
                <p><span>办公</span><span class="right ">管理首页</span></p>
                <ul class="bangong">
                    <li>
                        <p><span><img class="phone" src="@/imgs/mobile/bg-fuwu.png" alt=""></span></p>
                        <p>通讯录</p>
                    </li>
                    <li>
                        <p><span><img class="" src="@/imgs/mobile/bg-tongzhi.png" alt=""></span></p>
                        <p>普通通知</p>
                    </li>
                    <li>
                        <p><span><img class="" src="@/imgs/mobile/bg-kaoqin.png" alt=""></span></p>
                        <p>考勤</p>
                    </li>
                    <li>
                        <p><span><img class="" src="@/imgs/mobile/bg-huiyishi.png" alt=""></span></p>
                        <p>会议室</p>
                    </li>
                    <li>
                        <p><span><img class="" src="@/imgs/mobile/bg-fangke.png" alt=""></span></p>
                        <p>访客</p>
                    </li>
                    <li>
                        <p><span><img class="" src="@/imgs/mobile/bg-huodong.png" alt=""></span></p>
                        <p>活动通知</p>
                    </li>
                </ul>
            </div>
            <div class="box">
                <p><span>办公</span></p>
                <ul class="bangong">
                    <li>
                        <p><span><img class="phone" src="@/imgs/mobile/sh-canting.png" alt=""></span></p>
                        <p>餐厅</p>
                    </li>
                    <li>
                        <p><span><img class="" src="@/imgs/mobile/sh-tingchechang.png" alt=""></span></p>
                        <p>停车场</p>
                    </li>
                </ul>
            </div>
            <div class="box">
                <p><span>消费</span></p>
                <ul class="bangong">
                    <li>
                        <p><span><img class="" src="@/imgs/mobile/xf-jifen.png" alt=""></span></p>
                        <p>积分商城</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class='footer'>
            <ul class="">
                <li>
                    <p><img class="" src="@/imgs/mobile/shouye.png" alt=""></p>
                    <p class="active">首页</p>
                </li>
                <li>
                    <p><img class="" src="@/imgs/mobile/fuwu.png" alt=""></p>
                    <p>服务</p>
                </li>
                <li>
                    <p><img class="" src="@/imgs/mobile/wode.png" alt=""></p>
                    <p>我的</p>
                </li>
            </ul>
        </div>
       -->
    </div>
</template>

<script>
import controler from './controler.js';
export default {
    mixins: [controler],
    data() {
        return {
            // current: 'tab1',
        }
    },
    methods:{
       
    }
}
</script>