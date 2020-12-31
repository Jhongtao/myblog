const express = require("express");
const router = express.Router();
const svgCaptcha = require("svg-captcha");
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
router.get("/svg", function(req, res) {
    let svg = svgCaptcha.create({
        size: 5,
        width: 100,
        height: 45,
        color: true
    });
    res.status(200).send(svg)
})
router.get("/commentlist", function(req, res) {
    let id = req.query.blogid;
    controlDb.showCommentList(id, function(result) {
        res.status(result.code).send(result.msg)
    })
})
router.get("/tags", function(req, res) {
    controlDb.showTags(function(result) {
        res.status(result.code).send(result.msg)
    })
})
module.exports = router