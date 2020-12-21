  const blogList = {
    data:function(){
        return {
        }
    },
    props:["bloglist"],
    computed:{
        templist(){
         this.bloglist.push(this.bloglist[0],this.bloglist[0],this.bloglist[0])
         return this.bloglist
        }
    },
    template:`
    <ul>
    <li class="blog_list"  v-for="(blog ,index) in templist" :key="index">
    <div class="samestyle">
        <h2 class="title"><a href="#">{{blog.title}}</a></h2>
        <p>
            {{blog.content}}                           
        </p>
    </div>
     <div class="fotter"><span>发布于{{blog.time}}|  浏览：{{blog.rtimes}} | Tags:<a v-for="tags in blog.tags" href="tags.link">{{tags.tag}}</a></span></div>
    </li>
    </ul>`
}
  const blog_main = new Vue({
    data:{
        say:"Everyday  web technologys updated for everyone",
         bloglist:[
             {
                 title:'Vue全栈开发',
                 content:'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。\n与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，\n不仅易于上手，还便于与第三方库或既有项目整合。另一方面， \n当与现代化的工具链以及各种支持类库结合使用时，\nVue 也完全能够为复杂的单页应用提供驱动。\nVue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，\nVue 被设计为可以自底向上逐层应用，专注于声明式渲染视图层，\n 结合丰富的生态系统和核心插件，致力于简单灵活快速驱动SPA、MPA等大小型应用。',
                 time:'2020-12-14',
                 rtimes:23,

                 tags:[{tag:'web',link:'#'},{tag:'js',link:'#'}]
             }
         ]
    },
    components:{
        blogList
    },
    created(){}
}).$mount('#blog_main')
  
