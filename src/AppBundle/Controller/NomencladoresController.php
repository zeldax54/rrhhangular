<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Anno;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Helpers;


class NomencladoresController extends Controller
{


    public function gettipostelefAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Tipotelefono')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));
    }

    public function estudiotipogetAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Estudiotipo')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));

    }

    public function estudioestadogetAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Estudioestado')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));
    }

    public function estudiotitulogetAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:EstudioTitulo')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));

    }

    public function annosgetAction(){
        $fecha=new \DateTime('now');
        $actual=$fecha->format('Y');
        $annos=array();
        for($i=$actual;$i>=$actual-80;$i--){
            $anno=new Anno();
            $anno->setAnno($i);
            $anno->setId($i);
            $annos[]=$anno;
        }
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($annos,$this->container->get('jms_serializer'));


    }
    public function idiomasgetAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Idioma')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));

    }

    public function nivelesgetAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Nivel')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));

    }

    public function habilidadesgetAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Nivel')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));

    }

    public function postulacionespregetAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:PostulacionesPre')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));
    }


    public function actividadempresagetAction(){
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:ActividadEmpresa')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));
    }


    public function puestosgetAction(){
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Puesto')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));
    }









}
