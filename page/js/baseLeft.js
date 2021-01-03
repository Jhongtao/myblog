function randomColor() {
    let red = Math.random() * 255
    let blue = Math.random() * 255
    let yellow = Math.random() * 255
    return `rgb(${red},${blue},${yellow})`
}

function randomFontsize() {
    let size = Math.random() * 18 + 12 + 'px'
    return size
}
const randomTag = {
    props: ['taglist'],
    computed: {
        randomcolor() {
            return randomColor
        },
        randomsize() {
            return randomFontsize
        }
    },
    template: `<div>
    <a v-for="(item,index) in taglist" :key="index" :href="'./index.html?tagid='+item.tagid" v-bind:style="{color:randomcolor(),fontSize:randomsize()}">
    {{item.tag}}
    </a>
    </div>`
}
const hotList = {
    props: ['hotlist'],
    template: `
    <ul>
    <li v-for="(hot,index) in hotlist" :key="index">
    <a :href="'./blog_detail.html?blogid='+hot.blogid">{{hot.title}}</a>
    </li>
    </ul>
    `
}
const commentList = {
    props: ['commentlist'],
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
    <ul>
    <li v-for="(comment,index) in commentlist">
    <div>
    <h3>
        <span>{{comment.comments}}</span>
        <span>{{formatDate(comment.ctime)}}</span>
    </h3>
    <p>{{comment.content}}</p>
    </div>
    </li>
    </ul>
    `
}
const baseLef = new Vue({
    el: '#base_left',
    data: {
        taglist: [],
        hotlist: [],
        commentlist: []
    },
    components: {
        randomTag,
        hotList,
        commentList
    },
    methods: {
        getTags() {
            return axios.get("/show/tags").then(res => {
                this.taglist = res.data.map(ele => {
                    return {
                        tag: ele.tag,
                        tagid: ele.id

                    }
                }).sort(() => Math.random() - 0.5)
            })
        },
        getTitles() {
            return axios.get("/show/hotlist", {
                params: {
                    page: 0,
                    size: 5
                }
            }).then(res => {
                this.hotlist = res.data
            })
        },
        getComments() {
            return axios.get("/show/commentlist", {
                params: {
                    blogid: -2
                }
            }).then(res => {
                this.commentlist = res.data.reverse().splice(0, 5)
            })
        },
        init() {
            Promise.all([this.getTags(), this.getTitles(), this.getComments()])
        }
    },
    created() {
        this.init()
    }
})