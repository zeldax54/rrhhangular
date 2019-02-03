<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToMany;

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


    //Nacimiento

    /**
     * @ORM\ManyToOne(targetEntity="Pais",inversedBy="curriculumsNacimiento", cascade={"persist"})
     */
    private $paisNacimiento;

    /**
     * @ORM\ManyToOne(targetEntity="Provincia",inversedBy="curriculumsNacimiento", cascade={"persist"})
     */
    private $provinciaNacimiento;

    /**
     * @ORM\ManyToOne(targetEntity="Localidad",inversedBy="curriculumsNacimiento", cascade={"persist"})
     */
    private $localidadNacimiento;



    /**
     * @ORM\OneToMany(targetEntity="Telefono" , mappedBy="curriculum", cascade={"persist", "detach"})
     */
    private $telefonos;


    /**
     * @var string
     *
     * @ORM\Column(name="dispotraslado",type="string", length=2)
     */
    private $dispotraslado;

    /**
     * @var string
     *
     * @ORM\Column(name="dispohoras",type="integer")
     */
    private $dispohoras;

    /**
     * @var string
     *
     * @ORM\Column(name="movilidadpropia",type="string", length=2)
     */
    private $movilidadpropia;


    //Paso
    /**
     * @ORM\OneToMany(targetEntity="Estudio" , mappedBy="curriculum", cascade={"persist", "detach"})
     */
    private $estudios;

    /**
     * @ORM\OneToMany(targetEntity="EstudioIdioma" , mappedBy="curriculum", cascade={"persist", "detach"})
     */
    private $estudioidiomas;


      /**
     * @ORM\Column(name="hasexp", type="boolean", nullable=true)
     */
    private $hasexp;





    /**
     * @ORM\OneToMany(targetEntity="ExperienciaLaboral" , mappedBy="curriculum", cascade={"persist", "detach"})
     */
    private $experienciaslaborales;

    /**
     * @ORM\Column(name="subscribir", type="boolean", nullable=true)
     */
     private $subscribir;


    /**
     * @ORM\ManyToMany(targetEntity="PostulacionesPre", inversedBy="curriculumns")
     * @ORM\JoinTable(name="curriculums_postulaciones")
     */

    private $postulaciones;


    /**
     * @var string
     *
     * @ORM\Column(name="otraspostulaciones",type="text",nullable=true )
     */
    private $otraspostulaciones;


    /**
     * @var string
     *
     * @ORM\Column(name="comentarios",type="text",nullable=true )
     */
    private $comentarios;


    /**
     * @ORM\OneToMany(targetEntity="Evento" , mappedBy="curriculum", cascade={"persist", "detach"})
     */
    private $eventos;





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

    /**
     * Set dispotraslado
     *
     * @param string $dispotraslado
     *
     * @return Curriculum
     */
    public function setDispotraslado($dispotraslado)
    {
        $this->dispotraslado = $dispotraslado;

        return $this;
    }

    /**
     * Get dispotraslado
     *
     * @return string
     */
    public function getDispotraslado()
    {
        return $this->dispotraslado;
    }

    /**
     * Set dispohoras
     *
     * @param integer $dispohoras
     *
     * @return Curriculum
     */
    public function setDispohoras($dispohoras)
    {
        $this->dispohoras = $dispohoras;

        return $this;
    }

    /**
     * Get dispohoras
     *
     * @return integer
     */
    public function getDispohoras()
    {
        return $this->dispohoras;
    }

    /**
     * Set movilidadpropia
     *
     * @param string $movilidadpropia
     *
     * @return Curriculum
     */
    public function setMovilidadpropia($movilidadpropia)
    {
        $this->movilidadpropia = $movilidadpropia;

        return $this;
    }

    /**
     * Get movilidadpropia
     *
     * @return string
     */
    public function getMovilidadpropia()
    {
        return $this->movilidadpropia;
    }

    /**
     * Add experienciaslaborale
     *
     * @param \AppBundle\Entity\ExperienciaLaboral $experienciaslaborale
     *
     * @return Curriculum
     */
    public function addExperienciaslaborale(\AppBundle\Entity\ExperienciaLaboral $experienciaslaborale)
    {
        $this->experienciaslaborales[] = $experienciaslaborale;

        return $this;
    }

    /**
     * Remove experienciaslaborale
     *
     * @param \AppBundle\Entity\ExperienciaLaboral $experienciaslaborale
     */
    public function removeExperienciaslaborale(\AppBundle\Entity\ExperienciaLaboral $experienciaslaborale)
    {
        $this->experienciaslaborales->removeElement($experienciaslaborale);
    }

    /**
     * Get experienciaslaborales
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getExperienciaslaborales()
    {
        return $this->experienciaslaborales;
    }

    /**
     * Set hasexp
     *
     * @param boolean $hasexp
     *
     * @return Curriculum
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
     * Add estudioidioma
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudioidioma
     *
     * @return Curriculum
     */
    public function addEstudioidioma(\AppBundle\Entity\EstudioIdioma $estudioidioma)
    {
        $this->estudioidiomas[] = $estudioidioma;

        return $this;
    }

    /**
     * Remove estudioidioma
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudioidioma
     */
    public function removeEstudioidioma(\AppBundle\Entity\EstudioIdioma $estudioidioma)
    {
        $this->estudioidiomas->removeElement($estudioidioma);
    }



    /**
     * Get estudioidiomas
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEstudioidiomas()
    {
        return $this->estudioidiomas;
    }


    /**
     * Set subscribir
     *
     * @param boolean $subscribir
     *
     * @return Curriculum
     */
    public function setSubscribir($subscribir)
    {
        $this->subscribir = $subscribir;

        return $this;
    }

    /**
     * Get subscribir
     *
     * @return boolean
     */
    public function getSubscribir()
    {
        return $this->subscribir;
    }

    /**
     * Set otraspostulaciones
     *
     * @param string $otraspostulaciones
     *
     * @return Curriculum
     */
    public function setOtraspostulaciones($otraspostulaciones)
    {
        $this->otraspostulaciones = $otraspostulaciones;

        return $this;
    }

    /**
     * Get otraspostulaciones
     *
     * @return string
     */
    public function getOtraspostulaciones()
    {
        return $this->otraspostulaciones;
    }

    /**
     * Set comentarios
     *
     * @param string $comentarios
     *
     * @return Curriculum
     */
    public function setComentarios($comentarios)
    {
        $this->comentarios = $comentarios;

        return $this;
    }

    /**
     * Get comentarios
     *
     * @return string
     */
    public function getComentarios()
    {
        return $this->comentarios;
    }

    /**
     * Add postulacione
     *
     * @param \AppBundle\Entity\PostulacionesPre $postulacione
     *
     * @return Curriculum
     */
    public function addPostulacione(\AppBundle\Entity\PostulacionesPre $postulacione)
    {
        $this->postulaciones[] = $postulacione;

        return $this;
    }

    /**
     * Remove postulacione
     *
     * @param \AppBundle\Entity\PostulacionesPre $postulacione
     */
    public function removePostulacione(\AppBundle\Entity\PostulacionesPre $postulacione)
    {
        $this->postulaciones->removeElement($postulacione);
    }

    /**
     * Get postulaciones
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPostulaciones()
    {
        return $this->postulaciones;
    }

    /**
     * Set paisNacimiento
     *
     * @param \AppBundle\Entity\Pais $paisNacimiento
     *
     * @return Curriculum
     */
    public function setPaisNacimiento(\AppBundle\Entity\Pais $paisNacimiento = null)
    {
        $this->paisNacimiento = $paisNacimiento;

        return $this;
    }

    /**
     * Get paisNacimiento
     *
     * @return \AppBundle\Entity\Pais
     */
    public function getPaisNacimiento()
    {
        return $this->paisNacimiento;
    }

    /**
     * Set provinciaNacimiento
     *
     * @param \AppBundle\Entity\Provincia $provinciaNacimiento
     *
     * @return Curriculum
     */
    public function setProvinciaNacimiento(\AppBundle\Entity\Provincia $provinciaNacimiento = null)
    {
        $this->provinciaNacimiento = $provinciaNacimiento;

        return $this;
    }

    /**
     * Get provinciaNacimiento
     *
     * @return \AppBundle\Entity\Provincia
     */
    public function getProvinciaNacimiento()
    {
        return $this->provinciaNacimiento;
    }

    /**
     * Set localidadNacimiento
     *
     * @param \AppBundle\Entity\Localidad $localidadNacimiento
     *
     * @return Curriculum
     */
    public function setLocalidadNacimiento(\AppBundle\Entity\Localidad $localidadNacimiento = null)
    {
        $this->localidadNacimiento = $localidadNacimiento;

        return $this;
    }

    /**
     * Get localidadNacimiento
     *
     * @return \AppBundle\Entity\Localidad
     */
    public function getLocalidadNacimiento()
    {
        return $this->localidadNacimiento;
    }

    /**
     * Add evento
     *
     * @param \AppBundle\Entity\Evento $evento
     *
     * @return Curriculum
     */
    public function addEvento(\AppBundle\Entity\Evento $evento)
    {
        $this->eventos[] = $evento;

        return $this;
    }

    /**
     * Remove evento
     *
     * @param \AppBundle\Entity\Evento $evento
     */
    public function removeEvento(\AppBundle\Entity\Evento $evento)
    {
        $this->eventos->removeElement($evento);
    }

    /**
     * Get eventos
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEventos()
    {
        return $this->eventos;
    }
}
