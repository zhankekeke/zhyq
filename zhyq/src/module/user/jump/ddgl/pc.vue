<style scoped>
    .tlt{
        padding:20px 10px;
    }
    .tlt p{
        font-size:14px;
    }


    .time_line_box{
        position: relative;
        height: 60px;
        overflow: hidden;
    }
    .time_line{
        position: absolute;
        z-index: 1;
        left: 0;
        top: 49px;
        height: 2px;
        background: #dfdfdf;
        -webkit-transition: -webkit-transform 0.4s;
        -moz-transition: -moz-transform 0.4s;
        transition: transform 0.4s;
    }
    .order_item{
        position: absolute;
        bottom: 0;
        z-index: 2;
        text-align: center;
        font-size: 13px;
        padding-bottom: 15px;
        color: #2d8cf0;
    }
    .order_item:after{
        content: '';
        position: absolute;
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        bottom: -5px;
        height: 13px;
        width: 13px;
        border-radius: 50%;
        border: 2px solid #dfdfdf;
        background-color: #f8f8f8;
    }
    .selected:after{
        background-color: #2d8cf0;
        border-color: #2d8cf0;
    }
    .filling_line{
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: #2d8cf0;
        transform-origin: left center;
        transition-property: transform;
        transition-duration: 0.3s;
        transition-timing-function: initial;
        transition-delay: initial;
    }
</style>
<template>
    <div class="sz">
        <div class="tlt">
            <p style="font-weight:bold;">订单信息:</p>
            <br>
            <p>订单编号:&nbsp;&nbsp;{{$_number_$}}&nbsp;&nbsp;&nbsp;&nbsp;创建时间:&nbsp;&nbsp;{{$_time_$}}</p>
            <br>
            <p><span style="font-weight:bold;">用户信息:</span>&nbsp;&nbsp;{{$_user_$[2]}}&nbsp;&nbsp;&nbsp;&nbsp;{{$_user_$[0]}}&nbsp;&nbsp;&nbsp;&nbsp;{{$_user_$[1]}}</p>
        </div>
        <br>
        <Table border :columns="$_columns_$" :data="$_data_$"></Table>
        <br>
        <p style="font-size:14px;text-align:right;">订单总金额:&nbsp;<span style="font-weight:bold;font-size:15px;">{{$_price_$}}</span></p>
        <br>
        <div class="time_line_box">
            <div class="time_line" style="width:100%;">
                <ol>
                    <li>

                        <a class="order_item" :class="{'selected':$_selected1_$}" style="left:10%;">
                            <p>创建订单</p>
                            <p v-if="$_time1_$">{{$_time1_$}}</p>
                        </a>
                    </li>
                    <li>
                        <a class="order_item" :class="{'selected':$_selected2_$}" style="left:35%;">
                            <p>已发货</p>
                            <p v-if="$_time2_$">{{$_time2_$}}</p>
                        </a>
                    </li>
                    <li>
                        <a class="order_item" :class="{'selected':$_selected3_$}" style="left:60%;">
                            <p>已送达</p>
                            <p v-if="$_time3_$">{{$_time3_$}}</p>
                        </a>
                    </li>
                    <li>
                        <a class="order_item" :class="{'selected':$_selected4_$}" style="left:85%;">
                            <p>已签收</p>
                            <p v-if="$_time4_$">{{$_time4_$}}</p>
                        </a>
                    </li>
                </ol>
                <span v-if="$_selected1_$" class="filling_line" style="transform: scaleX(0.17);"></span>
                <span v-if="$_selected2_$" class="filling_line" style="transform: scaleX(0.43);"></span>
                <span v-if="$_selected3_$" class="filling_line" style="transform: scaleX(0.67);"></span>
                <span v-if="$_selected4_$" class="filling_line" style="transform: scaleX(1);"></span>
            </div>
        </div>
        <br>
        <br>
        <div align="center">
            <Button type="primary" @click="$_myRecord_$">返回</Button>
        </div>
    </div>
</template>
<script>
    import controler from './controler.js';
    export default {
        mixins: [controler],
        data() {
            return {
                $_number_$:'', //订单编号
                $_time_$:'',  //订单创建时间
                $_user_$:[],  //用户信息
                $_price_$:'',  //订单总金额(或积分)
                $_orderId_$:'',  //订单id

                $_time1_$: '',  //下单时间
                $_time2_$: '',  //发货时间
                $_time3_$: '',  //送达时间
                $_time4_$: '',  //签收时间
                $_selected1_$: true,  //是否已下单
                $_selected2_$: false,  //是否已发货
                $_selected3_$: false,  //是否已送达
                $_selected4_$: false,  //是否已签收

                $_columns_$:[
                    {
                        title: '商品名称',
                        key: 'orderGoods',
                        align:'center',
                        render:(h,params)=>{
                            let c;
                            c=params.row.orderGoods[0].goodsName;
                            return h ('span',{},c)
                        }

                    },
                    {
                        align:'center',
                        title: '单价',
                        key: 'orderGoods',
                        align:'center',
                        render:(h,params)=>{
                            let d = params.row.orderGoods[0];
                            let p = '';
                            if(d.goodsType==0){
                                //普通商品
                                p = d.goodsPrices + '元';
                            }else{
                                //积分商品或代金券
                                p = d.goodsCredits + '积分';
                            }
                            return h ('span',{},p)
                        }
                    },
                    {
                        align:'center',
                        title: '数量',
                        key: 'orderGoods',
                        render:(h,params)=>{
                            let e;
                            e=params.row.orderGoods[0].goodsCount;
                            return h ('span',{},e)
                        }
                    },
                    {
                        title: '商品类型',
                        key: 'orderGoods',
                        align:'center',
                        render:(h,params)=>{
                            let f = '';
                            switch (params.row.orderGoods[0].goodsType) {
                                case 0:
                                    f='普通商品';
                                    break;
                                case 1:
                                    f='积分商品';
                                    break;
                                default:
                                    f='代金券商品';
                                    break;
                            }
                            return h ('span',{},f)
                        }
                    },
                    {
                        title: '优惠',
                        key: 'attendCount',
                        align: 'center',
                        render: (h, params) => {
                            let d = params.row.orderGoods[0];
                            let p = [];
                            if(d.goodsType==0){
                                //普通商品
                                let oc = '0';
                                let ov = '0';
                                if(params.row.orderCredits){
                                    oc = params.row.orderCredits;
                                }
                                if(params.row.orderVoucher){
                                    ov = params.row.orderVoucher;
                                }

                                p = [
                                    h("div",'积分:'+oc+'积分'),
                                    h("div",'代金券:'+ov+'元')
                                ]
                            }else{
                                //积分商品或代金券
                                p = [
                                    h("div",'无'),
                                ];
                            }
                            return  h("div",p)
                        }
                    },
                    {
                        align:'center',
                        title: '状态',
                        key: 'orderState',
                        render:(h,params)=>{
                            let d;
                            switch (params.row.orderState) {
                                case 1:
                                    d = "已支付";
                                    break;
                                case 2:
                                    d = "已发货";
                                    break;
                                case 3:
                                    d = "已送达";
                                    break;
                                case 4:
                                    d = "已签收";
                                    break;
                            }
                            return h('span',{},d)
                        }
                    },
                    {
                        title: '总价合计',
                        key: 'orderPrices',
                        align:'center',
                        render:(h,params)=>{
                            return h('span',{},this.$_price_$)
                        }
                    }
                ],
                $_data_$:[],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                }
            }
        },
        created() {
            this.$_ddxx_$();
            this.$_list_$()
        },
        methods: {
            $_list_$(){
                this.$_querycfg_$.mod = 'operate/order/queryOrderDetailsById';
                this.$_querycfg_$.params.orderId = this.$_orderId_$;
                this.$_fquery_$((rsp)=>{
                    if(rsp.status === 200){
                        if (rsp.data.code === 0) {
                            let data = rsp.data.data;
                            this.$_number_$ = data.orderNumber;
                            this.$_time_$ = this.fmtDate(data.commiteTime);

                            if(data.orderGoods[0].goodsIsDelivery == 1){
                                //商品配送
                                if(data.commiteTime){
                                    //下单
                                    this.$_time1_$ = this.fmtDate(data.commiteTime);
                                }
                                if(data.deliverTime){
                                    //发货
                                    this.$_time2_$ = this.fmtDate(data.deliverTime);
                                    this.$_selected1_$ = true;
                                    this.$_selected2_$ = true;
                                    this.$_selected3_$ = false;
                                    this.$_selected4_$ = false;
                                }
                                if(data.signerTime){
                                    //送达
                                    this.$_time3_$ = this.fmtDate(data.signerTime);
                                    this.$_selected1_$ = true;
                                    this.$_selected2_$ = true;
                                    this.$_selected3_$ = true;
                                    this.$_selected4_$ = false;
                                }
                                if(data.completeTime){
                                    //签收
                                    this.$_time4_$ = this.fmtDate(data.completeTime);
                                    this.$_selected1_$ = true;
                                    this.$_selected2_$ = true;
                                    this.$_selected3_$ = true;
                                    this.$_selected4_$ = true;
                                }
                            }
                            else{
                                //商品不配送

                                //下单
                                this.$_time1_$ = this.fmtDate(data.commiteTime);

                                //签收
                                this.$_time2_$ = this.$_time1_$;
                                this.$_time3_$ = this.$_time1_$;
                                this.$_time4_$ = this.$_time1_$;
                                this.$_selected1_$ = true;
                                this.$_selected2_$ = true;
                                this.$_selected3_$ = true;
                                this.$_selected4_$ = true;

                            }

                            this.$_user_$.push(data.commiterName);
                            this.$_user_$.push(data.commiterPhone);
                            this.$_user_$.push(data.entName);
                            if(data.orderGoods[0].goodsType==0){
                                //花费总金额（普通商品）
                                if(data.orderPrices){
                                    this.$_price_$ = data.orderPrices * 1 + '元';
                                }else{
                                    this.$_price_$ = '0元'
                                }

                            }else{
                                //花费总积分（积分商品和代金券）
                                this.$_price_$ = data.orderCredits * 1 + '积分';
                            }
                            this.$_data_$.push(data);
                        }
                    }
                })
            },

            // 格式化时间
            fmtDate(sDate) {
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
            /*fmtDate(obj) {
                var date = new Date(obj);
                var y = 1900 + date.getYear();
                var m = "0" + (date.getMonth() + 1);
                var d = "0" + date.getDate();
                var h = date.getHours();
                var i = date.getMinutes();
                var s = date.getSeconds()
                return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)+ " "+h+":"+i+":"+s;
            },*/
            $_ddxx_$(){
                let ddxq = this.$root.inparams.id;
                this.$_orderId_$ = ddxq.id;
            },

            //订单管理
            $_myRecord_$(){
                this.$root.$_Route_$("user","jfscManage","orderManage")
            }
        }
    }
</script>