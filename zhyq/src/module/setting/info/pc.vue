<style scoped>
 ul{
        list-style-type: none;
    }

    ul li{
       border-bottom: 1px solid #eee;
       width:80%;
       margin:0 auto;
       height:50px;
       line-height:50px;
    }

    .title{
        margin-left: 20px;
        text-align: center;
    }

    .value{
        margin-left: 30px;
        text-align: center;
    }
</style>
<template>
    <div class="lm" style="margin:15px 0;">
        <Card style="width:500px;margin-left:50px;">
            <p slot="title">
                <Icon type="card" size="18"></Icon>
                个人信息
            </p>
            <ul>
                <li>
                    <span class="title">用户名称</span>
                    <span class="value">{{username}}</span>
                </li>
                <li>
                    <span class="title">手机号码</span>
                    <span class="value">{{phone}}</span>
                </li>
                <li>
                    <span class="title">电子邮箱</span>
                    <span class="value">{{email}}</span>
                </li>
                <li>
                    <span class="title">所属公司</span>
                    <span class="value">{{company}}</span>
                </li>
                <li>
                    <span class="title">角色名称</span>
                    <span class="value">{{rolename}}</span>
                </li>
                <li>
                    <span class="title">创建时间</span>
                    <span class="value">{{time}}</span>
                </li>
            </ul>
        </Card>
    </div>
</template>

<script>
import controler from './controler.js';
export default {
    mixins: [controler],
    data(){
      return{
          username:'',
            time:'',
            rolename:'',
            phone:'',
            company:'',
            email:'',
            $_querycfg_$: {
                mod: 'user',
                params:{
                    cmd: '4',
                }
            }
      }
    
    },
    created(){
this.$_fquery_$();
    },
    methods:{
$_receive_$(rsp) {

            if (rsp.data.cmd == '4') {
                this.username = rsp.data.obj['name'];
                this.phone = rsp.data.obj['phone'];
                this.time = rsp.data.obj['time'];
                this.rolename = rsp.data.obj['rolename'];
                this.company = rsp.data.obj['company'];
                this.email = rsp.data.obj['email'];
            }
        }
    }
}
</script>