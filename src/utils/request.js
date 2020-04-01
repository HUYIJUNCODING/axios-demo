import axios from '../axios'

const baseUrl = 'http://gt.test.ledianyun.com/api'
export function get() {
  // 为给定 ID 的 user 创建请求
  axios
    .get(`${baseUrl}/datacenter/general/user?ID=12345`)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
