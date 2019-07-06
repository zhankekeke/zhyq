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
        background: #f5f5f5;
        margin:20px 0;
    }
    .table .data{
        line-height:30px;
    }
</style>
<template>
   <div class="sz">
        <div class="screen">
            <Row>
                <Col span="24" style="font-size: 14px">
                    <div style="display: inline-block;margin-right: 28px;">
                        会议室名称：<Input v-model="$_name_$" placeholder="请输入会议室名称" style="width: 200px" />
                    </div>
                    <div style="display: inline-block;margin-right: 28px;">
                        分类：
                        <Select v-model="$_classification_$" style="width:200px" placeholder="全部">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div style="display: inline-block;margin-right: 20px;">
                        日期：
                        <DatePicker @on-change="$_qh_$" type="daterange" split-panels placement="bottom" placeholder="请选择日期" style="width: 200px"></DatePicker>
                    </div>
                    <div style="display: inline-block;">
                        <Button type="primary" @click="$_search_$()">搜索</Button>
                    </div>
                </Col>
            </Row><!--  -->
            <!-- 头部结束 -->
        </div>
        <div class="table">
            <Table :columns="$_columns_$" :data="$_data_$"></Table>
        </div>
        <!-- 表单结束 -->
       <Row style="margin-top:20px;">
           <Col align="left" span="12">共有{{$_strip_$}}条数据</Col>
           <Col align="right">
               <Page :total="$_strip_$" :page-size="$_pageSize_$"
                     show-elevator show-sizer
                     @on-page-size-change="$_pageNum_$"
                     @on-change="$_changePage_$"/>
           </Col>
       </Row>
        <!-- 分页结束 -->
       <!--取消会议室预约弹窗-->
       <Modal v-model="$_modal12_$" :styles="{top: '25%'}" width="360" :mask-closable="false">
           <div style="text-align:center;margin-bottom: 8px;">
               <p style="font-size: 16px;color:rgb(51,51,51);margin-top: 15px;">您确定要取消该会议室的预约吗？</p>
               <div style="font-size: 13px;margin-top: 13px">
                   <p>如果您确定取消预约该会议室，请在指定位置</p>
                   <p>输入‘<span style="color: rgb(250,2,2);">立即取消</span>’</p>
               </div>
               <p style="font-size: 15px;margin-top: 10px">
                   <Input v-model="$_verification_$" size="large" @on-change="$_ljqx_$"></Input>
               </p>
           </div>
           <div slot="footer" style="background-color: rgb(249,249,249);text-align: center;border-radius:6px;">
               <ButtonGroup style="width: 100%">
                   <Button type="primary" style="font-size: 15px;width: 50%;border-top-left-radius: 0" @click="$_remove_$">确定</Button>
                   <Button style="font-size: 15px;width:50%;margin-left: 0px;border-top-right-radius: 0" @click="$_cancel_$">取消</Button>
               </ButtonGroup>
               <span ></span>
           </div>
       </Modal>

   </div>
</template>
<script>import controler from './controler.js';
export default {

    mixins: [controler],
    data() {
        return {
            //取消会议室预约
            $_modal12_$:false,//取消会议室预约弹窗
            $_choosehys_$: '',  //当前会议室
            $_verification_$: '', //验证是否取消预约
            $_verifysuccess_$: false,  //验证是否成功，默认为false

            $_name_$:'',   //搜索会议室名称
            cityList:[
                {label: "未开始",value:1},
                {label: "取消",value:2},
                {label: "退订",value:3},
                {label: "过期",value:4},
                {label: "进行中",value:5}
            ],
            $_strip_$:0,  //预约总数
            $_pageSize_$: 10,
            $_classification_$:'',  //搜索分类
            $_searchtime_$: [],  //搜索起始时间
            userInfo:{},
            $_columns_$: [
                {
                    title: '序号',
                    type: 'index',
                   align: 'center',
                },
                {
                    title: '会议室名称',
                    key: 'meetingRoomName',
                    align: 'center',
                },
                {
                    title: '会议主题',
                    key: 'meetingTheme'   ,
                    align: 'center',
                },
                {
                    title: '会议地址',
                    key: 'address'  ,
                    align: 'center',
                },
                {
                    title: '参会人数',
                    key: 'attendCount',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'createTime',    
                    align: 'center',
                    width:150,
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
                   render: (h, params) => {
                        var a;
                        if (params.row.status == 1) {
                        a = "未开始";
                        }
                        if (params.row.status == 2) {
                        a = "取消";
                        }
                        if (params.row.status == 3) {
                        a = "退订";
                        }
                        if (params.row.status == 4) {
                        a = "过期";
                        }
                        if (params.row.status == 5) {
                        a = "进行中";
                        }
                        return h("span", {}, a);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        let a;
                        if(params.row.status == 1 || params.row.status == 5){
                            a="取消"
                        }else{
                            a=""
                        }

                        return h('div', [
                            h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$_toDetails_$(params.row)
                                    }
                                }
                            }, '详情'),
                            h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$_toChList_$(params.row)
                                    }
                                }
                            }, '查看参会人员'),
                            h('a', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        if(params.row.status == 1 || params.row.status == 5){
                                            this.$_cancelyy_$(params.row)
                                        }
                                        
                                    }
                                }
                            }, a)
                        ]);
                    }
                }
            ],
            $_data_$: [],
            $_querycfg_$: {
            mod: "",
            params: {}
        }
        }
    },
    methods: {
        // 列表
        $_list_$(){
            this.$_querycfg_$.mod = `zone/zone/${this.userInfo.zoneId}/meeting/self/reserves`;
            this.$_fquery_$((rsp)=>{
                if(rsp.status === 200){
                    if (rsp.data.code === 0) {
                        this.$_data_$ = rsp.data.data.records;
                        this.$_strip_$ = rsp.data.data.total
                    }
                }
            })
        },
        //选择创建日期
        $_qh_$(e){
            this.$_searchtime_$ = e;
        },
        //订单搜索
        $_search_$(){
            this.$_querycfg_$.params.meetingRoomName = this.$_name_$;
            this.$_querycfg_$.params.status = this.$_classification_$;
            this.$_querycfg_$.params.startTime = this.$_searchtime_$[0];
            this.$_querycfg_$.params.endTime = this.$_searchtime_$[1];

            this.$_list_$()
        },
        //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                 this.$_list_$();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                 this.$_list_$();
            },
        //详情
        $_toDetails_$(row) {
            this.$root.$_Route_$("employer","jump","yyjlxq",{row:row})
        },
        //查看参会人员列表
        $_toChList_$(row) {
            this.$root.$_Route_$("employer","jump","hyschry",{row:row})
        },

        //取消预约对话框
        $_cancelyy_$(item) {
            this.$_choosehys_$ = item;
            this.$_modal12_$ = true;
        },
        //验证立即取消是否正确
        $_ljqx_$(){
            if(this.$_verification_$==='立即取消'){
                this.$_verifysuccess_$ = true;
            }else{
                this.$_verifysuccess_$ = false;
            }
        },
        //确认取消预约
        $_remove_$(){
            if(this.$_verifysuccess_$){
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + "/zone/zone/"+this.userInfo.zoneId+"/meeting/"+this.$_choosehys_$.meetingId+"/unsubscribe/"+this.$_choosehys_$.id,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if(rsp.status == 200){
                        if (rsp.data.code == 0) {
                            this.$Message.success(rsp.data.message);
                            this.$_cancel_$();
                            this.$_list_$()
                        }else{
                            this.$Message.error(rsp.data.message);
                        }
                    }
                });

            }
        },
        //取消对话框
        $_cancel_$(){
            this.$_modal12_$ = false;
            this.$_verification_$ = '';
            this.$_verifysuccess_$ = false;
        },

        //取消
        /*$_remove_$(row) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>是否确认取消?</p>",
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    this.$_sendQuery_$({
                        method:"POST",
                        url:`${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/meeting/${row.meetingId}/unsubscribe/${row.id}`,
                        data:{},
                        headers:{"Content-type":"application/json"}
                    }).then((rsp)=>{
                        if(rsp.status === 200){
                            if(rsp.data.code === 0){
                                this.$Message.success(rsp.data.message)
                                this.$_list_$()
                            }else{
                                this.$Message.error(rsp.data.message)
                            }
                        }
                    })
                },
                onCancel: () => {
                    this.$Message.info("Clicked cancel");
                }
            });
        },*/
  

    },
    created(){
        this.$_global_$.serverPath
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.userInfo = JSON.parse(cookie);
        //请求接口
        this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        this.$_list_$()
    }
}
</script>