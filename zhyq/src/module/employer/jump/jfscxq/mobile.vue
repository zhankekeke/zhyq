<style scoped>
.lm {
    color: red;
    font-size: 20px;
}
</style>
<template>
    <div class="lm" ref="aa">
        手机版 控制器变量绑定:{{yjy}}
    </div>
</template>

<script>
import controler from './controler.js';
export default {
    mixins: [controler]
}
</script>