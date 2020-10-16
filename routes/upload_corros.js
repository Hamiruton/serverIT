const router = require('express').Router();
const upload = require('../tools/upload');
const Corro = require('../models/data').Corro;
const path = require('path');
const fs = require('fs');

router.get('/upload', (req, res)=>{
    res.render('upload_corros');
});

router.post('/upload', upload.single('file'), (req, res)=>{
    const directory = req.body.matiere;
    const file = req.file;
    let name = file.filename;
    let oldpath = file.path;
    let newpath = path.join(__dirname, '..', 'static', 'corros', directory, name);
    fs.rename(oldpath, newpath, err=>{
        if (err) {
            res.send('Impossible d\'uploader le fichier');
            return new Error('Error !!!!!!!!!!!');
        }
        const corro = new Corro(name, directory);
        corro.register_corro().then(()=>{
            res.redirect(301,'/upload');
        });
    });
});

router.get('/corros/:matiere_corro', (req, res)=>{
    let seefiles = path.join(__dirname, '..', 'static', 'corros', req.params.matiere_corro);
    fs.readdir(seefiles, (err, values)=>{
        if (err) {
            new Error('There\'s an error that occurs');
            return console.error(err);
        }
        res.render('display_corro',
        {
            dir: req.params.matiere_corro,
            array_names:values
        });
    });
});


module.exports = router;