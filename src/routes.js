const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 
const controllers = require('./controllers');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/add', upload.single('image'), controllers.addMovie); 
router.post('/delete', controllers.deleteMovie);
router.post('/modify', upload.single("image"), controllers.modifyMovie);  

module.exports = router;