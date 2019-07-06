<style scoped>

</style>
<template>
    <div class="container">
        <Row>
            <Col span='16'><ec-chart :chart="bar_chartDataOne"></ec-chart></Col>
            <Col span='8'><ec-chart :chart="bar_jfhqqdtj"></ec-chart></Col>
        </Row>
        <Row>
            <Col span='16'><ec-chart :chart="bar_jfxhl"></ec-chart></Col>
            <Col span='8'><ec-chart :chart="bar_xflxtj"></ec-chart></Col>
        </Row>
    </div>

</template>
<script>
import controler from './controler.js';
import ecChart from '../../../../echarts/chart';
export default {
    mixins: [controler],
    name: "goods-count",
    data () {
        return {
            $_num_$:999,
            $_querycfg_$:{
				mod:'module',
                params:{
					cmd:4
                }
            },
            bar_chartDataOne: {
                id: "bar_chartDataOne",
                type: "zxzzt",
                title: "积分消耗量",
                color:['#6acb5b','#f3cc5a','#d88800'],
                subtext: "积分总存量 260000",
                xmes:['12-01','12-02','12-03','12-04','12-05','12-06','12-07'],
                title1:['类别一', '类别二','类别三','消耗总量'],
                data: [
                    {
                        name: '类别一',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '类别二',
                        type: 'bar',
                        data: [80, 80, 80, 80, 80, 80,80]
                    },
                    {
                        name: '类别三',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '消耗总量',
                        type: 'line',
                        data: [100, 110, 70, 80, 110, 50,100]
                    }
                ]
            }, bar_jfxhl: {
                id: "bar_jfxhl",
                type: "zxzzt",
                title: "积分新增量",
                subtext: "积分总存量 260000",
                color:['#6acb5b','#f3cc5a','#d88800'],
                xmes:['12-01','12-02','12-03','12-04','12-05','12-06','12-07'],
                title1:['类别一', '类别二','类别三','消耗总量'],
                data: [
                    {
                        name: '类别一',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '类别二',
                        type: 'bar',
                        data: [80, 80, 80, 80, 80, 80,80]
                    },
                    {
                        name: '类别三',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '消耗总量',
                        type: 'line',
                        data: [100, 110, 70, 80, 110, 50,100]
                    }
                ]
            },
            bar_jfhqqdtj:{
                id: "bar_jfhqqdtj",
                type: "bxt",
                //  title1:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                title: "积分获取渠道统计",
                color:['#f5d861','#5ea7f2','#99d776'],
                data: [
                    {value:2, name:'园区发放',type: 'pie',},
                    {value:1, name:'消费奖励',type: 'pie',},
                    {value:3, name:'充值奖励',type: 'pie',},
                ]
            },
            bar_xflxtj:{
                id: "bar_xflxtj",
                type: "pie",
                color:['#99d776','#f5d861','#5ea7f2','#ed8779'],
                title1:['类别一','类别二','类别三','其他'],
                title: "积分获取渠道统计",
                data: [
                    {value:2, name:'类别一'},
                    {value:1, name:'类别二'},
                    {value:3, name:'类别三'},
                    {value:4, name:'其他'}
                ]
            }

        }   
    },
    components: {
        ecChart
    },
      created(){
		this.$_fquery_$();
    },
    methods:{
        $_receive_$(rsp){
			if(rsp.status === 200){
				if(rsp.data.status === 0){
					this.list = rsp.data.obj;
                }
            }
        }
        
    }
}
</script>