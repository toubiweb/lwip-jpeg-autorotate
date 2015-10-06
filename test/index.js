import chai from 'chai';
import path from 'path';
import Q from 'q';
import lwipJpegAutorotate from '../lib';

var expect = chai.expect;
var assert = chai.assert

describe('lwip-jpeg-autorotate', function () {

    it('Do not rotate PNG', function () {
        
        // this test is slower
        this.timeout(5000);
        
        return doTest(1, '.png').then(function (res) {

            expect(res.operations).to.deep.equal({});
        });
    });

    it('Do not rotate JPG with Orientation 1', function () {

        return doTest(1, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({});
        });
    });

     it('Do not rotate JPG with Orientation 2', function () {

        return doTest(2, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({
                mirror: {
                    axes: 'x'
                }
            });
        });
    });

    
    it('Do not rotate JPG with Orientation 3', function () {

        return doTest(3, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({
                rotate: {
                    angle: 180
                }
            });
        });
    });

    it('Do not rotate JPG with Orientation 4', function () {

        return doTest(4, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({
                mirror: {
                    axes: 'y'
                }
            });
        });
    });

    it('Do not rotate JPG with Orientation 5', function () {

        return doTest(5, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({
                mirror: {
                    axes: 'x'
                },
                rotate: {
                    angle: 90
                }
            });
        });
    });

  it('Do not rotate JPG with Orientation 6', function () {

        return doTest(6, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({
                rotate: {
                    angle: 90
                }
            });
        });
    });

    it('Do not rotate JPG with Orientation 7', function () {

        return doTest(7, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({
                mirror: {
                    axes: 'x'
                },
                rotate: {
                    angle: 270
                }
            });
        });
    });
    
    it('Do not rotate JPG with Orientation 8', function () {

        return doTest(8, '.jpg').then(function (res) {

            expect(res.operations).to.deep.equal({
                rotate: {
                    angle: 270
                }
            });
        });
    });

});


function doTest(index, ext) {

    var inputpath = path.resolve(__dirname, './images/Landscape_' + index + ext);
    var outputpath = path.resolve(__dirname, './images/Landscape_' + index + '.output' + ext);

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