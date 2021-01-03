  const blogList = {
      data: function() {
          return {}
      },
      props: ["bloglist"],
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
     <div class="fotter"><span>发布于{{formatDate(blog.ctime)}}|  浏览：{{blog.views}} | Tags:<a v-for="tags in blog.tags" v-bind:href="tags">{{tags}}</a></span></div>
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
              if (!blog_main.tagid && !blog_main.serval) {
                  this.$emit("get-blog-list")
              } else if (blog_main.tagid) {
                  this.$emit("get-tag-blogs", blog_main.tagid)
              } else if (blog_main.serval) {
                  this.$emit("get-val-blog", blog_main.serval)
              }

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
          saydate: "",
          pageSize: 3,
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
              if (!this.tagid && !this.serval) {
                  Promise.all([this.getEveryDay(), this.getBlogList(), this.getBlogTotal()]).then(res => {
                      this.pagelist = {
                          total: this.total,
                          size: this.pageSize,
                          curPage: this.page,
                          isShow: this.showTurnPage
                      }
                  })
              } else if (this.tagid) {
                  Promise.all([this.getEveryDay(), this.getTagBlogs(this.tagid), this.gettagblogstotal(this.tagid)]).then(res => {
                      this.pagelist = {
                          total: this.total,
                          size: this.pageSize,
                          curPage: this.page,
                          isShow: this.showTurnPage
                      }
                  })
              } else if (this.serval) {
                  Promise.all([this.getEveryDay(), this.getValBlogs(this.serval), this.getValBlogsTotal(this.serval)]).then(res => {
                      this.pagelist = {
                          total: this.total,
                          size: this.pageSize,
                          curPage: this.page,
                          isShow: this.showTurnPage
                      }
                  })
              }

          },
          getValBlogs(value) {
              return axios.get("/show/getvalblogs", {
                  params: {
                      value,
                      page: (this.page - 1) * this.pageSize,
                      size: this.pageSize
                  }
              }).then(res => {
                  this.bloglist = res.data
              })
          },
          getValBlogsTotal(value) {
              return axios.get("/show/getvalblogstotal", {
                  params: {
                      value,
                  }
              }).then(res => {
                  this.total = res.data[0].total
              })
          },
          getTagBlogs(tagid) {
              return axios.get("/show/gettagblogs", {
                  params: {
                      tagid,
                      page: (this.page - 1) * this.pageSize,
                      size: this.pageSize
                  }
              }).then(res => {
                  this.bloglist = res.data
              })
          },
          gettagblogstotal(tagid) {
              return axios.get("/show/gettagblogstotal", {
                  params: { tagid, }
              }).then(res => this.total = res.data[0].count)
          },
          getBlogList() {
              return axios.get("/show/bloglist", { params: { page: (this.page - 1) * this.pageSize, size: this.pageSize } }).then(res => {
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
                  console.log(res)
                  this.say = res.data.content;
                  this.saydate = res.data.ctime
              })
          },
          formatDate(time) {
              var date = new Date(parseInt(time));
              var year = date.getFullYear();
              var mon = date.getMonth() + 1;
              var day = date.getDate();
              return year + '-' + mon + '-' + day;
          },
      },
      created() {
          let params = {};
          window.location.search.replace(/[?]/, '').split("@").forEach(ele => {
              params[ele.split("=")[0]] = ele.split("=")[1]
          });
          this.tagid = params.tagid;
          this.serval = params.serval;
          this.init()
      }
  }).$mount('#blog_main')