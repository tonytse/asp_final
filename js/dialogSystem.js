let index = 0;
let data;
function DialogSystem() {

    this.onDraw = function () {
        if (data.text.length > index) {
            button.style('display', 'auto');
            fill(0, 0, 0, 150);
            rect(0, 0, windowWidth, windowHeight);
            fill(69, 123, 157);
            rect(0, windowHeight - windowHeight / 4, windowWidth, windowHeight / 4);
            fill(255);
            textSize(36);
            textAlign(LEFT);
            textFont(dialogFont);
            text(data.text[index], 20, windowHeight - windowHeight / 4.5, windowWidth, windowHeight / 7);
            button.mousePressed(nextDialog);
        } else {
            button.style('display', 'none');
        }
    }

    // init setup
    this.init = function (jsonFile) {
        data = jsonFile;
    }

}

function nextDialog() {

    if (data.text.length > index) {
        index += 1;
        console.log(index);
    }

}
