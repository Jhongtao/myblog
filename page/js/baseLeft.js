
function randomColor(){
    let red=Math.random()*255
    let blue=Math.random()*255
    let yellow=Math.random()*255
    return `rgb(${red},${blue},${yellow})`
}
function randomFontsize(){
    let size=Math.random()*18+12+'px'
    return size
}
const randomTag = {
    props:['taglist'],
    computed:{
        randomcolor(){
            return randomColor
        },
        randomsize(){
            return randomFontsize
        }
    },
    template:`<div>
    <a v-for="(tag,index) in taglist" :key="index" href="#" v-bind:style="{color:randomcolor(),fontSize:randomsize()}">
    {{tag}}
    </a>
    </div>`
}
const hotList = {
    props:['hotlist'],
    template:`
    <ul>
    <li v-for="(hot,index) in hotlist" :key="index">
    <a href="#">{{hot}}</a>
    </li>
    </ul>
    `
}
const commentList = {
    props:['commentlist'],
    template:`
    <ul>
    <li v-for="(comment,index) in commentlist">
    <div>
    <h3>
        <span>{{comment.title}}</span>
        <span>{{comment.time}}</span>
    </h3>
    <p>{{comment.content}}</p>
    </div>
    </li>
    </ul>
    `
}
const baseLef = new Vue({
    el:'#base_left',
    data:{
        taglist:['Java','Web前端','PHP','node','phyton','Javascript','Vue-cli','Vue3.0','react','微信小程序','H5页面','移动端开发','uni-app','phyton','Javascript','Vue-cli','Vue3.0','react','微信小程序','H5页面','移动端开发','uni-app'],
        hotlist:['Java','Web前端','PHP','node','phyton','Javascript','Vue-cli','Vue3.0','react','微信小程序'],
        commentlist:[{
            title:'啊啊啊',
            time:'2天前',
            content:'nice 点个赞'
        },
        {
            title:'啊啊啊',
            time:'2天前',
            content:'nice 点个赞'
        },
        {
            title:'啊啊啊',
            time:'2天前',
            content:'nice 点个赞'
        },
        {
            title:'啊啊啊',
            time:'2天前',
            content:'nice 点个赞'
        }

    ]
    },
    components:{
        randomTag,
        hotList,
        commentList
    }
})