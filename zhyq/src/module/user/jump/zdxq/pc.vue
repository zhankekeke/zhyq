<style scoped>
.lm {
  color: blue;
  font-size: 30px;
}
.search {
  padding: 15px 0 15px 15px;
  margin-bottom: 15px;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  color: #000;
}
.ivu-btn {
  font-size: 14px;
}
.bg-lp{
background:rgba(230, 243, 252, 1);
padding:5px;
border:1px solid rgba(212, 240, 252, 1);
font-size: 12px;
}
.mt10{
margin-top:10px;
}
</style>
<template>
    <div>

        <Row>
            <Table  ref="selection" :columns="$_jfjlTable_$" :data="$_jfjlInfo_$"></Table>
        </Row>
    </div>
</template>
<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
      $_total_$:0,//数据总数
      $_recordTitle_$:'',//数据总数
      $_stewardName_$:'',
      // $_parkingName_$:'',
      $_rq_$:[],
      $_selected_$: '全部', // 默认选中
      $_statusList_$: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: 1,
          label: "上线"
        },
        {
          value: 0,
          label: "下线"
        }
      ],
      $_jfjlTable_$: [
        //数据表头
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "当前所属管家姓名",
          key: "currentStewardName",
          align: "center"
        },
        {
          title: "记录说明",
          key: "remark",
          align: "center"
        },
        // {
        //   title: "员工名称",
        //   key: "commiterName",
        //   align: "center"
        // },
        // {
        //   title: "员工联系电话",
        //   key: "commiterPhoneNumber",
        //   align: "center"
        // },
        
        {
          title: "工单来源管家姓名",
          key: "sourceStewardName",
          align: "center",
        },
        {
          title: "工单状态",
          key: "reasonType",
          align: "center",
          render: (h, params) => {
            var a;
            if (params.row.reasonType == 0) {
              a = "繁忙";
            }
            if (params.row.reasonType == 1) {
              a = "超时";
            }
            return h("span", {}, a);
          }
        },
        {
          title: "发生时间",
          key: "createTime",
          align: "center"
        },
      ],
      $_jfjlInfo_$: [],
      recordId:'',
      userInfo:{},
      $_querycfg_$: {
        mod: "",
        params: {
            pageSize:10
        }
      }
    };
  },
  created() {
    let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
    this.userInfo = JSON.parse(cookie);
    this.$_List_$();
    
  },
  methods: {
    //生成数据
    $_List_$(){
        this.recordId = this.$root.inparams.id;
        this.$_sendQuery_$({
            method:"GET",
            url:`${this.$_global_$.serverPath}/steward/steward/`+this.userInfo.zoneId+`/record/`+this.recordId+`/logs`,
            data: {               
            },
            headers:{"Content-type":"application/json"}
        }).then((rsp)=>{
            if(rsp.status === 200){
                if(rsp.data.code === 0){
                    this.$_jfjlInfo_$ = rsp.data.data;
                }
            }
        })
    },
  
      // 格式化时间
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
        }
  }
};
</script>