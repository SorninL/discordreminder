/*
Require section
 */
const log = require('./advLogs.js');

const mysql = require('mysql');

/*
Config section
 */
const configSql = require('../../config/mysql.json');

/*
Mysql connection
 */
let connection = mysql.createConnection({
    host: configSql.host,
    user: configSql.user,
    password: configSql.password,
    database: configSql.database
});

/*
Discord client setup
 */


let checkAdmin = (prId, prSection) => {
    let pmCheckAdmin = new Promise((resolve, reject) => {
        connection.connect(err=>{
            if (!err) {
                connection.query('SELECT * FROM admin WHERE idDiscord = \'' + prId + '\' AND section = \'' + prSection + '\'', (err,rows, fields) => {
                    connection.end();
                    if (!err) {
                        if (!rows[0]) {
                            resolve(true);
                        } else {
                            reject('MYSQL request returned no result.');
                        }
                    } else {
                        reject('MYSQL request returned an error.');
                    }
                });
            } else {
                reject('Connection to MYSQL database failed');
            }
        });
    });
    pmCheckAdmin.then(
        result => {
            return result
        },
        error => {
            log.superLogs('error', error);
            return false
        }
    );
};

module.exports = checkAdmin;