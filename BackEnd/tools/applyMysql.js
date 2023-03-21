let mysql = require('mysql');

const pool = mysql.createPool({
    host     :  '127.0.0.1',
    user     :  'root',
    password :  'root',
    database :  'rms'
  })
class RMS {
    constructor(){

    }

    async dbop (sql) {
        return await this.dbOp(sql);
    }


    async dbOp(sql, sqlParam) {
        var connection = null;
        
            connection = mysql.createConnection({
                host     :  '127.0.0.1',
                user     :  'root',
                password :  'root',
                database :  'rms'
              })
        
        
        return await this.dbOp1(sql, sqlParam, connection);
    }

    async dbOp1(sql, sqlParam, connection) { 
        var promise = new Promise((resolve, reject) => {
            connection.query(sql, sqlParam, (err, result) => {
                if (err) {
                    console.error('[dbOp1 error] - ' + err.message);
                    //connection.destroy();
                    reject(err);
                } else {
                    //connection.destroy();
                    resolve(result);
                }

                //connection.end();
                connection.destroy();
                
            });
        });

        return promise;
    }
}

module.exports = RMS;