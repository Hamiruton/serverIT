const router = require('express').Router();
const Corro = require('../models/data').Corro;

router.get('/corros/:matiere_corro', (req, res)=>{
    Corro.get_corro(req.params.matiere_corro).then((array)=>{
        res.render('display_corro', {array_names:array});
    }).catch((err)=>{
        console.error(err);
        res.send('Inaccessible');
    });
    res.render('display_corro');
});

module.exports = router;