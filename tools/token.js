const jwt = require('jsonwebtoken');

function confirm_signup (data, cb) {
    const token_confirm_signup = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60*30),
        data: data
    }, 'iloveyou2002');
    cb(token_confirm_signup);
}

async function verify_signup(token, cb) {
    try {
        let data = await jwt.verify(token, 'iloveyou2002').data;
        cb(data);
    } catch (error) {
        cb(error);
    }
}

module.exports = {
    confirm_signup: confirm_signup,
    verify_signup: verify_signup
};