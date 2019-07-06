<style scoped>

</style>
<template>
    <div class="MainContent">
        <Input v-model="value14" placeholder="Enter something..." clearable style="width: 200px"></Input>
    </div>
</template>
<script>
import $_axios_$ from 'axios';
import Vue from 'vue';
import apiUrl from '../libs/api';
export default {
    data() {
        return {
            value14: 'Hello World' 
        }
    },
    mounted() {
      
    },
    methods:{
      
    }
}
</script>