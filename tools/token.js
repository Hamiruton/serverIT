const jwt = require('jsonwebtoken');
const { resolveContent } = require('nodemailer/lib/shared');

function confirm_signup (data, cb) {
    const token_confirm_signup = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60*30),
        data: data
    }, process.env.SECRET);
    cb(token_confirm_signup);
}

function verify_signup(token) {
    return new Promise((resolve, reject)=>{
        try {
            jwt.verify(token, process.env.SECRET);
            resolve(jwt.verify(token, process.env.SECRET).data);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    confirm_signup: confirm_signup,
    verify_signup: verify_signup
};