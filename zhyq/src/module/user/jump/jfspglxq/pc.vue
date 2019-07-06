<style scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .lm {
        font-size: 14px;
        padding-left: 30px;
        /*border: 5px solid #afafaf;*/
    }

    .top {
        margin-top: 20px;
    }

    .topimg {
        float: left;
        width: 57%;
        height: 280px;
        margin-right: 30px;
    }

    .info {
        list-style: none;
        float: left;
        background: url("/static/ct/ctxq.jpg") no-repeat;
        background-size: 100% 100%;
        height: 280px;
        width: 33%;
        padding: 30px;
        border-radius: 7px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    }

    .info li:nth-child(1) {
        line-height: 45px;
        font-weight: bold
    }

    .info li {
        line-height: 35px;
    }

    .detail {
        line-height: 50px;
        font-size: 16px;
    }

    .video {
        width: 950px;
        height: 280px;
        /*margin: 0 auto;*/
    }

    .img {
        width: 100%;
        height: 280px;
        border-radius: 5px
    }
</style>
<template>
    <div class="lm">
        <p>商品基本情况</p>
        <!-- 上部分 -->
        <div class="top clear">
            <Carousel autoplay loop class="topimg">
                <CarouselItem v-for="item in $_images_$">
                    <div>
                        <img :src="$_global_$.imgPath + item" class="img">
                    </div>
                </CarouselItem>
            </Carousel>

            <ul class="info">
                <li>商品名称：{{$_goodsData_$.name}}</li>
                <li>商品类型：
                    <span v-if="$_goodsData_$.goodsType==0">普通商品</span>
                    <span v-else-if="$_goodsData_$.isDelivery==1">积分商品</span>
                    <span v-else-if="$_goodsData_$.isDelivery==2">代金券</span>
                </li>
                <li>单价：{{$_dj_$}} {{$_unit_$}}</li>
                <li>库存：{{$_goodsData_$.repertory}}</li>
                <li>销售数量：<span style="color: #2a83fc;font-size: 16px">{{$_goodsData_$.salesCount}}</span></li>
                <li>是否配送：
                    <span v-if="$_goodsData_$.isDelivery==0">不配送</span>
                    <span v-else-if="$_goodsData_$.isDelivery==1">配送</span>
                </li>
            </ul>
        </div>
        <!-- 下部分 -->
        <p class="detail">商品详情</p>
        <!--       <div class="video">
                  <img :src="imageUrl[0].imageUrl" class="img" alt="">
              </div>
              <br/> -->
        <p v-html="$_goodsData_$.info"></p>
        <div align="center">
            <Button type="primary" @click="$_tc_$()">退出</Button>
        </div>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_zmdvalue_$: 0,
                $_number_$: 1, // 数量
                $_dj_$: '', // 单价
                $_bz_$: '', // 备注
                $_id_$: '',
                $_goodsData_$: '',
                $_accountInfo_$: '',
                $_userInfo_$: '',
                $_unit_$: '',
                $_images_$: [],

                $_querycfg_$: {
                    mod: "module",
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
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);

            this.$_id_$ = this.$root.inparams.id;
            this.$_goodDetails_$()
        },
        methods: {
            $_xq_$() {
                this.$root.inparams.id
            },
            $_dh_$() {
                this.$root.$_Route_$('employer', 'jump', 'jfdh', {id: this.$_id_$})
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                    }
                }
            },
            $_tc_$(){
                 this.$root.$_Route_$("user", "jfscManage", "spManage", {})
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
                            this.$_unit_$ = this.$_goodsData_$.goodsType === 0 ? "元" : "积分";
                            this.$_dj_$ = this.$_goodsData_$.goodsType === 0 ? this.$_goodsData_$.prices : this.$_goodsData_$.credits
                            this.$_images_$ = this.$_goodsData_$.image.split(';');
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
        }
    };
</script>