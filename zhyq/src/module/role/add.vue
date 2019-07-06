<style scoped>

</style>

<template>
    <Row>
        <Col span="8" style="margin-top: 20px;">
        <Form :model="formItem" ref="formItem" :label-width="120" @submit.native.prevent :rules="ruleValidate">
            <FormItem label="角色名称" prop="name">
                <Input v-model="formItem.name" placeholder="请您输入角色的名称"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">立即提交</Button>
                <Button type="ghost" style="margin-left: 8px" v-on:click="$_Back_$">返回</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>
</template>

<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (this.formItem.name.length < 2 || this.formItem.name.length > 20) {
                    callback(new Error('名称需在2-20位之间'));
                }
                callback();
            };
            return {
                formItem: {
                    name: '',
                },
                ruleValidate: {
                    name: [
                        { required: true,validator: validateName, trigger: 'blur' },
                    ],
                },
                $_querycfg_$: {
                    mod: 'role',
                    params: {
                        cmd: '0',
                        name: '',
                    }
                }
            }
        },
        methods: {
            $_Back_$() {
                this.$root.$_GoBack_$();
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$_querycfg_$.params.name = this.formItem.name;
                        this.$_fquery_$();
                    }else{
                        this.$Notice.error({
                            title: '存在验证不通过项,请重新填写',
                        });
                        return false;
                    }
                })

            },
            $_receive_$(rsp){
                if(rsp.data.status == 0){
                    this.$root.$_GoBack_$();
                }else if(rsp.data.status == -1){
                    this.$Notice.error({
                        title: rsp.data.obj,
                    });
                }

            }

        }
    }
</script>