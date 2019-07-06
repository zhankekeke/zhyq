<!-- 搜索条 -->
<template>
    <Input type="text"
     @keyup.enter.native="$_search_$" 
     :value="value" 
     v-model="$_myval_$" 
     :placeholder="placeholder">
    <Button slot="append" 
    type="ghost" 
    shape="circle" 
    @click="$_search_$" 
    icon="ios-search"
    :key="index"
    >搜索</Button>
    </Input>
</template>
<script>
export default {
    props: ['value', 'placeholder'],
    data() {
        return {
            $_myval_$: this.value
        };
    },
    methods: {
        $_search_$($event) {
           /* this.$Notice.success({
                title: '搜索已委托给on-search:' + this.$_myval_$,
                desc: ''
            });*/
           this.$emit('on-search', this.$_myval_$);
        }
    },
    watch: {
        $_myval_$(val) {
            this.$emit('input', val);
        }
    },
}
</script>