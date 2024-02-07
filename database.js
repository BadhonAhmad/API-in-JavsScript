const sqlite3 = require('sqlite3').verbose();
const dbName = 'myDatabase.db';
let db = new sqlite3.Database(dbName,(err) =>{
    if(err){
        console.error(err.message);
    }
    else{
        console.log("Connected to the database");
        db.run('CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(40),description VARCHAR(40))',(err) =>{
            if(err){
                console.error(err.message);
            }
            else{
                console.log("Table created");
            }
        })
    }
})
module.exports = db