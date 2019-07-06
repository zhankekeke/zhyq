<style scoped>
.search {
  padding: 15px 0 15px 15px;
  background: #f7f7f7;
  margin-bottom: 15px;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  color: #404040;
}
.p{
    text-align: center;
    line-height: 40px;
}
</style>
<template>
    <div>
         <!-- 搜索 -->
      <div class="search">
        停车场名称:&nbsp;&nbsp;
        <Input v-model="$_parkingName_$" placeholder="请输入停车场名称" style="width: 210px"></Input>
        <!-- &nbsp;&nbsp;开始时间:&nbsp;&nbsp;
        <DatePicker :value="$_startTime_$" type="date" placement="bottom-end" style="width: 200px"></DatePicker>
        &nbsp;&nbsp;结束时间:&nbsp;&nbsp;
        <DatePicker :value="$_endTime_$" type="date" placement="bottom-end" style="width: 200px"></DatePicker> -->
        &nbsp;&nbsp;
        <Button type="primary" @click="$_search_$()">搜索</Button>
      </div>
      <br>
        <!-- 内容 -->
        <div>
            <Row>
                共有{{$_totalSize_$}}条数据
            </Row>
            <br>
            
            <Row>
              <Table :columns="$_yyjlTable_$" :data="$_yyjlInfo_$"></Table>
            </Row>
            <br>
            <Row>
                <Page align="right" :total="$_totalSize_$"
             show-elevator show-sizer
			 :page-size="$_pageSize_$"
             @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
            </Row>
        </div>
        <!-- 取消弹窗 -->
        <Modal
            v-model="modal1"
            title="提示"
            @on-ok="$_ok_$"
            @on-cancel="$_cancel_$">
            <p class="p">确定取消本次预约吗?</p>
        </Modal>
	</div>
</template>

<script>
import controler from "./controler.js";
import axios from 'axios'
export default {
  mixins: [controler],
  data() {
    return {
        modal1: false,
        $_parkingName_$: '', // 停车场名称
        $_startTime_$:'', // 开始时间
        $_endTime_$: '',  // 结束时间
        $_totalSize_$: 0,
        $_pageSize_$: 10,
        $_yyjlTable_$: [      //数据表头
            {
            title: "编号",
            type: 'index',
            align: "center"
            },
            {
            title: "停车场名称",
            key: "parkingName",
            align: "center"
            },
            {
            title: "地址",
            key: "parkingAddress",
            align: "center"
            },
            {
            title: "预约时间",
            key: "createDate",
            align: "center"
            },
            {
            title: "车牌号",
            key: "plateNumber",
            align: "center"
            },
            {
            title: "创建时间",
            key: "createDate",
            align: "center"
            },
            {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
                    var a;
                    if (params.row.status == 0) {
                    a = "已预约";
                    }
                    if (params.row.status == 1) {
                    a = "已完成";
                    }
                    if (params.row.status == 2) {
                    a = "爽约";
                    }
                    if (params.row.status == 3) {
                    a = "取消";
                    }
                    return h("span", {}, a);
                }
            },
            {
            title: "操作",
            key: "action",
            width: 200,
            align: "center",
            render: (h, params) => {
                if(params.row.status==0){
                    return h("div", [
                        h(
                            "a",
                            {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "5px",
                                    color: "#67c23a"
                                },
                                on: {
                                    click: () => {
                                        this.$_qx_$(params.row);
                                    }
                                }
                            },
                            "取消"
                        )
                    ]);
                }

            }
            }
      ],
      $_yyjlInfo_$: [],// 预约记录列表
      $_thisUserInfo_$: {},
      serialNumber: '', // 取消预约的流水号
      parkingId: 0,
      $_querycfg_$: {
        mod: "",
        params: {}
      }
    };
  },
  created() {
      let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
      this.$_thisUserInfo_$ = JSON.parse(cookie);
      this.$_list_$();
      this.$_global_$.serverPath	
      this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
  },
  methods: {
    //   获取预约记录列表
    $_list_$(){
        this.$_querycfg_$.mod ='zone/zone/parking/reserves';
		this.$_fquery_$((rsp)=>{
			// console.log(rsp)
			if(rsp.status === 200){
				if (rsp.data.code === 0) {
                    this.$_totalSize_$ = rsp.data.data.total
                    this.$_yyjlInfo_$ = rsp.data.data.records
                }
            }
        })
    },
    $_addyuyue_$(){
        this.$root.$_Route_$('employer', 'service', 'tccfw', {});
    },
    //   搜索
    $_search_$() {
        if (this.$_parkingName_$) {
            this.$_querycfg_$.params.parkingLotName = this.$_parkingName_$
            this.$_list_$();
        }else{
            delete this.$_querycfg_$.params.parkingLotName
            this.$_list_$();
        }
    },
    // 取消
    $_qx_$(row) {
        this.serialNumber = row.serialNumber
        this.parkingId = row.parkingId
        this.modal1 = true
    },
      $_ywjl_$() {
        this.$root.inparams.id
    },
    $_ok_$ () {
        this.$_sendQuery_$({
            method:"POST",
            url:this.$_global_$.serverPath+`/zone/zone/${this.$_thisUserInfo_$.zoneId}/parkinglot/${this.parkingId}/cancel`,
            data:{
              serialNumber: this.serialNumber
            },
            headers:{
              "Content-type":"application/json"
            }
          }).then((rsp)=>{
            // console.log(rsp)
            if(rsp.status === 200){
              if(rsp.data.code === 0){
                this.$_list_$()
                this.$Message.success(rsp.data.message);
              }else{
                this.$Message.error('取消失败!');
              }
                this.modal1 = false
            }
          })
    },
    $_cancel_$ () {
        this.modal1 = false
    },
    //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                // this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                 this.$_list_$();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                 this.$_list_$();
            },
  }
};
</script>