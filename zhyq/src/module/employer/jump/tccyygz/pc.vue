<style scoped>

    >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }



    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }


</style>
<template>
    <div>
        <div align="center"><h2>停车场预约规则</h2></div>
        <br>
        <div title="停车场预约规则">
            <span style="font-size: 16px">停车场预约规则：</span>
            <div v-html="$_info_$.reserveRule"></div>
            <br>
            <div align="center">
                <Button type="primary" @click="$_tc_$()">返回</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import "element-ui/lib/theme-chalk/index.css";

    export default {
        mixins: [controler],
        components: {

        },
        data() {
            return {
                row: {},
                zoneId: 0, // 园区id

                $_info_$: {},

                userInfo: {},  // 当前登录人信息
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.zoneId = this.userInfo.zoneId;
            this.$_bList_$();
        },
        methods: {
            $_tc_$() {
                this.$root.$_Route_$("employer", "service", "tccfw");
            },
            // 获取停车场预约规则
            $_bList_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/parking/rule`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_info_$ = rsp.data.data
                            }

                        } else {
                            this.$Message.error('获取停车场预约规则失败!');
                        }
                    }
                })
            },
        },
    };
</script>