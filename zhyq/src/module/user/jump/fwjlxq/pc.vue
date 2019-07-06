<style scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .info {
        width: 95%;
        margin: 0 auto 20px;
        padding: 10px 0 20px 30px;
        border: 1px solid #f7f7f7;
        border-radius: 6px;
    }

    .info .title {
        font-size: 16px;
        line-height: 40px;
    }

    .info .list {
        width: 25%;
        float: left;
    }

    .info .list p {
        line-height: 30px;
        font-size: 14px;
    }

    .gj {
        background: #F2F2F2;
        width: 80%;
        margin: 0 auto 8px;
        padding: 20px 30px 30px 0;
        box-sizing: border-box;
    }

    .gj .gjimg {
        float: right;
        margin-left: 20px;
    }

    .gj .gjcont {
        float: right;
    }

    .gj .gjcont .name {
        text-align: right;
    }

    .gj .gjcont .deal {
        text-align: right;
    }

    .yh {
        background: #f7f7f7;
        width: 80%;
        margin: 0 auto 8px;
        padding: 20px 0 30px 30px;
        box-sizing: border-box;
    }

    .yh .yhimg {
        float: left;
        margin-right: 20px;
    }

    .yh .yhcont {
        float: left;
    }

    .name {
        margin-bottom: 10px;
    }

    .img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #f00;
    }
</style>
<template>
    <div>
        <!-- 事项概况 -->
        <div class="info">
            <div class="top clear">
                <p class="title">事项概况</p>
                <p class="title">序号:&nbsp;{{$_info_$.id}}</p>
            </div>
            <div class="content clear">
                <div class="list">
                    <p>事项分类:&nbsp;{{$_info_$.recordTypeName}}</p>
                    <p>事项名称:&nbsp;{{$_info_$.recordTitle}}</p>
                </div>
                <div class="list">
                    <p>用户名称:&nbsp;{{$_info_$.commiterName}}</p>
                    <p>用户单位:&nbsp;{{$_info_$.commiterEnterpriseName}}</p>
                    <p>联系电话:&nbsp;{{$_info_$.commiterPhoneNumber}}</p>
                </div>
                <div class="list">
                    <p>提交时间:&nbsp;{{$_info_$.commiterPubtime}}</p>
                </div>
                <div class="list">
                    <p v-if="$_info_$.recordStatus == 0">状态:&nbsp;未受理</p>
                    <p v-else-if="$_info_$.recordStatus == 1">状态:&nbsp;已受理</p>
                    <p v-else-if="$_info_$.recordStatus == 2">状态:&nbsp;已处理</p>
                </div>
            </div>
        </div>
        <!-- 聊天记录 -->
        <div class="record">
            <span v-for="(item ,index) in $_msg_$" :key="index">
            <div v-if="index%2 != 0" class="gj clear">
                <div class="gjimg img"></div>
                <div class="gjcont">
                    <p class="name">(系统回复){{item.name}}&nbsp;&nbsp;&nbsp;{{item.itemPubdate}}</p>
                    <p class="deal">处理方案:&nbsp;{{item.itemInfo}}</p>
                </div>
            </div>
            <div v-else-if="index%2 == 0" class="yh clear">
                <div class="yhimg img"></div>
                <div class="yhcont">
                    <p class="name">(系统回复){{item.name}}&nbsp;&nbsp;&nbsp;{{item.itemPubdate}}</p>
                    <p class="deal">处理方案:&nbsp;{{item.itemInfo}}</p>
                </div>
            </div>
            </span>
        </div>
    </div>
</template>

<script>
    import controler from "./controler.js";
    import {EventBus} from "@/libs/eventbus.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_querycfg_$: {
                    mod: 'steward/steward/queryServiceItemByRecodeId',
                    params: {}
                },
                $_info_$: {},
                $_msg_$: ''
            };
        },
        methods: {
            $_detail_$() {
                this.$root.inparams.id
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$_msg_$ = rsp.data.data;
                    }
                }
            },
        },
        created() {
            //获取记录ID
            this.$_info_$.id = this.$root.inparams.id;
            this.$_info_$.recordTypeName = this.$root.inparams.recordTypeName;
            this.$_info_$.recordTitle = this.$root.inparams.recordTitle;
            this.$_info_$.commiterName = this.$root.inparams.commiterName;
            this.$_info_$.commiterEnterpriseName = this.$root.inparams.commiterEnterpriseName;
            this.$_info_$.commiterPhoneNumber = this.$root.inparams.commiterPhoneNumber;
            this.$_info_$.commiterPubtime = this.$root.inparams.commiterPubtime;
            this.$_info_$.recordStatus = this.$root.inparams.recordStatus;
            this.$_querycfg_$.params.record_id = this.$root.inparams.id;
            this.$_fquery_$();
        },
    };
</script>