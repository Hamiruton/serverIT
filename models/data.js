const con = require('./con');
const bcrypt = require('bcrypt');
const { resolveContent } = require('nodemailer/lib/shared');

class Data {
    constructor(value) {
        this.last_name = value.last_name;
        this.first_name = value.first_name;
        this.username = value.username;
        this.email = value.email;
        this.matricule = value.matricule;
        this.gender = value.gender;
        this.birthdate = value.birthdate;
        this.commune = value.commune;
        this.password = value.password;
    }

    signup(cb) {
        let sql = `INSERT INTO data(last_name, first_name, username, email, matricule, gender, birthdate, commune, password, signup_date) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        let insert = [this.last_name, this.first_name, this.username, this.email, this.matricule, this.gender, this.birthdate, this.commune, this.password, new Date()];

        con.query(sql, insert, (err, results)=>{
            if (err) {
                return console.error(err);
            }
            console.log('Data inserted');
            cb();
        });
    }

    static login(usr, mat, psw) {
        let sql = `SELECT * FROM data WHERE username = ? AND matricule = ? AND confirm_email = true`;
        let insert = [usr, mat];
        let value_callback = false;
        // Valeur de retour indiquant si l'une des données entrées est dans la BD
        return new Promise((resolve, reject)=>{
            con.query(sql, insert, (err, results)=>{
                //
                if (err) {
                    reject(err);
                }
                if(results[0]) {
                    bcrypt.compare(psw, results[0].password, (err, res)=>{
                        if (err) throw err;
                        if (res) {
                            resolve();
                        } else {
                            reject(value_callback);
                        }
                    });
                } else {
                    reject(value_callback);
                }
                //
            });
        });
    }

    static get_email(email, cb) {
        let sql = `SELECT * FROM data WHERE email = ?`;
        let value_callback = false;
        con.query(sql, [email], (err, results)=>{
            if (err) {return console.error(err);}
            if (results[0]) {
                value_callback = true;
                cb(value_callback);
            } else {
                cb(value_callback);
            }
        });
    }

    static modify_confirm_email(data, cb) {
        let sql = `UPDATE data SET confirm_email = true WHERE email = ?`;
        con.query(sql, [data], (err, results)=>{
            if (err) {return console.error(err);}
            cb();
        });
    }

    static change_psw(new_psw, token_email) {
        let sql = `UPDATE data SET password = ? WHERE email = ?`;
        let insert = [new_psw, token_email];
        return new Promise ((resolve, reject)=>{
            con.query(sql, insert, (err, results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static delete_account(username) {
        let sql = `DELETE FROM data WHERE username = ?`;
        return new Promise((resolve, reject)=>{
            con.query(sql, [username], (err, results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

}

class Corro {
    constructor(corro_name, matiere) {
        this.corro_name = corro_name;
        this.matiere = matiere;
    }

    register_corro() {
        let sql = `INSERT INTO corros(corro_name, matieres, register_date) VALUES(?,?,?)`;
        let insert = [this.corro_name, this.matiere, new Date()];
        return new Promise((resolve, reject)=>{
            con.query(sql, insert, (err,results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static get_corro(matiere) {
        let sql = `SELECT name WHERE matieres = ?`;
        return new Promise((resolve, reject)=>{
            con.query(sql, [matiere], (err, results)=>{
                if (err) {
                    reject(err);
                } else if(results[0]) {
                    const array_names = results[0];
                    resolve(array_names);
                }
            });
        });
    }

}

module.exports = {
    Data: Data,
    Corro: Corro
};