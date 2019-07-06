<style scoped>
  .container{font-size:14px;}
</style>
<template>
<div class='container'>
    <Row class='title row'>
        考勤统计
    </Row>
    
</div>
    
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_querycfg_$:{
                mod:'module',
                params:{
                    cmd:4
                }
            },
         
        }
    },
     created(){
		this.$_fquery_$();
    },
    methods: {
         $_receive_$(rsp){
			if(rsp.status === 200){
				if(rsp.data.status === 0){
					this.list = rsp.data.obj;
                }
            }
        },
         $_kaoqintongzhi_$(){
            this.$root.inparams.id;
        }  
       
    }
}
</script>