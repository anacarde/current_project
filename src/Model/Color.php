<?php

namespace Src\Model;

class Color 
{
    protected $id,
              $color_name,
              $color_hex_code,
              $color_group;

    public function __construct($data = [])
    {
        if (!empty($data))
        {
            $this->hydrate($data);
        }
    }

    public function hydrate($data)
    {
        foreach ($data as $key => $value)
        {
            $method = 'set' .  ucfirst($key);

            if (is_callable([$this, $method]))
            {
                $this->$method($value);
            }
        }
    }

    public function setId($id)
    {
        $this->id = (int) $id;
    }

    public function setColorName($colorName)
    {
        $this->color_name = (string) $colorName; 
    }

    public function setColorHexCode($colorHexCode)
    {
        $this->color_hex_code = (string) $colorHexCode;
    }

    public function setColorGroup($colorGroup)
    {
        $this->color_group = (string) $colorGroup;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getColorName()
    {
        return $this->color_name;
    }

    public function getColorHexCode()
    {
        return $this->color_hex_code;
    }

    public function getColorGroup()
    {
        return $this->color_group;
    }
}