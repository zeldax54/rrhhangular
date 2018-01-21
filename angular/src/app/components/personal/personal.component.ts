import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/retry';
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../services/global";

//import {Observable} from 'rxjs/Observable';
//import {startWith} from 'rxjs/operators/startWith';
//import {map} from 'rxjs/operators/map';

import { Personal } from '../../data/formData.model';
import { FormDataService } from '../../data/formData.service';

import { TiposDocService} from '../../services/tiposdoc.service'
import { ValidatorService} from '../../services/validator.service'
import { EstadoCivilService} from '../../services/estadocivil'
import { PaisesService} from '../../services/paises.services'
import { NomencladoresService} from '../../services/nomencladores.service'
import {Hijo} from "../../data/formData.model";
import {Telefono} from "../../data/formData.model";
import {EnvironmentSpecificService} from "../../services/enviromentSpecific";
import {MatTableDataSource} from '@angular/material';



@Component ({
    selector:     'mt-wizard-personal'
    ,templateUrl: './personal.component.html',

})

export class PersonalComponent implements OnInit {
    title = 'Necesitamos estos datos para conocerte y poder contactarte.';
    personal: Personal;
    form: any;
    td:any;
    timeout:any;
    ec:any;
    Hijo: Hijo=new Hijo();
    Hijos: Array<Hijo> = [];
    localidades:any;
    Telefono: Telefono=new Telefono();
    Telefonos: Array<Telefono> = [];
    tipostelefono:any;
    url:any;
    //Form Control View
    matcher = new MyErrorStateMatcher();
    retries:number=3;
    placeholdererror:string='Error de red';
    nombreFormControl = new FormControl('', [Validators.required,]);
    apellidosFormControl = new FormControl('', [Validators.required,]);
    tipodedocumentoFormControl = new FormControl('', [Validators.required,]);
    placeholdertipodoc:string='Cargando...';
    nrodocumentoFormControl = new FormControl('', [Validators.required,]);
    emailFormControl = new FormControl('', [Validators.required,Validators.email]);
    fechadenacimientoFormControl = new FormControl('', [Validators.required]);
    lucagarNacimientoFormControl=new FormControl('', [Validators.required]);
    sexoFormControl=new FormControl('', [Validators.required]);
    estadoCivilFormControl=new FormControl('', [Validators.required]);
    placeholderestadoCivil='Cargando...';
    calleFormControl=new FormControl('', [Validators.required]);
    nroCalleFormControl=new FormControl('', [Validators.required]);

    paises:Array<any>=[];
    paisFormControl = new FormControl('', [Validators.required,]);
    //filteredpaises: Observable<any[]>;
    placeholderpais:string='Cargando...';

    dispotrasladolist:Array<any>=[
        {'id':'Si','nombre':'Si'},
        {'id':'No','nombre':'No'}
    ];

    dispohoraslist:Array<any>=[
        {'id':2,'valor':2},
        {'id':4,'valor':4},
        {'id':8,'valor':8},

    ];
    movpropiaFormControl= new FormControl('', [Validators.required,]);
    movilidadpropialist:Array<any>=[
        {'id':'Si','nombre':'Si'},
        {'id':'No','nombre':'No'}
    ];





    constructor(
        private router: Router,
        private formDataService: FormDataService,
        private envspecific:EnvironmentSpecificService,
        private tipodocservice:TiposDocService,
        private validatorservice:ValidatorService,
        private estadocivilservice:EstadoCivilService,
        private paisesservice:PaisesService,
        private nomencladoresservice:NomencladoresService) {

        this.url=envspecific.envSpecific.APIURL;

        this.nombreFormControl.setErrors({
            "required": false
        });



    }










    ngOnInit() {
       this.personal = this.formDataService.getPersonal();
        if(this.personal.cachePersonal.td!=null){
            this.placeholdertipodoc='*Tipo de documento';
            this.td=this.personal.cachePersonal.td;
        }else
       this.tipodocservice.getTiposDoc(this.url).retry(this.retries).subscribe(
           result => {
               this.td=result;
               this.personal.cachePersonal.td=result;
               this.placeholdertipodoc='*Tipo de documento';
           },
           error => {
               this.placeholdertipodoc=this.placeholdererror;
               console.log(<any>error);
           }
       );
        if(this.personal.cachePersonal.ec!=null){
            this.placeholderestadoCivil='Estado Civil';
            this.ec=this.personal.cachePersonal.ec;
        }else
        this.estadocivilservice.getEstadoCivil(this.url).retry(this.retries).subscribe(
            result => {
                this.ec=result;
                this.personal.cachePersonal.ec=result;
                this.placeholderestadoCivil='Estado Civil';
            },
            error => {
                this.placeholderestadoCivil=this.placeholdererror;
                console.log(<any>error);
            }
        );
        if(this.personal.cachePersonal.paises!=null){
            this.placeholderpais='Pais';
            this.paises=this.personal.cachePersonal.paises;
        }else
        this.paisesservice.getPaises(this.url).retry(this.retries).subscribe(
            result => {
                this.paises=result;
                this.personal.cachePersonal.paises=result;
                this.placeholderpais='Pais';
            },
            error => {
                this.placeholderpais=this.placeholdererror;
                console.log(<any>error);
            }
        );
        if( this.personal.cachePersonal.tipostelefono!=null){
            this.tipostelefono=this.personal.cachePersonal.tipostelefono;
        }else
        this.nomencladoresservice.getTiposTelefonos(this.url).retry(this.retries).subscribe(
            result => {
                this.personal.cachePersonal.tipostelefono=result;
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
            console.log('validando'+that.personal.email);
            that.validatorservice.validateEmail(that.url,that.personal.email).retry(this.retries).subscribe(
                result => {
                    console.log(result['code']);
                    if(result['code']==400)
                    {
                        that.emailFormControl.setErrors({
                            "notUnique": true
                        });

                    }else{
                        that.emailFormControl.clearValidators();
                    }

                },
                error => {
                    console.log(<any>error);
                }
            );

        }, 2500);
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
