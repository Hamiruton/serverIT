const router = require('express').Router();
const Data = require('../models/data');

router.get('/profile', (req, res)=>{
    if (req.session.keys_data) {
        return res.render('profile', {failed_deleted: ''});
    } else if (req.session.failed_deleted) {
        return res.render('profile', {failed_deleted: req.session.failed_deleted});
    }
    res.redirect(301, '/login');
});

router.post('/profile/delete', (req, res)=>{
    let username = req.session.keys_data['username'];
    Data.delete_account(username).then(()=>{
        req.session.destroy(()=>{
            res.redirect(301, '/');
        });
    }).catch(err=>{
        console.error(err);
        req.session.failed_deleted = 'La suppression n\'est pas possible';
        res.redirect(301, '/profile');
    });
});

module.exports = router;