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
                imageminPngquant({quality: '65-80'})
            ]
        }).then(files => {
            console.log('Images for optimisation: ' + files.length);
            for(let fileCounter = 0; fileCounter < files.length; fileCounter++) {
                imagemagick.resize(
                    {
                        srcData: files[fileCounter].data,
                        dstPath: files[fileCounter].path,
                        width: 300,
                        height: 230,
                        resizeStyle: 'aspectfill',
                        gravity: 'Center'
                    }, 
                    function() {
                        if(fileCounter == files.length - 1) {
                            console.log('Images are optimised');
                        }
                    }
                );
            }
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
            function() {
                fs.createReadStream(image.path).pipe(fs.createWriteStream(__dirname + config.productProductionImagesPath + image.originalname.replace('.jpg', '.png')));
                resizeImageSmall(image.path, image.originalname.replace('.jpg', '.png'));
            }
        );
    }
    // test does it work correctly. WIll be used after we upload image to create its small clone
    function resizeImageSmall(image, name) {
        imagemagick.resize(
            {
                srcPath: image,
                dstPath: __dirname + config.productProductionImagesSmallPath + name,
                width: 300,
                height: 230,
                resizeStyle: 'aspectfill',
                gravity: 'Center'
            }, 
            function(err) {
                if(err) {
                    console.log('[imageUpdator -> resizeImageSmall] Error on image upload: ' + err);
                } else {
                    console.log('Image: ' + __dirname + config.productProductionImagesSmallPath + name + ' is small now too. Needs optimisation');
                }
            }
        );
    }
    module.exports = {
        resizeImage: resizeImage,
        optimiseImages: optimiseImages,
        resizeImageSmall: resizeImageSmall
    };
}());