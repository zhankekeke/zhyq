<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 15px 0 15px 15px;
        background: #f7f7f7;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #404040;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .title {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
    }

    .buildList {
        width: 166px;
        margin-right: 36px;
        border-right: 2px solid #f1f1f1;
    }

    /*.buildList .list {*/
    /*padding: 0 5px 10px;*/
    /*box-sizing: border-box;*/
    /*overflow-y: scroll;*/
    /*height: 500px;*/
    /*}*/

    /*.buildList .list li {*/
    /*margin-top: 10px;*/
    /*padding: 5px 5px;*/
    /*border-bottom: 2px solid #f1f1f1;*/
    /*box-sizing: border-box;*/
    /*}*/

    .buildList .list li p {
        line-height: 30px;
        font-weight: bold;
        width: 90px;
        /*border-bottom: 1px solid #efefef;*/
    }

    .buildList .list li p:hover {
        line-height: 30px;
        font-weight: bold;
        width: 90px;
        color: #39f;
        /*border-bottom: 1px solid #efefef;*/
    }

    .buildList .list li img {
        width: 100%;
        height: 103px;
        border-radius: 5px;
        margin-top: 20px;
    }

    .floor {
        background: #d6ebfe;
        height: 60px;
        padding: 15px 10px 15px;
        box-sizing: border-box;
    }

    .house {
        border-radius: 4px;
        margin-top: 20px;
        background: #f4f4f4;
        height: 30px;
        box-sizing: border-box;
    }

    .housetext {
        line-height: 30px;
        font-weight: bold;
        font-size: 16px;
        margin-left: 10px;
    }

    .housenum {

    }

    .housenum li {
        position: relative;
        width: 120px;
        height: 70px;
        float: left;
        margin: 15px 0 0 2%;
        border: 1px solid #ccc;
        text-align: center;
        border-radius: 4px;
        color: #545454;
    }

    .housenum li b {
        line-height: 70px;
        color: #545454;
    }

    .housenum li p {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 5px;
    }

    .ivu-radio-group-button .ivu-radio-wrapper {
        border: none;
        border-radius: 0;
        background: none;
    }

    .ivu-radio-group-button .ivu-radio-wrapper-checked {
        box-shadow: none;
        background: #fff;
        border-radius: 5px;
    }

    >>> .ivu-radio-group-button .ivu-radio-wrapper:after, .ivu-radio-group-button .ivu-radio-wrapper:before {
        display: none;
    }

    .noData {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }
</style>
<template>
    <div>
        <!-- 内容 -->
        <Row type="flex" justify="start">
            <Col>
                <div class="buildList">
                    <ul class="list">
                        <li v-for="(item, index) in $_buildList_$" :key="index" @click="$_bulid_$(item)"
                            style="cursor: pointer; text-align: center">
                            <img v-if="item.images.length>0" :src="$_global_$.imgPath + item.images[0].imageUrl" alt="">
                            <img v-else src="./img.png" alt="">
                            <!--<p>{{item.name}}</p>-->
                            <Col style="width:100%;" align="center"><p>{{item.name}}</p></Col>
                        </li>
                    </ul>
                </div>
            </Col>
            <Col style="width: 76%">

                <br>
                <Row>
                    <Col span="8">
                        &nbsp;&nbsp;<span style="color: black; font-size:14px;">楼宇名称：</span>
                        <span style="font-weight: bold;font-size: 16px;">{{$_trueBnum_$}}</span>
                    </Col>

                </Row>
                <br>
                <Row class="floor">
                    <Col span="18">
                        <RadioGroup @on-change='$_changeFloor_$' v-model="$_floorName_$" type="button"
                                    style="overflow-x: auto;white-space: nowrap;width: 100%;">
                            <Radio v-for="(item) in $_floorList_$" :label="item.name"></Radio>
                        </RadioGroup>
                    </Col>

                </Row>
                <Row class="house">
                    <Col span="10" class="housetext">房间列表</Col>
                </Row>
                <Row>
                    <ul v-if="$_roomList_$.length > 0" class="housenum">
                        <li v-for="(item, index) in $_roomList_$" :key="index">
                            <b>{{item.name}}</b>
                        </li>
                    </ul>
                    <ul v-else class="housenum">
                        <div class="noData">暂无房间</div>
                    </ul>
                </Row>
            </Col>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';
    import axios from 'axios'

    export default {
        mixins: [controler],
        data() {
            const validateaddr = (rule, value, callback) => {
                if (this.$_formValidate_$.$_parkNum_$ != "") {
                    callback();
                } else {
                    callback('请选择所属园区');
                }
            };
            return {
                $_selected_$: '',
                //层号
                $_fnum_$: 0,
                //索引楼号
                $_bnum_$: 0,
                //真实显示楼名称
                $_trueBnum_$: '',
                $_zoneId_$: 0, // 园区id
                $_userInfo_$: '',

                $_floorId_$: 0, // 楼层id
                $_modal1_$: false,
                $_editmodal_$: false,
                $_addFloorModal_$: false,
                $_addFloorNumModal_$: false,
                $_statusList_$: [], // 园区选择
                $_buildName_$: '', //楼房名称
                $_floorName_$: '', //楼层名称
                $_roomId_$: '', //房间号
                $_buildList_$: [  // 楼宇列表
                ],
                $_floorList_$: [], // 楼层列表
                $_roomList_$: [], // 房间列表
                $_formValidate_$: {
                    $_parkNum_$: "",
                    $_buildName_$: "",
                    $_buildArea_$: "",
                    $_buildTime_$: "",
                    $_buildDesc_$: ""
                },
                $_editformValidate_$: {},  // 编辑楼宇表单
                // 添加楼层
                $_addFloorValidate_$: {
                    $_floorName_$: "",
                    $_buildDesc_$: ""
                },
                // 添加房间
                $_addFloorNumValidate_$: {
                    $_houseNum_$: "",
                    $_houseDes_$: ""
                },

                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_zoneId_$ = this.$_userInfo_$.zoneId;
            this.$_bList_$()
            // this.$_zoneList_$()
        },
        methods: {
            // 楼宇平面图
            $_pmt_$() {
                this.$root.$_Route_$('user', 'jump', 'lypmt', {})
            },
            $_onChange_$(res) {
                this.$_formValidate_$.$_buildTime_$ = res + " 00:00:00";
                this.$_editformValidate_$.buildDate = res + " 00:00:00";
            },
            // 大楼列表
            $_bList_$() {
                this.$_buildList_$ = [];
                this.$_floorList_$ = [];
                this.$_roomList_$ = [];
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/building`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_buildList_$ = rsp.data.data;
                            this.$_trueBnum_$ = rsp.data.data[0].name;  // 大楼名称
                            this.$_bnum_$ = rsp.data.data[0].id;  // 大楼id
                            this.$_zoneId_$ = rsp.data.data[0].zoneId;  // 园区ID
                            this.$_editformValidate_$ = rsp.data.data[0];
                            this.$_editformValidate_$.zoneId = String(this.$_editformValidate_$.zoneId);
                            this.$_Flist_$()
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            // 楼层列表
            $_Flist_$() {
                this.$_floorList_$ = [];
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_floorList_$ = rsp.data.data;
                            this.$_floorId_$ = rsp.data.data[0].id;
                            this.$_floorName_$ = rsp.data.data[0].name;
                            this.$_Rlist_$()
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            // 房间列表
            $_Rlist_$() {
                this.$_roomList_$ = [];
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor/${this.$_floorId_$}/room`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_roomList_$ = rsp.data.data
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },

            //切换楼宇
            $_bulid_$(item) {
                this.$_floorList_$ = [];
                this.$_roomList_$ = [];
                this.$_bnum_$ = item.id;
                this.$_fnum_$ = 0;
                this.$_trueBnum_$ = item.name;
                this.$_zoneId_$ = item.zoneId;
                this.$_editformValidate_$ = item;
                this.$_editformValidate_$.zoneId = String(this.$_editformValidate_$.zoneId);
                this.$_Flist_$()
            },

            //切换楼层
            $_changeFloor_$(name) {
                for (let item of this.$_floorList_$) {
                    if (item.name == name) {
                        this.$_fnum_$ = item.id;
                        this.$_floorId_$ = item.id;
                        this.$_Rlist_$()
                    }
                }
            },

        }
    }
</script>

