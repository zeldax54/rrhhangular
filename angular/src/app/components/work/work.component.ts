import { Evento } from './../../data/formData.model';
import {retry, startWith, map} from 'rxjs/operators';
import { Component, OnInit,ViewChild,Inject }   from '@angular/core';
import { Router }              from '@angular/router';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../services/global";

import {Observable} from 'rxjs';

import { EnvironmentSpecificService }     from '../../services/enviromentSpecific';
import { NomencladoresService }     from '../../services/nomencladores.service';
import {MatDialog, MatPaginator, MatSort,MatTableDataSource,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {AddEstudioDialogComponent} from '../../components/dialogos/add_estudio.dialog';

import { FormDataService }     from '../../data/formData.service';
import { ValidatorService }    from '../../services/validator.service';
import {Estudio} from "../../data/formData.model";
import {EstudioCursado} from "../../data/formData.model";
import { EnvSpecific} from "../../models/envSpecific";
import {EstudioIdioma} from "../../data/formData.model";


import {EstuduiIdiomaVisual} from "../../data/formData.model";
import {MatSnackBar} from '@angular/material';
import { EstadoCivilService } from '../../services/estadocivil';


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
    estudioestados:Array<any>=[];
    estudiotitulos:Array<any>=[];
    evento:Evento;

    annos:Array<any>=[];
    annoseg:Array<any>=[];
    retries:number=3;


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
    displayedEstudiosColumns = ['estudiotipo','estudioestado','estudiotitulo','actions'];
    displayedEventosColumns = ['nombre','fechaevento','actions'];
    dataSource: MatTableDataSource<any>;
    dataSourceEstudios: MatTableDataSource<any>;
    dataSourceEventos: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  //Multiples Estudios
    addestudioEnable:boolean=false;
    estudiocursado:EstudioCursado=new EstudioCursado();
    estudiosCursadosArrayList:Array<EstudioCursado>=[];
    eventosArrayList:Array<Evento>=[];
 //data
 data:any;





    constructor(private router: Router,private envspecific:EnvironmentSpecificService,
                private nomencladoresservice:NomencladoresService,
                private formDataService: FormDataService,
                public snackBar: MatSnackBar,public dialog: MatDialog,private validatorservice:ValidatorService) {
        this.url=envspecific.envSpecific.APIURL;

        this.dataSource=  new MatTableDataSource(this.estudioIdiomasList);
        this.dataSourceEstudios=new MatTableDataSource(this.estudiosCursadosArrayList);
        this.dataSourceEventos=new MatTableDataSource(this.eventosArrayList);
        this.form = this.formDataService.getFormData();
    }



    ngOnInit() {
        this.estudio = this.formDataService.getEstudio();

        if(this.form.datadownload==1){
          let dataStudioForm= this.form.loadedCV;
          let estudiosCV=dataStudioForm.estudios;
          for (var _i = 0; _i < estudiosCV.length; _i++) {

           let ec=new EstudioCursado();
           ec.annoegreso=estudiosCV[_i].annoegreso;
           ec.annoingreso=estudiosCV[_i].annoingreso;
           if(estudiosCV[_i].annosaprobadoscursados!=undefined)
           ec.annosaprobadoscursados=estudiosCV[_i].annosaprobadoscursados;
           if( ec.cantidadmaterias!=undefined)
           ec.cantidadmaterias=estudiosCV[_i].cantidadmaterias;

           ec.estudiotipo=estudiosCV[_i].tipo.id;
           ec.estudioestado=estudiosCV[_i].estado.id;
           ec.estudiotitulo=estudiosCV[_i].titulo;
           ec.institucion=estudiosCV[_i].institucion;

           if( ec.materiasaprobadas!=undefined)
           ec.materiasaprobadas=estudiosCV[_i].materiasaprobadas;
           this.estudiosCursadosArrayList.push(ec);
          }
           //Idiomas
           if(dataStudioForm.estudioidiomas!=undefined && dataStudioForm.estudioidiomas!=null){
             let idiomasData=dataStudioForm.estudioidiomas;
            for (var _i = 0; _i < idiomasData.length; _i++) {
              let eI=new EstudioIdioma();
              eI.habilidad=idiomasData[_i].habilidad.id;
              eI.idioma=idiomasData[_i].idioma.id;
              eI.nivel=idiomasData[_i].nivel.id;
              eI.idiomaSet=idiomasData[_i].idioma.idioma;
              this.estudio.estudioIdiomas.push(eI);
             }
           }


           //eventos
           if(dataStudioForm.eventos!=undefined && dataStudioForm.eventos!=null){
            let estEventos=dataStudioForm.eventos;
            for (var _i = 0; _i < estEventos.length; _i++) {
              let newE=new Evento();
              newE.id=estEventos[_i].id;
              newE.nombre=estEventos[_i].nombre;
              newE.fechaevento=this.convertUTCDateToLocalDate(estEventos[_i].fechaevento);
              this.eventosArrayList.push(newE);
              this.estudio.eventos= this.eventosArrayList;
              this.dataSourceEventos=new MatTableDataSource(this.eventosArrayList);
            }
          }
        }


        if(this.estudio.cacheEstudio.estudiostipo!=null)
        {
            this.estudiostipo=this.estudio.cacheEstudio.estudiostipo;
            this.UpdateaEstidios();

        }
        else
        this.nomencladoresservice.getEstudiosTipo(this.url).pipe(retry(this.retries)).subscribe(
            result => {
                this.estudiostipo=result;
                this.estudio.cacheEstudio.estudiostipo=result;
                this.UpdateaEstidios();

            },
            error => {
                console.log(<any>error);

            }
        );
        if(this.estudio.cacheEstudio.estudioestados!=null){
            this.estudioestados=this.estudio.cacheEstudio.estudioestados;
            this.UpdateaEstidios();

        }

        else
        this.nomencladoresservice.getEstudiosEstado(this.url).pipe(retry(this.retries)).subscribe(
            result => {
                this.estudioestados=result;
                this.estudio.cacheEstudio.estudioestados=result;
                this.UpdateaEstidios();

            },
            error => {
                console.log(<any>error);

            }
        );
        if(this.estudio.cacheEstudio.estudiotitulos!=null)
        {
            this.estudiotitulos=this.estudio.cacheEstudio.estudiotitulos;
            this.addestudioEnable=true;
            this.UpdateaEstidios();
        }

        else
        this.nomencladoresservice.getEstudiosTitulo(this.url).pipe(retry(this.retries)).subscribe(
            result => {
                this.estudiotitulos=result;
                this.estudio.cacheEstudio.estudiotitulos=result;
                this.UpdateaEstidios();
            },
            error => {
                console.log(<any>error);

            }
        );
        if(this.estudio.cacheEstudio.annos!=null)
        {
            this.annos=this.estudio.cacheEstudio.annos;
            this.annoseg=this.estudio.cacheEstudio.annos;
        }
        else
        if(this.annos.length==0)
            this.nomencladoresservice.getAnnos(this.url).pipe(retry(this.retries)).subscribe(
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
            this.updateVisualfromEstudioIdiomas();

        }
        else
            this.nomencladoresservice.getIdiomas(this.url).pipe(retry(this.retries)).subscribe(
                result => {
                    this.idiomas=result;
                    this.idiomasPlaceHolder='Idioma';
                    this.estudio.cacheEstudio.idiomas=result;
                    this.updateVisualfromEstudioIdiomas();
                },
                error => {
                    console.log(<any>error);
                    this.idiomasPlaceHolder='Error de red';
                }
            );

        if(this.estudio.cacheEstudio.niveles!=null){
            this.niveles=this.estudio.cacheEstudio.niveles;
            this.nivelesPlaceHolder='Nivel';
          //  this.updateVisualfromEstudioIdiomas();
        }

        else
            this.nomencladoresservice.getNiveles(this.url).pipe(retry(this.retries)).subscribe(
                result => {
                    this.niveles=result;
                    this.nivelesPlaceHolder='Nivel';
                    this.estudio.cacheEstudio.niveles=result;
                    this.addestudioEnable=true;
                   // this.updateVisualfromEstudioIdiomas();
                },
                error => {
                    this.nivelesPlaceHolder='Error de red';
                    console.log(<any>error);
                }
            );


        this.updateVisualfromEstudioIdiomas();
        this.eventosArrayList=this.estudio.eventos;
        this.dataSourceEventos=new MatTableDataSource(this.eventosArrayList);
        //this.handleState(this.estudio.estudioestado);
        window.scrollTo(0, 0);
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
          console.log(this.estudio);
            // Navigate to the address page
            this.router.navigate(['registrar/address']);
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
      console.log(id);
      console.log(this.idiomas);
      if(this.idiomas!=undefined && this.idiomas.length>0)
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
                if(eI.idiomaSet!=null)
                veI.idiomaname=eI.idiomaSet;
                else
                veI.idiomaname=this.getIdioNameFromId(eI.idioma);

                veI.nivelconversacion=this.getNivelHabilidadFromEi(eiarray,3);
                veI.nivelescritura=this.getNivelHabilidadFromEi(eiarray,2);
                veI.nivellectura=this.getNivelHabilidadFromEi(eiarray,1);

                if(this.estudioIdiomasList.filter(a=>a.idiomaname==veI.idiomaname).length==0)
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

    addNew() {
        if(this.addestudioEnable){
            const dialogRef = this.dialog.open(AddEstudioDialogComponent, {
              //  width: '500px',
                data: {estudioCursado: this.estudiocursado,estudioestados:this.estudioestados,estudiostipo:this.estudiostipo
                    ,estudiotitulos:this.estudiotitulos,annos:this.annos,annoseg:this.annoseg}
            });



            dialogRef.afterClosed().subscribe(result => {
                if (result === 1) {
                    if(this.findTituloEstudio(this.estudiocursado)){
                        this.openSnackBar('Ya ha agregado este estudio !!!');

                    }else{
                        this.estudiosCursadosArrayList.push(this.estudiocursado);
                        this.dataSourceEstudios=  new MatTableDataSource(this.estudiosCursadosArrayList);
                        this.estudio.estudioscursados=this.estudiosCursadosArrayList;
                        this.estudiocursado=new EstudioCursado();

                    }

                }
            });

        }
        else{
            this.openSnackBar('Cargando nomencladores. Espere unos segundos e intente de nuevo...');
        }

    }

    findTituloEstudio(estudiocursado:EstudioCursado){
        if(estudiocursado.estudiotitulo==null)
            return false;
        return this.estudio.estudioscursados.findIndex(x => x.estudiotitulo==estudiocursado.estudiotitulo) >-1;
    }

    FromTipo(id:any){

      if(id!=undefined && this.estudiostipo!=undefined && this.estudiostipo.length>0)
      return  this.estudiostipo.filter(x =>
       x.id== id)[0].nombre;
    }

    FromEstado(id:any){
      if(id!=undefined && this.estudioestados!=undefined && this.estudioestados.length>0)
        return  this.estudioestados.filter(x =>
        x.id== id)[0].nombre;
    }

    FromNombre(estudio:any){
        return estudio ? estudio.nombre : estudio;
    }

    UpdateaEstidios(){
        this.dataSourceEstudios=  new MatTableDataSource(this.estudiosCursadosArrayList);
        this.estudio.estudioscursados=this.estudiosCursadosArrayList;


    }


    deleteItemEstCursado(estudiocursado:any){
        var index = this.estudiosCursadosArrayList.findIndex(x => x==estudiocursado );
        if (index > -1) {
            this.estudiosCursadosArrayList.splice(index, 1);
            this.dataSourceEstudios=  new MatTableDataSource(this.estudiosCursadosArrayList);
            this.estudio.estudioscursados=this.estudiosCursadosArrayList;        }
    }
    editItemEstCursado(estudiocursado:any){

        let EC=this.estudiosCursadosArrayList.filter(x=>x==estudiocursado)[0];
        const dialogRef = this.dialog.open(AddEstudioDialogComponent, {
            //  width: '500px',
            data: {estudioCursado: EC,estudioestados:this.estudioestados,estudiostipo:this.estudiostipo
                ,estudiotitulos:this.estudiotitulos,annos:this.annos,annoseg:this.annoseg}
        });



        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                if(this.findTituloEstudio(this.estudiocursado)){
                    this.openSnackBar('Ya ha agregado este estudio !!!');

                }else{

                }

            }
        });


    }


    findEvento(evento:Evento){
      var index = this.eventosArrayList.findIndex(x => x==evento );
      if(index>-1)
      return true;
      return false;
    }


    agregarEvento(){

        this.evento=new Evento();
      let dialogRef = this.dialog.open(DialogCursosSemCongComponent, {
        width: '250px',
        data: {evento:this.evento},
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result!=undefined){

          if(this.findEvento(this.evento))
          this.openSnackBar('Ya ha agregado este evento !!!');
          else{
            this.eventosArrayList.push(this.evento);
            this.dataSourceEventos=  new MatTableDataSource(this.eventosArrayList);
              this.estudio.eventos=this.eventosArrayList;
              this.evento=new Evento();
          }

        }

      });
    }

    deleteEvento(evento:Evento){

      var index = this.eventosArrayList.findIndex(x => x==evento );
       if(index>-1) {
          this.eventosArrayList.splice(index, 1);
          this.dataSourceEventos=  new MatTableDataSource(this.eventosArrayList);
          this.estudio.eventos=this.eventosArrayList;
          }

    }

    editEvento(evento:Evento){

      let eventoEdit=this.eventosArrayList.filter(x=>x==evento)[0];
      console.log(this.eventosArrayList);
      console.log(eventoEdit);

      let dialogRef = this.dialog.open(DialogCursosSemCongComponent, {
        width: '250px',
        data: {evento:eventoEdit},

      });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    convertUTCDateToLocalDate(date:Date) {
      var finalDate=new Date(date);
      return new Date(finalDate.setDate(finalDate.getDate()+1));
    }
}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'cursosemcongdialog.html',
  })
  export class DialogCursosSemCongComponent {

    evento:Evento;

    fechaeventoFormControl = new FormControl('', [Validators.required]);
    constructor(
      public dialogRef: MatDialogRef<DialogCursosSemCongComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

        this.evento=data.evento;
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
