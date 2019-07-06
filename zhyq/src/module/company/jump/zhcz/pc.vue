<style scoped>
   .container{font-size: 14px;font-weight: 400;}
   .title{font-size: 16px;font-weight: bold;}
   .row{margin:10px 0;}
   .bg{line-height: 80px;min-height: 80px;box-sizing: border-box;padding:0px 50px;background: #f7f7f7;}
   .box{border:1px solid #e4e4e4;border-radius: 5px;line-height: 50px;margin:0 auto;width:600px;box-sizing: border-box;padding: 50px 150px;}
   .center{text-align: center;}
</style>
<template>
<div class='container'>
    <Row class='title row'>
        账户充值
    </Row>
    <Row class="bg row">
        账户余额： <Input v-model="$_money_$" placeholder="48000" style="width: 100px"></Input> 元
    </Row>
    <Row >
        <Steps :current="$_current_$" style='margin:50px 0 50px 150px;'>
            <Step title="充值金额"></Step>
            <Step title="选择支付方式"></Step>
            <Step title="完成"></Step>
        </Steps>
    </Row>
    <Row >
        <div class="box">
            <p>充值金额：<Input v-model="$_money1_$" placeholder="60000" style="width: 150px"></Input> 元</p>
            <p>赠送：<span style='color:#FF0000;' v-model='$_jifen_$'>{{$_jifen_$}}</span> 积分</p>
            <p class="center"> <Button type="primary">下一步</Button></p>
        </div>
    </Row>
</div>
    
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_querycfg_$:{
                mod:'',
                params:{
                   
                }
            },
           $_money_$:'',
           $_money1_$:'',
           $_jifen_$:'600000',
           $_current_$:0
        }
    },
     created(){
        this.$_global_$.serverPath
		this.$_fquery_$();
    },
    methods: {
            $_list_$(){
                this.$_sendQuery_$({
            method:"POST",
            url:this.$_global_$.serverPath+`/operate/account/incrBalance`,
            data:{
              
            },
            headers:{
              "Content-type":"application/json"
            }
          }).then((rsp)=>{
            if(rsp.status === 200){
              
            }
          })
            },

         $_receive_$(rsp){
			if(rsp.status === 200){
				if(rsp.data.status === 0){
                    this.list = rsp.data.obj;
                    conaole.log("这是列表list",this.list)
                }
            }
        },
        $_chongzhi_$(){
            this.$root.inparams.id;
        }
       
    }
}
</script>