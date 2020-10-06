const router = require('express').Router();

router.get('/', (req, res)=>{
    if (req.session.keys_data) {
        return res.render('homepage');
    }
    res.redirect(301, '/login');
});

module.exports = router;