<style scoped>
.list li span{display:inline-block;width:33.33%;font-size:12px;color:#333;height: 40px;line-height: 40px;}
.list li{border-bottom:1px solid #ebebeb;box-sizing: border-box;padding: 0 10px;}
.list .top span{width: 10%;}
.list .top{border:none;text-align: center;}
</style>
<template>
    <div class="container">
        <Row>
            <Col span='16'><ec-chart :chart="bar_chartDataOne"></ec-chart></Col>
            <Col span='8'><ec-chart :chart="bar_jfhqqdtj"></ec-chart></Col>
        </Row>
        <Row>
            <Col span='16'><ec-chart :chart="bar_jfxhl"></ec-chart></Col>
            <Col span='8'>
                <Card style='margin:13px;'>
                    <p slot="title">热门核销售渠道统计 </p>
                    <a href="#" slot="extra" > 全部</a>
                    <ul class='list'>
                        <li class='top'>
                            <span >7天</span><span>14天</span><span style="margin-right:20px;">本月</span>
                            <DatePicker  type="date" placeholder="2018-09-21" style="width: 200px"></DatePicker>
                        </li>
                        <li class='tilte'>
                           <span style="color:#ccc;">排名</span><span>核销渠道</span><span style="color:#ccc;">核销张数</span>
                        </li>
                        <li v-for="item in $_List_$">
                           <span>{{item.paiming}}</span><span>{{item.qudao}}</span><span style="color:#00A753;">{{item.num}}</span>
                        </li>
                    </ul>
                </Card>
            </Col>
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
                title: "代金券存量",
                subtext: "代金券存量 260000",
                color:['#66cc66','#ffcc66','#cccccc','#ef2300'],
                xmes:['12-01','12-02','12-03','12-04','12-05','12-06','12-07'],
                title1:['已使用', '未使用','已过期','代金券总价值量'],
                data: [
                    {
                        name: '已使用',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '未使用',
                        type: 'bar',
                        data: [80, 80, 80, 80, 80, 80,80]
                    },
                    {
                        name: '已过期',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '代金券总价值量',
                        type: 'line',
                        data: [100, 110, 70, 80, 110, 50,100]
                    }
                ]
            }, bar_jfxhl: {
                id: "bar_jfxhl",
                type: "zxzzt",
                title: "代金券价值量",
                subtext: "积分总存量 260000",
                color:['#66cc66','#ffcc66','#cccccc','#ef2300'],
                xmes:['12-01','12-02','12-03','12-04','12-05','12-06','12-07'],
                 title1:['已使用', '未使用','已过期','代金券总价值量'],
                data: [
                    {
                        name: '已使用',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '未使用',
                        type: 'bar',
                        data: [80, 80, 80, 80, 80, 80,80]
                    },
                    {
                        name: '已过期',
                        type: 'bar',
                        data: [30, 30, 30, 30, 30, 30,30]
                    },
                    {
                        name: '代金券总价值量',
                        type: 'line',
                        data: [100, 110, 70, 80, 110, 50,100]
                    }
                ]
            },
            bar_jfhqqdtj:{
                id: "bar_jfhqqdtj",
                type: "bxt",
                // title1:['园区发放','商城兑换','活动领取'］,
                color:['#f5d861','#5ea7f2','#99d776'],
                title: "热门领取渠道统计",
                data: [
                    {value:2, name:'园区发放',type: 'pie',},
                    {value:1, name:'商城兑换',type: 'pie',},
                    {value:3, name:'活动领取',type: 'pie',}
                ]
            },
            $_List_$:[
                {
                    paiming:'1',
                    qudao:'会议室',
                    num:'28'
                },{
                    paiming:'1',
                    qudao:'会议室',
                    num:'28'
                },{
                    paiming:'1',
                    qudao:'会议室',
                    num:'28'
                },{
                    paiming:'1',
                    qudao:'会议室',
                    num:'28'
                },{
                    paiming:'1',
                    qudao:'会议室',
                    num:'28'
                }
            ]

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