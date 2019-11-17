var Sel = {
    colBlo: document.getElementsByClassName('col-blo'),
    lauButt: document.getElementById('lau-butt'),
}

function GameOneStorageBackup() {

    var self = this;
    var colDataArr = [];
    var colRgb, colName, colAnsw;

    this.getColDataArr = function() {
        for ( var i = 0 ; i < Sel.colBlo.length ; i++) {
            colRgb = getComputedStyle(Sel.colBlo[i].children[0]).backgroundColor.trim();
            colName = Sel.colBlo[i].children[0].getAttribute("data-col-name").trim();
            colAnsw = Sel.colBlo[i].children[1].value.trim();
            colDataArr.push([colRgb, colName, colAnsw]);
        }
        return colDataArr;
    }

    this.stockColDataArr = function() {
        sessionStorage.removeItem("col-data");
        colDataArr = JSON.stringify(self.getColDataArr());
        sessionStorage.setItem('game-one-col-data', colDataArr);
    }

    this.sdGameDirect = function() {
        window.location.replace("/play/game-two");
    }

    this.stockColDataArrAndRed = function() {
        self.stockColDataArr();
        self.sdGameDirect();
    }

    this.init = function() {
        Sel.lauButt.addEventListener('click', this.stockColDataArrAndRed);
    }
}

var gameOneStorageBackup = new GameOneStorageBackup;

gameOneStorageBackup.init();