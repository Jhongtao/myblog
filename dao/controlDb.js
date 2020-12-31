const createConnect = require("./db")
const msg = require("../utils/resultApi")
const getNow = require("../utils/getNow").getNow
    //编辑-每日一句
function editEveryDay(content, callback) {
    let sql = `insert into everysay(content,ctime) values(?,?);`;
    const connect = createConnect.connectMysql();
    let param = [content, getNow()]
    connect.query(sql, param, function(err, result) {
        // console.log(result)
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
    })
    connect.end();
}
//展示-每日一句

function showEveryDay(callback) {
    let sql = "select content from everysay order by id desc"
    const connect = createConnect.connectMysql();
    connect.query(sql, function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result[0]))
        }
    })
    connect.end()
}
//发表博客
function publishBlog(params, callback) {
    let sql = "insert into blog(title,content,views,tags,ctime,utime) values(?,?,?,?,?,?)";
    let tags = params.tags;
    tags = tags.replace(/ /g, '').replace(/，/g, ',');
    let tagArr = tags.split(',');
    let param = [params.title, params.content, 0, tags, getNow(), getNow()];
    const connect = createConnect.connectMysql();
    connect.query(sql, param, function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
        let blogId = result.insertId
        tagArr.forEach(ele => {
            if (ele) {
                findTag(ele, blogId)
            }
        });
    });
    connect.end();

}
//tag标签操作查询和插入
function findTag(tag, blogId) {
    let sql = `select * from tags where tag=?`;
    const connect = createConnect.connectMysql();
    connect.query(sql, tag, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            if (!result[0]) {
                insertTag(tag, blogId)
            } else {
                insert_blogid_tagid(result[0].id, blogId)
            }
        }
    })
    connect.end();
}

function insertTag(tag, blogId) {
    let sql = `insert into tags(tag,ctime,utime) values(?,?,?)`
    const connect = createConnect.connectMysql();
    let param = [tag, getNow(), getNow()]
    connect.query(sql, param, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            insert_blogid_tagid(result.insertId, blogId)
        }
    })
    connect.end()
}

function insert_blogid_tagid(tagid, blogid) {
    let sql = `insert into tag_blog_mapping(blogid,tagid,ctime,utime) values(?,?,?,?)`;
    const connect = createConnect.connectMysql();
    let param = [blogid, tagid, getNow(), getNow()]
    connect.query(sql, param, function(err, result) {
        if (err) {
            console.log(err)
        } else {

        }
    })
    connect.end()
}
//展示文章列表
function showBlogList(params, callback) {
    let sql = 'select * from blog order by id desc limit ?,?';
    let param = [params.page, params.pageEnd];
    // console.log(params)
    const connect = createConnect.connectMysql();
    connect.query(sql, param, function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
    })
    connect.end()
}
//文章数量
function showBlogTotal(callback) {
    let sql = "select count(*) as total from blog"
    const connect = createConnect.connectMysql();
    connect.query(sql, function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
    })
    connect.end()
}
//文章详情
function blogDetail(id, callback) {
    let sql = "select * from blog where id = ?"
    const connect = createConnect.connectMysql();
    connect.query(sql, parseInt(id), function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
    })
    connect.end()
}
//发表评论
function publishComment(params, callback) {
    let sql = `insert into comments(blogid,parent,parent_name,user_name,comments,email,ctime,utime) values(?,?,?,?,?,?,?,?)`;
    const connect = createConnect.connectMysql();
    let paramArr = [params.blogid, params.parent, params.parent_name, params.user_name, params.comment, params.email, getNow(), getNow()]
    connect.query(sql, paramArr, function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
    })
    connect.end()
}
//展示评论
function showCommentList(blogid, callback) {
    let sql = `select * from comments where blogid = ? order by id desc`;
    const connect = createConnect.connectMysql();
    connect.query(sql, parseInt(blogid), function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
    })
    connect.end()
}
//获取标签
function showTags(callback) {
    let sql = `select * from tags`;
    const connect = createConnect.connectMysql();
    connect.query(sql, function(err, result) {
        if (err) {
            callback(msg.resultApi(403, err))
        } else {
            callback(msg.resultApi(200, result))
        }
    })
    connect.end()
}
module.exports = {
    editEveryDay,
    showEveryDay,
    publishBlog,
    showBlogList,
    showBlogTotal,
    blogDetail,
    publishComment,
    showCommentList,
    showTags
}