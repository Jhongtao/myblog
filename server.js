const express = require("express");
const app = new express();
app.use(express.static('./page'));
app.listen('12306', function () {
    console.log("localhost:12306")
})
