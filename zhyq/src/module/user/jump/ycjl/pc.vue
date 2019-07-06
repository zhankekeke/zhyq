<style scoped>
.search {
  padding: 15px 0 15px 15px;
  background: #f7f7f7;
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
            公司名称:&nbsp;&nbsp;
            <Input v-model="$_company_$" placeholder="请输入" style="width: 210px"></Input>
            &nbsp;&nbsp;预约日期:&nbsp;&nbsp;
            <DatePicker :value="$_rq_$" type="daterange" placement="bottom-end" style="width: 200px"></DatePicker>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <br>
        <!-- 内容 -->
        <Row>
            <Col span="24">共{{$_totalSize_$}}条数据</Col>
        </Row>
        <br>
        <Row>
            <Table border ref="selection" :columns="$_ycjlTable_$" :data="$_ycjlInfo_$"></Table>
        </Row>
        <br>
        <Button type="primary" @click="handleSelectAll(true)">设置全选</Button>&nbsp;&nbsp;
        <Button type="primary" @click="handleSelectAll(false)">取消全选</Button>
        <br>
        <Page align="right" :total="$_totalSize_$" show-sizer show-elevator></Page>
	</div>
</template>

<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
        $_company_$: '', // 公司名称
        $_rq_$: '', // 日期
        $_totalSize_$: 122,
        $_ycjlTable_$: [
            //数据表头
            {
            type: "selection",
            width: 60,
            align: "center"
            },
            {
            title: "编号",
            key: "num",
            align: "center"
            },
            {
            title: "名称",
            key: "name",
            align: "center"
            },
            {
            title: "地址",
            key: "address",
            align: "center"
            },
            {
            title: "车主姓名",
            key: "carName",
            align: "center"
            },
            {
            title: "所属公司",
            key: "company",
            align: "center"
            },
            {
            title: "停车时间",
            key: "time",
            align: "center"
            },
            {
            title: "车牌号",
            key: "number",
            align: "center"
            },
            {
            title: "车辆属性",
            key: "sx",
            align: "center"
            },
            {
            title: "创建时间",
            key: "createTime",
            align: "center"
            }
        ],
        $_ycjlInfo_$: [
            {
                num: '0123455',
                name: 'A停车场',
                address: '地下一层',
                carName: '王乐乐',
                company: '飞天经纬',
                time: '2018-09-9 - 2010-10-2',
                number: '京N LR121',
                sx: '固定车位',
                createTime: '2018-09-21'
            }
        ],
        $_querycfg_$: {
            mod: "module",
            params: {}
        }
    };
  },
  created() {
      this.$_fquery_$();
  },
  methods: {
      // 搜索
    $_search_$() {},
    // 全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
      $_bulkOperation_$(){
          this.$root.inparams.id
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