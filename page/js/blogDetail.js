const Detail = {
    data() {
        return {}
    },
    // name: "Detail",
    props: ['detail'],
    methods: {
        formatDate(time) {
            var date = new Date(parseInt(time));
            var year = date.getFullYear();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            return year + '-' + mon + '-' + day;
        },
    },
    computed: {
        taglist() {
            if (this.detail.tags) {
                return this.detail.tags.split(",")
            }
        }
    },
    template: `
     <div id="article" class="well"> 
     当前位置：<a href="#" title="蒋洪涛的个人博客">博客首页</a>&gt;&gt;
     <a href="#">#</a> &gt;&gt; 阅读正文
      <h2 class="blog-post-title"><a href="#">{{detail.title}}</a></h2>
      <p class="info">
      <span class="meat_span">
      分类: <a href="#" v-for="tag in taglist" rel="category tag">
      {{tag}}&nbsp&nbsp</a>
      </span>
      <span class="meat_span">发布于: {{formatDate(detail.ctime)}}</span>
       <span class="meat_span">浏览：{{detail.views}}</span>
        <span class="meat_span"><a href="#">没有评论</a></span> 
      </p>
        <hr>
        <div v-html='detail.content'>
        </div>
    </div>
     `
}
const commentContent = {
    name: "commentContent",
    props: ['commentList'],
    methods: {
        formatDate(time) {
            var date = new Date(parseInt(time));
            var year = date.getFullYear();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            return year + '-' + mon + '-' + day;
        },
    },
    template: `
    <div class="comment">
    <h3>关于这篇文章：目前有{{commentList.length}}条留言</h3>
    <div class="comment_list" v-for="comments in commentList">
        <div class="autor">
            <img src="./img/autor.jpg" alt="">
            <strong>{{comments.user_name}}</strong>
            <span>{{comments.parent==-1?'发表于':'回复: '+comments.parent_name}} {{formatDate(comments.ctime)}}<a href="#comment_form" @click="$emit('parent-comment',{id:comments.id,user_name:comments.user_name})">"回复"</a></span>
        </div>
        <p>{{comments.comments}}</p>
        <div class="children" style="display:none">
            <div class="comment_list">
            <div class="autor">
              <img src="./img/autor.jpg" alt="">
              <strong>{{comments.user_name}}</strong>
              <span>发表于 {{comments.ctime}}<a href="#comment_form" @click="$emit('parent-comment',{id:comments.id,user_name:comments.user_name})">"回复"</a></span>
           </div>
           <p>{{comments.comments}}</p>
                <div class="children">
                    <div class="comment_list">
                        <div class="autor">
                            <img src="./img/autor.jpg" alt="">
                            <strong>jht</strong>
                            <span>发表于 2020年10月21日 21:10<a href="#">"回复"</a></span>
                        </div>
                        <p>膜拜大佬，请问在github上有开源项目吗</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
}
const editComment = {
    data() {
        return {}
    },
    methods: {
        submitcomment() {
            this.$emit('submit-comment')
        },
    },
    props: ['svgCode'],
    name: "editComment",
    template: `
<div id="comment_form" class="comment_form">
    <h3>发表评论</h3>
    <div class="form_init" >
    <div><input id="parentId" name="parent" class="form_control" value=-1 placeholder="父级" type="hidden">
    <input id="parentName" name="parent_name" class="form_control" value=0 placeholder="父级" type="hidden">
    </div>
    <div><input id="user_name" name="user_name" class="form_control" type="text" placeholder="昵称">
    <input id="email" name="email" class="form_control" placeholder="邮箱回复信息" type="text"></div>
    <div><textarea id="comment" name="comment" class="form_control" cols="60" rows="5" placeholder="无意义内容不可恢复"></textarea></div>
    <div><input id="verification" name="verification" class="form_control" type="text" placeholder="验证码">
    <span @click="$emit('get-svg')" v-html="svgCode.code"></span></div>
    <div><button v-on:click="submitcomment" class="form_control">提交留言</button><button class="form_control">重写</button></div>
    </div>
</div>
    `
}

const blog_detail = new Vue({
    data: {
        blogid: null,
        svgCode: {
            text: null,
            code: null
        },
        detail: {},
        commentlist: []
    },
    components: {
        Detail,
        commentContent,
        editComment
    },
    methods: {
        init() {
            Promise.all([this.getBlog(), this.getCommentList(), this.getSvg()])
        },
        parentComment(params) {
            parentId.value = params.id;
            parentName.value = params.user_name;
        },
        getBlog() {
            return axios.get("/show/blogdetail", {
                params: { blogid: this.blogid }
            }).then(res => {
                this.detail = res.data[0]
            })
        },
        getCommentList() {
            return axios.get("/show/commentlist", {
                params: { blogid: this.blogid }
            }).then(res => {
                this.commentlist = res.data
            })
        },
        getSvg() {
            return axios.get("show/svg").then(res => {
                this.svgCode.code = res.data.data;
                this.svgCode.text = res.data.text
            })
        },
        submitComment() {
            if (verification.value != this.svgCode.text) {
                alert("验证码错误");
                return
            }
            let params = {};
            params.blogid = parseInt(this.blogid);
            params.user_name = user_name.value;
            params.email = email.value;
            params.comment = comment.value;
            params.parent = parseInt(parentId.value);
            params.parent_name = parentName.value
            axios.post("/edit/comment", params).then(res => {
                if (res.data.code == 200) {
                    alert('发表成功');
                    user_name.value = ""
                    email.value = ""
                    comment.value = ""
                    verification.value = ""
                    this.getSvg();
                    this.getCommentList();
                } else {
                    alert('发表失败')
                }

            }).catch(err => {
                alert('发表失败')
            })
        }
    },
    created() {
        let params = {};
        window.location.search.replace(/[?]/, '').split("@").forEach(ele => {
            params[ele.split("=")[0]] = ele.split("=")[1]
        });
        this.blogid = params.blogid;
        this.init();


    }
}).$mount("#blog_detail")