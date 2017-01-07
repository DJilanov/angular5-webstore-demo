/**
 * @imageUpdator Used to update images
 */
(function() {
    const fs = require('fs');
    const config = require('./config').getConfig();
    const imagemagick = require('imagemagick');
    const imagemin = require('imagemin');
    const imageminMozjpeg = require('imagemin-mozjpeg');
    const imageminPngquant = require('imagemin-pngquant');
    
    function optimiseImages() {
        imagemin([__dirname + '/../img/*.{jpg,png}'], __dirname + '/../img/small/', {
            plugins: [
                imageminMozjpeg({targa: true}),
                imageminPngquant({quality: '65-80'})
            ]
        }).then(files => {
            console.log(files);
        });
    }

    function resizeImage(image) {
        imagemagick.resize(
            {
                srcPath: image.path,
                dstPath: image.path,
                width: 1280,
                height: 720,
                resizeStyle: 'aspectfill',
                gravity: 'Center',
                // it doesnt want to work correctly
                quality: 40
            }, 
            // todo: It saves the original image not the one we just resized....
            fs.createReadStream(image.path).pipe(fs.createWriteStream(__dirname + config.productProductionImagesPath + image.originalname.replace('.jpg', '.png')))
            // todo: Fire optimise image algorithm for the image we just created
        );
    }
    module.exports = {
        resizeImage: resizeImage,
        optimiseImages: optimiseImages
    };
}());