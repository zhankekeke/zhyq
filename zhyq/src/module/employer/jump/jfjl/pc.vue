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
        &nbsp;&nbsp;缴费开始时间:&nbsp;&nbsp;
        <DatePicker v-model="$_startTime_$" type="date" placeholder="缴费开始时间"  placement="bottom-end" style="width: 200px"></DatePicker>
        &nbsp;&nbsp;缴费结束时间:&nbsp;&nbsp;
        <DatePicker v-model="$_endTime_$" type="date" placement="bottom-end" placeholder="缴费结束时间" style="width: 200px"></DatePicker>
        &nbsp;&nbsp;
        <Button type="primary" @click="$_search_$()">搜索</Button>
      </div>
      <br>
        <!-- 内容 -->
        <div>
          <Row>
                <Col span="24" align="right">
                <!-- <Button type="primary" @click="$_addyuyue_$()">停车场预约规则</Button>&nbsp;&nbsp; -->
                <Button type="primary" @click="$_addzhifu_$()">停车场支付规则</Button>
                </Col>
            </Row>
            <br>
            <Row>
                共有{{$_totalSize_$}}条数据
            </Row>
            <br>
            <Row>
              <Table :columns="$_yyjlTable_$" :data="$_yyjlInfo_$"></Table>
            </Row>
            <br>
            <Row>
                <!-- <Page align="right" :total="$_totalSize_$" show-sizer show-elevator></Page> -->
              <Page align="right" :total="$_totalSize_$"
             show-elevator show-sizer
			 :page-size="$_pageSize_$"
             @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
            </Row>
        </div>
	</div>
</template>

<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
        $_parkingName_$: '',
        $_startTime_$: '',
        $_endTime_$: '',
        $_pageSize_$: 2,
        $_totalSize_$: 0,
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
            title: "停车时间",
            key: "parkingTime",
            align: "center"
            },
            {
            title: "车牌号",
            key: "plateNumber",
            align: "center"
            },
            {
            title: "缴费金额/元",
            key: "totalPrice",
            align: "center"
            },
            {
            title: "创建时间",
            key: "createDate",
            align: "center"
            }
      ],
      $_yyjlInfo_$: [],
      $_querycfg_$: {
        mod: "",
        params: {}
      }
    };
  },
  created() {
      this.$_List_$();
  },
  methods: {
    // 列表数据
    $_List_$(){
      this.$_querycfg_$.mod = 'zone/zone/parking/records';
		  this.$_fquery_$((rsp)=>{
        if(rsp.status === 200){
          if (rsp.data.code === 0) {
            this.$_totalSize_$ = rsp.data.data.total
            this.$_yyjlInfo_$ = rsp.data.data.records;
          }
        }
      })
    },
    $_addzhifu_$(){
      this.$root.$_Route_$('employer', 'jump', 'tcczfgz', {});
    },
    //   搜索
    $_search_$() {
      //console.log(this.FormatAllDate(this.$_startTime_$));return;
      if (this.$_parkingName_$) {
        this.$_querycfg_$.params.parkingLotName = this.$_parkingName_$;  
        this.$_List_$();        
      }else{
        delete this.$_querycfg_$.params.parkingLotName
        this.$_List_$();
      }
      if (this.$_startTime_$) {
        this.$_querycfg_$.params.startTime = this.FormatAllDate(this.$_startTime_$);    
        this.$_List_$();      
      }else{
        delete this.$_querycfg_$.params.startTime
        this.$_List_$();
      }
      if (this.$_endTime_$) {
        this.$_querycfg_$.params.endTime = this.FormatAllDate(this.$_endTime_$);  
        this.$_List_$();        
      }else{
        delete this.$_querycfg_$.params.endTime
        this.$_List_$();
      }
    },
    FormatAllDate(sDate) {
            var date = new Date(sDate);
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            //月
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            //日
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            //时
            if (hours >= 0 && hours <= 9) {
                hours = "0" + hours;
            }
            //分
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            //秒
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            //格式化后日期为：yyyy-MM-dd HH:mm:ss
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + hours + seperator2 + minutes + seperator2 + seconds;
            return currentdate;
        },
      $_jfjl_$() {
        this.$root.inparams.id
    },
    //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                 this.$_List_$();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                 this.$_List_$();
            },
    $_receive_$(rsp) {
      if (rsp.status === 200) {
        if (rsp.data.status === 0) {
        }
      }
    }
  }
};
</script>