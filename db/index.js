var sql = require('mysql');
var config = require(`../config.json`);

//Create the container for export
var cont = {};

var con = sql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : config.db_password,
    database : config.db
});


//Get the newest article in the specified db
function getNewest(callback) {
    con.getConnection(function(err, connection) {
        if(err) { 
        console.log(err); 
        callback(true); 
        return; 
        }

        var sql = `SELECT content, title, upload_time FROM \`${config.db_table}\` ORDER BY upload_time DESC`;
        connection.query(sql, function(err, results) {
            connection.release()
            if(err) { 
                console.log(err); 
                callback(true); 
                return; 
            }
            callback(false, results);
        });
    });
};

cont.getNewest = getNewest;

module.exports = cont;