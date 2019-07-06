<style scoped></style>
<template>
    <Cascader :data="list" v-model="model"></Cascader>
</template>
<script>
export default {
	props:['value'],
    data(){
		return {
			list:[],
			model:[],
            $_querycfg_$:{
				mod:'module',
                params:{
					cmd:4
                }
            }
        }
    },
    created(){
		this.$_fquery_$((e)=>{


        });
    },
    watch:{
	    model(){
	    	console.log(this.model);
        }
    },
    methods:{
	    $_receive_$(rsp){
			if(rsp.status === 200){
				if(rsp.data.status === 0){
					this.list = rsp.data.obj;
                }
            }
        }
    }
}
</script>