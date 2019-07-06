<style scoped>

</style>

<template>
    <Row>
        <Col span="8" style="margin-top: 20px;">
        <Form :model="formItem" :label-width="120">
            <FormItem label="新密码">
                <Input type="password" v-model="formItem.pass" placeholder="请您输入新密码"></Input>
            </FormItem>
            <FormItem label="密码确认">
                <Input type="password" v-model="formItem.notpass" placeholder="请您输入确认密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" v-on:click="$_Submit_$">立即提交</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>
</template>

<script>
    export default {
        data () {
            return {
                formItem: {
                    pass: '',
                    notpass:''
                },
                $_querycfg_$: {
                    mod: 'user',
                    params: {
                        cmd: '6',
                    }
                }
            }
        },
        methods: {
            $_Back_$() {
                this.$root.$_GoBack_$();
            },
            $_Submit_$() {
                let pass = this.formItem.pass;
                let notpass = this.formItem.notpass;

                if(pass.length < 6 || pass.length > 30){
                    this.$Notice.error({
                        title: '密码需在大于6位',
                    });
                    return false;
                };

                if(pass != notpass){
                    this.$Notice.error({
                        title: '密码与密码确认不一致',
                    });
                    return false;
                };

                this.$_querycfg_$.params.pass = pass;
                this.$_fquery_$();
            },
            $_receive_$(rsp){
                console.log(rsp)
                if(rsp.data.status == 0){
                    if(rsp.data.cmd){
                        let cmdstr='修改';
                        let or=(rsp.data.status == '0');
                        let modal=or?this.$Modal.success:this.$Modal.error;
                        let _this = this;
                        modal({
                            title: '操作提示',
                            content: cmdstr+(or ? '成功' : '失败'),
                            onOk: () => {
                                _this.formItem.pass = '';
                                _this.formItem.notpass = '';
                            }
                        })
                    }
                }else if(rsp.data.status == -1){
                    this.$Notice.error({
                        title: rsp.data.obj,
                    });
                }
            }

        }
    }
</script>