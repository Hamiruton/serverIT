const router = require('express').Router();

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect(301, '/');
    });
});

module.exports = router;