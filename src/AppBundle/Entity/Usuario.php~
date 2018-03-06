<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
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
class Usuario implements UserInterface
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
     * @ORM\Column(name="correo", type="text",nullable=false)
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
     * @ORM\ManyToOne(targetEntity="Tipodoc",inversedBy="usuarios", cascade={"persist"})
     */
    private $tipodoc;

    /**
     * @var string
     *
     * @ORM\Column(name="nrodoc", type="string", length=255)
     */
    private $nrodoc;


    /**
     * @var string
     *
     * @ORM\Column(name="Salt", type="string", length=255)
     */
    private $salt;

    /**
     * @ORM\Column(name="habilitado", type="boolean", nullable=true)
     */
    private $habilitado;



    public function eraseCredentials() {

    }

    /**
     * Get password
     * @return string
     */
    public function getPassword() {
        return $this->password;
    }

    public function getSalt() {
        return $this->salt;
    }

    public function getUsername() {
        return $this->getUsuario();
    }

    public function __toString() {
        return $this->getUsername();
    }

    public function getRoles() {
        return $this->roles != null ? array($this->roles->getNombre()) : "";
    }


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



    /**
     * Set nrodoc
     *
     * @param string $nrodoc
     *
     * @return Usuario
     */
    public function setNrodoc($nrodoc)
    {
        $this->nrodoc = $nrodoc;

        return $this;
    }

    /**
     * Get nrodoc
     *
     * @return string
     */
    public function getNrodoc()
    {
        return $this->nrodoc;
    }

    /**
     * Set tipodoc
     *
     * @param \AppBundle\Entity\Tipodoc $tipodoc
     *
     * @return Usuario
     */
    public function setTipodoc(\AppBundle\Entity\Tipodoc $tipodoc = null)
    {
        $this->tipodoc = $tipodoc;

        return $this;
    }

    /**
     * Get tipodoc
     *
     * @return \AppBundle\Entity\Tipodoc
     */
    public function getTipodoc()
    {
        return $this->tipodoc;
    }

    /**
     * Set salt
     *
     * @param string $salt
     *
     * @return Usuario
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }



    /**
     * Set habilitado
     *
     * @param boolean $habilitado
     *
     * @return Usuario
     */
    public function setHabilitado($habilitado)
    {
        $this->habilitado = $habilitado;

        return $this;
    }

    /**
     * Get habilitado
     *
     * @return boolean
     */
    public function getHabilitado()
    {
        return $this->habilitado;
    }

    /**
     * Set usuario
     *
     * @param string $usuario
     * @return Usuario
     */
    public function setUsuario($usuario) {
        $this->nombre = $usuario;

        return $this;
    }

    /**
     * Get usuario
     *
     * @return string
     */
    public function getUsuario() {
        return $this->nombre;
    }
}
