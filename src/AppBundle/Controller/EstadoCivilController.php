<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Helpers;

class EstadoCivilController extends Controller
{


    public function getallAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Estadocivil')->findAll();
        $helper=$this->get(Helpers::class);
        return $helper->JMSSerializar($entities,$this->container->get('jms_serializer'));



    }

}
