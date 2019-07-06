<!-- 数据表 -->
<style scoped>
.table {
    margin-top: -1px;
}

.hr {
    margin-top: 15px;
    width: 100%;
}

</style>
<template>
    <div class="table">
        <Row>
            <Col span="24">
                <Table  :loading="$_isloading_$" :highlight-row="true" ref="selection" @on-selection-change="$_itemselect_$" border :columns="$_insertindex_$()" :data="$_data_$"></Table>
            </Col>
        </Row>
        <Row class="hr">
            <Col span="9" align="left">
                <Button type="ghost" @click="$_handleSelectAll_$(true)">设置全选</Button>
                <Button type="ghost" @click="$_handleSelectAll_$(false)">取消全选</Button>
            </Col>
            <Col span="15" align="right" v-if="havepage">
                <Page :total="$_total_$" :page-size="pagesize||10" :show-total="true" @on-change="$_pagechange_$" @on-page-size-change="$_pagesizechange_$" show-elevator></Page>
            </Col>
        </Row>
    </div>
</template>
<script>
import copy from 'deep-copy';
import { EventBus } from '@/libs/eventbus.js';
export default {
    props: ['value', '$_columns_$', 'havepage', 'isloading', 'pagesize'],
    data() {
        return {
            $_querycfg_$: copy(this.value),
            $_isloading_$: this.isloading,
            $_data_$: [],
            $_total_$: 0,
            page: 1
        };
    },
    methods: {
        $_insertindex_$() {
            let newcol=copy(this.$_columns_$);
            newcol.splice(1, 0, {
                type: 'index',
                width: 55,
                align: 'center'
            });
            return newcol;
        },
        $_handleSelectAll_$(status) {
            this.$refs.selection.selectAll(status);
        },
        $_itemselect_$(val) {
            this.$_querycfg_$.params.id = this.$_ArrayCol_$(val);
            this.$emit('on-select', val);
        },
        $_receive_$(rsp) {
            if (rsp.data.status == 0) {
                this.$_total_$ = rsp.data.count;
                this.$_data_$ = rsp.data.obj || [];
            }
            this.$_isloading_$ = false;
            this.$emit('receive', rsp);
        },
        $_loading_$(val) {
            this.$_isloading_$ = val;
        },
        $_buildquery_$() {
            this.$_querycfg_$.params.id = this.$_ArrayCol_$(this.$_querycfg_$.params.id);
            this.$_querycfg_$.params.page = this.page;
            this.$_isloading_$ = true;
            this.$_fquery_$();
        },
        $_pagesizechange_$(val) {
            this.$_querycfg_$.params.pagesize = val;
            this.$_buildquery_$();
        },
        $_pagechange_$(val) {
            this.$_querycfg_$.params.page = this.page = val;
            this.$_buildquery_$();
        },
        $_update_$(val) {
            this.$_total_$ = val.count;
            this.$_data_$ = val.obj || [];
        },
        //更新查询参数
        $_changeMap_$(val){
            for(let k in val){
                this.$_querycfg_$.params[k] = val[k];
            }
        },
        //删除查询参数
        $_DelMap_$(val){
          val.map(item=>{
              if(this.$_querycfg_$.params.hasOwnProperty(item)){
                  delete this.$_querycfg_$.params[item];
              }
          })
        }
    },
    beforeDestroy() {
        EventBus.$off('$_RefreshPage_$', this.$_buildquery_$);
    },
    mounted() {
        // this.$_buildquery_$();
        EventBus.$on('$_RefreshPage_$', this.$_buildquery_$);
    },

    // watch: {
    //     value:{
    //         handler:function(val) {
    //             console.log('****************88',val);
    //             //this.$_querycfg_$ = val;
    //             this.$set(this.$_querycfg_$,'mod',val.mod);
    //             this.$set(this.$_querycfg_$,'params',val.params);
    //         },
    //         deep:true
    //     }
    // },
}
</script>