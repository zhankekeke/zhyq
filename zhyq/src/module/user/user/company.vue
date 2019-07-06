<template>
    <div class="company-manabge">
        企业名称：&nbsp;
        <Input v-model="searchText" placeholder="" style="width: 300px"></Input>
        <Button type="primary" @click="handleSearch">搜索</Button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: ''
            }
        },
        methods: {
          handleSearch () {
           
          }
        }
    }
</script>

<style>
    
</style>