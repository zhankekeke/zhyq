<style scoped>
    .container {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 30px;
    }

    .img img {
        width: 80px;
        height: 80px;
    }

    .container p {
        margin: 0px;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        line-height: 40px;
    }
</style>
<template>
    <div class='container'>
        <Row>
            <Col span='10' class="title">
                <p>服务名称：{{item.name}}</p>
                <p>服务分类：{{item.categoryName}}</p>
            </Col>
        </Row>
        <Row class="title">
            服务介绍:
        </Row>
        <Row>
            <div v-html="item.description"></div>
        </Row>
    </div>
</template>
<script>
    import controler from './controler.js';
    import axios from 'axios'

    export default {
        mixins: [controler],
        data() {
            return {
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                id: '',
                zoneId: '',
                item: {},
            }
        },
        created() {
            this.$_xiangqing_$();
        },
        methods: {

            $_xiangqing_$() {
                this.zoneId = this.$root.inparams.item.zoneId
                this.id = this.$root.inparams.item.id
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/zone/zone/` + this.zoneId + `/enterprise/service/` + this.id,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    // console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.item = rsp.data.data
                        }
                    }
                })
            }
        }
    }
</script>