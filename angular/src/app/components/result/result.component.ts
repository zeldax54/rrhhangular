import { Component, OnInit, Input }   from '@angular/core';

import { FormData }                   from '../../data/formData.model';
import { FormDataService }            from '../../data/formData.service';
import {Personal} from "../../data/formData.model";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ValidatorService} from "../../services/validator.service";
import {EnvironmentSpecificService} from "../../services/enviromentSpecific";
import {Result} from "../../data/formData.model";
import {NomencladoresService} from "../../services/nomencladores.service";
import {MyErrorStateMatcher} from "../../services/global";
@Component ({
    selector:     'mt-wizard-result'
    ,templateUrl: './result.component.html'
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
    nombreFormControl = new FormControl('', [Validators.required,]);
    pstulacionesFormControl = new FormControl('', [Validators.required,]);
    apellidosFormControl = new FormControl('', [Validators.required,]);
    emailFormControl = new FormControl('', [Validators.required,Validators.email]);
    fechadenacimientoFormControl = new FormControl('', [Validators.required]);
    postulacionespre:Array<any>=[];
    result:Result=new Result();
    retries:number=3;
    postulacionespreplaceholder:string='Cargando...';
    matcher = new MyErrorStateMatcher();
    constructor(
        private formDataService: FormDataService,
        private envspecific:EnvironmentSpecificService,
        private validatorservice:ValidatorService,
        private nomencladoresservice:NomencladoresService

    ) {
        this.url=envspecific.envSpecific.APIURL;
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
         this.personal=this.formDataService.getPersonal();
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
            this.postulacionespre=this.formData.postulaciones;
        }

        console.log('Result feature loaded!');
        window.scrollTo(0, 0);
    }

    submit() {
        alert('Excellent Job!');
        this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
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
