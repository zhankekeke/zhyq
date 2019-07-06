<style scoped>
    .screen{
        padding:20px;
        background: #f7f7f7;
        margin:0 0 20px 0;
    }
</style>
<template>
    <div>
        <h3 style="font-size:16px">账户充值</h3>
        <br>
        <div class="screen">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;账户余额:&nbsp;<Input v-model="$_balance_$" placeholder="请输入订单编号" style="width: 100px" />&nbsp;元</p>
        </div>
        <Steps :current="$_current_$" style="width:70%;margin:0 auto;">
            <Step title="充值金额"></Step>
            <Step title="选择支付方式"></Step>
            <Step title="完成"></Step>
        </Steps>
        <br>
        <br>
        <br>
        <br>    
        <div style="width:70%;margin:0 auto;" v-show="$_show1_$">
            <div style="width:60%;margin:0 auto;">
                <p><span style="width:80px;">充值金额:</span>&nbsp;&nbsp;&nbsp;&nbsp;<Input v-model="$_value_$" placeholder="Enter something..." style="width: 200px" />&nbsp;&nbsp;&nbsp;&nbsp;元</p>
                <br>
                <p><span style="width:80px;">赠送:</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="width:80px;">{{$_jf_$}}</span></p>
                <br>
                <div style="width:60%;text-align:center;"> 
                    <Button type="primary" @click="$_next_$">下一步</Button>
                </div>     
            </div>
        </div>
        <div style="width:70%;margin:0 auto;" v-show="$_show2_$">
            <div style="width:60%;margin:0 auto;">
            支付方式
                <div style="width:60%;text-align:center;">
                    <Button type="primary" @click="$_back_$">上一步</Button> 
                    <Button type="primary" @click="$_next_$">下一步</Button>
                </div> 
            </div>
        </div>
        <div style="width:70%;margin:0 auto;" v-show="$_show3_$">
            <div style="width:60%;margin:0 auto;">
            完成sss
                <div style="width:60%;text-align:center;"> 
                    <Button type="primary" @click="$_next_$">完成</Button>
                </div> 
            </div>
        </div>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_balance_$:'33333',
            $_current_$:0,
            $_value_$:'6666666666',
            $_jf_$:'444',
            $_show1_$:true,
            $_show2_$:false,
            $_show3_$:false
        }
    },
    methods: {
        $_cz_$(){
            this.$root.inparams.id
        },
        //上一步
        $_back_$(){
            this.$_current_$ -= 1;
            if(this.$_current_$ ==0){
                this.$_show1_$=true;
                this.$_show2_$=false;
            }
        },
        //下一步
        $_next_$(){
            
            if (this.$_current_$ == 2) {
                //this.$_current_$ = 0;
            } else {
                this.$_current_$ += 1;
            }
            if(this.$_current_$ ==1){
                this.$_show1_$=false;
                this.$_show2_$=true;
            }
            if(this.$_current_$ ==2){
                this.$_show2_$=false;
                this.$_show3_$=true;
            }
        }
    }
}


</script>