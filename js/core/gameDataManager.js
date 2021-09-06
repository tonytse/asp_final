function GameDataManager() {

    let self = this;

    //! Get Pre dailog json file path
    this.getPreDialogJson = function (n) {

        switch (n) {
            case 1: return 'assets/gameData/MC1_PreDialog.json';
            case 2: return 'assets/gameData/MC2_PreDialog.json';
            case 3: return 'assets/gameData/MC3_PreDialog.json';
            case 4: return 'assets/gameData/MC4_PreDialog.json';
            case 5: return 'assets/gameData/MC5_PreDialog.json';
            case 6: return 'assets/gameData/MC6_PreDialog.json';
        }
    }

    //! Get multiple choice json file path
    this.getMCJson = function (n) {

        switch (n) {
            case 1: return 'assets/gameData/MC1_QnA.json';
            case 2: return 'assets/gameData/MC2_QnA.json';
            case 3: return 'assets/gameData/MC3_QnA.json';
            case 4: return 'assets/gameData/MC4_QnA.json';
            case 5: return 'assets/gameData/MC5_QnA.json';
            case 6: return 'assets/gameData/MC6_QnA.json';
        }
    }

}