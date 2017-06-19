// docs: https://github.com/mysqljs/mysql
import mysql from 'mysql';

const config = {
    host: 'localhost',
    user: 'root', // user to login
    password: 'admin', // password of ^
    db: 'sample' // which db to use?
};

const db = mysql.createConnection(config);

db.connect(err => {
    if (err) {
        console.log('Error connecting to database');
    } else {
        console.log('Success in connecting to database');
    }
});

db.query('USE sample');

export default db;
