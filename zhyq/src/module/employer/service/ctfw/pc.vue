<style scoped>
    .search {
        background: #f5f5f5;
        padding: 20px;
        margin-bottom: 35px;
        font-size: 14px;
    }

    p {
        font-size: 14px;
        line-height: 40px;
    }

    /*span {*/
    /*font-size: 16px;*/
    /*!*color: rgb(209, 115, 38);*!*/
    /*}*/

    .item {
        padding: 15px 0;
        box-sizing: border-box;
        /*border-radius: 6px;*/
        border-bottom: 1px solid #ececec;
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
        margin-left: 15px;
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

    .surplus span {
        background: #3399ff;
        color: #ffffff;
        font-size: 12px;
        width: 110px;
        text-align: center;
        margin-left: 20px;
        padding: 2px 10px;
        border-radius: 3px;
    }

    .btn {
        padding-top: 50px;
        box-sizing: border-box;
        float: right;
        /* width: 25%; */
        margin-right: 40px;
    }

    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .wrap {
        height: 300px;
    }

    .ml28 {
        margin-left: 28px;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            <span>餐厅名称：</span>
            <Input v-model="$_name_$" style="width: 210px" placeholder="请输入餐厅名称"></Input>
            <Button style="margin-left: 20px" type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div v-for="(item, index) in $_list_$" :key="index">
                <div v-if="item.boxList.length == 0" class="item clear">
                    <div class="item1">
                        <div class="img">
                            <img v-if="item.images.length>0" :src="$_global_$.imgPath+item.images[0].imageUrl"
                                 style="width: 100%;height: 100%" alt="">
                        </div>
                    </div>
                    <div class="cont">
                        <p class="title">{{item.name}}
                            <span class="surplus" v-if="item.freeCount">
                                 <span v-if="item.level==0">剩余餐位数：{{item.freeCount}}</span>
                                 <span v-if="item.level==1" style="background: #ffa21d">剩余餐位数：{{item.freeCount}}</span>
                                 <span v-if="item.level>1" style="background: #fc1c1c">剩余餐位数：{{item.freeCount}}</span>
                            </span>

                            <!--<span v-if="item.freeCount&&item.level>1" style="background: #fc1c1c">剩余餐位数：{{item.freeCount}}</span>-->
                            <!--<span v-else-if="item.freeCount&&item.level==1" style="background: #ffa21d">剩余餐位数：{{item.freeCount}}</span>-->
                            <!--<span v-else-if="item.freeCount">剩余餐位数：{{item.freeCount}}</span>-->
                        </p>
                        <p>餐厅地址：{{item.address}}</p>
                        <p>容纳人数：{{item.peopleNumber}}人</p>

                        <p v-if="item.level">拥挤程度：
                            <span v-if="item.level==0" style="color: #16bf91">空闲</span>
                            <span v-if="item.level==1" style="color: #ffa21d">适中</span>
                            <span v-if="item.level>1" style="color: #fc1c1c">拥挤</span>
                        </p>


                    </div>
                    <div class="cont">
                        <!--<p v-if="item.freeCount">剩余餐位:&nbsp;&nbsp;<span>{{item.freeCount}}</span></p>-->
                        <!--<p v-if="item.level==0">拥挤程度:&nbsp;&nbsp;低}</p>-->
                        <!--<p v-if="item.level==1">拥挤程度:&nbsp;&nbsp;中</p>-->
                        <!--<p v-if="item.level>1">拥挤程度:&nbsp;&nbsp;高</p>-->
                    </div>
                    <div class="btn">
                        <span class="button" @click="$_detail_$(item)">详情</span>
                    </div>
                </div>
                <br>
                <div v-if="item.boxList.length != 0" class="item clear">
                    <div class="clear">
                        <div class="item1">
                            <div class="img">
                                <img v-if="item.images.length>0" :src=" $_global_$.imgPath+item.images[0].imageUrl"
                                     style="width: 100%;height: 100%" alt="">
                            </div>
                        </div>
                        <div class="cont">
                            <p class="title">{{item.name}} (商务餐厅)</p>
                            <p>餐厅地址:&nbsp;&nbsp;{{item.address}}</p>
                            <p>容纳人数:&nbsp;&nbsp;{{item.peopleNumber}}人</p>
                        </div>
                        <div class="cont">
                        </div>
                        <div class="btn">
                            <span class="button" ref='btn' @click="$_yd_$(index)">包间</span>
                        </div>
                    </div>
                    <br>
                    <div class="expend" v-show="showType[index]">
                        <expend-list :child="item.boxList"></expend-list>
                    </div>

                </div>
                <br>
            </div>
        </div>
        <br>
        <!-- 分页 -->
        <Row>
            <!-- <Page align="right" :total="100" show-sizer show-elevator></Page> -->
            <Page align="right" :total="$_total_$"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';
    import expendList from './expend'

    export default {
        mixins: [controler],
        components: {expendList},
        data() {
            return {
                showType: {},
                $_userInfo_$: {},
                value1: '1',
                $_name_$: '', // 餐厅名称
                $_list_$: [],
                $_total_$: 0,
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_pageSize_$: 3,
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_global_$.serverPath
            this.list();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            // 获取餐厅列表
            list() {
                this.$_querycfg_$.mod = 'zone/zone/' + this.$_userInfo_$.zoneId + '/restaurant/search';
                this.$_querycfg_$.params.status = '1';
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_list_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total;
                        }
                    }
                })
            },
            //    搜索
            $_search_$() {
                if (this.$_name_$) {
                    this.$_querycfg_$.params.name = this.$_name_$;
                    this.list()
                } else {
                    delete this.$_querycfg_$.params.name;
                    this.list();
                }
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.list();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.list();
            },
            // 详情
            $_detail_$(row) {
                this.$root.$_Route_$('employer', 'jump', 'ctffxq', {row: row})
            },
            // 包间预定
            $_yd_$(index) {
                this.$set(this.showType, index, !this.showType[index]);
            },
        }
    }
</script>