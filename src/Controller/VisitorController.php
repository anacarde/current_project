<?php

namespace Src\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Controller;
use App\RouterException;
use Src\Manager\ReadManager;
use Src\Manager\ActionManager;
use Src\Manager\ConnectManager;


class VisitorController extends Controller
{
    private function chooseDbMethod(Array $array) {        
        if($array["col-filt"] === "fam-filt") {
            $manMeth = "getColByFam"; 
        } else {
            $manMeth = "getRandCol";
        }
        return $manMeth;
    }

    public function checkConnectInfo(Request $request) {
        $adminId = $this->getManager(ConnectManager::class)->getAdminId();
        $userInp = $request->request->all();
        if ($adminId["pseudo"] != $userInp["pseudo"]) {
            $resp = "Pseudo administrateur incorrect";
            return new Response($resp);
        }
        if (!password_verify($userInp["password"], $adminId["hash_password"])) {
            $resp = "Mot de passe incorrect";
            return new Response($resp);
        }
        $_SESSION["connexion"] = TRUE;
        $resp = "Connexion à votre espace en cours";
        return new Response($resp);
    }

    public function nbColSelect($filter) {
        if ($filter === "rand") {
            $resp = $this->getManager(ReadManager::class)->getTotColNb();
        } else {
            $resp = $this->getManager(ReadManager::class)->getColNbByFam($filter);
        }
        return new Response($resp);
    }

    public function goToIndex() {
        $resp = $this->view("visitor/visHomeBlock.html.twig", [
        ]);
        $this->getManager(ActionManager::class)->incrementNumberVisit();
        return new Response($resp);
    }

    public function goToMenu() {
        $resp = $this->view("visitor/visMenuBlock.html.twig", [
            "colGrpLs" => $this->getManager(ReadManager::class)->getColGrpList(),
            "totColNb" => $this->getManager(ReadManager::class)->getTotColNb(),
        ]);
        return new Response($resp);
    }

    public function goToModel(Request $request) {
        $colSelArr = $request->request->all();
        if ($this->checkPostData($colSelArr) === false) {
            throw new RouterException("Le serveur n'a pas tout bien reçu, vous pouvez retourner au menu et recommencer. ");
        };
        $dbMethod = $this->chooseDbMethod($colSelArr);
        $resp = $this->view("visitor/visModelBlock.html.twig", [
            "colSel" => call_user_func([$this->getManager(ReadManager::class), $dbMethod], $colSelArr),
        ]);
        return new Response($resp);
    }

    public function goFromMenuToGameOne(Request $request) {
        $colSelArr = $request->request->all();
        $dbMethod = $this->chooseDbMethod($colSelArr);
        $resp = $this->view("visitor/visGameOneBlock.html.twig", [
            "colSel" => call_user_func([$this->getManager(ReadManager::class), $dbMethod], $colSelArr),
            "serverData" => TRUE,
        ]);
        return new Response($resp);
    }

    public function goFromModelToGameOne() {
        $resp = $this->view("visitor/visGameOneBlock.html.twig", [
            "serverData" => FALSE,
        ]);
        return new Response($resp);
    }

    public function goToGameTwo() {
        $resp = $this->view("visitor/visGameTwoBlock.html.twig", [
        ]);
        return new Response($resp);
    }

    public function goToResult() {
        $resp = $this->view("visitor/visResultBlock.html.twig", [
        ]);
        return new Response($resp);
    }
}