<style scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    p {
        font-size: 14px;
        line-height: 40px;
    }

    /*span {*/
        /*font-size: 16px;*/
        /*color: rgb(209, 115, 38);*/
    /*}*/

    .btn {
        padding-top: 50px;
        box-sizing: border-box;
        float: right;
        /* width: 25%; */
        margin-right: 40px;
    }

    .item {
        padding: 15px 0 25px 15px;
        box-sizing: border-box;
        /*border-radius: 6px;*/
        border-bottom: 1px solid #ececec;
        background: #f4f4f4;
    }

    .item .item1 .img {
        height: 122px;
        width: 168px;
        overflow: hidden;
        border-radius: 3px;
        /*background: #d11c1c;*/
    }

    .item .item1 {
        float: left;
        /*width: 25%;*/
    }

    .item .btn .button {
        display: block;
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background: #3399ff;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
    }

    .cont {
        /*padding-top: 20px;*/
        box-sizing: border-box;
        float: left;
        /*width: 25%;*/
        line-height: 1;
        margin-left: 30px;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        line-height: 1;
    }

    .title span {
        background: #3399ff;
        color: #ffffff;
        font-size: 12px;
        width: 110px;
        text-align: center;
        margin-left: 20px;
        padding: 2px 10px;
        border-radius: 3px;
    }

</style>
<template>
    <div>
        <div v-if="item.status" v-for="(item, index) in child"
             :key="index" class="item clear">
            <div class="item1">
                <div class="img">
                    <img v-if="item.images.length>0" :src="$_global_$.imgPath+item.images[0].imageUrl"
                         style="width: 100%;height: 100%" alt="">
                </div>
            </div>
            <div class="cont">

                <p class="title">{{item.name}}
                    <!--<span v-if="item.freeCount">剩余餐位数：{{item.freeCount}}</span>-->
                </p>
                <p>餐厅地址：{{item.address}}</p>
                <p>容纳人数：{{item.peopleNumber}}人</p>

                <!--<p v-if="item.level">拥挤程度：-->
                    <!--<span v-if="item.level==0" style="color: #16bf91">空闲</span>-->
                    <!--<span v-if="item.level==1" style="color: #ffa21d">适中</span>-->
                    <!--<span v-if="item.level>1" style="color: #fc1c1c">拥挤</span>-->
                <!--</p>-->


            </div>

            <div class="btn">
                <span class="button" @click="$_bjyd_$(item)">包间预定</span>
            </div>
        </div>
        <br>
    </div>
</template>
<script>
    export default {
        props: {
            child: Array,
        },
        created() {
            // console.log(this.child)
        },
        methods: {
            $_bjyd_$(row) {
                this.$root.$_Route_$('employer', 'jump', 'bjyd', {row: row})
            }
        }
    };
</script>

