import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
//import { Fil } from '@angular/common';
import { Personal } from '../../data/formData.model';
import { FormDataService } from '../../data/formData.service';
import { TiposDocService} from '../../services/tiposdoc.service'
import { ValidatorService} from '../../services/validator.service'
import { EstadoCivilService} from '../../services/estadocivil'
import { PaisesService} from '../../services/paises.services'
import { NomencladoresService} from '../../services/nomencladores.service'
import {Hijo} from "../../data/formData.model";
import {Telefono} from "../../data/formData.model";



@Component ({
    selector:     'mt-wizard-personal'
    ,templateUrl: './personal.component.html',

})

export class PersonalComponent implements OnInit {
    title = 'Necesitamos estos datos para conocerte y poder contactarte.';
    personal: Personal;
    form: any;
    td:any;
    emailrepetido:boolean;
    timeout:any;
    ec:any;
    Hijo: Hijo=new Hijo();
    Hijos: Array<Hijo> = [];
    paises:any;
    localidades:any;
    Telefono: Telefono=new Telefono();
    Telefonos: Array<Telefono> = [];
    tipostelefono:any;

    constructor(
        private router: Router,
        private formDataService: FormDataService,
        private tipodocservice:TiposDocService,
        private validatorservice:ValidatorService,
        private estadocivilservice:EstadoCivilService,
        private paisesservice:PaisesService,
        private nomencladoresservice:NomencladoresService) {
    }

    ngOnInit() {
       this.personal = this.formDataService.getPersonal();
       this.emailrepetido=true;
       this.tipodocservice.getTiposDoc().subscribe(
           result => {
               this.td=result;
           },
           error => {
               console.log(<any>error);
           }
       );
        this.estadocivilservice.getEstadoCivil().subscribe(
            result => {
                this.ec=result;
            },
            error => {
                console.log(<any>error);
            }
        );
        this.paisesservice.getPaises().subscribe(
            result => {
                this.paises=result;
            },
            error => {
                console.log(<any>error);
            }
        );
        this.nomencladoresservice.getTiposTelefonos().subscribe(
            result => {
                this.tipostelefono=result;
            },
            error => {
                console.log(<any>error);
            }
        );

        this.Hijos=this.personal.hijos;
        this.Telefonos=this.personal.telefonos;

    }

    validateMail(formulario:any){
        clearTimeout(this.timeout);
        var that=this;
        this.timeout = setTimeout(function (e) {
            console.log('validando');
            that.validatorservice.validateEmail(that.personal.email).subscribe(
                result => {
                    if(result['code']==400)
                    {
                        formulario.form.controls['email'].setErrors({'incorrect': true});
                        that.emailrepetido=false;
                    }else{
                        formulario.form.controls['email'].setErrors(null);
                        that.emailrepetido=true;
                    }

                },
                error => {
                    console.log(<any>error);
                }
            );

        }, 500);
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }
        this.formDataService.setPersonal(this.personal);
        return true;
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['registrar/work']);
        }
    }

    addHijo(){
        if(this.Hijo.fechanacimiento!=null){
            this.Hijos.push(this.Hijo);
            this.personal.hijos=this.Hijos;
            this.Hijo=new Hijo();
            console.log(this.personal.hijos);
        }
    }

    deleteFieldValue(index) {
        this.Hijos.splice(index, 1);
        this.personal.hijos=this.Hijos;
    }


    changeprovincia(provinciaid:any){

        if(provinciaid==-1)
            return null;

        this.localidades= this.paises.filter(item => item.id==this.personal.pais)[0].provincias.filter(item => item.id==provinciaid)[0].localidades;

    }

    changepais(){
        this.personal.provincia='-1';
        this.localidades=null;
    }



    addTelefono(){
        if(this.Telefono.numero!=null && this.Telefono.numero!=''){
            this.Telefonos.push(this.Telefono);
            this.personal.telefonos=this.Telefonos;
            this.Telefono=new Telefono();

        }
    }

    deleteTelefono(index) {
        this.Telefonos.splice(index, 1);
        this.personal.telefonos=this.Telefonos;
    }
}
