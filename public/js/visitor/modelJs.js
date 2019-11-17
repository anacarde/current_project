var Sel = {
    lauButt: document.getElementById('lau-butt'),
    colBlo: document.getElementsByClassName('col-blo'),
    switchDispButt: document.getElementById('switch-disp-butt'),
}

function ModelStorageBackup() {

    var self = this;
    var colDataArr = [];
    var colRgb = null;
    var colName = null;
    var isHidden = false;

    this.switchDispNameFn = function() {
        if (isHidden === false) {
            for ( var i = 0 ; i < Sel.colBlo.length ; i++) {
                Sel.colBlo[i].children[1].classList.add("invisible");
                Sel.switchDispButt.textContent = "Afficher les noms";
            }
            isHidden = true;
        } else {
            for ( var i = 0 ; i < Sel.colBlo.length ; i++) {
                Sel.colBlo[i].children[1].classList.remove("invisible");
                Sel.switchDispButt.textContent = "Masquer les noms";
            }
            isHidden = false;
        }
        
    }

    this.getColDataArr = function() {
        for ( var i = 0 ; i < Sel.colBlo.length ; i++) {
            colRgb = getComputedStyle(Sel.colBlo[i].children[0]).backgroundColor.trim();
            colName = Sel.colBlo[i].children[1].textContent.trim();
            colDataArr.push([colRgb, colName]);
        }
        return colDataArr;
    }

    this.stockColDataArr = function() {
        colDataArr = JSON.stringify(self.getColDataArr());
        sessionStorage.setItem('col-data', colDataArr);
    }

    this.fstGameDirect = function() {
        window.location.replace("/play/model/game-one");
    }

    this.stockColDataArrAndRed = function() {
        self.stockColDataArr();
        self.fstGameDirect();
    }

    this.init = function() {
        Sel.lauButt.addEventListener('click', this.stockColDataArrAndRed);
        Sel.switchDispButt.addEventListener('click', this.switchDispNameFn);
    }
}

var modelStorageBackup = new ModelStorageBackup;

modelStorageBackup.init();
