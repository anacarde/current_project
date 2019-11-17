var FormSel = {
    body: document.querySelector("body"),
    form: document.querySelector("form"),
    formClose: document.getElementById("form-close"),
    contBlo: document.getElementById("cont-blo"),
    colFormDiv: document.getElementById("col-form-div"),
    colFormSrc: document.getElementById("col-form-src"),
    groInp: document.getElementById("gro-inp"),
    namInp: document.getElementById("nam-inp"),
    hexInp: document.getElementById("hex-inp"),
    colSqu: document.getElementById("col-prev"),
    subButt: document.getElementById("sub-butt"),
    groErr: document.getElementById("gro-inp-err"),
    namErr: document.getElementById("nam-inp-err"),
    hexErr: document.getElementById("hex-inp-err"),
}

function ColFormManager() {

    var self = this;
    var regexStr = /^[\D]+$/;
    var regexHex = /^#[a-zA-Z0-9]{6}$/;

    this.formAction = FormSel.colFormDiv.getAttribute("data-action");

    this.formCloseFn = function() {
        FormSel.contBlo.removeChild(FormSel.colFormDiv);
        FormSel.body.removeChild(FormSel.colFormSrc);
        if (self.formAction === "update") {
            document.getElementById("col-table-div").classList.remove("hidden");
        }
    }

    this.formCloseEvt = function() {
        FormSel.formClose.addEventListener("click", this.formCloseFn);
    }

    this.formCloAndOpTb = function() {
        FormSel.contBlo.removeChild(FormSel.colFormDiv);
        FormSel.body.removeChild(FormSel.colFormSrc);
        adminManager.hanColFn(FormSel.groInp.value);
    } 

    this.addErrNode = function(msg, msgId) {
        var errMsg = document.createElement("p");
        errMsg.id = msgId;   
    }

    this.inpFocFn = function(errSel) {
        if (this.classList.contains("error")) {
            this.classList.remove("error");
            errSel.classList.add("hidden");   
        }
    }

    this.filColSquFn = function() {
        var hexCode = FormSel.hexInp.value.trim();
        FormSel.colSqu.style.backgroundColor = hexCode; 
    }

    this.errFn = function(inpSel, errSel, msg) {
        inpSel.classList.add("error");
        errSel.textContent = msg;
        errSel.classList.remove("hidden");
    }

    this.subButtAddCb = function(resp) {
        if (resp === "1") {
            Utils.actInfMsg(FormSel.body, "succ-msg", "couleur bien ajoutée");
        } else if (resp === "0") {
            Utils.actInfMsg(FormSel.body, "fail-msg", "erreur en base de donnée, couleur non ajoutée");
        } else if (resp === "2") {
            Utils.actInfMsg(FormSel.body, "fail-msg", "formulaire non correctement rempli");
        }
        FormSel.groInp.value = "";
        FormSel.namInp.value = "";
        FormSel.hexInp.value = "";
    }

    this.subButtUpdCb = function(resp) {
        if (resp === "1") {
            Utils.actInfMsg(FormSel.body, "succ-msg", "couleur bien modifiée");
        } else {
            Utils.actInfMsg(FormSel.body, "fail-msg", "erreur en base de donnée");
        }
        self.formCloAndOpTb();
    }

    this.subButtFn = function(e) {
        e.preventDefault();
        var groInp = FormSel.groInp.value.trim();
        var namInp = FormSel.namInp.value.trim();
        var hexInp = FormSel.hexInp.value.trim();
        var paramHexInp = hexInp.replace("#", "%23");

        if (groInp === "" || namInp === "" || hexInp === "" || regexStr.test(namInp) === false || regexHex.test(hexInp) === false) {
            if (groInp === "") {
                this.errFn(FormSel.groInp, FormSel.groErr, "Ce champ n'est pas rempli");
            }
            if (namInp === "") {
                this.errFn(FormSel.namInp, FormSel.namErr, "Ce champ n'est pas rempli");
            } else if (regexStr.test(namInp) === false) {
                this.errFn(FormSel.namInp, FormSel.namErr, "format incorrect");
            }
            if (hexInp === "") {
                this.errFn(FormSel.hexInp, FormSel.hexErr, "Ce champ n'est pas rempli");
            } else if (regexHex.test(hexInp) === false) {
                this.errFn(FormSel.hexInp, FormSel.hexErr, "format incorrect");
            }
            return;
        }
        if (self.formAction === "add") {
            var params = "colorGroup=" + groInp + "&colorName=" + namInp + "&colorHexCode=" + paramHexInp;
            Utils.ajaxPost("/admin/add", params, this.subButtAddCb);
        } else if (self.formAction === "update") {
            var ColObj = {
                id: FormSel.colFormDiv.getAttribute("data-id"),
                grp: FormSel.groInp.value,
                name: FormSel.namInp.value,
                hexa: FormSel.hexInp.value.replace("#", "%23"),
            }
            var params = "id=" + ColObj.id + "&colorGroup=" + ColObj.grp + "&colorName=" + ColObj.name + "&colorHexCode=" + ColObj.hexa;
            Utils.ajaxPost("/admin/update", params, this.subButtUpdCb);  
        }   
    }

    this.inpEvts = function() {
        FormSel.groInp.addEventListener("focus", this.inpFocFn.bind(FormSel.groInp, FormSel.groErr));
        FormSel.namInp.addEventListener("focus", this.inpFocFn.bind(FormSel.namInp, FormSel.namErr));
        FormSel.hexInp.addEventListener("focus", this.inpFocFn.bind(FormSel.hexInp, FormSel.hexErr));
        FormSel.hexInp.addEventListener("input", this.filColSquFn);
    }

    this.subButtEvt = function() {
        FormSel.form.addEventListener("submit", this.subButtFn.bind(this));
    }

    this.initColSqu = function() {
        if (FormSel.hexInp.value != "") {
            FormSel.colSqu.style.backgroundColor = FormSel.hexInp.value;
        }
    }

    this.init = function() {
        this.formCloseEvt();
        this.inpEvts();
        this.subButtEvt();
        this.initColSqu();
    }
}

var colFormManager = new ColFormManager();

colFormManager.init();
