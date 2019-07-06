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
        <p>餐厅基本情况</p>
        <!-- 上部分 -->
        <div class="top clear">
            <Carousel autoplay loop class="topimg">
                <CarouselItem v-for="item in imageUrl">
                    <div>
                        <img :src="$_global_$.imgPath + item.imageUrl" class="img">
                    </div>
                </CarouselItem>
            </Carousel>

            <ul class="info">
                <li>餐厅名称：{{$_info_$.name}}</li>
                <li>餐厅地址：{{$_info_$.address}}</li>
                <li>容纳人数：{{$_info_$.peopleNumber}}</li>
                <li>剩余餐位数：<span style="color: #2a83fc;font-size: 16px">{{$_info_$.freeCount}}</span></li>
                <li>拥挤程度：
                    <span v-if="$_info_$.level==0">空闲</span>
                    <span v-if="$_info_$.level==1">适中</span>
                    <span v-if="$_info_$.level==2">拥挤</span>
                </li>
                <li>对接厂商：{{$_info_$.configDescription}}</li>
            </ul>
        </div>
        <!-- 下部分 -->
        <p class="detail">餐厅详情</p>
        <!--       <div class="video">
                  <img :src="imageUrl[0].imageUrl" class="img" alt="">
              </div>
              <br/> -->
        <p v-html="$_info_$.description"></p>
        <div align="center">
            <Button type="primary" @click="$_tc_$()">退出</Button>
        </div>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_info_$: {},
            $_querycfg_$: {
                mod: "",
                params: {}
            },
            row: {},
            imageUrl: ''
        }
    },
    created() {
        this.$_global_$.serverPath
        this.$_detail_$()
        this.info()
    },
    methods: {
        $_detail_$() {
            this.row = this.$root.inparams.row
        },
        $_tc_$(){
            this.$root.$_Route_$("user", "ssManage", "diningManage", {zoneId:this.row.zoneId});
        },
        info() {
            this.$_sendQuery_$({
                method: "GET",
                url: `${this.$_global_$.serverPath}/zone/zone/${this.row.zoneId}/restaurant/${this.row.id}`,
                data: {},
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$_info_$ = rsp.data.data;
                        this.imageUrl = rsp.data.data.images
                    } else {
                        this.$Message.error(rsp.data.message)
                    }
                }
            })
        }
    }
}
</script>