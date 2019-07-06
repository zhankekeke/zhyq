<style scoped>
.search {
  padding: 15px 0 15px 15px;
  margin-bottom: 15px;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  color: #404040;
}
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            手机号:&nbsp;&nbsp;
            <Input placeholder="请输入手机号" v-model.trim="$_phoneNumber_$" style="width: 210px"></Input>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <br>
        <Table ref="selection" :columns="$_columns7_$" :data="$_data6_$"></Table>
        <br>
        <!-- <Button type="primary" @click="handleSelectAll(true)">设置全选</Button> -->
        <!-- <Button type="primary" @click="handleSelectAll(false)">取消全选</Button> -->
        <br>
        <Row>
            <Col span="24" align="right">
                <Page align="right" :total="total"  show-elevator @on-change="$_changePage_$"/>
            </Col>
        </Row>
        
	</div>
</template>

<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
      total:0,
      id:'',
      $_querycfg_$:{
        mod:'module',
            params:{
                pageNum:1
            }
        },
      $_phoneNumber_$: "", // 手机号
      $_columns7_$: [
        // 表头
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: "序号",
          type: 'index',
          align: "center"
        },
        {
          title: "姓名",
          key: 'name',
          align: "center"
        },
        {
          title: "手机号",
          key: 'phoneNum',
          align: "center"
        },
        {
          title: "所在公司",
          key: 'enterpriseName',
          align: "center"
        },
        {
          title: "部门",
          key: 'deparmentName',
          align: "center"
        },
        {
          title: "报名时间",
          key: 'joinDate',
          align: "center"
        },
        {
          title: "代金券",
          key: 'couponName',
          align: "center"
        },
        {
          title: "代金券领取数量",
          key: 'userCoupon',
          align: "center",
          render: (h, params) => {
            var a;
            if (params.row.userCoupon == true) {
              a = 1;
            }
            if (params.row.userCoupon == false) {
              a = 0;
            }
            return h("span", {}, a);
          }
        }
      ],
      $_data6_$: [],
      $_querycfg_$: {
        mod: "",
        params: {}
      }
    };
  },
  created() {
    this.$_hslist_$();
    this.$_search_$();
   
  },
  methods: {
    $_hslist_$() {
      this.id=this.$root.inparams.id;
      // console.log(this.id)
      let params = {
          pageNum: this.$_querycfg_$.params.pageNum
      }
      if(this.$_phoneNumber_$){
          params.phoneNum = this.$_phoneNumber_$
      }
      this.$_sendQuery_$({
          method: "POST",
          url: this.$_global_$.serverPath + '/company/activity/'+this.id+'/users',
          data:params,
          headers: {
              "Content-type": "application/json"
          }
      }).then((rsp) => {
          if (rsp.status === 200) {
              if (rsp.data.code === 0) {
                  this.$_data6_$ = rsp.data.data.records
                  this.total = rsp.data.data.total
                  // this.$_data6_$=[{
                  //   "id": 17,
                  //   "faceUrl": 1,
                  //   "joinDate": 1,
                  //   "employeeId": 1,
                  //   "phoneNum": "1543913140976",
                  //   "enterpriseName": "退订测试",
                  //   "name": "张三-写死",
                  //   "deparmentName": "13444444444-写死",
                  //   "couponName": "飞天经纬-test公司名称待修正",
                  //   "userCoupon": "部门-写死"
                  //   }];
              }
          } else {
              this.$Message.error('获取数据失败');
          }
      })
    },
    $_changePage_$(e) {
        this.$_querycfg_$.params.pageNum = e;
        this.$_hslist_$();
    },
    $_search_$(){
       this.$_hslist_$();
    },
    $_bmxx_$() {
      this.$root.inparams.id;
    },
    $_receive_$(rsp) {
      if (rsp.status === 200) {
        if (rsp.data.status === 0) {
        }
      }
    },
    // 全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
  }
};
</script>