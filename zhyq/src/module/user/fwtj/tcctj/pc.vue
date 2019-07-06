<style scoped>
</style>
<template>
    <div>
        <Row>
            <Col span='8'><ec-chart :chart="bar_xflxtj"></ec-chart></Col>
            <Col span='16'><ec-chart :chart="bar_jfxhl"></ec-chart></Col>
        </Row>
	</div>
</template>

<script>
import controler from "./controler.js";
import ecChart from "@/echarts/chart";
export default {
  mixins: [controler],
  name: "goods-count",
  components: {
    ecChart
  },
  data() {
    return {
      $_querycfg_$: {
        mod: "module",
        params: {}
      },
      bar_xflxtj: {
        id: "bar_xflxtj",
        type: "bxt",
        // subtext: '',
        color: ["#99d776", "#f5d861", "#5ea7f2"],
        title1: ["外来车辆", "临时车辆", "固定车位"],
        title: "停车场实况",
        data: [
          { value: 2, name: "外来车辆" },
          { value: 1, name: "临时车辆" },
          { value: 3, name: "固定车位" },
        ]
      },
      bar_jfxhl: {
                id: "bar_jfxhl",
                type: "zxzzt",
                title: "实时车位统计",
                // subtext: "积分总存量 260000",
                color:['#6acb5b','#f3cc5a'],
                xmes:['0:00','04:00','08:00','12:00','16:00','20:00','24:00'],
                title1:['车位占用数','进场车辆数'],
                data: [
                    {
                        name: '车位占用数',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '进场车辆数',
                        type: 'line',
                        data: [100, 110, 70, 80, 110, 50,100]
                    }
                ]
            },
    };
  },
  created() {
    this.$_fquery_$();
  },
  methods: {
    $_receive_$(rsp) {
      if (rsp.status === 200) {
        if (rsp.data.status === 0) {
        }
      }
    }
  }
};
</script>