<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Rol
 *
 * @ORM\Table(name="curriculum")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\CurriculumRepository")
 */
class Curriculum {

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="Usuario")
     */
    private $usuario;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=255)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="string", length=255)
     */
    private $apellido;


    /**
     * @ORM\ManyToOne(targetEntity="Tipodoc",inversedBy="curriculums", cascade={"persist"})
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
     * @ORM\Column(name="fechanacimiento", type="date")
     */
    private $fechanacimiento;


    /**
     * @var string
     *
     * @ORM\Column(name="lugarnacimiento", type="string", length=255)
     */
    private $lugarnacimiento;


    /**
     * @var string
     *
     * @ORM\Column(name="sexo",type="string", length=40)
     */
     private $sexo;


    /**
     * @ORM\ManyToOne(targetEntity="Estadocivil",inversedBy="curriculums", cascade={"persist"})
     */
    private $estadocivil;

    /**
     * @ORM\OneToMany(targetEntity="Hijos" , mappedBy="curriculum", cascade={"persist", "detach"})
     */
    private $hijos;


    /**
     * @var string
     *
     * @ORM\Column(name="calle",type="string", length=40)
     */
    private $calle;

    /**
     * @var string
     *
     * @ORM\Column(name="nrocalle",type="string", length=40)
     */
    private $nrocalle;

    /**
     * @var string
     *
     * @ORM\Column(name="piso",type="string", length=40)
     */
    private $piso;

    /**
     * @var string
     *
     * @ORM\Column(name="depto",type="string", length=40)
     */
    private $depto;

    /**
     * @var string
     *
     * @ORM\Column(name="codigopostal",type="string", length=40)
     */
    private $codigopostal;




    /**
     * @ORM\ManyToOne(targetEntity="Pais",inversedBy="curriculums", cascade={"persist"})
     */
    private $pais;

    /**
     * @ORM\ManyToOne(targetEntity="Provincia",inversedBy="curriculums", cascade={"persist"})
     */
    private $provincia;

    /**
     * @ORM\ManyToOne(targetEntity="Localidad",inversedBy="curriculums", cascade={"persist"})
     */
    private $localidad;



    /**
     * @ORM\OneToMany(targetEntity="Telefono" , mappedBy="curriculum", cascade={"persist", "detach"})
     */
    private $telefonos;

   //Paso
    /**
     * @ORM\OneToMany(targetEntity="Estudio" , mappedBy="curriculum", cascade={"persist", "detach"})
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
     * @return Curriculum
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
     * Set apellido
     *
     * @param string $apellido
     *
     * @return Curriculum
     */
    public function setApellido($apellido)
    {
        $this->apellido = $apellido;

        return $this;
    }

    /**
     * Get apellido
     *
     * @return string
     */
    public function getApellido()
    {
        return $this->apellido;
    }

    /**
     * Set usuario
     *
     * @param \AppBundle\Entity\Usuario $usuario
     *
     * @return Curriculum
     */
    public function setUsuario(\AppBundle\Entity\Usuario $usuario = null)
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * Get usuario
     *
     * @return \AppBundle\Entity\Usuario
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * Set tipodoc
     *
     * @param \AppBundle\Entity\Tipodoc $tipodoc
     *
     * @return Curriculum
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
     * Constructor
     */
    public function __construct()
    {
        $this->hijos = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set nrodoc
     *
     * @param string $nrodoc
     *
     * @return Curriculum
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
     * Set fechanacimiento
     *
     * @param \DateTime $fechanacimiento
     *
     * @return Curriculum
     */
    public function setFechanacimiento($fechanacimiento)
    {
        $this->fechanacimiento = $fechanacimiento;

        return $this;
    }

    /**
     * Get fechanacimiento
     *
     * @return \DateTime
     */
    public function getFechanacimiento()
    {
        return $this->fechanacimiento;
    }

    /**
     * Set lugarnacimiento
     *
     * @param string $lugarnacimiento
     *
     * @return Curriculum
     */
    public function setLugarnacimiento($lugarnacimiento)
    {
        $this->lugarnacimiento = $lugarnacimiento;

        return $this;
    }

    /**
     * Get lugarnacimiento
     *
     * @return string
     */
    public function getLugarnacimiento()
    {
        return $this->lugarnacimiento;
    }

    /**
     * Set sexo
     *
     * @param string $sexo
     *
     * @return Curriculum
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
     * Set estadocivil
     *
     * @param \AppBundle\Entity\Estadocivil $estadocivil
     *
     * @return Curriculum
     */
    public function setEstadocivil(\AppBundle\Entity\Estadocivil $estadocivil = null)
    {
        $this->estadocivil = $estadocivil;

        return $this;
    }

    /**
     * Get estadocivil
     *
     * @return \AppBundle\Entity\Estadocivil
     */
    public function getEstadocivil()
    {
        return $this->estadocivil;
    }

    /**
     * Add hijo
     *
     * @param \AppBundle\Entity\Hijos $hijo
     *
     * @return Curriculum
     */
    public function addHijo(\AppBundle\Entity\Hijos $hijo)
    {
        $this->hijos[] = $hijo;

        return $this;
    }

    /**
     * Remove hijo
     *
     * @param \AppBundle\Entity\Hijos $hijo
     */
    public function removeHijo(\AppBundle\Entity\Hijos $hijo)
    {
        $this->hijos->removeElement($hijo);
    }

    /**
     * Get hijos
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHijos()
    {
        return $this->hijos;
    }

    /**
     * Set calle
     *
     * @param string $calle
     *
     * @return Curriculum
     */
    public function setCalle($calle)
    {
        $this->calle = $calle;

        return $this;
    }

    /**
     * Get calle
     *
     * @return string
     */
    public function getCalle()
    {
        return $this->calle;
    }

    /**
     * Set nrocalle
     *
     * @param string $nrocalle
     *
     * @return Curriculum
     */
    public function setNrocalle($nrocalle)
    {
        $this->nrocalle = $nrocalle;

        return $this;
    }

    /**
     * Get nrocalle
     *
     * @return string
     */
    public function getNrocalle()
    {
        return $this->nrocalle;
    }

    /**
     * Set piso
     *
     * @param string $piso
     *
     * @return Curriculum
     */
    public function setPiso($piso)
    {
        $this->piso = $piso;

        return $this;
    }

    /**
     * Get piso
     *
     * @return string
     */
    public function getPiso()
    {
        return $this->piso;
    }

    /**
     * Set depto
     *
     * @param string $depto
     *
     * @return Curriculum
     */
    public function setDepto($depto)
    {
        $this->depto = $depto;

        return $this;
    }

    /**
     * Get depto
     *
     * @return string
     */
    public function getDepto()
    {
        return $this->depto;
    }

    /**
     * Set codigopostal
     *
     * @param string $codigopostal
     *
     * @return Curriculum
     */
    public function setCodigopostal($codigopostal)
    {
        $this->codigopostal = $codigopostal;

        return $this;
    }

    /**
     * Get codigopostal
     *
     * @return string
     */
    public function getCodigopostal()
    {
        return $this->codigopostal;
    }

    /**
     * Set pais
     *
     * @param \AppBundle\Entity\Pais $pais
     *
     * @return Curriculum
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
     * @return Curriculum
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
     * @return Curriculum
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
     * Add telefono
     *
     * @param \AppBundle\Entity\Telefono $telefono
     *
     * @return Curriculum
     */
    public function addTelefono(\AppBundle\Entity\Telefono $telefono)
    {
        $this->telefonos[] = $telefono;

        return $this;
    }

    /**
     * Remove telefono
     *
     * @param \AppBundle\Entity\Telefono $telefono
     */
    public function removeTelefono(\AppBundle\Entity\Telefono $telefono)
    {
        $this->telefonos->removeElement($telefono);
    }

    /**
     * Get telefonos
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTelefonos()
    {
        return $this->telefonos;
    }

    /**
     * Add estudio
     *
     * @param \AppBundle\Entity\Estudio $estudio
     *
     * @return Curriculum
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
}