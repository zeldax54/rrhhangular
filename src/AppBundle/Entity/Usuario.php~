<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;




/**
 * Tipodoc
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UsuarioRepository")
 * @UniqueEntity(fields="tipo", message="Este tipo de documento ya existe")
 * @UniqueEntity(fields="correo", message="Este correo ya existe")
 * @ORM\Table(name="usuario")
 */
class Usuario
{

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="text",nullable=false )
     */
     private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="correo", type="text",nullable=false )
     */
    private $correo;


    /**
     * @var string
     * @Assert\Length(min = 6)
     * @ORM\Column(name="password", type="string", length=255)
     */
    private $password;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Rol",inversedBy="usuarios", cascade={"persist"})
     */
    protected $roles;

    /**
     * @ORM\OneToOne(targetEntity="Curriculum")
     */
    private $curriculum;

    /**
     * @ORM\Column(name="fechacreacion", type="date",nullable=false )
     */
    private $fechacreacion;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     *
     * @return Usuario
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set correo
     *
     * @param string $correo
     *
     * @return Usuario
     */
    public function setCorreo($correo)
    {
        $this->correo = $correo;

        return $this;
    }

    /**
     * Get correo
     *
     * @return string
     */
    public function getCorreo()
    {
        return $this->correo;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return Usuario
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set roles
     *
     * @param \AppBundle\Entity\Rol $roles
     *
     * @return Usuario
     */
    public function setRoles(\AppBundle\Entity\Rol $roles = null)
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * Get roles
     *
     * @return \AppBundle\Entity\Rol
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * Set usuario
     *
     * @param \AppBundle\Entity\Curriculum $usuario
     *
     * @return Usuario
     */
    public function setUsuario(\AppBundle\Entity\Curriculum $usuario = null)
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * Get usuario
     *
     * @return \AppBundle\Entity\Curriculum
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * Set curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     *
     * @return Usuario
     */
    public function setCurriculum(\AppBundle\Entity\Curriculum $curriculum = null)
    {
        $this->curriculum = $curriculum;

        return $this;
    }

    /**
     * Get curriculum
     *
     * @return \AppBundle\Entity\Curriculum
     */
    public function getCurriculum()
    {
        return $this->curriculum;
    }

    /**
     * Set fechacreacion
     *
     * @param \DateTime $fechacreacion
     *
     * @return Usuario
     */
    public function setFechacreacion($fechacreacion)
    {
        $this->fechacreacion = $fechacreacion;

        return $this;
    }

    /**
     * Get fechacreacion
     *
     * @return \DateTime
     */
    public function getFechacreacion()
    {
        return $this->fechacreacion;
    }


}
