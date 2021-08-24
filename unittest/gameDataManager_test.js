
QUnit.module('Game Data Manager', function () {

    QUnit.test('getPreDialogJson', function (assert) {
        let gameDataMgr = new GameDataManager();
        let s = gameDataMgr.getPreDialogJson(1);
        assert.equal( s.includes('MC1_PreDialog.json'), true, 'Have Dailog 1');
        s = gameDataMgr.getPreDialogJson(2);
        assert.equal( s.includes('MC2_PreDialog.json'), true, 'Have Dailog 2');
        s = gameDataMgr.getPreDialogJson(3);
        assert.equal( s.includes('MC3_PreDialog.json'), true, 'Have Dailog 3');
        s = gameDataMgr.getPreDialogJson(4);
        assert.equal( s.includes('MC4_PreDialog.json'), true, 'Have Dailog 4');
        s = gameDataMgr.getPreDialogJson(5);
        assert.equal( s.includes('MC5_PreDialog.json'), true, 'Have Dailog 5');
        s = gameDataMgr.getPreDialogJson(6);
        assert.equal( s.includes('MC6_PreDialog.json'), true, 'Have Dailog 6');
        s = gameDataMgr.getPreDialogJson(9);
        assert.equal( s, null, 'Did not Dailog 9');
      
    });

    QUnit.test('getMCJson', function (assert) {
        let gameDataMgr = new GameDataManager();
        let s = gameDataMgr.getMCJson(1);

        assert.equal( s.includes('MC1_QnA.json'), true, 'Have QnA 1');
        s = gameDataMgr.getMCJson(2);
        assert.equal( s.includes('MC2_QnA.json'), true, 'Have QnA 2');
        s = gameDataMgr.getMCJson(3);
        assert.equal( s.includes('MC3_QnA.json'), true, 'Have QnA 3');
        s = gameDataMgr.getMCJson(4);
        assert.equal( s.includes('MC4_QnA.json'), true, 'Have QnA 4');
        s = gameDataMgr.getMCJson(5);
        assert.equal( s.includes('MC5_QnA.json'), true, 'Have QnA 5');
        s = gameDataMgr.getMCJson(6);
        assert.equal( s.includes('MC6_QnA.json'), true, 'Have QnA 6');
        s = gameDataMgr.getMCJson(9);
        assert.equal( s, null, 'Did not QnA 9');

    });

});
