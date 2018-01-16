<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Helpers;


class ClientValidatorController extends Controller
{

    public function validateEmailAction(Request $request){

        $email=$request->get('email',null);
        $helper=$this->get(Helpers::class);
        return $helper->validateemail($email,$this->get('validator'));

    }
}
