<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }
   .yhqlist{
      padding:10px;
      color:#fff;
      margin: 2% 3% 0 0;
      font-size: 14px;
   }
   .wsy{
      background-image: url('/static/myqb/wsy.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
   }
   .ygq{
      background-image: url('/static/myqb/ysy.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
   }
    .ss {
       min-height: 80px;
       background: #f7f7f7;
       margin-top: 20px;
    }
    .f12 {
       font-size: 12px;
       line-height: 42px;
    }
    .margin {
       margin: 10px 0;
       box-sizing: border-box;
       padding: 0px 20px;
       line-height: 80px;
    }
</style>
<template>
   <div class="kyyhq">
      <Row class="ss" type="flex" align="middle">
         <Col span="15" offset="1">代金券状态：
            <Select v-model="$_selected_$" style="width:150px">
               <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label }}</Option>
            </Select>
            <Button style="margin-left:20px;" type="primary" @click="$_search_$">搜索</Button>
         </Col>
      </Row>

      <Row align="middle">
         <Col class="yhqlist" :class="item.wsy?'wsy':'ygq'" v-for="item in list" span="7" :style="{}">
            <Row style="padding:10px 2px 10px 10px;border:1px solid #efefef;">
               <Col span="20" align="left" style="margin:0 auto;">
                  <div>名称：{{item.voucherEntity.voucherTemplate.name}}</div>
                  <div style="margin: 5px 0 5px 0">
                     <span style="font-size: 26px;">￥{{item.voucherEntity.voucherTemplate.denomination}}</span>
                     <span v-if="item.voucherEntity.voucherTemplate.threshold==1">满{{item.voucherEntity.voucherTemplate.quota}}元可用</span>
                  </div>
                  <div style="margin: 5px 0 5px 0;line-height: 30px;width: 52%;text-align: center;background-color: #fff;":style="{color:(item.wsy?'red':'#000')}">使用场景：
                     <span v-if="item.voucherEntity.voucherTemplate.useType==0">餐厅</span>
                     <span v-else-if="item.voucherEntity.voucherTemplate.useType==1">会议室</span>
                     <span v-else-if="item.voucherEntity.voucherTemplate.useType==2">停车场</span>
                     <span v-else-if="item.voucherEntity.voucherTemplate.useType==3">商城</span>
                  </div>
                  <div>有效期：{{item.voucherEntity.voucherTemplate.beginDateStr}}——{{item.voucherEntity.voucherTemplate.endDateStr}}</div>
               </Col>
               <Col span="4" align="center" style="margin:0 auto;">
                  <div>状态</div>
                  <div style="font-size: 22px;width: 50%" v-if="item.voucherStatus==0">未使用</div>
                  <div style="font-size: 22px;width: 50%" v-else-if="item.voucherStatus==1">已使用</div>
                  <div style="font-size: 22px;width: 50%" v-else-if="item.voucherStatus==2">已过期</div>
                  <div style="font-size: 22px;width: 50%" v-else-if="item.voucherStatus==3">未使用</div>
               </Col>
            </Row>
         </Col>
      </Row>
      <Row class="f12">
         <Col span="12">共有{{$_total_$}}个优惠券</Col>
      </Row>
      <Row class="margin" style="text-align:right;">
         <Page
                 :total="$_total_$"
                 show-elevator
                 show-sizer
                 :page-size="$_pageSize_$"
                 @on-page-size-change="$_changePageNum_$"
                 @on-change="$_changePage_$"/>
      </Row>

   </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
           $_thisUserInfo_$: '',  //用户基本信息
           list:[],//优惠券列表
           $_statusList_$: [
              {
                 value: -1,
                 label: "全部"
              },
              {
                 value: 0,
                 label: "未使用"
              },
              {
                 value: 1,
                 label: "已使用"
              },
              {
                 value: 2,
                 label: "已过期"
              }
           ], //代金券状态类型搜索
           $_selected_$: -1, //选中的类型
           $_pageNum_$: 1,  //第几页
           $_pageSize_$: 12,  //每页显示个数
           $_total_$: 0,  //数据总个数

        }
    },
    created(){
       let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
       this.$_thisUserInfo_$ = JSON.parse(cookie);

       this.getvoucherUser();
    },
    methods: {
       //获取个人代金券列表
       getvoucherUser(){
          let status = '';
          if(this.$_selected_$==-1){
             status = '';
          }else{
             status = this.$_selected_$;
          }
          let sendData = {
             "pageNum": this.$_pageNum_$,
             "pageSize": this.$_pageSize_$,
             "receiverId": this.$_thisUserInfo_$.id,
             "voucherStatus": status,
          };
          this.$_sendQuery_$({
             method: "POST",
             url: this.$_global_$.serverPath + `/operate/voucherUser/page`,
             data: sendData,
             headers: {
                "Content-type": "application/json"
             }
          }).then(rsp => {
             if (rsp.status === 200) {
                if (rsp.data.code === 0) {
                   this.$_total_$ = rsp.data.data.total*1;
                   this.list = rsp.data.data.records;
                   for(let i=0;i<this.list.length;i++){
                      if(this.list[i].voucherEntity.voucherTemplate.validFlag==1){
                         let begintime = new Date(this.list[i].recvTime);
                         let days = this.list[i].voucherEntity.voucherTemplate.validCount;
                         //结束时间的时间戳
                         let endtime = new Date(begintime.setDate(begintime.getDate() + days));

                         //领取时间即为开始时间
                         let begintime_str = this.list[i].recvTime.substr(0,10);

                         //结束时间
                         let month = endtime.getMonth()+1;//js从0开始取
                         let date = endtime.getDate();
                         if(month<10){
                            month = "0" + month;
                         }
                         if(date<10){
                            date = "0" + date;
                         }
                         let endtime_str = endtime.getFullYear()+'-'+month+'-'+date;


                         this.list[i].voucherEntity.voucherTemplate.beginDateStr = begintime_str;
                         this.list[i].voucherEntity.voucherTemplate.endDateStr = endtime_str;
                      }

                      if(this.list[i].voucherStatus==0||this.list[i].voucherStatus==3){
                         this.list[i].wsy = true;
                      }
                   }
                }
             }
          });
       },
       //搜索优惠券
       $_search_$(){
          this.$_pageNum_$ = 1;
          this.getvoucherUser();
       },

       //数据下一页
       $_changePage_$(e) {
          this.$_pageNum_$ = e;
          this.getvoucherUser();
       },
       //页面显示的数据条数
       $_changePageNum_$(e){
          this.$_pageSize_$ = e;
          this.getvoucherUser();
       }
    }
}
</script>