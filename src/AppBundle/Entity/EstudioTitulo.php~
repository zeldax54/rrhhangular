<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as JMS;




/**
 * Estudiotipo
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\EstudioTituloRepository")
 * @UniqueEntity(fields="nombre", message="Este tipo de documento ya existe")
 * @ORM\Table(name="estudiotitulo")
 */
class EstudioTitulo
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
     * @JMS\Exclude();
     * @ORM\Column(name="codigo", type="text",nullable=false )
     */
    private $codigo;


    /**
     * @JMS\Exclude();
     * @ORM\OneToMany(targetEntity="Estudio" , mappedBy="titulo", cascade={"persist", "detach"})
     */
    private $estudios;






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
     * @return Estudiotipo
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
     * Constructor
     */
    public function __construct()
    {
        $this->estudios = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add estudio
     *
     * @param \AppBundle\Entity\Estudio $estudio
     *
     * @return EstudioTitulo
     */
    public function addEstudio(\AppBundle\Entity\Estudio $estudio)
    {
        $this->estudios[] = $estudio;

        return $this;
    }

    /**
     * Remove estudio
     *
     * @param \AppBundle\Entity\Estudio $estudio
     */
    public function removeEstudio(\AppBundle\Entity\Estudio $estudio)
    {
        $this->estudios->removeElement($estudio);
    }

    /**
     * Get estudios
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEstudios()
    {
        return $this->estudios;
    }

    /**
     * Set codigo
     *
     * @param string $codigo
     *
     * @return EstudioTitulo
     */
    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;

        return $this;
    }

    /**
     * Get codigo
     *
     * @return string
     */
    public function getCodigo()
    {
        return $this->codigo;
    }
}
