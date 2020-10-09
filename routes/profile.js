const router = require('express').Router();
const Data = require('../models/data');

router.get('/profile', (req, res)=>{
    if (req.session.keys_data) {
        let usrname = req.session.keys_data['username'];
        let matricule = req.session.keys_data['matricule'];
        return res.render('profile', {failed_deleted: '', username:usrname, matricule:matricule});
    } else if (req.session.failed_deleted) {
        return res.render('profile', {failed_deleted: req.session.failed_deleted, username:usrname, matricule:matricule});
    }
    res.redirect(301, '/login');
});

router.get('/profile/delete', (req, res)=>{
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