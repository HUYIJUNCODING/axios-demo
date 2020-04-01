<template>
  <div class="home-coantainer">
    <!-- <button class="common-button" @click="handleSave" v-preventReClick>保 存</button> -->

    <button @click="this.handleClick">发送请求</button>
  </div>
</template>

<script>
import { get } from "../utils/request";
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    handleClick() {
      const p1 = new Promise(function(resolve, reject) {
         resolve(1)
      });

      const p2 = new Promise(function(resolve, reject) {
          console.log(p1)
        resolve(p1);
      });
      console.log(3)
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
.home-coantainer {
}
</style>
