<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as JMS;




/**
 * ExperienciaLaboral
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\ExperienciaLaboralRepository") *
 * @ORM\Table(name="experiencialaboral")
 */
class ExperienciaLaboral
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
     * @ORM\Column(name="empresa",type="string", length=255)
     */
    private $empresa;


    /**
     * @var \DateTime
     * @ORM\Column(name="fechainreso", type="date",nullable=true)
     */
    private $fechainreso;


    /**
     * @var \DateTime
     * @ORM\Column(name="fechaegreso", type="date",nullable=true)
     */
    private $fechaegreso;


    /**
     * @var string
     *
     * @ORM\Column(name="motivoegreso",type="text")
     */
    private $motivoegreso;


    /**
     * @var string
     *
     * @ORM\Column(name="puestodesempenado",type="string", length=255)
     */
    private $puestodesempenado;

    /**
     * @var string
     *
     * @ORM\Column(name="principalesresponsabilidades",type="text")
     */
    private $principalesresponsabilidades;


    /**
     * @var string
     *
     * @ORM\Column(name="principalestareas",type="text")
     */
    private $principalestareas;

    /**
     * @var string
     *
     * @ORM\Column(name="direccion",type="text")
     */
    private $direccion;



    /**
     * @var string
     *
     * @ORM\Column(name="actividad",type="text")
     */
    private $actividad;

    /**
     * @var string
     *
     * @ORM\Column(name="actividadempresa",type="text")
     */
    private $actividadempresa;


    /**
     * @ORM\ManyToOne(targetEntity="Pais",inversedBy="experiencias", cascade={"persist"})
     */
    private $pais;

    /**
     * @ORM\ManyToOne(targetEntity="Provincia",inversedBy="experiencias", cascade={"persist"})
     */
    private $provincia;

    /**
     * @ORM\ManyToOne(targetEntity="Localidad",inversedBy="experiencias", cascade={"persist"})
     */
    private $localidad;

    /**
     * @var string
     *
     * @ORM\Column(name="telefono",type="string", length=255)
     */
    private $telefono;

    /**
     * @var string
     *
     * @ORM\Column(name="referencias",type="text")
     */
    private $referencias;


    /**
     * @ORM\ManyToOne(targetEntity="Curriculum",inversedBy="experienciaslaborales", cascade={"persist"})
     */
    private $curriculum;




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
     * Set hasexp
     *
     * @param boolean $hasexp
     *
     * @return ExperienciaLaboral
     */
    public function setHasexp($hasexp)
    {
        $this->hasexp = $hasexp;

        return $this;
    }

    /**
     * Get hasexp
     *
     * @return boolean
     */
    public function getHasexp()
    {
        return $this->hasexp;
    }

    /**
     * Set empresa
     *
     * @param string $empresa
     *
     * @return ExperienciaLaboral
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
     * Set fechainreso
     *
     * @param \DateTime $fechainreso
     *
     * @return ExperienciaLaboral
     */
    public function setFechainreso($fechainreso)
    {
        $this->fechainreso = $fechainreso;

        return $this;
    }

    /**
     * Get fechainreso
     *
     * @return \DateTime
     */
    public function getFechainreso()
    {
        return $this->fechainreso;
    }

    /**
     * Set fechaegreso
     *
     * @param \DateTime $fechaegreso
     *
     * @return ExperienciaLaboral
     */
    public function setFechaegreso($fechaegreso)
    {
        $this->fechaegreso = $fechaegreso;

        return $this;
    }

    /**
     * Get fechaegreso
     *
     * @return \DateTime
     */
    public function getFechaegreso()
    {
        return $this->fechaegreso;
    }

    /**
     * Set motivoegreso
     *
     * @param string $motivoegreso
     *
     * @return ExperienciaLaboral
     */
    public function setMotivoegreso($motivoegreso)
    {
        $this->motivoegreso = $motivoegreso;

        return $this;
    }

    /**
     * Get motivoegreso
     *
     * @return string
     */
    public function getMotivoegreso()
    {
        return $this->motivoegreso;
    }

    /**
     * Set puestodesempenado
     *
     * @param string $puestodesempenado
     *
     * @return ExperienciaLaboral
     */
    public function setPuestodesempenado($puestodesempenado)
    {
        $this->puestodesempenado = $puestodesempenado;

        return $this;
    }

    /**
     * Get puestodesempenado
     *
     * @return string
     */
    public function getPuestodesempenado()
    {
        return $this->puestodesempenado;
    }

    /**
     * Set principalesresponsabilidades
     *
     * @param string $principalesresponsabilidades
     *
     * @return ExperienciaLaboral
     */
    public function setPrincipalesresponsabilidades($principalesresponsabilidades)
    {
        $this->principalesresponsabilidades = $principalesresponsabilidades;

        return $this;
    }

    /**
     * Get principalesresponsabilidades
     *
     * @return string
     */
    public function getPrincipalesresponsabilidades()
    {
        return $this->principalesresponsabilidades;
    }

    /**
     * Set principalestareas
     *
     * @param string $principalestareas
     *
     * @return ExperienciaLaboral
     */
    public function setPrincipalestareas($principalestareas)
    {
        $this->principalestareas = $principalestareas;

        return $this;
    }

    /**
     * Get principalestareas
     *
     * @return string
     */
    public function getPrincipalestareas()
    {
        return $this->principalestareas;
    }

    /**
     * Set direccion
     *
     * @param string $direccion
     *
     * @return ExperienciaLaboral
     */
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;

        return $this;
    }

    /**
     * Get direccion
     *
     * @return string
     */
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * Set actividad
     *
     * @param string $actividad
     *
     * @return ExperienciaLaboral
     */
    public function setActividad($actividad)
    {
        $this->actividad = $actividad;

        return $this;
    }

    /**
     * Get actividad
     *
     * @return string
     */
    public function getActividad()
    {
        return $this->actividad;
    }

    /**
     * Set actividadempresa
     *
     * @param string $actividadempresa
     *
     * @return ExperienciaLaboral
     */
    public function setActividadempresa($actividadempresa)
    {
        $this->actividadempresa = $actividadempresa;

        return $this;
    }

    /**
     * Get actividadempresa
     *
     * @return string
     */
    public function getActividadempresa()
    {
        return $this->actividadempresa;
    }

    /**
     * Set telefono
     *
     * @param string $telefono
     *
     * @return ExperienciaLaboral
     */
    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;

        return $this;
    }

    /**
     * Get telefono
     *
     * @return string
     */
    public function getTelefono()
    {
        return $this->telefono;
    }

    /**
     * Set referencias
     *
     * @param string $referencias
     *
     * @return ExperienciaLaboral
     */
    public function setReferencias($referencias)
    {
        $this->referencias = $referencias;

        return $this;
    }

    /**
     * Get referencias
     *
     * @return string
     */
    public function getReferencias()
    {
        return $this->referencias;
    }

    /**
     * Set pais
     *
     * @param \AppBundle\Entity\Pais $pais
     *
     * @return ExperienciaLaboral
     */
    public function setPais(\AppBundle\Entity\Pais $pais = null)
    {
        $this->pais = $pais;

        return $this;
    }

    /**
     * Get pais
     *
     * @return \AppBundle\Entity\Pais
     */
    public function getPais()
    {
        return $this->pais;
    }

    /**
     * Set provincia
     *
     * @param \AppBundle\Entity\Provincia $provincia
     *
     * @return ExperienciaLaboral
     */
    public function setProvincia(\AppBundle\Entity\Provincia $provincia = null)
    {
        $this->provincia = $provincia;

        return $this;
    }

    /**
     * Get provincia
     *
     * @return \AppBundle\Entity\Provincia
     */
    public function getProvincia()
    {
        return $this->provincia;
    }

    /**
     * Set localidad
     *
     * @param \AppBundle\Entity\Localidad $localidad
     *
     * @return ExperienciaLaboral
     */
    public function setLocalidad(\AppBundle\Entity\Localidad $localidad = null)
    {
        $this->localidad = $localidad;

        return $this;
    }

    /**
     * Get localidad
     *
     * @return \AppBundle\Entity\Localidad
     */
    public function getLocalidad()
    {
        return $this->localidad;
    }

    /**
     * Set curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     *
     * @return ExperienciaLaboral
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
}
