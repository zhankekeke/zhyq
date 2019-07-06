<style scoped>

</style>

<template>
    <Row>
        <Col span="8" style="margin-top: 20px;">
        <Form :model="formItem" :label-width="120">
            <FormItem label="公司名称">
                <Input v-model="formItem.name"></Input>
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
                    name: this.$root.inparams.$_DataName_$,
                },
                $_querycfg_$: {
                    mod: 'company',
                    params: {
                        cmd: '3',
                        name: '',
                    }
                }
            }
        },
        created() {
            this.$_fquery_$();
        },
        methods: {
            $_Submit_$() {
                let name = this.formItem.name;

                if(name.length < 2 || name.length > 20){
                    this.$Notice.error({
                        title: '公司名称需在2-20位之间',
                    });
                    return false;
                };

                this.$_querycfg_$.params.cmd = '2';
                this.$_querycfg_$.params.name = name;
                this.$_fquery_$();
            },
            $_receive_$(rsp){
                if (rsp.data.status == 0) {
                    if (rsp.data.cmd == '3') {
                        this.formItem.name = rsp.data.obj['name'];
                    } else {
                        let cmdstr = ['新增', '删除', '修改'][rsp.data.cmd];
                        let or = (rsp.data.status == '0');
                        let modal = or ? this.$Modal.success : this.$Modal.error;
                        modal({
                            title: '操作提示',
                            content: cmdstr + (or ? '成功' : '失败'),
                            onOk: () => {
                                this.$root.$_GoBack_$();
                            }
                        })
                    }
                } else if (rsp.data.status == -1) {
                    this.$Notice.error({
                        title: rsp.data.obj,
                    });
                }
            }

        }
    }
</script>