var TabSel = {
    body: document.querySelector("body"),
    contBlo: document.getElementById("cont-blo"),
    tableClose: document.getElementById("table-close"),
    table: document.querySelector("table"),
    colTableDiv: document.getElementById("col-table-div"),
    colTableSrc: document.getElementById("col-table-src"),
    updButt: document.getElementsByClassName("upd-butt"),
    delButt: document.getElementsByClassName("del-butt"),
}

function ColTableManager() {

    var self = this;

    this.tableCloseFn = function() {
        TabSel.contBlo.removeChild(TabSel.colTableDiv);
        TabSel.body.removeChild(TabSel.colTableSrc);
    }

    this.tableCloseEvt = function() {
        TabSel.tableClose.addEventListener('click', this.tableCloseFn);
    }

    this.updBlockCb = function(resp) {
        TempSel.contBlo.innerHTML = resp;
        Utils.rmvAndAddScript(TabSel.body, "col-table-src", "/js/admin/colTableJs.js");
    }

    this.deleteFnCb = function(resp) {
        if (resp === "1") {
            var colGrp = TabSel.table.getAttribute("data-colgrp");
            Utils.actInfMsg(TabSel.body, "succ-msg", "couleur bien supprimée");
            Utils.ajaxGet("/admin/table/" + colGrp, this.updBlockCb);
        } else {
            Utils.actInfMsg(TabSel.body, "fail-msg", "erreur en base de donnée");
        }
    }

    this.deleteFn = function(id) {
        Utils.ajaxGet("/admin/delete/" + id, this.deleteFnCb.bind(this));
    }

    this.updColForm = function(resp) {
        TabSel.contBlo.insertAdjacentHTML('beforeend', resp);
        Utils.rmvAndAddScript(TabSel.body, "col-form-src", "/js/admin/colFormJs.js");
    }

    this.updateFn = function(colObj) {
        TabSel.colTableDiv.classList.add("hidden");
        var params = "id=" + colObj.id + "&grp=" + colObj.grp + "&name=" + colObj.name + "&hex=" + colObj.hex;
        Utils.ajaxPost("/admin/form/update", params, self.updColForm);
    }

    this.tableAllbtnEvts = function() {
        for (var i = 0 ; i < TabSel.delButt.length ; i++) {
            TabSel.delButt[i].addEventListener('click', this.deleteFn.bind(this, TabSel.delButt[i].getAttribute("data-id")));
        }   

        for (var i = 0 ; i < TabSel.updButt.length ; i++) {
            var ColObj = {
                id: TabSel.updButt[i].getAttribute("data-id"),
                name: TabSel.updButt[i].getAttribute("data-name"),
                hex: TabSel.updButt[i].getAttribute("data-hex").replace("#", "%23"),
                grp: TabSel.table.getAttribute("data-colgrp"),
            }

            TabSel.updButt[i].addEventListener('click', this.updateFn.bind(this, ColObj));
        }
    }

    this.init = function() {
        this.tableCloseEvt();
        this.tableAllbtnEvts();
    }
}

var colTableManager = new ColTableManager;

colTableManager.init();