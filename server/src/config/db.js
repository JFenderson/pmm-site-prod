import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

// let pool = mysql.createPool({
//     connectionLimit: 10,
//     host: process.env.CLEARDB_HOST,
//     user: process.env.CLEARDB_USER,
//     password: process.env.CLEARDB_PASSWORD,
//     database:process.env.CLEARDB_DATABASE,
//     insecureAuth: true
// });
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "fenderson6",
    database: "pmm_picnic"
});

function executeQuery(sql, args = []) {
    return getConnection()
    .then((connection) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, args, (err, result) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
}

function callProcedure(procedureName, args = []) {
    let placeholders = generatePlaceholders(args);
    let callString = `CALL ${procedureName}(${placeholders});`; 
}

function rows(procedureName, args = []) {
    return callProcedure(procedureName, args)
    .then((resultsets) => {
        return resultsets[0];
    });
}

function row(procedureName, args = []) {
    return callProcedure(procedureName, args)
    .then((resultsets) => {
        return resultsets[0][0];
    });
}

function empty(procedureName, args = []) {
    return callProcedure(procedureName, args)
    .then(() => {
        return;
    });
}

function generatePlaceholders(args = []) {
    let placeholders = '';
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (i === args.length - 1) { // if we are on the last argument in the array
                placeholders += '?';
            } else {
                placeholders += '?,';
            }
        }
    }
    return placeholders;
}

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
                console.log('mysql connected!');
            }
        });
    });
}

export { row, rows, empty, executeQuery, generatePlaceholders };