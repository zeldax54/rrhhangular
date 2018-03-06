<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;





/**
 * Estudiotipo
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\EstudioRepository")
 * @UniqueEntity(fields="nombre", message="Este tipo de documento ya existe")
 * @ORM\Table(name="estudio")
 */
class Estudio
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
     * @ORM\Column(name="institucion", type="text",nullable=false )
     */
    private $institucion;


    /**
     * @ORM\ManyToOne(targetEntity="Estudiotipo",inversedBy="estudios", cascade={"persist"})
     */
    private $tipo;


    /**
     * @ORM\ManyToOne(targetEntity="Estudioestado",inversedBy="estudios", cascade={"persist"})
     */
    private $estado;

    /**
     * @ORM\ManyToOne(targetEntity="EstudioTitulo",inversedBy="estudios", cascade={"persist"})
     */
    private $titulo;

    /**
     * @var date
     *
     * @ORM\Column(name="annoingreso", type="integer",nullable=true )
     */
    private $annoingreso;

    /**
     * @var date
     *
     * @ORM\Column(name="annoegreso", type="integer",nullable=true )
     */
    private $annoegreso;

    /**
     * @var string
     *
     * @ORM\Column(name="materiasaprobadas", type="string",length=250,nullable=true  )
     */
    private $materiasaprobadas;

    /**
     * @var string
     *
     * @ORM\Column(name="cantidadmaterias", type="integer",nullable=true )
     */
    private $cantidadmaterias;

    /**
     * @var string
     *
     * @ORM\Column(name="annosaprovadoscursados", type="integer",nullable=true )
     */
    private $annosaprobadoscursados;


    /**
     * @ORM\ManyToOne(targetEntity="Curriculum",inversedBy="estudios", cascade={"persist"})
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
     * Set institucion
     *
     * @param string $institucion
     *
     * @return Estudio
     */
    public function setInstitucion($institucion)
    {
        $this->institucion = $institucion;

        return $this;
    }

    /**
     * Get institucion
     *
     * @return string
     */
    public function getInstitucion()
    {
        return $this->institucion;
    }

    /**
     * Set tipo
     *
     * @param \AppBundle\Entity\Estudiotipo $tipo
     *
     * @return Estudio
     */
    public function setTipo(\AppBundle\Entity\Estudiotipo $tipo = null)
    {
        $this->tipo = $tipo;

        return $this;
    }

    /**
     * Get tipo
     *
     * @return \AppBundle\Entity\Estudiotipo
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Set estado
     *
     * @param \AppBundle\Entity\Estudioestado $estado
     *
     * @return Estudio
     */
    public function setEstado(\AppBundle\Entity\Estudioestado $estado = null)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get estado
     *
     * @return \AppBundle\Entity\Estudioestado
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set titulo
     *
     * @param \AppBundle\Entity\EstudioTitulo $titulo
     *
     * @return Estudio
     */
    public function setTitulo(\AppBundle\Entity\EstudioTitulo $titulo = null)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get titulo
     *
     * @return \AppBundle\Entity\EstudioTitulo
     */
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set annoingreso
     *
     * @param integer $annoingreso
     *
     * @return Estudio
     */
    public function setAnnoingreso($annoingreso)
    {
        $this->annoingreso = $annoingreso;

        return $this;
    }

    /**
     * Get annoingreso
     *
     * @return integer
     */
    public function getAnnoingreso()
    {
        return $this->annoingreso;
    }

    /**
     * Set annoegreso
     *
     * @param integer $annoegreso
     *
     * @return Estudio
     */
    public function setAnnoegreso($annoegreso)
    {
        $this->annoegreso = $annoegreso;

        return $this;
    }

    /**
     * Get annoegreso
     *
     * @return integer
     */
    public function getAnnoegreso()
    {
        return $this->annoegreso;
    }

    /**
     * Set materiasaprobadas
     *
     * @param integer $materiasaprobadas
     *
     * @return Estudio
     */
    public function setMateriasaprobadas($materiasaprobadas)
    {
        $this->materiasaprobadas = $materiasaprobadas;

        return $this;
    }

    /**
     * Get materiasaprobadas
     *
     * @return integer
     */
    public function getMateriasaprobadas()
    {
        return $this->materiasaprobadas;
    }

    /**
     * Set cantidadmaterias
     *
     * @param integer $cantidadmaterias
     *
     * @return Estudio
     */
    public function setCantidadmaterias($cantidadmaterias)
    {
        $this->cantidadmaterias = $cantidadmaterias;

        return $this;
    }

    /**
     * Get cantidadmaterias
     *
     * @return integer
     */
    public function getCantidadmaterias()
    {
        return $this->cantidadmaterias;
    }

    /**
     * Set annosaprobadoscursados
     *
     * @param integer $annosaprobadoscursados
     *
     * @return Estudio
     */
    public function setAnnosaprobadoscursados($annosaprobadoscursados)
    {
        $this->annosaprobadoscursados = $annosaprobadoscursados;

        return $this;
    }

    /**
     * Get annosaprobadoscursados
     *
     * @return integer
     */
    public function getAnnosaprobadoscursados()
    {
        return $this->annosaprobadoscursados;
    }

    /**
     * Set curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     *
     * @return Estudio
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
     * Constructor
     */
    public function __construct()
    {

    }




}
