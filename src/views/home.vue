<template>
  <div class="home-coantainer">
    <!-- <button class="common-button" @click="handleSave" v-preventReClick>保 存</button> -->

    <button @click="this.handleClick">发送请求</button>
    <div></div>
  </div>
</template>

<script>
import p from '../utils'
import { get } from "../utils/request";
var proxy1 = null;
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    handleClick() {
      proxy1[0].count = 2;
    },

    reactive(data) {
      if (data instanceof Array) {
        data.forEach(item => {
          if (typeof item === "object") {
            reactive(item);
          }
        });
      } else if (typeof data === "object") {
        Object.keys(data).forEach(key => {
          if (typeof data[key] === "object") {
            reactive(data[key]);
          }
        });
      }

      new Proxy(data, {
        set(target, key, value) {
          console.log(target, key, value, "------");
          Reflect.set(target, key, value);
        },
        get(target, key) {
          console.log(target, key);
          if (target) return Reflect.get(target, key);
        }
      });
    }
  },
  computed: {},
  watch: {},
  mounted() {
    const list = [
      {
        status: false,
        count: 0,
        product: [
          {
            status: false,
            count: 0
          }
        ]
      }
    ];
  }
};
</script>

<style scoped>
.home-coantainer {

  
}
</style>
