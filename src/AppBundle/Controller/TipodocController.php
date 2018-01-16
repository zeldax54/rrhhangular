<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Helpers;

class TipodocController extends Controller
{


    public function getallAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Tipodoc')->findAll();
//        $tipos=array();
//        foreach($entities as $td)
//            $tipos[]=array('id'=> $td->getId(),'tipo'=>$td->getTipo());

        $helper=$this->get(Helpers::class);
        return $helper->json($entities);


    }

}
