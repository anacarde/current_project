<?php

namespace Src\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use App\Controller;
use Src\Model\Color;
use Src\Manager\ReadManager;
use Src\Manager\ActionManager;

class AdminController extends Controller
{

    public function goToAdmin() {
        $resp = $this->view("template/admTemplate.html.twig", [
                "colGrpLs" => $this->getManager(ReadManager::class)->getColGrpList(),
            ]);
        return new Response($resp);
    }

    public function getAddColBlock() {
        $resp = $this->view("admin/admColForm.html.twig", [
            "colGrpLs" => $this->getManager(ReadManager::class)->getColGrpList(),
            "action" => "add"
        ]);
        return new Response($resp);
    }

    public function getUpdColBlock(Request $request) {
        $resp = $this->view("admin/admColForm.html.twig", [
            "colGrpLs" => $this->getManager(ReadManager::class)->getColGrpList(),
            "colUpdInf" => $request->request->all(),
            "action" => "update"
        ]);
        return new Response($resp);
    }

    public function getColTableBlock($colGrp) {
        $resp = $this->view("admin/admColTable.html.twig", [
            "colGrp" => $this->getManager(ReadManager::class)->getColGrpContent($colGrp),
            "colGrpName" => $this->getManager(ReadManager::class)->getSingleColGrpName($colGrp),
        ]);
        return new Response($resp);
    }

    public function addAction(Request $request) {
        if ($this->checkPostData($request->request->all()) === false) {
            return new Response("2");
        }
        $colObj = $this->getManager(Color::class, $request->request->all());
        $resp = $this->getManager(ActionManager::class)->add($colObj);
        return new Response(strval($resp));
    }

    public function deleteAction($id) {
        $resp = $this->getManager(ActionManager::class)->delete($id);
        return new Response(strval($resp));
    }

    public function updateAction(Request $request) {
        $colObj = $this->getManager(Color::class, $request->request->all());
        $resp = $this->getManager(ActionManager::class)->update($colObj);
        return new Response(strval($resp));
    }

    public function disconnectAction() {
        $_SESSION['connexion'] = FALSE;
        return new RedirectResponse("/");
    }
}