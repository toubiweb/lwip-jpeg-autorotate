'use strict';

import fs from 'fs';
import path from 'path';
import Q from 'q';
import exifParser from 'exif-parser';
import lwip from 'lwip';
import mkdirp from 'mkdirp';

import debug from 'debug';

var log = debug('lwip-jpeg-autorotate');

export default {
    autorotate: autorotate
};

function autorotate(inputpath, outputpath) {

    var res = {
        inputpath: inputpath,
        outputpath: outputpath
    };

    return Q.Promise(function (resolve, reject, notify) {

        log('Auto-rotate file "%s".', inputpath);

        Q.nfcall(fs.readFile, inputpath).then(function (buffer) {

            res.buffer = buffer;

            getOperationsFromExif(buffer).then(function (operations) {

                res.operations = operations;

                if (operations && (operations.rotate || operations.mirror)) {
                    log('Operations:', operations);

                    res.extension = path.extname(inputpath).substring(1);
                    var promise = doOperations(res);
                    promise.done();
                    resolve(promise);
                } else {
                    // no modification: copy to output path
                    var promise = copyFile(res);
                    promise.done();
                    resolve(promise);
                }
            }, function (err) {
                console.error(err);
                reject(err);
            }).done();

        }, function (err) {
            console.error(err);
            reject(err);
        });

    });

}

function getOperationsFromExif(buffer) {

    return Q.Promise(function (resolve, reject, notify) {

        var operations = {};

        var parser = exifParser.create(buffer);

        try {
            var exifData = parser.parse();

            if (exifData && exifData.tags && exifData.tags.Orientation) {

                switch (exifData.tags.Orientation) {

                case 1:
                    // top-left
                    break;
                case 2:
                    // top-right
                    operations.mirror = {
                        axes: 'x'
                    };
                    break;
                case 3:
                    // bottom-right
                    operations.rotate = {
                        angle: 180
                    };
                    break;
                case 4:
                    // bottom-left
                    operations.mirror = {
                        axes: 'y'
                    };
                    break;
                case 5:
                    // left-top
                    operations = {
                        mirror: {
                            axes: 'x'
                        },
                        rotate: {
                            angle: 90
                        }
                    };
                    break;
                case 6:
                    // right-top
                    operations.rotate = {
                        angle: 90
                    };
                    break;
                case 7:
                    // right-bottom
                    operations = {
                        mirror: {
                            axes: 'x'
                        },
                        rotate: {
                            angle: 270
                        }
                    };
                    break;
                case 8:
                    // left-bottom
                    operations.rotate = {
                        angle: 270
                    };
                    break;
                default:
                    log('Unknown orientation "%s"', exifData.tags.Orientation)
                }

            }

        } catch (err) {
            // no EXIF data
        }

        resolve(operations);
    });
}


function doOperations(res) {

    var buffer = res.buffer;
    var extension = res.extension;
    var operations = res.operations;
    var outputpath = res.outputpath;

    return Q.Promise(function (resolve, reject, notify) {

        log('Apply operations %s for extension "%s" to "%s".', operations, extension, outputpath);

        // open buffer
        lwip.open(buffer, extension, function (err, image) {

            res.image = image;

            if (err) {
                console.error(err);
                return reject(err);
            }

            log('File opened: rotate...');


            rotate(res).then(function () {

                mirror(res).then(function () {

                    log('Rotation & mirror done: writing output file...');

                    resolve(saveImage(res));

                }, function (err) {
                    console.error(err);
                    return reject(err);
                });

            }, function (err) {
                console.error(err);
                return reject(err);
            });


        });

    });
}

function rotate(res) {

    var image = res.image;
    var operations = res.operations;

    return Q.Promise(function (resolve, reject, notify) {

        if (operations.rotate && operations.rotate.angle) {

            // rotate image
            image.rotate(operations.rotate.angle, function (err, image) {

                if (err) {
                    console.error(err);
                    return reject(err);
                }

                log('Rotation applied successfully.');
                resolve(res);

            });
        } else {
            resolve(res);
        }

    });

}

function mirror(res) {

    var image = res.image;
    var operations = res.operations;

    return Q.Promise(function (resolve, reject, notify) {

        if (operations.mirror && operations.mirror.axes) {

            // rotate image
            image.mirror(operations.mirror.axes, function (err, image) {

                if (err) {
                    console.error(err);
                    return reject(err);
                }

                log('Mirror applied successfully.');
                resolve(res);

            });
        } else {
            resolve(res);
        }

    });

}

function saveImage(res) {

    var image = res.image;
    var outputpath = res.outputpath;

    return Q.Promise(function (resolve, reject, notify) {

        if (outputpath) {

            outputpath = path.normalize(outputpath);

            var outputDir = path.dirname(outputpath)

            // ensure that directory exists
            mkdirp(outputDir, function (err) {

                if (err) {
                    console.error(err);
                    reject(new Error(err));
                } else {

                    image.writeFile(outputpath, function (err, image) {
                        if (err) {
                            console.error(err);
                            return reject(err);
                        }

                        resolve(res);
                    });
                }

            });

        } else {
            resolve(res);
        }

    });

}

function copyFile(res) {

    var inputpath = res.inputpath;
    var outputpath = res.outputpath;

    return Q.Promise(function (resolve, reject, notify) {

        if (outputpath) {

            outputpath = path.normalize(outputpath);

            var outputDir = path.dirname(outputpath)

            log('Copy "%s" to "%s"', inputpath, outputpath);

            // ensure that directory exists
            mkdirp(outputDir, function (err) {

                if (err) {
                    console.error(err);
                    reject(new Error(err));
                } else {

                    // copy file
                    fs.createReadStream(inputpath).pipe(fs.createWriteStream(outputpath)).on('close', function () {
                        console.info('Image "%s" has been copied to "%s".', inputpath, outputpath);
                        resolve(res);
                    });
                }

            });

        } else {
            resolve(res);
        }

    });

}