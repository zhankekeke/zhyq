<style scoped>
.info {
  font-size: 16px;
  color: #333;
}

.box span {
  font-size: 14px;
  color: #495060;
  line-height: 1.5;
}
</style>
<template>
  <div class="box">
    <div class="info">订单信息:</div>
    <br>
    <div class="info">
      <span>订单编号：</span>
      <span style="padding-left:10px">12345678910</span>
      <span style="padding-left:10px">创建时间：</span>
      <span style="padding-left:10px">2018-09-21 08:50:08</span>
    </div>
    <br>
    <div class="info">
      <span>用户信息：</span>
      <span>飞天经纬</span>
      <span style="padding-left:10px">王乐乐</span>
      <span>15701171245</span>
    </div>
    <br>
    <br>
    <br>
    <Table border :columns="$_columns7_$" :data="$_data6_$"></Table>
    <br>
    <div style="width:40%">
      <p>退款信息</p>
      <br>
      <Table border :columns="$_columns6_$" :data="$_data5_$" style="width:100%"></Table>
    </div>
  </div>
</template>
<script>
import controler from "./controler.js";

export default {
  mixins: [controler],
  data() {
    return {
      $_columns7_$: [
        {
          title: "会议室信息",
          key: "number",
          align: "center",
          width: 260,
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.imgUrl,
                  width: "40px",
                  height: "40px"
                },
                style: {
                  marginRight: "5px",
                  verticalAlign: "bottom"
                }
              }),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    fontSize: "14px",
                    color: 333
                  }
                },
                params.row.boardroom
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    fontSize: "14px"
                  }
                },
                params.row.addr
              )
            ]);
          }
        },
        {
          title: "会议主题",
          key: "theme",
          align: "center"
        },
        {
          title: "时间",
          key: "appointmentTime",
          align: "center",
          width: 240
        },
        {
          title: "参会人数",
          key: "persons",
          align: "center"
        },
        {
          title: "参会人员",
          key: "man",
          align: "center"
        },
        {
          title: "应付金额",
          key: "howMuchMoney",
          align: "center"
        },
        {
          title: "优惠",
          key: "discount",
          align: "center"
        },
        {
          title: "实付金额",
          key: "pay",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center"
        }
      ],
      $_data6_$: [
        {
          number: "01231089",
          boardroom: "黄山厅",
          addr: "三号楼西区",
          companyName: "飞天经纬",
          imgUrl: "https://www.baidu.com/img/bd_logo1.png?where=super",
          man: "王乐乐",
          theme: "环境污染",
          appointmentTime: "09-21 08:50————09-21 08:50",
          persons: "5人",
          status: "状态",
          howMuchMoney: "290",
          discount: "代金券：10元  积分 100分",
          pay: "31"
        }
      ],
      $_columns6_$: [
        {
          title: "优惠",
          key: "discount",
          align: "center",
          width: 200
        },
        {
          title: "退款金额",
          key: "pay",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center"
        }
      ],
      $_data5_$: [
        {
          number: "01231089",
          boardroom: "黄山厅",
          addr: "三号楼西区",
          companyName: "飞天经纬",
          imgUrl: "https://www.baidu.com/img/bd_logo1.png?where=super",
          man: "王乐乐",
          theme: "环境污染",
          appointmentTime: "09-21 08:50————09-21 08:50",
          persons: "5人",
          status: "状态",
          howMuchMoney: "290",
          discount: "代金券：10元  积分 100分",
          pay: "31"
        }
      ]
    };
  },
  methods: {}
};
</script>