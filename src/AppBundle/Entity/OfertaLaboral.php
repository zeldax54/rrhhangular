<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;




/**
 * Tipodoc
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\ofertalaboralRepository")
 * @ORM\Table(name="ofertalaboral")
 */
class OfertaLaboral
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
     * @ORM\Column(name="titulo", type="string",length=2500 )
     */
    private $titulo;

    /**
     * @ORM\ManyToOne(targetEntity="Idioma" , inversedBy="ofertaslaborales", cascade={"persist", "detach"})
     */
    private $idioma;

    /**
     * @var string
     *
     * @ORM\Column(name="imagen", type="string",length=300 )
     */
    private $imagen;


    /**
     * @var string
     *
     * @ORM\Column(name="fechainicio", type="date")
     */
    private $fechainicio;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="string",length=2500 )
     */
    private $descripcion;

    /**
     * @var string
     *
     * @ORM\Column(name="empresa", type="string",length=500 )
     */
    private $empresa;

    /**
     * @var string
     *
     * @ORM\Column(name="areatrabajo", type="string",length=500 )
     */
    private $areatrabajo;

    /**
     * @var string
     *
     * @ORM\Column(name="edad", type="integer" )
     */
    private $edad;

    /**
     * @var string
     *
     * @ORM\Column(name="sexo",type="string", length=40)
     */
    private $sexo;

    /**
     * @var string
     *
     * @ORM\Column(name="lugar",type="string", length=500)
     */
    private $lugar;

    /**
     * @var string
     *
     * @ORM\Column(name="niveleducacional",type="string", length=500)
     */
    private $niveleducacional;

    /**
     * @var string
     *
     * @ORM\Column(name="remuneracion",type="string", length=40)
     */
    private $remuneracion;

    /**
     * @var string
     *
     * @ORM\Column(name="contacto",type="string", length=255)
     */
    private $contacto;

    /**
     * @var string
     *
     * @ORM\Column(name="cliente",type="string", length=255)
     */
    private $cliente;



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
     * Set imagen
     *
     * @param string $imagen
     *
     * @return OfertaLaboral
     */
    public function setImagen($imagen)
    {
        $this->imagen = $imagen;

        return $this;
    }

    /**
     * Get imagen
     *
     * @return string
     */
    public function getImagen()
    {
        return $this->imagen;
    }

    /**
     * Set fechainicio
     *
     * @param \DateTime $fechainicio
     *
     * @return OfertaLaboral
     */
    public function setFechainicio($fechainicio)
    {
        $this->fechainicio = $fechainicio;

        return $this;
    }

    /**
     * Get fechainicio
     *
     * @return \DateTime
     */
    public function getFechainicio()
    {
        return $this->fechainicio;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     *
     * @return OfertaLaboral
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set empresa
     *
     * @param string $empresa
     *
     * @return OfertaLaboral
     */
    public function setEmpresa($empresa)
    {
        $this->empresa = $empresa;

        return $this;
    }

    /**
     * Get empresa
     *
     * @return string
     */
    public function getEmpresa()
    {
        return $this->empresa;
    }

    /**
     * Set areatrabajo
     *
     * @param string $areatrabajo
     *
     * @return OfertaLaboral
     */
    public function setAreatrabajo($areatrabajo)
    {
        $this->areatrabajo = $areatrabajo;

        return $this;
    }

    /**
     * Get areatrabajo
     *
     * @return string
     */
    public function getAreatrabajo()
    {
        return $this->areatrabajo;
    }

    /**
     * Set edad
     *
     * @param integer $edad
     *
     * @return OfertaLaboral
     */
    public function setEdad($edad)
    {
        $this->edad = $edad;

        return $this;
    }

    /**
     * Get edad
     *
     * @return integer
     */
    public function getEdad()
    {
        return $this->edad;
    }

    /**
     * Set sexo
     *
     * @param string $sexo
     *
     * @return OfertaLaboral
     */
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;

        return $this;
    }

    /**
     * Get sexo
     *
     * @return string
     */
    public function getSexo()
    {
        return $this->sexo;
    }

    /**
     * Set lugar
     *
     * @param string $lugar
     *
     * @return OfertaLaboral
     */
    public function setLugar($lugar)
    {
        $this->lugar = $lugar;

        return $this;
    }

    /**
     * Get lugar
     *
     * @return string
     */
    public function getLugar()
    {
        return $this->lugar;
    }

    /**
     * Set niveleducacional
     *
     * @param string $niveleducacional
     *
     * @return OfertaLaboral
     */
    public function setNiveleducacional($niveleducacional)
    {
        $this->niveleducacional = $niveleducacional;

        return $this;
    }

    /**
     * Get niveleducacional
     *
     * @return string
     */
    public function getNiveleducacional()
    {
        return $this->niveleducacional;
    }

    /**
     * Set remuneracion
     *
     * @param string $remuneracion
     *
     * @return OfertaLaboral
     */
    public function setRemuneracion($remuneracion)
    {
        $this->remuneracion = $remuneracion;

        return $this;
    }

    /**
     * Get remuneracion
     *
     * @return string
     */
    public function getRemuneracion()
    {
        return $this->remuneracion;
    }

    /**
     * Set contacto
     *
     * @param string $contacto
     *
     * @return OfertaLaboral
     */
    public function setContacto($contacto)
    {
        $this->contacto = $contacto;

        return $this;
    }

    /**
     * Get contacto
     *
     * @return string
     */
    public function getContacto()
    {
        return $this->contacto;
    }

    /**
     * Set cliente
     *
     * @param string $cliente
     *
     * @return OfertaLaboral
     */
    public function setCliente($cliente)
    {
        $this->cliente = $cliente;

        return $this;
    }

    /**
     * Get cliente
     *
     * @return string
     */
    public function getCliente()
    {
        return $this->cliente;
    }

    /**
     * Set idioma
     *
     * @param \AppBundle\Entity\Idioma $idioma
     *
     * @return OfertaLaboral
     */
    public function setIdioma(\AppBundle\Entity\Idioma $idioma = null)
    {
        $this->idioma = $idioma;

        return $this;
    }

    /**
     * Get idioma
     *
     * @return \AppBundle\Entity\Idioma
     */
    public function getIdioma()
    {
        return $this->idioma;
    }

    /**
     * Set titulo
     *
     * @param string $titulo
     *
     * @return OfertaLaboral
     */
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get titulo
     *
     * @return string
     */
    public function getTitulo()
    {
        return $this->titulo;
    }
}
