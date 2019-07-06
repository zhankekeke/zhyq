<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }
    .top{
        padding:10px 20px;
        border:1px solid #ddd;
    }
    .top .tlt{
        margin-bottom:20px;
        font-weight:normal;
        font-size:16px;
    }
    .top .gr{
        padding:10px 0 0 10px;
    }
    .top p,.top li{
        line-height:30px;
    }
    .top .bold{
        font-size:30px;
        margin:0 3px;
    }
    .top .staff{
        width:100%;
    }
    .screen{
        padding:20px;
        /*background: #f7f7f7;*/
        margin:20px 0;
    }
    .table .data{
        line-height:30px;
    }
    .page{
        margin-top:20px;
        text-align:right;
    }
</style>
<template>
   <div class="sz">
        <div class="screen">
        </div>
        <div class="table">
            <p class="data">共<span>{{$_strip_$}}</span>条数据</p>
            <Table :columns="$_columns_$" :data="$_data_$"></Table>
        </div>
        <!-- 表单结束 -->
       <Row style="margin-top:20px;">
           <Col align="left" span="12">共有{{$_strip_$}}条数据</Col>
           <Col align="right">
               <Page :total="$_strip_$" :page-size="$_pageSize_$"
                     show-elevator show-sizer
                     @on-page-size-change="$_pageSizeChange_$"
                     @on-change="$_changePage_$"/>
           </Col>
       </Row>
        <!-- 分页结束 -->
       <div align="center">
           <Button type="primary" @click="$_tc_$()">返回</Button>
       </div>
   </div>
</template>
<script>

export default {

    data() {
        return {
            $_strip_$:0,  //数据总数
            $_columns_$: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '性别',
                    key: 'sex'   ,
                    align: 'center',
                    render: (h, params) => {
                        let a;
                        if (params.row.sex == 1) {
                            a = "女";
                        }else{
                            a = "男";
                        }
                        return h("span", {}, a);
                    }
                },
                {
                    title: '电话号码',
                    key: 'phoneNumber'  ,
                    align: 'center',
                },
                {
                    title: '公司名称',
                    key: 'enterpriseName',
                    align: 'center',
                },
            ],
            $_data_$: [],
            $_pageNum_$: 1, //当前页面数
            $_pageSize_$: 10, //每页显示数据条数
        }
    },
    created(){
        this.$_list_$()
    },
    methods: {
        // 列表
        $_list_$(){
            let row = this.$root.inparams.row;
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + "/zone/zone/meeting/reserve/"+row.id+"/attend",
                data: {
                    pageSize:this.$_pageSize_$,
                    pageNum:this.$_pageNum_$
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if(rsp.status == 200){
                    if (rsp.data.code == 0) {
                        this.$_data_$ = rsp.data.data.records;
                        this.$_strip_$ = rsp.data.data.total
                    }else{
                        this.$Message.error(rsp.data.message);
                    }
                }
            });
        },

        //数据下一页
        $_changePage_$(e) {
            this.$_pageNum_$ = e;
            this.$_list_$();
        },
        //页面显示的数据条数
        $_pageSizeChange_$(e) {
            this.$_pageSize_$ = e;
            this.$_list_$();
        },
        //返回预约记录列表
        $_tc_$(){
            this.$root.$_Route_$("employer", "jump", "myyyjl");
        },
    },

}
</script>