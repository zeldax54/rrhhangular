import { Component, OnInit, Input }   from '@angular/core';
import { Router } from '@angular/router';
import { FormData }                   from '../../data/formData.model';
import { FormDataService }            from '../../data/formData.service';
import {Personal} from "../../data/formData.model";
import {Estudio} from "../../data/formData.model";
import {EstudioCursado} from "../../data/formData.model";
import {EstudioIdioma} from "../../data/formData.model";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ValidatorService} from "../../services/validator.service";
import {EnvironmentSpecificService} from "../../services/enviromentSpecific";
import {Result} from "../../data/formData.model";
import {NomencladoresService} from "../../services/nomencladores.service";
import {CvService} from "../../services/cv.service";
import {MyErrorStateMatcher} from "../../services/global";
//Date provider
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';
import * as _moment from 'moment';
import {Experiencia} from "../../data/formData.model";
import {ExperienciaLaboral} from "../../data/formData.model";

const moment = _moment;
export const CUSTOM_DATE_FORMAT = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component ({
    selector:     'mt-wizard-result'
    ,templateUrl: './result.component.html',
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT},
    ],
})

export class ResultComponent implements OnInit {
    title = 'Thanks for staying tuned!';
    @Input() formData: FormData;
    isFormValid: boolean = false;
    timeout:any;
    url:any;
    //nombre:string='';
    //apellidos:string='';
    //email:string='';
    //fechanacimiento:Date=null;
    personal:Personal;
    estudio:Estudio;
    experienciaLaboral:ExperienciaLaboral;
    nombreFormControl = new FormControl('', [Validators.required,]);
    pstulacionesFormControl = new FormControl('', [Validators.required,]);
    apellidosFormControl = new FormControl('', [Validators.required,]);
    emailFormControl = new FormControl('', [Validators.required,Validators.email]);
    fechadenacimientoFormControl = new FormControl('', [Validators.required]);
    postulacionespre:Array<any>=[];
    result:Result;
    retries:number=3;
    postulacionespreplaceholder:string='Cargando...';
    matcher = new MyErrorStateMatcher();
    enviado:boolean=false;

    constructor(
        private formDataService: FormDataService,
        private envspecific:EnvironmentSpecificService,
        private validatorservice:ValidatorService,
        private nomencladoresservice:NomencladoresService,
        private cvService:CvService,
        private router: Router,
        public snackBar: MatSnackBar

    ) {
        this.url=envspecific.envSpecific.APIURL;
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        this.personal=this.formDataService.getPersonal();
        this.estudio=this.formDataService.getEstudio();
        this.experienciaLaboral=this.formDataService.getExperienciaLaboral();
        this.result=this.formDataService.getResult();

        if( this.formData.postulaciones.length==0){
            this.nomencladoresservice.getPostulacionesPre(this.url).retry(this.retries).subscribe(
                result => {

                    this.postulacionespreplaceholder='Postulaciones';
                    this.postulacionespre=result;
                    this.formData.postulaciones=result;
                },
                error => {
                    console.log(<any>error);
                }
            );


        }else{
            this.postulacionespreplaceholder='Postulaciones';
            console.log(this.formData.postulaciones);
            this.postulacionespre=this.formData.postulaciones;
        }
        window.scrollTo(0, 0);
    }

    openSnackBar(message: string, action: string='') {
        this.snackBar.open(message, action, {
            duration: 10000,
        });
    }


    submit() {
        let nombre=this.personal.nombre;
        let emmail=this.personal.email;

        //Enviar CV here
        if(1==1){ // IF formlario es valido
            this.personal.nombre=nombre;
            this.personal.email=emmail;

            let personalData=this.personal;
            let estudioData=this.estudio;
            let experienciaLaboralData=this.experienciaLaboral;
            personalData.cachePersonal=null;
            estudioData.cacheEstudio=null;
            this.cvService.sendCv(this.url,personalData,estudioData,experienciaLaboralData,this.result).retry(this.retries).subscribe(
                result => {
                 if(result.code==200){
                     this.enviado=true;
                     this.formData = this.formDataService.resetFormData();
                     this.isFormValid = false;
                     this.formDataService.setPersonal(this.personal);
                     this.router.navigate(['registrar/aftersend']);
                 }
                    else{
                     this.enviado=false;
                     this.openSnackBar("Ha ocurrido un error mientras se enviaban los datos. Si el error persiste envie este mensaje a los " +
                         "administradores."+result.message);
                 }

                },
                error => {
                    console.log(<any>error);
                }
            );


        }

    }

    FormSave(){
        this.formDataService.setResult(this.result);
    }

    validateMail(){
        clearTimeout(this.timeout);
        var that=this;
        this.timeout = setTimeout(function (e) {
            that.validatorservice.validateEmail(that.url,that.personal.email).retry(this.retries).subscribe(
                result => {

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
}
