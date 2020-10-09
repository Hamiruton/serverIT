const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const upload = (req, directory) =>{
    let form = new formidable.IncomingForm();
    return new Promise((resolve, reject)=>{
        form.parse(req, (err, fields, files)=>{
            if (err) {
                reject(err);
            }
            let oldpath = files.fileupload.path;
            let newpath = path.join(__dirname, directory, files.fileupload.name);
            fs.rename(oldpath, newpath, err=>{
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
}

module.exports = upload;