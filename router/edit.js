const express = require('express');
const router = express.Router();
const controlDb = require("../dao/controlDb")

router.post('/everyday', function(req, res) {
    // console.log(req.body);
    // req.on('data', function(data) {
    //         console.log(data)
    //     })
    controlDb.editEveryDay(req.body.content, function(result) {
        res.status(result.code).send(result)
    })
})
router.post('/blog', function(req, res) {
    controlDb.publishBlog(req.body, function(result) {
        res.status(result.code).send(result)
    })
})
router.post("/comment", function(req, res) {
    controlDb.publishComment(req.body, function(result) {
        res.status(result.code).send(result)
    })
})
module.exports = router