# lwip-jpeg-autorotate [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Read exif data and auto rotate jpeg images lwip library.


lwip-jpeg-autorate try to read jpeg exif information and auto-rotate / auto-flip image according to "Orientation" tag.

It fails silently if EXIF data is not fount or image is not jpeg.

## Install

```sh
$ npm install --save lwip-jpeg-autorotate
```

## Usage

```js
var lwipJpegAutorotate = require('lwip-jpeg-autorotate');

lwipJpegAutorotate.autorotate(inputpath, outputpath).then(function (res) {
    // ok

}, function (err) {
    // unexpected error

});


```



## Development

### Logs

Simple logs messages are managed using https://github.com/visionmedia/debug

To display them, use env variable :

DEBUG=lwip-jpeg-autorotate

### Generator

Project generated from https://github.com/yeoman/generator-node.

### Tests

Tests are run by [http://mochajs.org](mocha) test framework and [http://chaijs.com](chai) assertion library.

Tests images are provided by https://github.com/recurser/exif-orientation-examples under MIT licence.

To run tests + coverage:

    npm test
    
or
    
    gulp

To run tests only

    gulp test

To enable logs:

    DEBUG=lwip-jpeg-autorotate gulp test

## License

Apache-2.0 © [Nicolas Toublanc]()


[npm-image]: https://badge.fury.io/js/lwip-jpeg-autorotate.svg
[npm-url]: https://npmjs.org/package/lwip-jpeg-autorotate
[travis-image]: https://travis-ci.org/toubiweb/lwip-jpeg-autorotate.svg?branch=master
[travis-url]: https://travis-ci.org/toubiweb/lwip-jpeg-autorotate
[daviddm-image]: https://david-dm.org/toubiweb/lwip-jpeg-autorotate.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/toubiweb/lwip-jpeg-autorotate
[coveralls-image]: https://coveralls.io/repos/toubiweb/lwip-jpeg-autorotate/badge.svg
[coveralls-url]: https://coveralls.io/r/toubiweb/lwip-jpeg-autorotate
