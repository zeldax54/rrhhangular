<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Curriculum;
use AppBundle\Entity\Estudio;
use AppBundle\Entity\EstudioIdioma;
use AppBundle\Entity\ExperienciaLaboral;
use AppBundle\Entity\Hijos;
use AppBundle\Entity\PostulacionesPre;
use AppBundle\Entity\Telefono;
use AppBundle\Entity\Usuario;
use Swift_TransportException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Helpers;


class CvController extends Controller
{



    public function createAction(Request $request){

        $helper=$this->get(Helpers::class);
        try{

            //Repos
            $em = $this->getDoctrine()->getManager();

            $personal=json_decode($request->get('jsonPersonal',null));
            $curriculum=new Curriculum();
            $curriculum->setNombre($personal->nombre);
            $curriculum->setApellido($personal->apellidos);
            $curriculum->setTipodoc($this->findChild($em->getRepository('AppBundle:Tipodoc'),$personal->tipodoc));
            $curriculum->setNrodoc($personal->nrodoc);
            $curriculum->setFechanacimiento(new \DateTime($personal->fechanacimiento));
            $curriculum->setLugarnacimiento($personal->lugarnacimiento);
            foreach($personal->hijos as $hijo){
                $h=new Hijos();
                $h->setFechanacimiento(new \DateTime($hijo->fechanacimiento));
               $curriculum->addHijo($h);
                $h->setCurriculum($curriculum);
            }
            $curriculum->setCalle($personal->calle);
            $curriculum->setNrocalle($personal->nrocalle);
            $curriculum->setPiso($personal->piso);
            $curriculum->setDepto($personal->depto);
            $curriculum->setCodigopostal($personal->codigopostal);
            $curriculum->setPais($this->findChild($em->getRepository('AppBundle:Pais'),$personal->pais));
            $curriculum->setProvincia($this->findChild($em->getRepository('AppBundle:Provincia'),$personal->provincia));
            $curriculum->setLocalidad($this->findChild($em->getRepository('AppBundle:Localidad'),$personal->localidad));
            foreach($personal->telefonos as $telefono){
                $t=new Telefono();
                $t->setNumero($telefono->numero);
                $t->setTipo($this->findChild($em->getRepository('AppBundle:Tipotelefono'),$telefono->tipo));
                $curriculum->addTelefono($t);
                $t->setCurriculum($curriculum);
            }
            $curriculum->setDispotraslado($personal->dispotraslado);
            $curriculum->setDispohoras($personal->dispohoras);
            $curriculum->setMovilidadpropia($personal->movilidadpropia);

            $usuario=new Usuario();
            $usuario->setNombre($personal->nombre);
            $usuario->setCorreo($personal->email);
            $usuario->setFechacreacion(new \DateTime('now'));
            $usuario->setTipodoc($this->findChild($em->getRepository('AppBundle:Tipodoc'),$personal->tipodoc));
            $usuario->setNrodoc($personal->nrodoc);
            $usuario->setRoles($em->getRepository('AppBundle:Rol')->findOneBynombre('ROLE_USUARIO'));

            $encoder= $this->container->get('security.password_encoder');
            $password=mb_substr($helper->_random(),0,8);
            $encoded = $encoder->encodePassword($usuario, $password);
            $usuario->setPassword($encoded);
            $usuario->setSalt(md5(time()));//
            $curriculum->setSexo($personal->sexo);
            $curriculum->setEstadocivil($this->findChild($em->getRepository('AppBundle:Estadocivil'),$personal->estadocivil));
            $usuario->setCurriculum($curriculum);
            $curriculum->setUsuario($usuario);
            //Seccion Estudio
            $estudio=json_decode($request->get('jsonEstudio',null));
            foreach($estudio->estudioscursados as $estudiocursado){
                $eC=new Estudio();
                $eC->setTipo($this->findChild($em->getRepository('AppBundle:Estudiotipo'),$estudiocursado->estudiotipo));
                $eC->setInstitucion($estudiocursado->institucion);
                $eC->setEstado($this->findChild($em->getRepository('AppBundle:Estudioestado'),$estudiocursado->estudioestado));
                if($estudiocursado->estudiotitulo!=null)
                $eC->setTitulo($this->findChild($em->getRepository('AppBundle:EstudioTitulo'),$estudiocursado->estudiotitulo->id));
                $eC->setAnnoingreso($estudiocursado->annoingreso);
                $eC->setAnnoegreso($estudiocursado->annoegreso);
                $eC->setMateriasaprobadas($estudiocursado->materiasaprobadas);
                $eC->setCantidadmaterias($estudiocursado->cantidadmaterias);
                $eC->setAnnosaprobadoscursados($estudiocursado->annosaprobadoscursados);
                $curriculum->addEstudio($eC);
                $eC->setCurriculum($curriculum);
            }
              //Estudio Idiomas
            foreach($estudio->estudioIdiomas as $estudioIdioma){
                $eI=new EstudioIdioma();
                $eI->setNivel($this->findChild($em->getRepository('AppBundle:Nivel'),$estudioIdioma->nivel));
                $eI->setHabilidad($this->findChild($em->getRepository('AppBundle:Habilidad'),$estudioIdioma->habilidad));
                $eI->setIdioma($this->findChild($em->getRepository('AppBundle:Idioma'),$estudioIdioma->idioma));
                $eI->setCurriculum($curriculum);
                $curriculum->addEstudioidioma($eI);
            }
            //Cursos seminarios congresos
            $curriculum->setCursos($estudio->cursos);
            $curriculum->setCongresos($estudio->congresos);
            $curriculum->setSeminarios($estudio->seminarios);

            //Seccion ExperienciaLaboral
            $experienciaLaboral=json_decode($request->get('jsonExperienciaLaboral',null));

            if($experienciaLaboral->hasexperiencia==true){
                $curriculum->setHasexp(true);
                foreach($experienciaLaboral->experiencias as $experiencia){

                    $eL=new ExperienciaLaboral();
                    $eL->setEmpresa($experiencia->empresa);
                    $eL->setFechainreso(new \DateTime($experiencia->fechaingreso));
                    if($experiencia->fechaegreso!=null)
                    $eL->setFechaegreso(new \DateTime($experiencia->fechaegreso));
				    if($experiencia->actualmente==true || $experiencia->actualmente=='true')
						$experiencia->actualmente=1;
					if($experiencia->actualmente==null || $experiencia->actualmente==false || $experiencia->actualmente=='false')
						$experiencia->actualmente=0;
                    $eL->setActualmente($experiencia->actualmente);
                    $eL->setModoegreso($experiencia->modoegreso);
                    $eL->setMotivoegreso($experiencia->motivoegreso);
                    $eL->setPuestodesempenado($experiencia->puestodesempenado);
                    $eL->setPrincipalesresponsabilidades($experiencia->principalesresponsabilidades);
                    $eL->setPrincipalestareas($experiencia->principalestareas);
                    $eL->setActividadempresa($this->findChild($em->getRepository('AppBundle:ActividadEmpresa'),$experiencia->actividadempresa));
                    $eL->setTelefono($experiencia->telefono);
                    $eL->setReferencias($experiencia->referencias);
                    $eL->setEmail($experiencia->email);
                    $eL->setPais($this->findChild($em->getRepository('AppBundle:Pais'),$experiencia->pais));
                    $eL->setCurriculum($curriculum);
                    $curriculum->addExperienciaslaborale($eL);

                }
            }

            //Result
            $resulttado=json_decode($request->get('jsonResult',null));
            foreach($resulttado->postulaciones as $postulacion){
                $pP=$this->findChild($em->getRepository('AppBundle:PostulacionesPre'),$postulacion);
                $curriculum->addPostulacione($pP);
            }
            $curriculum->setComentarios($resulttado->comentarios);
            if($resulttado->subscribir==true)
            $curriculum->setSubscribir(true);
            $curriculum->setOtraspostulaciones($resulttado->otraspostulaciones);
            $em->persist($curriculum);
            $em->persist($usuario);
            $em->flush();
            //Enviar correo
            $baseUrl=$helper->getConfigurationValue('baseUrl');
            $message = \Swift_Message::newInstance()
                ->setSubject('Te damos la bienvenida!');
            $message->setFrom($helper->getConfigurationValue('bienvenidaremitente'));
            $message->setContentType("text/html");
            $nombre=$curriculum->getNombre();
            $apellido=$curriculum->getApellido();
            $body='<div style="text-align: center"><img src="'.$baseUrl.'/assets/rrhh/imgs/logo_excelencia.png"></div><br>';
            $body.='<p class="" style="font-family: sans-serif"><span style="font-size:12.0pt">Hola <b>'.$nombre.' '.$apellido.'</b></span></p>';

            $body.='<p class="MsoNormal"><span style="font-size:12.0pt;font-family: sans-serif" lang="es-419">Te damos la bienvenida a Excelencia & Trabajo. Ya te incluimos en nuestra base de datos y podrás acceder para realizar tus postulaciones o modificar datos de tu CV. Estos son tus datos de registro, podes loguearte con tu email o con tu número de documento registrado accediendo a <a href="'.$baseUrl.'/login" style="color:#00b0f0">esta dirección.</a></span></p>';
            $body.='<div style="font-family: sans-serif"><span><b>Email: </b></span><span>'.$usuario->getCorreo().'</span></div>';
            $body.='<div style="font-family: sans-serif"><span><b>Nro. de documento: </b></span><span>'.$curriculum->getNrodoc().'</span></div>';
            $body.='<div style="font-family: sans-serif"><span><b>Contraseña: </b></span><span>'.$password.'</span></div><br>';

            $body.='<div style="font-family: sans-serif"><span>También podes seguirnos en Facebook haciendo </span><span><a href="'.$helper->getConfigurationValue('facebookURL').'" style="color:#00b0f0">click aquí</a> para enterarte todas nuestras novedades.</span></div><br>';
            $body.='<p style="font-family: sans-serif"><b><span style="font-size:12.0pt;color:#ed7d31" lang="es-419">Contactanos</span></b><b><span style="font-size:14.0pt;color:#ed7d31" lang="es-419">:</span></b></p>';

            $body.='<div style="font-family: sans-serif"><span><b>Dirección: </b></span><span>'.$helper->getConfigurationValue('direccionFisica').'</span></div>';
            $body.='<div style="font-family: sans-serif"><span><b>Teléfono: </b></span><span>'.$helper->getConfigurationValue('telefono').'</span></div>';
            $body.='<div style="font-family: sans-serif"><span><b>Email: </b></span><span>'.$helper->getConfigurationValue('emailCorporativo').'</span></div>';



            $to=array(
                0 =>$usuario->getCorreo(),
            );
            $message ->setTo($to);
            $message->setBody(
                $body
            );
            $this->get('mailer')->send($message);
            $response=array(
            'code'=>200,
            'message'=>'Datos registrados exitosamente!!!'
            );

            return $helper->JMSSerializar($response,$this->container->get('jms_serializer'));
        }
        catch(Swift_TransportException  $e){

                $response=array(
                    'code'=>500,
                    'message'=>$e->getMessage().' '.'Datos registrador pero correo no enviado. Contacte a la administracion del sitio para activar su usuario',
                    'linea'=>$e->getLine()

                );
            return $helper->JMSSerializar($response,$this->container->get('jms_serializer'));

        }
        catch(\Exception $e){
            $response=array(
                'code'=>500,
                'message'=>$e->getMessage(),
                'linea'=>$e->getLine()
            );
            return $helper->JMSSerializar($response,$this->container->get('jms_serializer'));
        }

    }

       private function findChild($repo,$id){
        if($id==null || $id=="")
            return null;
        return $repo->find($id);

    }
}
