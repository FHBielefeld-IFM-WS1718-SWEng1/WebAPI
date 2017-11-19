var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "api",
    password: "bPnEW7Ww3llnEJrC",
    database: "mydb"
});


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});