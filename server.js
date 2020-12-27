const express = require("express");
const path = require("path");
const globalCon = require(path.resolve(__dirname + '/config'));
const app = new express();
const { urlencoded, json, static } = require('express')
app.use(express.static(path.resolve(__dirname + globalCon.path)));
app.use('/', urlencoded({
    extended: true,
    type: 'application/x-www-form-urlencoded'
}))
app.use('/', json({
    type: 'application/json'
}))
app.use('/edit', require(path.resolve(__dirname + '/router/edit')))
app.use('/show', require(path.resolve(__dirname + '/router/show')))
app.listen(globalCon.port, function() {
    console.log("localhost:12306")
})