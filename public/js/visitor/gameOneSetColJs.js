var Sel = {
    colBloCont: document.getElementById('col-blo-cont'),
}

function SetColBloManager() {

    var arr = [];

    this.getJSONSessDataInArr = function(key) {
        arr = JSON.parse(sessionStorage.getItem(key));
        return arr;
    };

    this.shuffleArr = function(arr) {
        var currentIndex = arr.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return arr;
    }

    this.addColBloInHTML = function(colName, colRGB) {
        var inner = [
            "<div class=\"col-blo\">",
                "<div class=\"col-squ\" data-col-name=\"" + colName + "\" style=\"background-color:" + colRGB + ";\"> </div>",
                "<input type=\"text\" class=\"col-inp\" />",
            "</div>"
        ].join('');

        Sel.colBloCont.innerHTML += inner;   
    }

    this.getColArrShuffAndAdd = function() {
        arr = this.getJSONSessDataInArr('col-data');

        arr = this.shuffleArr(arr);

        for (var i = 0 ; i < arr.length ; i++) {
            this.addColBloInHTML(arr[i][1], arr[i][0]);
        }
    }
}

var setColBloManager = new SetColBloManager;

setColBloManager.getColArrShuffAndAdd();


