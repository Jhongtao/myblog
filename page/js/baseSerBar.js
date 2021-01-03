const serBar = {
    data() {
        return {
            serval: ''
        }
    },
    template: `
    <div class="serbar">
    <input  type="text" v-model="serval" placeholder="输入关键词查询">
    <button @click="$emit('nav-to',serval)">搜索</button>
    </div>
    `
};
const ser_bar = new Vue({
    data: {

    },
    components: {
        serBar
    },
    methods: {
        navTo(val) {
            location.href = "http://localhost:12306/index.html?serval=" + val
        }
    },
    created() {

    }

}).$mount("#top-bar")