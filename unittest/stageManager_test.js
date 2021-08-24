function StageUnit() {
    
    let self = this;
    this.isOnEnter = false;
    this.isOnExit = false;
    this.isOnDraw = false;

    this.onEnter = function () {
        this.isOnEnter = true;
    }
    this.onExit = function () {
        this.isOnExit = true;
    }
    this.onDraw = function (w, h) {
        this.isOnDraw = true;
    }
}

QUnit.module('Stage Manager', function () {

    QUnit.test('New Stage', function (assert) {

        let stageMgr = new StageManager();
        let stage = new StageUnit();
        stageMgr.changeStage(stage);
        stageMgr.onDraw(0,0);
        assert.equal( stage.isOnEnter, true, 'onEnter called');
        assert.equal( stage.isOnExit, false, 'onExit not calling');
        assert.equal( stage.isOnDraw, true, 'onDraw called');
    });

    QUnit.test('Changge Stage', function (assert) {

        let stageMgr = new StageManager();
        let stage1 = new StageUnit();
        let stage2 = new StageUnit();
        stageMgr.changeStage(stage1);
        stageMgr.onDraw(0,0);
        stageMgr.changeStage(stage2);
        stageMgr.onDraw(0,0);

        assert.equal( stage1.isOnEnter, true, 'Stage1 onEnter called');
        assert.equal( stage1.isOnExit, true, 'Stage1 onExit called');
        assert.equal( stage1.isOnDraw, true, 'Stage1 onDraw  called');

        assert.equal( stage2.isOnEnter, true, 'Stage2 onEnter called');
        assert.equal( stage2.isOnExit, false, 'Stage2 onExit not calling');
        assert.equal( stage2.isOnDraw, true, 'Stage2 onDraw called');
    });

});
