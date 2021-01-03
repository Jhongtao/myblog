const mysql = require('mysql');
const globalBase = require("../config")

function connectMysql() {
    const connect = mysql.createConnection({
        host: globalBase.baseUrl,
        port: "3306",
        user: "root",
        password: "root",
        database: "myblog"
    })
    return connect
}
module.exports = { connectMysql }