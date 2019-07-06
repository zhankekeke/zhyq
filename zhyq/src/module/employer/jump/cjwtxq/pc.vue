<style scoped>
.container{font-size:14px;font-weight:400;color:#333;line-height: 30px;}
.img img{width:80px;height: 80px;}
.container p{margin:0px;}
.title{font-size: 16px;font-weight: bold;line-height: 60px;}
</style>
<template>
   <div class='container' >
        <Row>
            <Col span='10' class="title">
                <p >问题名称：{{obj.name}}</p>
                <p >问题分类：{{obj.classifyName}}</p>
            </Col>
        </Row>
        <Row class="title">
           问题详解:
        </Row>
        <Row>
           <div v-html="obj.info"></div>
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
            $_querycfg_$:{
				mod:'',
                params:{}
            },
            obj:{}, // 详情
            item:{}, // 当前服务id
        }
    },
    created(){
        this.$_global_$.serverPath
        this.$_xiangqing_$();
        this.$_detali_$()
    },
    methods: {
    //    获取服务详情
         $_jump_$(index){
            this.$root.inparams.id;
        },
        $_xiangqing_$(){
            this.$root.inparams.item;
            this.item = this.$root.inparams.item
        },

        $_detali_$(){
            this.obj=this.$root.inparams.data;
        }
    }
}
</script>