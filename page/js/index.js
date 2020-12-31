  const blogList = {
      data: function() {
          return {}
      },
      props: ["bloglist"],
      computed: {
          //   templist() {
          //       this.bloglist.push(this.bloglist[0], this.bloglist[0], this.bloglist[0])
          //       return this.bloglist
          //   }
      },
      template: `
    <ul>
    <li class="blog_list"  v-for="(blog ,index) in bloglist" :key="index">
    <div class="samestyle">
        <h2 class="title"><a v-bind:href="'./blog_detail.html?'+'blogid='+blog.id">{{blog.title}}</a></h2>
        <p v-html='blog.content'>                        
        </p>
    </div>
     <div class="fotter"><span>发布于{{blog.ctime}}|  浏览：{{blog.views}} | Tags:<a v-for="tags in blog.tags" v-bind:href="tags">{{tags}}</a></span></div>
    </li>
    </ul>`
  }
  const turnPage = {
      data: function() {
          return {
              //   page: 1
          }
      },
      methods: {
          clickTap(page) {
              blog_main.page = page;
              Object.assign(blog_main.pagelist, { curPage: page });
              //   blog_main.getBlogList();
              this.$emit("get-blog-list")
              document.body.scrollTop = document.documentElement.scrollTop = 0
          },
          //   clickNext(page){

          //   }
      },
      props: ['pagelist'],
      template: `
      <ul v-if="pagelist.isShow" class="pagination"><li @click="clickTap(pagelist.curPage-1)" v-if="pagelist.curPage!=1" class="prev">
      <span>上一页</span></li>
      <li @click="clickTap(num)" :class='{active:num==pagelist.curPage}' v-for="num in Math.ceil(pagelist.total/pagelist.size)"><span>{{num}}</span></li>
      <li @click="clickTap(pagelist.curPage+1)" class="next" v-if="pagelist.curPage!=Math.ceil(pagelist.total/pagelist.size)"><span>下一页</span></li><li class="last" @click="clickTap(Math.ceil(pagelist.total/pagelist.size))" v-if="pagelist.curPage!=Math.ceil(pagelist.total/pagelist.size)">
      <span>最后</span></li></ul>`
  }
  const blog_main = new Vue({
      data: {
          say: "Everyday  web technologys updated for everyone",
          pageSize: 5,
          page: 1,
          total: null,
          pagelist: {},
          bloglist: []
      },
      components: {
          blogList,
          turnPage
      },
      computed: {
          showTurnPage() {
              return this.total < this.pageSize ? false : true
          }
      },
      methods: {
          init() {
              Promise.all([this.getEveryDay(), this.getBlogList(), this.getBlogTotal()]).then(res => {
                  this.pagelist = {
                      total: this.total,
                      size: this.pageSize,
                      curPage: this.page,
                      isShow: this.showTurnPage
                  }
              })
          },
          getBlogList() {
              return axios.get("/show/bloglist", { params: { page: (this.page - 1) * this.pageSize, pageEnd: (this.page - 1) * this.pageSize + this.pageSize } }).then(res => {
                  this.bloglist = res.data
              })
          },
          getBlogTotal() {
              return axios.get("/show/blogtotal").then(res => {
                  this.total = res.data[0].total;
              })
          },
          getEveryDay() {
              return axios.get("/show/everyday").then(res => {
                  let data = res.data;
                  this.say = data.msg.content;
                  Promise.resolve('success')
              })
          }
      },
      created() {
          this.init()
      }
  }).$mount('#blog_main')