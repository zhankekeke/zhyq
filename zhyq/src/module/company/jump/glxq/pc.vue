<style scoped>
    .container {
        font-size: 14px;
        font-weight: 500;
    }

    .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
    }

</style>
<template>
    <div class='container'>
        <Row class='title'>
            <Col span='18'>员工基本信息</Col>
        </Row>
        <Row class=''>
            <Form style='width:400px;margin-left:300px;' ref="$_xzygForm_$" :model="$_xzygForm_$" :label-width="120">
                <FormItem label="头像：">
                    <img :src="$_global_$.imgPath + $_xzygForm_$.faceUrl" style="width: 100px;height: 100px;border-radius: 50px;border: 2px solid #f7f7f7" >
                </FormItem>
                <FormItem label="员工姓名：">
                    <Input v-model="$_xzygForm_$.name" disabled></Input>
                </FormItem>
                <FormItem label="员工性别：">
                    <RadioGroup v-model="$_xzygForm_$.sex">
                        <Radio label="0" disabled>男</Radio>
                        <Radio label="1" disabled>女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="联系方式：">
                    <Input v-model="$_xzygForm_$.phoneNumber" disabled></Input>
                </FormItem>
                <FormItem label="邮箱：">
                    <Input v-model="$_xzygForm_$.emailUrl" disabled></Input>
                </FormItem>
                <FormItem label="生日：">
                    <Input v-model="$_xzygForm_$.brithday" disabled></Input>
                </FormItem>
                <FormItem label="所属部门：">
                    <Input v-model="$_xzygForm_$.departmentName" disabled></Input>
                </FormItem>
                <FormItem label="职务：">
                    <Input v-model="$_xzygForm_$.position" disabled></Input>
                </FormItem>
                <FormItem label="入职时间：" prop="rztime">
                    <Input v-model="$_xzygForm_$.createDate" disabled></Input>
                </FormItem>
                    
            </Form>
        </Row>
        <div align="center">
        <Button type="primary" @click="$_close_$()">关闭</Button></div>

    </div>

</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_querycfg_$: {
                mod: '',
                params: {}
            },
            $_xzygForm_$: {},
            $_bumen_$: ''
        }
    },
    created() {
        this.$_global_$.serverPath
        this.$_xiangqing_$();
    },
    methods: {
        $_xiangqing_$() {
            this.$root.inparams.row;
            this.$_xzygForm_$ = this.$root.inparams.row
            this.$_xzygForm_$.sex = '' + this.$_xzygForm_$.sex
        },
        $_close_$() {
                this.$root.$_Route_$('company', 'orginza', 'ygmanage', {})
            },
        //菜单递归
        $_dg_$(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == this.$_xzygForm_$.departmentId) {
                    this.$_bumen_$ = data[i].name
                } else {
                    if (data[i].child === null) {

                    } else {
                        this.$_dg_$(data[i].child)
                    }
                }
            }
        },

    }
}
</script>