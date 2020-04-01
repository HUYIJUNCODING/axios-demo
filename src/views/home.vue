<template>
    <div class="home-coantainer">
       <!-- <button class="common-button" @click="handleSave" v-preventReClick>保 存</button> -->

       <button @click="this.handleClick">发送请求</button>
    </div>
</template>

<script>
import {get} from '../utils/request'
export default {
    props: {

    },
    components: {

    },
    data() {
        return {

        };
    },
    methods: {
        handleClick() {
            debugger
            get();
        }
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    mounted() {

    },
};
</script>

<style scoped>
    .home-coantainer {

    }
</style>
