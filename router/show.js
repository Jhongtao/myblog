const express = require("express");
const router = express.Router();
const controlDb = require('../dao/controlDb')

router.get("/everyday", function(req, res) {
    controlDb.showEveryDay(function(result) {
        res.status(result.code).send(result)
    })
})
router.get("/bloglist", function(req, res) {
    let params = req.query
    controlDb.showBlogList({ page: parseInt(params.page), pageEnd: parseInt(params.pageEnd) }, function(result) {
        var bloglist = result.msg;
        bloglist = bloglist.filter(function(ele) {
            return ele.content = ele.content.replace(/<[^>]*>/g, '').substr(0, 200) + '...'
        })
        res.status(result.code).send(bloglist)
    })
})
router.get("/blogtotal", function(req, res) {
    controlDb.showBlogTotal(function(result) {
        res.status(result.code).send(result.msg)
    })
})
router.get("/blogdetail", function(req, res) {
    let id = req.query.blogid;
    controlDb.blogDetail(id, function(result) {
        res.status(result.code).send(result.msg)
    })
})
module.exports = router