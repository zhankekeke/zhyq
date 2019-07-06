<style scoped>
    .swiper {
        margin-right: 20px;
    }

    .swiper img {
        width: 100%;
        height: 100%;
    }

    .info p {
        line-height: 60px;
        font-size: 14px;
    }

    .info .title {
        font-size: 16px;
        font-weight: bold;
    }

    .detail {
        font-size: 20px;
        line-height: 80px;
    }
</style>
<template>
    <div>
        <Row>
            <!-- 轮播图 -->
            <Col span="14">
                <Carousel autoplay v-model="$_zmdvalue_$" loop class="swiper">
                    <CarouselItem v-for="(item,index) in $_images_$" :key="index" >
                        <div class="demo-carousel" style="height:340px;min-width: 750px;">
                            <img :src="$_global_$.imgPath + item" style="width: 100%;height: 100%">
                        </div>
                    </CarouselItem>
                </Carousel>
            </Col>
            <!-- 信息 -->
            <Col class="info" span="9" offset="1">
                <p class="title">{{$_goodsData_$.name}}</p>
                <p>单价:&nbsp;<span style="font-size: 16px">{{$_dj_$}}{{$_unit_$}}</span></p>
                <p>库存:&nbsp;{{$_goodsData_$.repertory-$_goodsData_$.salesCount}}</p>
                <p>数量:&nbsp;{{$_number_$}}</p>
                <p>小计:&nbsp;{{$_jf_$}}{{$_unit_$}}</p>
                <Button type="primary" @click="$_dh_$()">
                    <span v-if="$_goodsData_$.goodsType == 0">立即购买</span>
                    <span v-else>立即兑换</span>
                </Button>
            </Col>
        </Row>
        <br>
        <div>
            <p style="font-size:16px;font-weight:bold;">商品详情</p>
            <br>
            <div class="detail" v-html="$_goodsData_$.info"></div>
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
                $_bz_$: '', // 备
                $_id_$: '',
                $_goodsData_$: '',
                $_accountInfo_$: '',
                $_userInfo_$: '',
                $_unit_$: '',
                $_images_$:[],

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
                            this.$_images_$=this.$_goodsData_$.image.split(";");
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
        }
    };
</script>