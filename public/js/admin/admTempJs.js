var TempSel = {
    body: document.querySelector('body'),
    addButt: document.getElementById("add-col-butt"),
    hanButt: document.getElementById("han-col-butt"),
    backVisButt: document.getElementById("back-vis-butt"),
    grpButt: document.getElementsByClassName("col-grp-butt"),
    contBlo: document.getElementById("cont-blo"),
}

function AdminManager() {

    var self = this;

    this.addColCb = function(resp) {
        TempSel.contBlo.innerHTML = resp;
        Utils.rmvAndAddScript(TempSel.body, "col-form-src", "/js/admin/colFormJs.js");
    }

    this.hanColCb = function(resp) {
        TempSel.contBlo.innerHTML = resp;
        Utils.rmvAndAddScript(TempSel.body, "col-table-src", "/js/admin/colTableJs.js");
    }

    this.addColFn = function() {
        Utils.ajaxGet("/admin/form/add", self.addColCb);
        if(document.getElementById("col-table-src") != null) {
            TempSel.body.removeChild(document.getElementById("col-table-src"));
        }
    }

    this.hanColFn = function(colGrpName) {
        Utils.ajaxGet("/admin/table/" + colGrpName, self.hanColCb);
        if(document.getElementById("col-form-src") != null) {
            TempSel.body.removeChild(document.getElementById("col-form-src"));
        }
    }

    this.backVisFn = function() {
        window.location = "/admin/disconnect";
    }

    this.buttEvts = function() {
        TempSel.addButt.addEventListener('click', this.addColFn);

        for (var i = 0 ; i < TempSel.grpButt.length ; i++) {
            TempSel.grpButt[i].addEventListener('click', this.hanColFn.bind(this, TempSel.grpButt[i].getAttribute("data-colGrp")) );
        }

        TempSel.backVisButt.addEventListener('click', this.backVisFn);
    }

    this.init = function() {
        this.buttEvts();
    }
    
}

var adminManager = new AdminManager();

adminManager.init();