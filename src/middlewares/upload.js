const multer = require('multer');
const path = require('path');

const pathUploads = path.join(__dirname, '../', 'uploads');

const storage = multer.diskStorage({    
    // destination: (req, file, callback) => { console.log(file); callback(null, 'uploads/'); },
    destination: (req, file, callback) => { console.log(file); callback(null, pathUploads); },
    // destination: (req, file, callback) => { callback(null,'../src/uploads') },
    filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },   

});

module.exports = multer({ storage });