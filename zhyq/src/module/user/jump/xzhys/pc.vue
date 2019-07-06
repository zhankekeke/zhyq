<style scoped>
.step{
    width: 700px;
    height: 60px;
    margin:0 auto 20px;
    position: relative;
}
.step .stepcont{
    position: absolute;
    top: 0;
    left: 18%;
}
.basic{
    width: 400px;
    margin: 0 auto;
}
.title{
    line-height: 50px;
    font-weight:bold;

}
.complete{
    padding-top: 100px;
}
.img{
    width: 60px;
    height: 60px;
    margin: 0 auto;
}
.completeTitle{
    font-size: 20px;
    line-height: 50px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 150px;
}
</style>
<template>
    <div>
        <!-- 步骤条 -->
        <div class="step">
            <Steps class="stepcont" :current="$_current_$" size="small">
                <Step content="会议室基本信息"></Step>
                <Step content="会议室配置"></Step>
                <Step content="完成"></Step>
            </Steps>
        </div>
        <!-- 会议室基本信息 -->
        <div class="basic" v-show="$_basic_$">
            <p class="title">会议室基本信息</p>
            <Form ref="addAssembForm" :rules="addAssembFormValidate" :model="$_addAssembForm_$" :label-width="90">
                <FormItem label="预览图:">
                    
                </FormItem>
                <FormItem label="会议室名称:" prop="name">
                    <Input v-model="$_addAssembForm_$.name"></Input>
                </FormItem>
                <FormItem label="地址关联:" prop="address">
                    <Input v-model="$_addAssembForm_$.address"></Input>
                </FormItem>
                <FormItem label="面积:" prop="area">
                    <Input v-model="$_addAssembForm_$.area"></Input>
                </FormItem>
                <FormItem label="容纳人数:" prop="totalNum">
                    <Input v-model="$_addAssembForm_$.totalNum"></Input>
                </FormItem>
                <FormItem label="会议室描述:" prop="desc">
                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="$_addAssembForm_$.desc"></Input>
                </FormItem>
                <FormItem align="center">
                    <Button type="ghost" style="margin-right: 8px" @click="$_zSave_$()">暂存</Button>
                    <Button type="primary" @click="$_next_$()">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 会议室配置 -->
        <div class="basic" v-show="$_setting_$">
            <p class="title">会议室配置</p>
            <Form ref="assembSeting" :rules="assembSetingValidate" :model="$_assembSeting_$" :label-width="130">
                <Row>
                    <Col span="20">
                        <FormItem label="需提前多久预约:" prop="tqyy">
                            <Input v-model="$_assembSeting_$.tqyy"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <FormItem label="开放时间:">
                    <TimePicker :value="$_assembSeting_$.kfsj" format="HH:mm:ss" type="timerange" placement="bottom-end" style="width: 168px"></TimePicker>
                </FormItem>
                <Row>
                    <Col span="20">
                        <FormItem label="起订时间:" prop="qdsj">
                            <Input v-model="$_assembSeting_$.qdsj"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="最小增加时间单位:" prop="zxzj">
                            <Input v-model="$_assembSeting_$.zxzj"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="最小退订时间:" prop="zxtd">
                            <Input v-model="$_assembSeting_$.zxtd"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="会议室打扫时间:" prop="dssj">
                            <Input v-model="$_assembSeting_$.dssj"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="积分消费:" prop="jfxf">
                            <Input v-model="$_assembSeting_$.jfxf"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" align="center" style="line-height: 32px;">积分/分钟</Col>
                </Row>
                <FormItem label="退订返还比例:" prop="tdfh">
                    <Input v-model="$_assembSeting_$.tdfh"></Input>
                    <p>例如：预约会议室使用100积分，退订返还70积分</p>
                </FormItem>
                <FormItem align="center">
                    <Button type="primary" @click="$_zancun_$()">暂存</Button>
                    <Button type="primary" @click="$_sStep_$()">上一步</Button>
                    <Button type="primary" @click="$_nextStep_$()">下一步</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 完成 -->
        <div class="complete" v-show="$_complete_$">
            <!-- <img src="" alt=""> -->
            <div class="img"></div>
            <p class="completeTitle">添加成功</p>
            <Row>
                <Col span="24" align="center">
                    <Button type="primary" @click="$_goList_$()">返回列表</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
          $_current_$: 0, // 步骤条
          $_basic_$: true,
          $_setting_$: false,
          $_complete_$: false,
          $_addAssembForm_$: {  // 会议室基本信息
              img: '',
              name: '',
              address: '',
              area: '',
              totalNum: '',
              desc: '',
              djxx: '',   
          },
          $_assembSeting_$: {  // 会议室配置
            tqyy: '',
            kfsj:'',
            qdsj: '',
            zxzj: '',
            zxtd: '',
            dssj: '',
            jfxf: '',
            tdfh: ''
          },
          addAssembFormValidate: {  //基本信息表单验证
            name: [
                { required: true, message: '必填', trigger: 'blur' }
            ],address: [
                { required: true, message: '必填', trigger: 'blur' }
            ],area: [
                { required: true, message: '必填', trigger: 'blur' }
            ],totalNum: [
                { required: true, message: '必填', trigger: 'blur' }
            ],desc: [
                { required: true, message: '必填', trigger: 'blur' }
            ]
          },
          assembSetingValidate: {  //会议室配置表单验证
            tqyy: [
                { required: true, message: '必填', trigger: 'blur' }
            ],kfsj: [
                { required: true, message: '必填', trigger: 'blur' }
            ],qdsj: [
                { required: true, message: '必填', trigger: 'blur' }
            ],zxzj: [
                { required: true, message: '必填', trigger: 'blur' }
            ],zxtd: [
                { required: true, message: '必填', trigger: 'blur' }
            ],dssj: [
                { required: true, message: '必填', trigger: 'blur' }
            ],jfxf: [
                { required: true, message: '必填', trigger: 'blur' }
            ],tdfh: [
                { required: true, message: '必填', trigger: 'blur' }
            ]
          },
          $_querycfg_$: {
                mod: "module",
                params: {}
            }
        }
    },
    methods: {
        $_addAssemb_$() {
            this.$root.inparams.id
        },
        //基础暂存
        $_zSave_$() {},
        // 基础下一步
        $_next_$() {
            this.$refs.addAssembForm.validate((valid) => {
                if(valid){
                    this.$_current_$ += 1;
                    this.$_basic_$ = false
                    this.$_setting_$ = true
                }else{
                    this.$Message.error('Fail!');
                }    
            })    
        },
        // 配置暂存
        $_zancun_$(){},
        // 配置上一步
        $_sStep_$() {
            this.$_current_$ -= 1;
            this.$_basic_$ = true
            this.$_setting_$ = false
            this.$refs.assembSeting.resetFields()
        },
        // 配置下一步
        $_nextStep_$() {
            this.$refs.assembSeting.validate((valid) => {
                if(valid){
                    this.$_current_$ += 1;
                    this.$_setting_$ = false
                    this.$_complete_$ = true
                    
                }else{
                    this.$Message.error('Fail!');
                }    
            })     
        },
        // 返回列表
        $_goList_$() {
            this.$root.$_Route_$('user','ssManage','assembManage',{})
        },
        $_receive_$(rsp) {
            if (rsp.status === 200) {
                if (rsp.data.status === 0) {
                }
            }
        }
    }
}
</script>