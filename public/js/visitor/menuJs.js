var Sel = {
    form: document.getElementById("sel-form"),
    colTypeDiv: document.getElementById("col-type-div"),
    colNbDiv: document.getElementById("col-nb-div"),
    levDiv: document.getElementById("lev-div"),
    colFamOpt: document.getElementById("col-fam-opt"),
    colFamName: document.getElementsByClassName("col-fam-name"),
    colRandOpt: document.getElementById("col-rand-opt"),
    famLs: document.getElementById("fam-ls"),
    colNbInp: document.getElementById("col-nb-inp"),
    appOpt: document.getElementById("app-lev"),
    expOpt: document.getElementById("exp-lev"),
    appLab: document.getElementById("app-lev-lab"),
    expLab: document.getElementById("exp-lev-lab"),
}

function MenuManager() {

    var self = this;

    this.setSessionInpInf = function() {
        if (sessionStorage.getItem("vis-sel-info")) {
            OptObj = JSON.parse(sessionStorage.getItem("vis-sel-info"));
            if (OptObj.grpOpt === "colFamOpt") {
                Sel.colFamOpt.checked = true;
                Sel.famLs.classList.remove('invisible');
                Sel.famLs.value = OptObj.famName;
            } else {
                Sel.colRandOpt.checked = true;
            }
            Sel.colNbInp.value = OptObj.number;
            if (OptObj.level === "appLev") {
                Sel.appOpt.checked = true;
            } else {
                Sel.expOpt.checked = true;
            }
        }
    }

    this.returnColMaxNb = function($data) {
        Sel.colNbInp.setAttribute('placeholder', "Maximum: " + $data);
    }

    this.getInputInfo = function() {
        var OptObj = {};
        if (Sel.colFamOpt.checked === true) {
            OptObj.grpOpt = "colFamOpt";
            OptObj.famName = Sel.famLs.value;
        } else {
            OptObj.grpOpt = "colRandOpt";
        }
        OptObj.number = Sel.colNbInp.value;
        if (Sel.appOpt.checked === true) {
            OptObj.level = "appLev";
        } else {
            OptObj.level = "expLev";
        }

        var visSelInfo = JSON.stringify(OptObj);
        sessionStorage.setItem("vis-sel-info", visSelInfo);
    }

    this.managerEvts = function() {
        
        Sel.colFamOpt.addEventListener('click', function() {
            Sel.famLs.classList.remove('invisible');
            if (document.getElementById("sel-err-msg")) {
                document.getElementById("sel-err-msg").remove();
            }
        })

        Sel.famLs.addEventListener("change", function() {
            Utils.ajaxGet('/play/sel-col-nb/' + this.value.trim(), self.returnColMaxNb);
                if (document.getElementById("fam-err-msg")) {
                    document.getElementById("fam-err-msg").remove();
                }
        })

        Sel.colRandOpt.addEventListener('click', function() {
            Sel.famLs.classList.add('invisible');
            Utils.ajaxGet('/play/sel-col-nb/rand', self.returnColMaxNb);
            if (document.getElementById("sel-err-msg")) {
                document.getElementById("sel-err-msg").remove();
            }
        })

        Sel.colNbInp.addEventListener('click', function() {
            if (document.getElementById("nb-err-msg")) {
                document.getElementById("nb-err-msg").remove();
            }
        });

        Sel.appLab.addEventListener('click', function() {
            if(Sel.form.getAttribute("action") !== "/play/model") {
                Sel.form.setAttribute("action", "/play/model");
            }
            if (document.getElementById("lev-err-msg")) {
                document.getElementById("lev-err-msg").remove();
            }
        })

        Sel.expLab.addEventListener('click', function() {
            if(Sel.form.getAttribute("action") !== "/play/game-one") {
                Sel.form.setAttribute("action", "/play/game-one");
            }
            if (document.getElementById("lev-err-msg")) {
                document.getElementById("lev-err-msg").remove();
            }
        })

        Sel.form.addEventListener('submit', function(e) {
            if (document.getElementsByClassName("error").length !== 0) {
                e.preventDefault();
                return;
            }
            if ((Sel.colFamOpt.checked === false && Sel.colRandOpt.checked === false) || (Sel.colFamOpt.checked === true && Sel.famLs.value === "sélectionner une famille")  || (Sel.appOpt.checked === false && Sel.expOpt.checked === false) || Sel.colNbInp.value.trim() === "" || Number(Sel.colNbInp.value) == NaN) {
                e.preventDefault();
                if (Sel.colFamOpt.checked === false && Sel.colRandOpt.checked === false) {
                    Utils.inpErrMsg(Sel.colTypeDiv, "sel-err-msg", "error", "Veuillez cocher une des deux options");
                } else if (Sel.colFamOpt.checked === true && Sel.famLs.value === "sélectionner une famille") {
                    Utils.inpErrMsg(Sel.colTypeDiv, "fam-err-msg", "error", "Veuillez sélectionner une famille");
                }
                if (Sel.colNbInp.value.trim() === "") {
                     Utils.inpErrMsg(Sel.colNbDiv, "nb-err-msg", "error", "Veuillez entrer un nombre");
                } else if (Number(Sel.colNbInp.value) == NaN) {
                    Utils.inpErrMsg(Sel.colNbDiv, "nb-err-msg", "error", "Le format de votre nombre n'est pas valide");
                }
                if (Sel.appOpt.checked === false && Sel.expOpt.checked === false) {
                    Utils.inpErrMsg(Sel.levDiv, "lev-err-msg", "error", "Veuillez cocher un niveau");
                }
                return;
            }
            self.getInputInfo();
        });
    }

    this.init = function() {
        this.setSessionInpInf();
        this.managerEvts();
    }

}

var menuManager = new MenuManager;

menuManager.init();



