<?php

namespace Src\Manager;

use App\Manager;
use src\Model\Color;

class ActionManager extends Manager
{
    public function incrementNumberVisit() {
        $req = Manager::dbConnect()->query('UPDATE visitors_numb SET visitor_number = visitor_number + 1');
    }

    public function add(Color $colObj) {
        $req = Manager::dbConnect()->prepare('INSERT INTO color_ls(color_name, color_hex_code, color_group) VALUES (:colName, :colHex, :colGrp)');
        $req->bindValue(':colName', $colObj->getColorName());
        $req->bindValue(':colHex', $colObj->getColorHexCode());
        $req->bindValue(':colGrp', $colObj->getColorGroup());
        $rep = $req->execute();
        return $rep;
    }

    public function delete($id)
    {
        $req = Manager::dbConnect()->prepare('DELETE FROM color_ls WHERE id = :id');
        $req->bindValue(":id", $id, \PDO::PARAM_INT);
        $rep = $req->execute();
        return $rep;
    }

    public function update(Color $colObj) {
        $req = Manager::dbConnect()->prepare('UPDATE color_ls SET color_name = :colName, color_hex_code = :colHex, color_group = :colGrp WHERE id = :colId');
        $req->bindValue(':colId', $colObj->getId());
        $req->bindValue(':colName', $colObj->getColorName());
        $req->bindValue(':colHex', $colObj->getColorHexCode());
        $req->bindValue(':colGrp', $colObj->getColorGroup());
        $rep = $req->execute();
        return $rep;
    }
}