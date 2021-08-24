
QUnit.module('Stopwatch', function () {

    QUnit.test('basic function', function (assert) {

        let sw = new StopWatch();
        sw.start();
        sleep(1000);
        v = sw.get();        
        assert.equal( v >=1, true, 'Stage1 onEnter called');


    });


});