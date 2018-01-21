import { Component, OnInit,ViewChild }   from '@angular/core';
import { Router }              from '@angular/router';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../services/global";

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { EnvironmentSpecificService }     from '../../services/enviromentSpecific';
import { NomencladoresService }     from '../../services/nomencladores.service';

import { FormDataService }     from '../../data/formData.service';
import {Estudio} from "../../data/formData.model";
import { EnvSpecific} from "../../models/envSpecific";
import {EstudioIdioma} from "../../data/formData.model";

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EstuduiIdiomaVisual} from "../../data/formData.model";
import {MatSnackBar} from '@angular/material';


//@import '../node_modules/@swimlane/ngx-datatable/release/index.css';
//@import '../node_modules/@swimlane/ngx-datatable/release/themes/material.css';
//@import '../node_modules/@swimlane/ngx-datatable/release/assets/icons.css';
//
//@import "assets/css/overridetable.css";


@Component ({
    selector:     'mt-wizard-work'
    ,templateUrl: './work.component.html'
})

export class WorkComponent implements OnInit {
    title = 'Formación académica';
    url:any;
    estudio: Estudio;
    form: any;
    estudiostipo:Array<any>=[];
    estudiostipoPlaceholder:string='Cargando...';
    estudioestados:Array<any>=[];
    estudioestadosPlaceholder:string='Cargando...';
    estudiotitulos:Array<any>=[];
    estudiotitulosPlaceholder:string='Cargando...';
    completado:boolean=false;
    encurso:boolean=false;
    incompleto:boolean=false;

    institucionFormControl = new FormControl('', [Validators.required,]);
    estudiotipoFormControl = new FormControl('', [
        Validators.required,
    ]);
    estudioestadoFormControl=new FormControl('', [
        Validators.required,
    ]);

    annos:Array<any>=[];
    annoseg:Array<any>=[];
    retries:number=3;

    estudiotitulosCtrl: FormControl;
    annoingresoCtrl: FormControl;
    annoegresoCtrl: FormControl;
    filteredStates: Observable<any[]>;
    filterannos: Observable<any[]>;
    filterannoseg: Observable<any[]>;

    matcher = new MyErrorStateMatcher();
    //EstudioIdiomas
    estudioIdioma:EstudioIdioma=new EstudioIdioma();
    estudioIdiomasList:Array<EstuduiIdiomaVisual>=[];
    idiomas:Array<any>;
    niveles:Array<any>;
    idiomasPlaceHolder='Cargando...';
    nivelesPlaceHolder='Cargando...';
    //Tabla Idioma


    //Table test
    displayedColumns = ['idioma','nivellectura','nivelescritura','nivelconversacion','actions'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;






    constructor(private router: Router,private envspecific:EnvironmentSpecificService,
                private nomencladoresservice:NomencladoresService,
                private formDataService: FormDataService,public snackBar: MatSnackBar) {
        this.url=envspecific.envSpecific.APIURL;
        this.estudiotitulosCtrl = new FormControl();
        this.filteredStates = this.estudiotitulosCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this.filterStates(state) : this.estudiotitulos.slice())
            );

        this.annoingresoCtrl=new FormControl();
        this.filterannos = this.annoingresoCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this.filterannosf(state) : this.annos.slice())
            );

        this.annoegresoCtrl=new FormControl();
        this.filterannoseg = this.annoegresoCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this.filterannosfeg(state) : this.annoseg.slice())
            );

        this.dataSource=  new MatTableDataSource(this.estudioIdiomasList);
    }

    filterannosf(anno: any){

        return this.annos.filter(state =>
        state.anno.toString().toLowerCase().indexOf(anno.toString().toLowerCase()) === 0);
    }

    filterannosfeg(anno: any){

        return this.annoseg.filter(state =>
        state.anno.toString().toLowerCase().indexOf(anno.toString().toLowerCase()) === 0);
    }

    filterStates(nombre: any) {
        if(!isNaN(Number(nombre))){

            return this.estudiotitulos.filter(state =>
            state.id==nombre);
        }
        if(typeof nombre != 'object'){
            return this.estudiotitulos.filter(state =>
            state.nombre.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
        }

        return this.estudiotitulos.filter(state =>
        state.nombre.toLowerCase().indexOf(nombre.nombre.toLowerCase()) === 0);
    }

    displayFn(project): string {
        return project ? project.nombre : project;
    }

    ngOnInit() {
        this.estudio = this.formDataService.getEstudio();

        if(this.estudio.cacheEstudio.estudiostipo!=null)
        {
            this.estudiostipo=this.estudio.cacheEstudio.estudiostipo;
            this.estudiostipoPlaceholder='Estudios';
        }
        else
        this.nomencladoresservice.getEstudiosTipo(this.url).retry(this.retries).subscribe(
            result => {
                this.estudiostipo=result;
                this.estudiostipoPlaceholder='Estudios';
                this.estudio.cacheEstudio.estudiostipo=result;
            },
            error => {
                console.log(<any>error);
                this.estudiostipoPlaceholder='Error de red';
            }
        );
        if(this.estudio.cacheEstudio.estudioestados!=null){
            this.estudioestados=this.estudio.cacheEstudio.estudioestados;
            this.estudioestadosPlaceholder='Estado';
        }

        else
        this.nomencladoresservice.getEstudiosEstado(this.url).retry(this.retries).subscribe(
            result => {
                this.estudioestados=result;
                this.estudioestadosPlaceholder='Estado';
                this.estudio.cacheEstudio.estudioestados=result;
            },
            error => {
                console.log(<any>error);
                this.estudioestadosPlaceholder='Error de red';
            }
        );
        if(this.estudio.cacheEstudio.estudiotitulos!=null)
        {
            this.estudiotitulos=this.estudio.cacheEstudio.estudiotitulos;
            this.estudiotitulosPlaceholder='Título';
        }

        else
        this.nomencladoresservice.getEstudiosTitulo(this.url).retry(this.retries).subscribe(
            result => {
                this.estudiotitulos=result;
                this.estudiotitulosPlaceholder='Título';
                this.estudio.cacheEstudio.estudiotitulos=result;
            },
            error => {
                console.log(<any>error);
                this.estudiotitulosPlaceholder='Error de red';
            }
        );
        if(this.estudio.cacheEstudio.annos!=null)
        {
            this.annos=this.estudio.cacheEstudio.annos;
            this.annoseg=this.estudio.cacheEstudio.annos;
        }
        else
        if(this.annos.length==0)
            this.nomencladoresservice.getAnnos(this.url).retry(this.retries).subscribe(
                result => {
                    this.annos=result;
                    this.annoseg=result;
                    this.estudio.cacheEstudio.annos=result;
                },
                error => {
                    console.log(<any>error);

                }
            );
        if(this.estudio.cacheEstudio.idiomas!=null){
            this.idiomas=this.estudio.cacheEstudio.idiomas;
            this.idiomasPlaceHolder='Idioma';
        }
        else
            this.nomencladoresservice.getIdiomas(this.url).retry(this.retries).subscribe(
                result => {
                    this.idiomas=result;
                    this.idiomasPlaceHolder='Idioma';
                    this.estudio.cacheEstudio.idiomas=result;

                },
                error => {
                    console.log(<any>error);
                    this.idiomasPlaceHolder='Error de red';
                }
            );

        if(this.estudio.cacheEstudio.niveles!=null){
            this.niveles=this.estudio.cacheEstudio.niveles;
            this.nivelesPlaceHolder='Nivel';
        }

        else
            this.nomencladoresservice.getNiveles(this.url).retry(this.retries).subscribe(
                result => {
                    this.niveles=result;
                    this.nivelesPlaceHolder='Nivel';
                    this.estudio.cacheEstudio.niveles=result;
                },
                error => {
                    this.nivelesPlaceHolder='Error de red';
                    console.log(<any>error);
                }
            );

        this.updateVisualfromEstudioIdiomas();
        this.handleState(this.estudio.estudioestado);
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }
        this.formDataService.setEstudio(this.estudio);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['registrar/personal']);
        }
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the address page
            this.router.navigate(['registrar/address']);
        }
    }

    handleState(value:any){
        this.completado=false;
        this.encurso=false;
        this.incompleto=false;
         if(value==1){
             this.completado=true;
             this.encurso=false;
             this.incompleto=false;

         }
        if(value==2){
            this.completado=false;
            this.encurso=true;
            this.incompleto=false;
        }
        if(value==3){
            this.completado=false;
            this.encurso=false;
            this.incompleto=true;
        }

    }

    AgregarIdioma(){


        if(this.estudioIdioma.idioma!=null && this.estudioIdioma.idioma!=0){

            if(!this.isIdiomaSet(this.estudioIdioma.idioma)){
                let eVisual=new EstuduiIdiomaVisual();
                eVisual.idioma=this.estudioIdioma.idioma;
                eVisual.idiomaname=this.getIdioNameFromId(this.estudioIdioma.idioma);
                this.estudioIdiomasList.push(eVisual);
            }else{
                this.openSnackBar('Ya ha agregado este idioma !!!');
            }

        }else{
            this.openSnackBar('Seleccione un idioma !!!');
        }
        this.updateEstudioIdiomas();
        this.dataSource=  new MatTableDataSource(this.estudioIdiomasList);

    }

    getIdioNameFromId(id:any){
        return this.idiomas.filter(idioma=>idioma.id==id)[0].idioma;
    }
    isIdiomaSet(id:any){
        return this.estudioIdiomasList.filter(eI=>eI.idioma==id).length>0;
    }


    openSnackBar(message: string, action: string='') {
    this.snackBar.open(message, action, {
        duration: 2000,
    });
}
    deleteItem(idioma:any){
        var index = this.estudioIdiomasList.findIndex(x => x.idioma==idioma);
        if (index > -1) {
            this.estudioIdiomasList.splice(index, 1);
            this.dataSource=  new MatTableDataSource(this.estudioIdiomasList);
            this.updateEstudioIdiomas();
        }
   }

    updateEstudioIdiomas(){
        this.estudio.estudioIdiomas=[]
            this.estudioIdiomasList.forEach(eI => {
              let estI=new EstudioIdioma();
                estI.idioma=eI.idioma;
                estI.habilidad=1;//Lectura
                estI.nivel=eI.nivellectura;
                this.estudio.estudioIdiomas.push(estI);
                estI=new EstudioIdioma();
                estI.idioma=eI.idioma;
                estI.habilidad=2;//Escritura
                estI.nivel=eI.nivelescritura;
                this.estudio.estudioIdiomas.push(estI);
                estI=new EstudioIdioma();
                estI.idioma=eI.idioma;
                estI.habilidad=3;//Conversacion
                estI.nivel=eI.nivelconversacion;
                this.estudio.estudioIdiomas.push(estI);
      });


    }

    updateVisualfromEstudioIdiomas(){

        if(this.estudio.estudioIdiomas.length>0){

            for (var _i = 0; _i < this.estudio.estudioIdiomas.length; _i=_i+3) {
                let eiarray=[];
                eiarray.push(this.estudio.estudioIdiomas[_i]);
                eiarray.push(this.estudio.estudioIdiomas[_i+1]);
                eiarray.push(this.estudio.estudioIdiomas[_i+2]);
                var eI = this.estudio.estudioIdiomas[_i];
                var veI=new EstuduiIdiomaVisual();
                veI.idioma=eI.idioma;
                veI.idiomaname=this.getIdioNameFromId(eI.idioma);

                veI.nivelconversacion=this.getNivelHabilidadFromEi(eiarray,3);
                veI.nivelescritura=this.getNivelHabilidadFromEi(eiarray,2);
                veI.nivellectura=this.getNivelHabilidadFromEi(eiarray,1);

                this.estudioIdiomasList.push(veI);

            }

         //   console.log(this.estudioIdiomasList);

        }
    }

    getNivelHabilidadFromEi(eI:EstudioIdioma[],habilidad:any){

        let result=0;
           eI.forEach(e=>{
           if(e.habilidad.toString()==habilidad.toString())
           { result= e.nivel;}
        });

        return result;
    }


}