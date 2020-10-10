const router = require('express').Router();
const upload = require('../tools/upload');
const Corro = require('../models/data').Corro;

router.get('/upload', (req, res)=>{
    res.render('upload_corros');
});

router.post('/upload', (req, res)=>{
    const {directory} = req.body;
    upload(req, directory).then((name)=>{
        const corro = new Corro(name, directory);
        corro.register_corro().then(()=>{
            res.redirect(301,'/upload');
        }).catch((err)=>{
            console.error(err);
            res.send('Impossible d\'uploader le fichier'); // Dans ce cas, le fichier n'a pas pu être enregistré dans la BD
        });
    }).catch((err)=>{
        console.error(err);
        res.send('Impossible d\'uploader le fichier'); //Dans ce cas, le fichier n'est même pas enregistré dans le dossier
    });
});


module.exports = router;