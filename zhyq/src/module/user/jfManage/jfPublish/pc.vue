<style scoped>
.lm {
    color: blue;
    font-size: 30px;
}
.tit{
    padding: 15px 0 15px 15px;
    background: #f7f7f7;
    margin-bottom: 15px;
    font-family: "Microsoft YaHei";
    font-size: 12px;
    color: #404040;
}
h3{
    font-weight: normal;
    font-size: 14px;
    color: #333;
    margin-bottom:20px;
}
.record{
    font-size:12px;
    color:#666;
    overflow:hidden;
    margin-bottom:10px;
}
.record span{
    float:left;
}
.integral{
    padding:3px 25px;
    float:right;
}
</style>
<template>
    <div>
        <div class='tit'>
            账户类型:
            <Select v-model="$_model_$" style="width:200px">
                <Option v-for="item in $_cityList_$" :value="item.$_value_$" :key="item.$_value_$">{{ item.$_label_$ }}</Option>
            </Select>
            <Button type="primary">搜索</Button>
        </div> 
        <h3>积分发放记录</h3>
        <div class="record">
            <span>共有122条记录</span>
            <Button type="primary" class='integral'>积分发放</Button>
        </div>
        <Table :columns="$_columns_$" :data="$_data_$"></Table>
    </div>
</template>
<script>
import controler from './controler.js';
export default {
    mixins: [controler],
    data(){
        return{
            $_cityList_$:[
                {
                    $_value_$:'全部',
                    $_label_$:'全部'
                },
                {
                    $_value_$:'个人',
                    $_label_$:'个人'
                },
                {
                    $_value_$:'企业',
                    $_label_$:'企业'
                }
            ],
            $_model_$:'全部',
            $_columns_$: [
                    {
                        title: '序号',
                        key: 'number1',
                        align: 'center' 
                    },
                    {
                        title: '发放对象',
                        key: 'object',
                        align: 'center'
                    },
                    {
                        title: '发放类型',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '发放事由',
                        key: 'cause',
                        align: 'center'
                    },
                    {
                        title: '发放数量',
                        key: 'number',
                        align: 'center',
                        render:(h,params) =>{
                        var a ;                        
                          a="+"+params.row.number
                         return h("span", {}, a);
                      }
                    },
                    {
                        title: '操作人',
                        key: 'operator',
                        align: 'center'
                    },
                    {
                        title: '发放时间',
                        key: 'time',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情')
                            
                            ]);
                        }
                    }
                ],
                $_data_$: [
                    {
                        number1: 1,
                        object: '詹可可',
                        type: '个人',
                        cause:'元宵节活动',
                        number:'10000',
                        operator:'沙壮',
                        time:'2018-11-2'
                    }
                ]
        }
    }
}
</script>