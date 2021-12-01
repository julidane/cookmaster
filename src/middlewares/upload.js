const multer = require('multer');

const storage = multer.diskStorage({    
    destination: (req, file, callback) => { console.log(file); callback(null, 'uploads/'); },
    filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },   

});

module.exports = multer({ storage });