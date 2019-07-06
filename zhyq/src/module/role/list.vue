<style scoped>
.searchbar {
    width: 300px;
    float: right;
}
</style>
<template>
    <div class="lm">
        <Row style="margin:15px 0;">
            <Col span="12">
            <ButtonGroup>
                <Button icon="plus" v-on:click="$_Adddata_$">新增角色</Button>
                <Button icon="trash-b" :disabled="ids.length < 1" v-on:click="$_Deldata_$(ids)">删除</Button>
            </ButtonGroup>
            </Col>
        </Row>
        <DataTable @receive="$_receive_$" @on-select="$_GetIds_$" :isloading="loading" :havepage="true" ref="table" v-model="$_querycfg_$" :$_columns_$="$_columns_$"></DataTable>
    </div>
</template>
<script>
import DataTable from '../public/datatable';
import Searchbar from '../public/searchbar';
let config = true;
export default {
    components: { DataTable, Searchbar },
    data() {
        return {
            ids: [],
            loading: true,
            $_columns_$: [{
                    type: 'selection',
                    width: 60,
                    key: 'id',
                    align: 'center',
                }, {
                    title: '角色编号',
                    width: 120,
                    align: 'center',
                    key: 'id',
                    sortable: true
                }, {
                    title: '名称',
                    align: 'center',
                    sortable: true,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$_Editdata_$(params.row)
                                    }
                                }
                            }, params.row.name)
                        ]);
                    }

                },
                {
                    title: '创建时间',
                    width: 160,
                    align: 'center',
                    key: 'time',
                    sortable: true
                },
                {
                    title: '操作',
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$_Editdata_$(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$_Deldata_$(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            $_querycfg_$: {
                mod: 'role',
                params: {
                    cmd: '',
                    id: [],
                    sid: 1
                }
            }
        }
    },
    mounted() {
        this.$_tablequery_$();
    },
    methods: {
        $_tablequery_$() {
            this.$refs.table.$_fquery_$();
        },
        $_Adddata_$(row) {
            this.$root.$_Route_$('role', 'add', {}, '新增角色');
        },
        $_Editdata_$(row) {
            this.$root.$_Route_$('role', 'edit', { $_DataId_$: row.id, $_DataName_$: row.name }, '编辑角色');
        },
        $_Deldata_$(id) {
            this.$Modal.confirm({
                title: '操作提示',
                content: '您真的要删除这条数据吗?',
                onOk: () => {
                    this.$_querycfg_$.params.cmd = 1;
                    this.$_querycfg_$.params.id = id;
                    this.$refs.table.$_loading_$(true);
                    this.$_fquery_$();
                },
                onCancel: () => {}
            });
        },
        $_GetIds_$(obj) {
            var ids = [];
            for (var i = 0; i < obj.length; i++) {
                ids.push(obj[i].id);
            }
            this.ids = ids;
        },
        $_receive_$(rsp) {
            this.loading = false;
            if (rsp.data.status == 0) {
                if (rsp.data.cmd == 1) {
                    this.$refs.table.$_loading_$(false);
                    this.$refs.table.$_update_$(rsp.data);
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