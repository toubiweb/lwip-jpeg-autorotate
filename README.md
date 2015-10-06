# lwip-jpeg-autorotate
> Rotate images automatically based on EXIF orientation tag.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

- Reads the EXIF orientation tag from jpeg file
- Automatically rotates/flips using [lwip](https://github.com/EyalAr/lwip)
- Fails silently when EXIF data is not present or image is not a jpeg

## Install

```sh
$ npm install lwip-jpeg-autorotate --save
```

## Usage

```js
var lwipJpegAutorotate = require('lwip-jpeg-autorotate');

lwipJpegAutorotate.autorotate(inputpath, outputpath).then(function (res) {
  // ok
  
  console.log(res);
/* =>  
{ 
    inputpath: '/home/lwip-jpeg-autorotate/test/images/Landscape_2.jpg',
    outputpath: '/home/lwip-jpeg-autorotate/test/images/Landscape_2.output.jpg',
    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 07 b8 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 07 a8 61 70 70 6c 02 20 00 00 ... >,
    operations: { mirror: { axes: 'x' } },
    extension: 'jpg',
    image: { __lwip: {}, __locked: false, __trans: false } 
}
*/

}, function (err) {
  // unexpected error
});
```

## Alternative

The following library is doing the same job: https://github.com/vonheim/node-auto-rotate

## Development

### Logs

Simple log messages are managed using [debugging utility](https://github.com/visionmedia/debug)

To display them, set env variable:

`DEBUG=lwip-jpeg-autorotate`

### Tests

Tests are run by [Mocha](http://mochajs.org/) test framework and [Chai](http://chaijs.com/) assertion library.

Test images are provided by [EXIF Orientation-flag example images](https://github.com/recurser/exif-orientation-examples) under MIT licence.

To run tests + coverage:

    npm test
    
or
    
    gulp

To run tests only

    gulp test

To enable logs:

    DEBUG=lwip-jpeg-autorotate gulp test

### Generator

Project originally generated with [Yeoman Node Generator](https://github.com/yeoman/generator-node).

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
