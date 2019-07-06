<style scoped>
    .info {
        width: 90%;
        margin: 0 auto;
    }

    .info p {
        line-height: 50px;
    }

    .info .row {
        border-bottom: 2px solid #f7f7f7;
    }

    .spinfo .img {
        float: left;
        width: 50px;
        height: 30px;
        margin: 10px 10px 10px 0;
        background: #f7f7f7;
    }

    .spinfo p {
        float: left;
        width: 50%;
        line-height: 2.2;
        margin-top: 10px;
    }

    .middle {
        width: 45%;
        margin: 0 0 20px 5%;
    }

    .middle p {
        line-height: 50px;
        font-size: 14px;
    }

    .middle .middleTitle {
        font-size: 14px;
    }

    .confirm {
        width: 40%;
        padding: 10px 0 20px 10px;
        box-sizing: border-box;
        /*background: #f7f7f7;*/
        margin-left: 5%;
    }

    .confirm .color {
        color: #f00;
        font-size: 18px;
    }

    .div-label{
        width: 100px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #495060;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
    }

    .div-content{
        display: inline-block;
        position: relative;
        line-height: 32px;
        font-size: 12px;
        /*margin-left: 40px;*/
        vertical-align: middle;
    }

    >>>.ivu-checkbox-wrapper{
        margin-right: 4px;
    }
</style>
<template>
    <div>
        <!-- 订单信息 -->
        <div class="info">
            <Row class="row" style="background-color: #f5f5f5;padding-left: 15px;">
                <Col span="4" algin="center"><p style="font-size: 16px">商品编号</p></Col>
                <Col span="6" algin="center"><p style="font-size: 16px">商品名称</p></Col>
                <Col span="4" algin="center"><p style="font-size: 16px">单价</p></Col>
                <Col span="6" algin="center"><p style="font-size: 16px">数量</p></Col>
                <Col span="4" algin="center"><p style="font-size: 16px">应付</p></Col>
            </Row>
            <Row class="row">
                <Col span="4" algin="center"><p>{{$_goodsData_$.id}}</p></Col>
                <Col class="spinfo" span="6" algin="center">
                    <img class="img" :src="$_global_$.imgPath + $_imgs_$[0]">
                    <p>{{$_goodsData_$.name}}</p>
                </Col>
                <Col span="4" algin="center"><p>{{$_dj_$}}{{$_unit_$}}</p></Col>
                <Col span="6" algin="center">
                    <p>
                        数量&nbsp;&nbsp;&nbsp;
                        <InputNumber :min="1" :max="$_kc_$" v-model="$_number_$"></InputNumber>
                    </p>
                </Col>
                <Col span="4" algin="center">
                    <p>{{$_jf_$}}{{$_unit_$}}</p>
                </Col>
            </Row>
        </div>
        <br><br>
        <Row v-if="$_goodsData_$.goodsType==0" type="flex" justify="center" align="middle" style="margin-left: 3%">
            
            <div>
                <Checkbox v-model="$_single_$" @on-change="$_checkDK_$"></Checkbox>
            </div>
            <Col span="23">
                <label class="div-label" style="text-align: center">
                <p style="font-size: 14px">积分抵扣：</p>
                </label>
                <div class="div-content"><span style="font-size: 14px">需要花费<span>{{$_paymentInfo_$.Jfdk}}</span>积分</span></div>
            </Col>
            <Col span="23">
                <label class="div-label" ><p style="font-size: 14px">代金券抵扣：</p></label>
                <div class="div-content">
                    <Select ref="djqselect" :value="$_checkdjq_$" @on-change="$_selectDJQ_$" placeholder="请选择代金券" not-found-text="暂无可用的代金券" style="width:270px">
                        <Option v-for="item in $_djqList_$" :value="item.id" >{{item.name}}<span v-if="item.threshold==0">（无消费限制）</span><span v-else-if="item.threshold==1">（满{{item.quota}}元减{{item.denomination}}）</span></Option>
                    </Select>
                </div>
            </Col>
            <Col span="23" v-if="$_goodsData_$.goodsType==0">
                <label class="div-label" ><p style="font-size: 14px">现金余额：</p></label>
                <div class="div-content"><span style="font-size: 14px">{{$_accountInfo_$.balance}}元</span>
                </div>
            </Col>
            <Col span="23">
                <label class="div-label"><p style="font-size: 14px">积分余额：</p></label>
                <div class="div-content"><span style="font-size: 14px">{{$_accountInfo_$.credits}}积分</span>
                </div>                      
            </Col>
        </Row>
        <br>
        <!-- 备注 -->
        <div class="middle">
            <Row type="flex" justify="center" align="middle">
                <Col span="14">
                    <p class="middleTitle" >兑换应付：<span style="color: #3399ff">{{$_jf_$}}{{$_unit_$}}</span></p>
                </Col>
                <Col span="10">
                    <!-- <div v-if="$_goodsData_$.goodsType==0">现金余额：&nbsp;&nbsp;{{$_accountInfo_$.balance}}元</div>
                    <div >积分余额：&nbsp;&nbsp;{{$_accountInfo_$.credits}}积分</div> -->
                </Col>
            </Row>
            <br>
            <Row>
                备注:&nbsp;&nbsp;
                <Input v-model="$_bz_$" style="width: 300px"></Input>
            </Row>
        </div>
        <!-- 确认信息 -->
        <div class="confirm">
            <p style="font-size: 14px">确认支付信息:</p>
            <p v-if="$_goodsData_$.goodsType==0" style="font-size: 14px">合计:&nbsp;&nbsp;{{this.$_paymentInfo_$.payCash}}{{$_unit_$}}</p>
            <p v-else style="font-size: 14px">合计:&nbsp;&nbsp;{{$_jf_$}}{{$_unit_$}}</p>
        </div>
        <br><br>
        <Button type="primary" @click="$_ljdh_$()" style="position: relative;left: 20%">
            <span v-if="$_goodsData_$.goodsType==0">立即购买</span>
            <span v-else>立即兑换</span>
        </Button>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_number_$: 1, // 数量
                $_dj_$: '', // 单价
                $_bz_$: '', // 备注
                $_kc_$: 99, //库存

                $_exRate_$: '', //现金到积分的兑换率
                $_paymentInfo_$: {
                    payableCash: '',  //应付金额（现金）
                    payableJf: '',  //应付金额（积分）
                    payCash: '',  //实付金额（现金）
                    payJf: '',    //实付金额（积分）
                    Jfdk: '',  //积分抵扣数
                }, //需要显示的各种信息
                $_djqList_$: [],   //代金券列表
                $_checkdjq_$: '',  //选中的代金券
                $_single_$:false,  //是否需要积分抵扣

                $_id_$: '',
                $_goodsData_$: '',
                $_accountInfo_$: '',
                $_userInfo_$: '',
                $_unit_$: '',
                $_imgs_$: [],

                $_querycfg_$: {
                    mod: "",
                    params: {}
                }
            };
        },
        computed: {
            $_jf_$() {
                if (this.$_number_$ > 0)
                    return (this.$_number_$ * 1) * (this.$_dj_$ * 1)
            }
        },
        watch: {
            $_number_$: function (value) {
                this.$_jf_$;

                this.$_paymentInfo_$.payableCash = value * this.$_dj_$;  //应付金额（现金）
                this.$_paymentInfo_$.payableJf = this.$_paymentInfo_$.payableCash * this.$_exRate_$;  //应付金额（积分）
                this.$_paymentInfo_$.payJf = this.$_paymentInfo_$.payableJf;  //实付金额（积分）
                this.$_paymentInfo_$.payCash = this.$_paymentInfo_$.payableJf/this.$_exRate_$;  //实付金额（现金）
                this.$_paymentInfo_$.Jfdk = 0;

                this.$refs.djqselect.reset();
                this.$_checkdjq_$ = '';
                this.$_single_$ = false;
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_dh_$();
            this.$_account_$();
        },
        methods: {
            //   立即兑换
            $_ljdh_$() {
                if(this.$_goodsData_$.goodsType==0){
                    if (this.$_paymentInfo_$.payCash > this.$_accountInfo_$.balance * 1) {
                        this.$Message.error("余额不足");
                        return
                    }
                }else{
                    if (this.$_jf_$ > this.$_accountInfo_$.credits * 1) {
                        this.$Message.error("余额不足");
                        return
                    }
                }

                if (this.$_number_$ <= 0) {
                    this.$Message.error("请选择一个合理的数量");
                    return
                }

                this.$_querycfg_$.mod = 'operate/order/createOrder';
                this.$_querycfg_$.params.goodsId = this.$_id_$;

                if(this.$_checkdjq_$ && !this.$_single_$){
                    //支付方式为代金券和现金
                    this.$_querycfg_$.params.paymentType = '4';
                    this.$_querycfg_$.params.voucherUserId = this.$_checkdjq_$;
                }else if(this.$_checkdjq_$ && this.$_single_$){
                    //支付方式为代金券、积分和现金
                    this.$_querycfg_$.params.paymentType = '5';
                    this.$_querycfg_$.params.voucherUserId = this.$_checkdjq_$;
                }else if(!this.$_checkdjq_$ && this.$_single_$){
                    //支付方式为积分和现金
                    this.$_querycfg_$.params.paymentType = '3';
                }


                this.$_querycfg_$.params.goodsCount = this.$_number_$;

                this.$_querycfg_$.params.remark = this.$_bz_$;
                this.$_querycfg_$.params.commiter = this.$_userInfo_$.id;
                this.$_querycfg_$.params.commiterName = this.$_userInfo_$.name;
                this.$_querycfg_$.params.commiterPhone = this.$_userInfo_$.phoneNumber;
                this.$_querycfg_$.params.department = this.$_userInfo_$.departmentId;
                this.$_querycfg_$.params.deptName = this.$_userInfo_$.departmentName;
                this.$_querycfg_$.params.enterprise = this.$_userInfo_$.enterpriseId;
                this.$_querycfg_$.params.entName = this.$_userInfo_$.enterpriseName;
                this.$_querycfg_$.params.image = this.$_userInfo_$.faceUrl;
                this.$_querycfg_$.params.zoneId = this.$_goodsData_$.zoneId;
                // this.$_querycfg_$.params.isDelivery = this.$_goodsData_$.isDelivery;

                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success(rsp.data.data);
                            this.$root.$_Route_$('employer', 'consume', 'jfsc')
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_dh_$() {
                this.$_id_$ = this.$root.inparams.id
            },

            $_goodDetails_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/goods/queryGoodsById`,
                    data: {id: this.$_id_$},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_goodsData_$ = rsp.data.data;
                            this.$_kc_$ = this.$_goodsData_$.repertory-this.$_goodsData_$.salesCount;  //商品剩余量

                            this.$_unit_$ = this.$_goodsData_$.goodsType === 0 ? "元" : "积分";
                            this.$_dj_$ = this.$_goodsData_$.goodsType === 0 ? this.$_goodsData_$.prices : this.$_goodsData_$.credits;
                            this.$_imgs_$ = this.$_goodsData_$.image.split(';');

                            //当商品为现金商品时，需要请求其他内容
                            if(this.$_goodsData_$.goodsType === 0){
                                //获取积分规则详情
                                this.$_sendQuery_$({
                                    method:"GET",
                                    url:`${this.$_global_$.serverPath}/operate/creditsRule/info?zoneId=${this.$_userInfo_$.zoneId}`,
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                }).then((rsp)=>{
                                    this.$_exRate_$ = rsp.data.data.exRate;  //1元能兑换多少积分（兑换率）
                                    this.$_paymentInfo_$.payableCash = this.$_number_$ * this.$_dj_$;  //应付金额（现金）
                                    this.$_paymentInfo_$.payableJf = this.$_paymentInfo_$.payableCash * this.$_exRate_$;  //应付金额（积分）
                                    this.$_paymentInfo_$.payJf = this.$_paymentInfo_$.payableJf;  //实付金额（积分）
                                    this.$_paymentInfo_$.payCash = this.$_paymentInfo_$.payableJf/this.$_exRate_$;  //实付金额（现金）
                                    this.$_paymentInfo_$.Jfdk = 0;

                                    //获取代金券列表
                                    this.$_sendQuery_$({
                                        method:"POST",
                                        url:`${this.$_global_$.serverPath}/operate/voucherUser/list`,
                                        data:{
                                            "receiverId": this.$_userInfo_$.id,
                                            "useType": "3"
                                        },
                                        headers:{"Content-type":"application/json"}
                                    }).then((rsc)=>{
                                        if(rsc.status === 200){
                                            if(rsc.data.code === 0){
                                                let list = rsc.data.data;
                                                this.$_djqList_$ = [];
                                                for (let i=0;i<list.length;i++){
                                                    this.$_djqList_$.push(list[i]);
                                                }
                                                /*for (let i=0;i<list.length;i++){
                                                    if(list[i].threshold==1){
                                                        //需要满足满减条件
                                                        if(this.$_paymentInfo_$.payableCash>=list[i].quota){
                                                            this.$_djqList_$.push(list[i]);
                                                        }
                                                    }else{
                                                        //没有限制
                                                        this.$_djqList_$.push(list[i]);
                                                    }
                                                }*/
                                            }
                                        }
                                    });
                                })
                            }
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            //选择代金券
            $_selectDJQ_$(vl){
                //找到代金券信息
                let djqtojf = 0;
                let checksuccess = false;
                //先将代金券换算成积分
                for(let i=0;i<this.$_djqList_$.length;i++){
                    if(vl==this.$_djqList_$[i].id){
                        //先判断当前应付金额是否满足该代金券的条件
                        if(this.$_djqList_$[i].threshold==1){
                            if(this.$_paymentInfo_$.payableCash>=this.$_djqList_$[i].quota){
                                // 满足满减条件
                                checksuccess = true;
                            }else{
                                //未满足满减条件
                                checksuccess = false;
                                alert('不满足满减条件不能使用')
                            }
                        }else{
                            //没有限制
                            checksuccess = true;
                        }
                        djqtojf = this.$_djqList_$[i].denomination*this.$_exRate_$;
                        break;
                    }
                }

                if(checksuccess){
                    this.$_checkdjq_$ = vl;

                    //使用优惠券之后实际支付的积分
                    if(djqtojf < this.$_paymentInfo_$.payableJf){
                        this.$_paymentInfo_$.payJf = this.$_paymentInfo_$.payableJf-djqtojf;
                    }else{
                        this.$_paymentInfo_$.payJf = 0;
                    }

                    //将积分转换为现金 即实付金额（现金）
                    this.$_paymentInfo_$.payCash = this.$_paymentInfo_$.payJf/this.$_exRate_$;

                }else{
                    this.$_checkdjq_$ = '';
                    this.$refs.djqselect.reset();
                    //将积分转换为现金 即实付金额（现金）
                    this.$_paymentInfo_$.payCash = this.$_paymentInfo_$.payableCash;
                    this.$_paymentInfo_$.payJf = this.$_paymentInfo_$.payableJf;
                }
                //积分抵扣变为默认不抵扣状态
                this.$_single_$ = false;
                this.$_paymentInfo_$.Jfdk = 0;
            },

            //是否需要积分抵扣
            $_checkDK_$(){
                if(this.$_single_$){
                    //可以进行抵扣的积分
                    if(this.$_paymentInfo_$.payJf > this.$_accountInfo_$.credits){
                        this.$_paymentInfo_$.Jfdk = this.$_accountInfo_$.credits;
                    }else{
                        this.$_paymentInfo_$.Jfdk = this.$_paymentInfo_$.payJf;
                    }

                    //积分抵扣的金额
                    this.$_paymentInfo_$.payJf = this.$_paymentInfo_$.payJf-this.$_paymentInfo_$.Jfdk;
                }else{
                    //取消积分抵扣
                    this.$_paymentInfo_$.payJf = this.$_paymentInfo_$.payJf+this.$_paymentInfo_$.Jfdk;
                    this.$_paymentInfo_$.Jfdk = 0;
                }

                //实付金额（现金）
                this.$_paymentInfo_$.payCash = this.$_paymentInfo_$.payJf/this.$_exRate_$;
            },

            $_account_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/account/accountInfo`,
                    data: {refId: this.$_userInfo_$.id, accountType: 1},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_accountInfo_$ = rsp.data.data;

                            this.$_goodDetails_$();
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            }


        }
    }
</script>