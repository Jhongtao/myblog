const mysql = require('mysql');

function connectMysql() {
    const connect = mysql.createConnection({
        host: "192.168.1.144",
        port: "3306",
        user: "root",
        password: "root",
        database: "myblog"
    })
    return connect
}
module.exports = { connectMysql }