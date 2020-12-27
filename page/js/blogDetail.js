const Detail = {
    data() {
        return {}
    },
    props: ['detail'],
    template: `
     <div id="article" class="well"> 当前位置：<a href="#" title="蒋洪涛的个人博客">博客首页</a>&gt;&gt;<a href="#">#</a> &gt;&gt; 阅读正文
        <h2 class="blog-post-title"><a href="#">{{detail.title}}</a></h2>
        <p class="info">
        <span class="meat_span">
        分类: <a href="#" v-for="tag in detail.tags.split(',')" rel="category tag">{{tag}}&nbsp&nbsp</a>
        <span class="meat_span">发布于: {{detail.ctime}}</span> <span class="meat_span">浏览：{{detail.views}}</span> <span class="meat_span">
        <a href="#">没有评论</a></span> </p>
        <hr>
        <div v-html='detail.content'>
        </div>
    </div>
     `
}

const blog_detail = new Vue({
    data: {
        detail: {}
    },
    components: {
        Detail
    },
    created() {
        let params = {

        }
        window.location.search.replace(/[?]/, '').split("@").forEach(ele => {
            params[ele.split("=")[0]] = ele.split("=")[1]
        });
        axios.get("show/blogdetail", {
            params
        }).then(res => {
            this.detail = res.data[0]
        })

    }
}).$mount("#blog_detail")