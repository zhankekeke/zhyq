<style scoped>
.query-links >>> .ivu-table-expanded-cell{
    padding:2px 60px;
}
.query-links >>> .extra-empty{
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
}
.query-links >>> .extra-line{
    height:30px;
    position:relative;
}
.query-links >>> .extra-line .ivu-btn{
    position:absolute;
    right:0;
    transform:translateX(100%);
}
.query-links >>>.ivu-modal-footer{
    padding:8px 18px;
}
</style>
<template>
    <Modal class="query-links" title="页面选择器" v-model="$_open_$ " :width="800">
        <Table :columns="columns" :data="list" :loading="$_loading_$"/>
        <div class="" slot="footer">
            <Page :total="$_total_$" @on-change="$_next_page_$" :page-size="$_querycfg_$.params.size"/>
        </div>
    </Modal>
</template>
<script>
export default {
	data(){
		return {
			list:[],
            $_pages_$:{},
			columns:[{
				type: 'expand',
                width:30,
				render:(h, {index, row})=>{
					if(row.page && row.page.length>0){
						return h('div', {class:'extra'}, row.page.map(page=>{
							return h('Row', {props:{type:'flex', 'align':'middle'}, class:'extra-line'},[
								h('i-col', {props:{span:12}}, page.name),
								h('i-col', {props:{span:12}}, page.url),
								h('i-button',{
									props:{size:'small'},
                                    on:{
										click:()=>{
											if(typeof this.callback === 'function'){
												page.path=[row.name,page.name];
												this.callback(page);
												this.callback = null;
												this.$_open_$ = false;
                                            }
                                        }
                                    }
                                },'选择')
							])
                        }))
                    }else{
						return h('div', {class:'extra-empty'} ,'无页面')
                    }
				}
			}, {
				title:'名称',
                key:'name',
            }, {
				title:'地址',
				key:'url',
			}, {
				title:'操作',
                width:80,
                render:(h, {index, row})=>{
	                return h('i-button',{
	                	props:{size:'small'},
		                on:{
			                click:()=>{
				                if(typeof this.callback === 'function'){
				                	row.path=[row.name];
					                this.callback(row);
					                this.callback = null;
					                this.$_open_$ = false;
				                }
			                }
		                }
                    },'选择');
                },
			}],
            $_total_$:0,
            $_loading_$:false,
			$_open_$:this.value,
            $_querycfg_$:{
				mod:'view',
                params:{
					cmd:4,
                    page:1,
                    size:20,
                    hastotal:true
                }
            }
		}
    },
    watch:{
	    $_open_$(nv){
			if(nv){
				this.$_load_$();
            }else{
				this.$emit('input', nv);
				this.list = [];
				this.$_total_$ = 0;
				this.$_pages_$ = {};
				this.$_querycfg_$.params = {cmd:4, page:1, size:20, hastotal:true};
            }
        },

    },
    created(){
		this.$on('open', (fn)=>{
			this.callback = fn;
			this.$_open_$ = true;
        })
    },
    methods:{
	    $_next_page_$(pn){
		    this.$_load_$(pn);
        },
	    $_load_$(page){
	    	if(this.$_loading_$) return void this.$Message.error('请求过于频繁');
		    this.$_loading_$ = true;
	    	if(page !== null && !isNaN(page)){
	    		this.$_querycfg_$.params.page = page;
            }
		    this.$_querycfg_$.params.hastotal = this.$_total_$ === 0;
	    	this.$_fquery_$(({status, data})=>{
			    if(this.$_open_$){
				    this.$_loading_$ = false;
				    if(data && data.status === 0){
				    	if(this.$_querycfg_$.params.hastotal){
				    		this.$_total_$ = data.obj.total;
				    		this.list = data.obj.list;
                        }else{
				    		this.list = data.obj.list;
                        }
				    }else this.$Message.error(data.obj);
                }
            })
        }
    }
}
</script>