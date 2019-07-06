<style scoped>
    ul{
        list-style-type: none;
        width:100%;
    }

    ul li{
        border-bottom: 1px solid #eee;
        width:100%;
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
        <Card style="width:50%;margin-left:50px;">
            <p slot="title">
                <Icon type="card" size="18"></Icon>
                公司信息
            </p>
            <ul>
                <li>
                    <span class="title">公司名称</span>
                    <span class="value">{{name}}</span>
                </li>
                <li>
                    <span class="title">公司秘钥</span>
                    <span class="value">{{secret}}</span>
                    <Switch size="large" @on-change="$_ShowSecret_$">
                        <span slot="open">显示</span>
                        <span slot="close">隐藏</span>
                    </Switch>
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
    export default {
        data() {
            return {
                name:'',
                time:'',
                database:'',
                secret:'******************************************',
                $_querycfg_$: {
                    mod: 'company',
                    params:{
                        cmd: '3',
                    }
                }
            }
        },
        created() {
            this.$_fquery_$();
        },
        methods: {
            $_ShowSecret_$(value){
                if(value){
                    this.secret = localStorage.getItem('$_Secret_$');
                }else{
                    this.secret = '******************************************';
                }
            },
            $_receive_$(rsp) {
                this.loading = false;

                if (rsp.data.cmd == '3') {
                    this.name = rsp.data.obj['name'];
                    this.time = rsp.data.obj['time'];
                    localStorage.setItem('$_Secret_$', rsp.data.obj['secret']);
                }
            }
        }
    }
</script>