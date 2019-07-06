<style scoped>
   
</style>
<template>
  <div class="zkk">
       <Row style="padding:10px">
            <Col span="8" style="padding:10px;">
                <Card>
                    <p slot="title">
                        <Row>
                            <Col span="12">代金卷名称{{$_voucher_$}}</Col>
                            <Col span="12" align="right">{{$_money_$}}&nbsp;&nbsp;元</Col>
                        </Row>
                    </p>
                    <br>
                    <p>
                        <Row>
                            <Col span="12">有效期:&nbsp;&nbsp;{{$_time_$}}</Col>
                            <Col span="12" align="right">使用场景:&nbsp;&nbsp;{{$_scene_$}}</Col>
                        </Row>
                    </p>
                </Card>
            </Col>
        </Row>
  </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
           $_voucher_$:'',
           $_money_$:'2',
           $_time_$:'2018-08-08',
           $_scene_$:'会议室'
        }
    },
    methods: {
        $_yhj_$(){
            this.$root.inparams.id
        }
    }
}
</script>