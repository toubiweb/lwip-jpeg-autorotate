// test.js
import test from 'ava'


import chai from 'chai';
import path from 'path';
import Q from 'q';
import lwipJpegAutorotate from '../lib';

var expect = chai.expect;
var assert = chai.assert

test('Do not rotate PNG', async t => {
  return doTest(1, '.png').then(res => {
    t.deepEqual(res.operations, {});
  });
})

test('Do not rotate JPG with Orientation 1', async t => {
  return doTest(1, '.jpg').then(res => {
    t.deepEqual(res.operations, {});
  });
})

test('Rotate JPG with Orientation 2', async t => {
  return doTest(2, '.jpg').then(res => {
    t.deepEqual(res.operations, {
      mirror: {
        axes: 'x'
      }
    });
  });
})

test('Rotate JPG with Orientation 3', async t => {
  return doTest(3, '.jpg').then(res => {
    t.deepEqual(res.operations, {
      rotate: {
        angle: 180
      }
    });
  });
})

test('Rotate JPG with Orientation 4', async t => {
  return doTest(4, '.jpg').then(res => {
    t.deepEqual(res.operations, {
      mirror: {
        axes: 'y'
      }
    });
  });
})

test('Rotate JPG with Orientation 5', async t => {
  return doTest(5, '.jpg').then(res => {
    t.deepEqual(res.operations, {
      mirror: {
        axes: 'x'
      },
      rotate: {
        angle: 90
      }
    });
  });
})

test('Rotate JPG with Orientation 6', async t => {
  return doTest(6, '.jpg').then(res => {
    t.deepEqual(res.operations, {
      rotate: {
        angle: 90
      }
    });
  });
})

test('Rotate JPG with Orientation 7', async t => {
  return doTest(7, '.jpg').then(res => {
    t.deepEqual(res.operations, {
      mirror: {
        axes: 'x'
      },
      rotate: {
        angle: 270
      }
    });
  });
})

test('Rotate JPG with Orientation 8', async t => {
  return doTest(8, '.jpg').then(res => {
    t.deepEqual(res.operations, {
      rotate: {
        angle: 270
      }
    });
  });
})

function doTest(index, ext) {

  console.log('doTest');

  var inputpath = path.resolve(__dirname, './images/Landscape_' + index + ext);
  var outputpath = path.resolve(__dirname, './images/Landscape_' + index + '.output' + ext);

  console.log('lwipJpegAutorotate', lwipJpegAutorotate);

  var promise = lwipJpegAutorotate.autorotate(inputpath, outputpath);

  promise.then(function (res) {

    expect(res).to.not.be.undefined;
    expect(res.operations).to.not.be.undefined;

  }, function (err) {
    assert.fail('Unexpected error during auto-rotation.');
  });

  promise.done();

  return promise;
}
