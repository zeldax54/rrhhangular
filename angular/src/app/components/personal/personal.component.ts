import { FormData } from './../../data/formData.model';
import { ValidatorService } from './../../services/validator.service';

import {retry} from 'rxjs/operators';
import { Component, OnInit,Inject } from '@angular/core';

import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../services/global";

//import {Observable} from 'rxjs/Observable';
//import {startWith} from 'rxjs/operators/startWith';
//import {map} from 'rxjs/operators/map';

import { Personal } from '../../data/formData.model';
import { FormDataService } from '../../data/formData.service';

import { TiposDocService} from '../../services/tiposdoc.service';
import { EstadoCivilService} from '../../services/estadocivil';
import { PaisesService} from '../../services/paises.services';
import { NomencladoresService} from '../../services/nomencladores.service';
import { CvService} from '../../services/cv.service';
import {Hijo} from "../../data/formData.model";
import {Telefono} from "../../data/formData.model";
import {EnvironmentSpecificService} from "../../services/enviromentSpecific";
import {MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//Date provider
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import { isNullOrUndefined } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
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
    selector:     'mt-wizard-personal'
    ,templateUrl: './personal.component.html',
    styleUrls: ['personal.component.css'],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT},
    ],

})

export class PersonalComponent implements OnInit {
    title = 'DATOS PERSONALES';
    subtitle='Necesitamos estos datos para conocerte y poder contactarte.'
    personal: Personal;
    form: any;
    td:any;
    timeout:any;
    ec:any;
    Hijo: Hijo=new Hijo();
    Hijos: Array<Hijo> = [];
    localidades:any;
    localidadesNacimiento:any;
    Telefono: Telefono=new Telefono();
    Telefonos: Array<Telefono> = [];
    tipostelefono:any;
    url:any;
    //Form Control View
    matcher = new MyErrorStateMatcher();
    matcher2 = new MyErrorStateMatcher();
    retries:number=3;
    placeholdererror:string='Error de red';
    nombreFormControl = new FormControl('', [Validators.required,]);
    apellidosFormControl = new FormControl('', [Validators.required,]);
    tipodedocumentoFormControl = new FormControl('', [Validators.required,]);
    placeholdertipodoc:string='Cargando...';
    nrodocumentoFormControl = new FormControl('', [Validators.required,]);
    emailFormControl = new FormControl('', [Validators.required,Validators.email]);
    emailFormControl2 = new FormControl('', [Validators.required,Validators.email]);
    fechadenacimientoFormControl = new FormControl('', [Validators.required]);
    lucagarNacimientoFormControl=new FormControl('', [Validators.required]);
    sexoFormControl=new FormControl('', [Validators.required]);
    estadoCivilFormControl=new FormControl('', [Validators.required]);
    placeholderestadoCivil='Cargando...';
    calleFormControl=new FormControl('', [Validators.required]);
    nroCalleFormControl=new FormControl('', [Validators.required]);
    cpFormControl=new FormControl('', [Validators.required]);
    prefixvalue:string='0000';



    paises:Array<any>=[];
    paisFormControl = new FormControl('', [Validators.required,]);
    //filteredpaises: Observable<any[]>;
    placeholderpais:string='Cargando...';

    // Nacimiento
    paisesNacimiento:Array<any>=[];
    paisNacimientoFormControl = new FormControl('', [Validators.required,]);
    //filteredpaises: Observable<any[]>;
    placeholderpaisNacimiento:string='Cargando...';

    dispotrasladolist:Array<any>=[
        {'id':'Si','nombre':'Si'},
        {'id':'No','nombre':'No'}
    ];

    dispohoraslist:Array<any>=[
        {'id':2,'valor':'2'},
        {'id':4,'valor':'4'},
        {'id':8,'valor':'8'},
    ];
    movpropiaFormControl= new FormControl('', [Validators.required,]);
    movilidadpropialist:Array<any>=[
        {'id':'Si','nombre':'Si'},
        {'id':'No','nombre':'No'}
    ];
    sexos:Array<any>=[
        {'id':'M','sexo':'Masculino'},
        {'id':'F','sexo':'Femenino'},
        {'id':'O','sexo':'Otro'}
    ];
    disphorasFormControl= new FormControl('', [Validators.required,]);
    dispotrasladoFormControl= new FormControl('', [Validators.required,]);

    classbtnAgregarHijos:string='btn btn-quaternary mr-xs mb-sm';
    classbtnAgregartelefono:string='btn btn-quaternary mr-xs mb-sm';




    constructor(
        private router: Router,
        private formDataService: FormDataService,
        private envspecific:EnvironmentSpecificService,
        private tipodocservice:TiposDocService,
        private validatorservice:ValidatorService,
        private estadocivilservice:EstadoCivilService,
        private paisesservice:PaisesService,
        private nomencladoresservice:NomencladoresService,
        private cvservice:CvService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog) {

        this.url=envspecific.envSpecific.APIURL;

        this.nombreFormControl.setErrors({
            "required": false
        });
    }



    ngOnInit() {

       this.personal = this.formDataService.getPersonal();
       this.form = this.formDataService.getFormData();
        if(this.personal.cachePersonal.td!=null){
            this.placeholdertipodoc='*Tipo de documento';
            this.td=this.personal.cachePersonal.td;
        // tslint:disable-next-line:curly
        }else
       this.tipodocservice.getTiposDoc(this.url).pipe(retry(this.retries)).subscribe(
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
        this.estadocivilservice.getEstadoCivil(this.url).pipe(retry(this.retries)).subscribe(
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
            this.placeholderpaisNacimiento='Pais de Nacimiento';
            this.paises=this.personal.cachePersonal.paises;
            this.paisesNacimiento=this.personal.cachePersonal.paisesNacimiento;
        }
        else
        this.paisesservice.getPaises(this.url).pipe(retry(this.retries)).subscribe(
            result => {
                this.paises=result;
                this.personal.cachePersonal.paises=result;
                this.placeholderpais='Pais';
                this.paisesNacimiento=result;
                this.personal.cachePersonal.paisesNacimiento=result;
                this.placeholderpaisNacimiento='Pais de Nacimiento';

            },
            error => {
                this.placeholderpais=this.placeholdererror;
                console.log(<any>error);
            }
        );
        if( this.personal.cachePersonal.tipostelefono!=null){
            this.tipostelefono=this.personal.cachePersonal.tipostelefono;
        }else
        this.nomencladoresservice.getTiposTelefonos(this.url).pipe(retry(this.retries)).subscribe(
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
        //this.openSnackBar("Comprobando información de usuario...");

       // console.log(this.form);
        if(this.form.datadownload==0){

          this.validatorservice.checktoken(this.url,localStorage.getItem('token')).pipe(retry(this.retries)).subscribe(
            result => {
                  let resultcast=result as any;
               if (resultcast.code === 200){
                 // start load cv
                   this.openSnackBar('Cargando datos de usuario...');
                   this.cvservice.getCv(this.url,resultcast.referencia).pipe(retry(this.retries)).subscribe(
                     resultcv => {
                        console.log(resultcv);
                        const cvData = resultcv as any;
                        this.form.loadedCV = cvData;
                        // Nombre y apellidos
                        this.personal.nombre = cvData.nombre;
                        this.personal.apellidos = cvData.apellido;
                        this.personal.tipodoc = cvData.tipodoc.id;
                        this.personal.nrodoc = cvData.nrodoc;
                        this.personal.email = cvData.usuario.correo;
                        this.personal.email2 = cvData.usuario.correo;
                        this.personal.paisNacimiento = cvData.pais.id;
                         //Nacimiento
                        if(cvData.pais_nacimiento!=undefined && cvData.pais_nacimiento!='null')
                        this.personal.paisNacimiento=cvData.pais_nacimiento.id;
                        if (cvData.provincia_nacimiento != undefined && cvData.provincia_nacimiento != 'null')
                         this.personal.provinciaNacimiento = cvData.provincia_nacimiento.id;
                          if (cvData.localidad_nacimiento != undefined && cvData.localidad_nacimiento.id != undefined)
                          {
                            this.changeprovinciaNacimiento(cvData.provincia_nacimiento.id);
                            this.personal.localidadNacimiento = cvData.localidad_nacimiento.id;
                          }

                        this.personal.fechanacimiento = this.convertUTCDateToLocalDate( cvData.fechanacimiento);
                        if(cvData.lugarnacimiento!=undefined && cvData.lugarnacimiento!=null)
                         this.personal.lugarnacimiento=cvData.lugarnacimiento;
                         this.personal.sexo=cvData.sexo;
                         this.personal.estadocivil = cvData.estadocivil.id;
                          //Nacimiento end
                         //Hijos
                         if(cvData.hijos.length>0){
                          for (var _i = 0; _i < cvData.hijos.length; _i++) {
                            cvData.hijos[_i].fechanacimiento=this.convertUTCDateToLocalDate(cvData.hijos[_i].fechanacimiento);
                          }
                           this.personal.hijos=cvData.hijos as Hijo[];
                           this.Hijos=cvData.hijos as Hijo[];
                         }
                         //
                         this.personal.calle=cvData.calle;
                         this.personal.nrocalle=cvData.nrocalle;
                         this.personal.piso=cvData.piso;
                         this.personal.depto=cvData.depto;
                         this.personal.codigopostal=cvData.codigopostal;
                         //Pais actual
                         if(cvData.pais!=undefined && cvData.pais!='null')
                         this.personal.pais=cvData.pais.id;
                         if (cvData.provincia != undefined && cvData.provincia != 'null')
                          this.personal.provincia = cvData.provincia.id;
                           if (cvData.localidad != undefined && cvData.localidad.id != undefined)
                           {
                             this.changeprovincia(cvData.provincia.id);
                             this.personal.localidad = cvData.localidad.id;
                           }
                           //pais actual end

                           //Telefonos
                           if(cvData.telefonos!=undefined && cvData.telefonos.length>0){
                            for (var _i = 0; _i < cvData.telefonos.length; _i++) {
                              cvData.telefonos[_i].tipo=cvData.telefonos[_i].tipo.id.toString();
                            }
                            this.personal.telefonos=cvData.telefonos as Telefono[];
                            this.Telefonos=cvData.telefonos as Telefono[];
                           }

                           this.personal.dispotraslado=cvData.dispotraslado;
                           this.personal.dispohoras=cvData.dispohoras.toString();
                           this.personal.movilidadpropia=cvData.movilidadpropia;

                           this.form.datadownload=1;

                     },
                     error => {
                         this.openSnackBar('Error obteniendo datos del cv ingresado...')
                         console.log(<any>error);
                     }
                 );
                  // End load CV

               }
               else{

               }
            },
            error => {
                this.openSnackBar("Error de logueo")
                console.log(<any>error);
            }
        );

        }




        window.scrollTo(0, 0);

    }

     convertUTCDateToLocalDate(date:Date) {
      var finalDate=new Date(date);
      return new Date(finalDate.setDate(finalDate.getDate()+1));
    }


    validateMail(formulario:any){
        clearTimeout(this.timeout);
        var that=this;
        this.timeout = setTimeout(function (e) {
            that.validatorservice.validateEmail(that.url,that.personal.email).pipe(retry(this.retries)).subscribe(
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

    validateMail2(furmulario:any){

        clearTimeout(this.timeout);
        var that=this;
        this.timeout = setTimeout(function (e) {

            if(that.personal.email!=that.personal.email2){

                that.emailFormControl2.setErrors({
                    'repetido': true
                });
                that.openSnackBar('Los emails no coinciden.')

            }
            else{
                that.emailFormControl2.clearValidators();
            }

        }, 700);

    }

    openSnackBar(message: string, action: string='',durationparam=2000) {
        this.snackBar.open(message, action, {
            duration: durationparam,
        });
    }

    save(form: any): boolean {
      if(this.personal.telefonos.length==0){

        let snackBarRef =  this.snackBar.open("Por favor ingrese un número telefónico.","Completar", { duration: 4000 }); snackBarRef.onAction().subscribe(()=> this.focus());
        return false;
      }

      let errorExist=false;
           if(
            this.nombreFormControl.hasError('required') ||
            this.apellidosFormControl.hasError('required') ||
            this.tipodedocumentoFormControl.hasError('required') ||
            this.nrodocumentoFormControl.hasError('required') ||
            this.emailFormControl.hasError('required') ||
            this.emailFormControl2.hasError('required') ||
            this.fechadenacimientoFormControl.hasError('required') ||
            this.lucagarNacimientoFormControl.hasError('required') ||
            this.sexoFormControl.hasError('required') ||
            this.estadoCivilFormControl.hasError('required') ||
            this.calleFormControl.hasError('required') ||
            this.nroCalleFormControl.hasError('required') ||
            this.cpFormControl.hasError('required')

           ){
            errorExist=true;
           }

        if (!form.valid || errorExist==true) {
          let snackBarRef = this.snackBar.open("Por favor complete todos los campos obligatorios.","Completar", { duration: 4000 }); snackBarRef.onAction().subscribe(()=> this.focus());
            return false;
        }
        this.formDataService.setPersonal(this.personal);
        return true;
    }

    focus(){
      window.scrollTo(0, 0);
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['registrar/work']);
        }
    }

    addHijo(){

        if(this.Hijo.fechanacimiento>=new Date()){
            this.openSnackBar('La fecha de nacimiento no puede ser mayor que la actual!!');
            return;
        }

        if(this.Hijo.fechanacimiento!=null && this.Hijo.sexo!=null){
            this.Hijos.push(this.Hijo);
            this.personal.hijos=this.Hijos;
            this.Hijo=new Hijo();
            this.classbtnAgregarHijos='btn btn-quaternary mr-xs mb-sm';
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

    changeprovinciaNacimiento(provinciaid:any){

        if(provinciaid==-1)
            return null;
        this.localidadesNacimiento= this.paisesNacimiento.
        filter(item => item.id == this.personal.paisNacimiento)[0].provincias.filter(item => item.id==provinciaid)[0].localidades;
    }


    changepais(){
        this.personal.provincia='-1';
        this.localidades=null;
    }


    changepaisNacimiento(){
        this.personal.provinciaNacimiento='-1';
        this.localidadesNacimiento=null;
    }




    addTelefono() {
       if(this.Telefono.tipo === null || this.Telefono.tipo===""){
           this.openSnackBar('Especifique el tipo de teléfono!!!')
           return;
       }
        if(this.Telefono.numero!=null && this.Telefono.numero!=''){

          if(this.prefixvalue=="0000")
          this.Telefono.numero=this.Telefono.numero;
          else
            this.Telefono.numero=this.prefixvalue+'-'+this.Telefono.numero;
            this.Telefonos.push(this.Telefono);
            this.personal.telefonos=this.Telefonos;
            this.Telefono=new Telefono();
            this.classbtnAgregartelefono='btn btn-quaternary mr-xs mb-sm';

        }
    }

    deleteTelefono(index) {
        this.Telefonos.splice(index, 1);
        this.personal.telefonos=this.Telefonos;
    }

    Colorear(){
        if(this.Hijo.fechanacimiento!=null)
        this.classbtnAgregarHijos='btn btn-warning mr-xs mb-sm';
        else
            this.classbtnAgregarHijos='btn btn-quaternary mr-xs mb-sm';
    }

    ColorearAddTelefono(){
        if(this.Telefono.numero!=null)
            this.classbtnAgregartelefono='btn btn-warning mr-xs mb-sm';
        else
            this.classbtnAgregartelefono='btn btn-quaternary mr-xs mb-sm';
    }

    changefechanacimiento(event){ // Validar cambio fecha nacimiento no permitir una fecha posterior a la actual

        if(this.personal.fechanacimiento!=null){
           var newdate = new Date();
            if(newdate<=this.personal.fechanacimiento){
                this.openSnackBar('La fecha seleccionada es mayor que la actual!!!');
                this.personal.fechanacimiento=null;
                this.fechadenacimientoFormControl.setValue(null);
            }

        }

    }

    prefixDialog(){
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: { prefijo: this.prefixvalue }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if(result==null || result=='' || result==" " || isNullOrUndefined(result)){
                result='0000';
                return;
            }
            this.prefixvalue = result;
          });
    }


}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'prefixdialog.html',
  })
  export class DialogOverviewExampleDialog {

    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
