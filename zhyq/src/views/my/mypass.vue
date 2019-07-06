<style scoped>
    .MainContent {
        width: 330px;
        margin: 5% auto;
        border: 1px solid #ccc;
        padding: 20px 30px 20px 5px;
    }
</style>
<template>
    <div class="MainContent">
        <div style="width: 330px; text-align: center; font-weight: bold; font-size: 16px;margin-bottom: 20px;">密码重置
        </div>
        <Form ref="$_passValidate_$" :model="$_passValidate_$" :rules="$_ruleValidate_$" :label-width="100">
            <FormItem label="原密码：" prop="$_oldpass_$">
                <Input type="password" v-model="$_passValidate_$.$_oldpass_$" placeholder="请输入原始密码"></Input>
            </FormItem>
            <FormItem label="新密码：" prop="$_newpass1_$">
                <Input type="password" v-model="$_passValidate_$.$_newpass1_$" placeholder="请输入新密码"></Input>
            </FormItem>
            <FormItem label="再次输入：" prop="$_newpass2_$">
                <Input type="password" v-model="$_passValidate_$.$_newpass2_$" placeholder="请再次输入密码"></Input>
            </FormItem>
        </Form>
        <div slot="footer" align="center" style=" margin-top: 30px">
            <Button type="primary" @click="$_save_$()">保存</Button>
        </div>
    </div>
</template>
<script>
    import $_axios_$ from 'axios';
    import Vue from 'vue';

    export default {
        data() {
            return {
                $_passValidate_$: {
                    $_oldpass_$: "",
                    $_newpass1_$: "",
                    $_newpass2_$: "",
                },
                $_ruleValidate_$: {
                    $_oldpass_$: [
                        {required: true, type: 'string', message: '请输入原始密码', trigger: 'change'},
                        {min: 6, max: 18, message: '密码长度6-18位'}
                    ],
                    $_newpass1_$: [
                        {required: true, type: 'string', message: '请输入新密码', trigger: 'change'},
                        {min: 6, max: 18, message: '密码长度6-18位'}
                    ],
                    $_newpass2_$: [
                        {required: true, type: 'string', message: '请再次输入密码', trigger: 'change'},
                        {min: 6, max: 18, message: '密码长度6-18位'}
                    ]
                }
            }
        },
        mounted() {

        },
        methods: {
            $_save_$() {
                this.$refs.$_passValidate_$.validate((valid) => {
                    if (valid) {
                        //添加数据库

                        this.$Message.success('修改成功');
                        window.location.href = 'http://localhost:8082';
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            }
        }
    }
</script>