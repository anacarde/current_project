var Sel = {
    colCont: document.getElementById('cont-blo'),
    timSand: document.getElementById('tim-sand'),
    respInp: document.getElementById('resp-inp'),
    valButt: document.getElementById('val-butt'),
    passButt: document.getElementById('pass-butt'),
    respButtDiv: document.getElementById('resp-butt-div'),
    respInpDiv: document.getElementById('resp-inp-div'),
    endLn: document.getElementById('end-ln'),
    resButt: document.getElementById('res-butt'),
    timSandHeiNb: parseFloat(getComputedStyle(document.getElementById('tim-sand')).height, 10),
    timDuring: 7000,
    timInt: 100,
}

function GameTwoManager() {

    var self = this;
    var intCutRatio = Sel.timSandHeiNb / (Sel.timDuring / Sel.timInt);
    var timSandHeiOnMv = Sel.timSandHeiNb;
    var arrRandNb, arrLength;
    var colRGB, colName, colAns;

    this.interval = null;
    this.colStorData = [];
    this.useAnsData = [];

    this.getJSONSessDataInArr = function(key) {
        this.colStorData = JSON.parse(sessionStorage.getItem(key));
        arrLength = this.colStorData.length;
    }

    this.setJSONSessDataInArr = function() {
        var gameTwoData = JSON.stringify(this.useAnsData);
        sessionStorage.setItem('game-two-col-data', gameTwoData);
    }

    this.stockAnsFn = function(pass) {
        colRGB = getComputedStyle(Sel.colCont).backgroundColor;
        colName = Sel.colCont.getAttribute("data-col-name").trim();
        if (pass === false) {
            colAns = Sel.respInp.value.trim().toLowerCase();
        } else {
            colAns = '';
        }
        Sel.respInp.value = '';
        this.useAnsData.push([colRGB, colName, colAns]);
    }

    this.swapBackColAndRedArr = function(arr) {
        arrRandNb = Math.floor(Math.random()*arr.length);
        Sel.colCont.style.backgroundColor = arr[arrRandNb][0];
        Sel.colCont.setAttribute("data-col-name", arr[arrRandNb][1]);
        arr.splice(arrRandNb, 1);
    }

    this.stockAndSwap = function(arr, pass){
        this.stockAnsFn(pass);
        this.swapBackColAndRedArr(arr);
        timSandHeiOnMv = Sel.timSandHeiNb;
    }

    this.stockAndEnd = function(pass){
        this.stockAnsFn(pass);
        this.setJSONSessDataInArr();
        Sel.timSand.style.height = Sel.timSandHeiNb + 'px';
        this.chgButtForMsgEnd();
    }

    this.chgButtForMsgEnd = function() {
        Sel.respInp.classList.add('hidden');
        Sel.valButt.classList.add('hidden');
        Sel.passButt.classList.add('hidden');
        Sel.endLn.classList.remove('hidden');
        Sel.resButt.classList.remove('hidden');
    }

    this.sandIntFn = function(arr, pass) {
        if(timSandHeiOnMv <= 0) {
            if(arr.length != 0) {
                this.stockAndSwap(arr, pass);
            } else {
                this.stockAndEnd(true);
                clearInterval(this.interval);
                return;
            } 
        }
        timSandHeiOnMv = timSandHeiOnMv - intCutRatio;
        Sel.timSand.style.height = timSandHeiOnMv + 'px';
    }

    this.setSandInt = function(arr, pass) {
        this.interval = setInterval(this.sandIntFn.bind(this, arr, pass), Sel.timInt);
    }

    this.ansButtFn = function(arr, pass) {
        clearInterval(this.interval);
        if(arr.length != 0) {
            this.stockAndSwap(arr, pass);
        } else {
            this.stockAndEnd(pass);
            return;
        } 
        this.interval = setInterval(this.sandIntFn.bind(this, arr), Sel.timInt);
    }

    this.endButtFn = function(arr) {
        window.location.replace("/play/result");
    }

    this.inpEvt = function() {
        var inpFn = function() {
            Sel.respInp.removeAttribute('placeholder');
            Sel.respInp.removeEventListener('focus', inpFn);
        }
        Sel.respInp.addEventListener('focus', inpFn);
    }

    this.buttEvt = function(arr) {
        Sel.valButt.addEventListener('click', this.ansButtFn.bind(this, arr, false));
        Sel.passButt.addEventListener('click', this.ansButtFn.bind(this, arr, true));
        Sel.resButt.addEventListener('click', this.endButtFn.bind(this, arr));
    }

    this.keyEvt = function(arr) {
        window.addEventListener("keydown", function(e) {
            if(e.keyCode === 27 && !Sel.passButt.classList.contains("hidden")) {
                Sel.passButt.click();
                Sel.passButt.classList.add("active");
                setTimeout(function() {
                    Sel.passButt.classList.remove("active")
                }, 200);
            }
            if(e.keyCode === 13 && !Sel.valButt.classList.contains("hidden")) {
                Sel.valButt.click();
                Sel.valButt.classList.add("active");
                setTimeout(function() {
                    Sel.valButt.classList.remove("active")
                }, 200);
            }
        });
    }

    this.init = function() {
        this.getJSONSessDataInArr('game-one-col-data');
        this.swapBackColAndRedArr(this.colStorData);
        this.setSandInt(this.colStorData, true);
        this.inpEvt();
        this.buttEvt(this.colStorData);
        this.keyEvt(this.colStorData);
    }
}

var gameTwoManager = new GameTwoManager;
gameTwoManager.init();













