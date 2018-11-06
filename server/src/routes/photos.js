import { Router } from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Multer from 'multer';


let router = Router();
let multer = Multer();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.get('/', (req, res) => {
    cloudinary.image();
});
router.get('/:id', (req, res) => {

});
router.post('/', multer.single('imageFile'), (req, res) => {
    
    // cloudinary.uploader.upload(req.url), (err, result) => {
    //     if(err){
    //         console.log("there was an error", err);
    //     }
    //     else{
    //         console.log(result);
    //         res.send(200)
    //     }
    // });
});
router.delete('/:id', (req, res) => {

});

module.exports = router;

