const mysql = require('mysql');

function connectMysql() {
    const connect = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "root",
        database: "myblog"
    })
    return connect
}
module.exports = { connectMysql }