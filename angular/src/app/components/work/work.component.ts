
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
import {Estudio} from "../../data/formData.model";
import {EstudioCursado} from "../../data/formData.model";
import { EnvSpecific} from "../../models/envSpecific";
import {EstudioIdioma} from "../../data/formData.model";


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
    estudioestados:Array<any>=[];
    estudiotitulos:Array<any>=[];


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
    dataSource: MatTableDataSource<any>;
    dataSourceEstudios: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  //Multiples Estudios
    addestudioEnable:boolean=false;
    estudiocursado:EstudioCursado=new EstudioCursado();
    estudiosCursadosArrayList:Array<EstudioCursado>=[];
 //data
 data:any;





    constructor(private router: Router,private envspecific:EnvironmentSpecificService,
                private nomencladoresservice:NomencladoresService,
                private formDataService: FormDataService,public snackBar: MatSnackBar,public dialog: MatDialog) {
        this.url=envspecific.envSpecific.APIURL;

        this.dataSource=  new MatTableDataSource(this.estudioIdiomasList);
        this.dataSourceEstudios=new MatTableDataSource(this.estudiosCursadosArrayList);
    }



    ngOnInit() {
        this.estudio = this.formDataService.getEstudio();

        if(this.estudio.cacheEstudio.estudiostipo!=null)
        {
            this.estudiostipo=this.estudio.cacheEstudio.estudiostipo;

        }
        else
        this.nomencladoresservice.getEstudiosTipo(this.url).pipe(retry(this.retries)).subscribe(
            result => {
                this.estudiostipo=result;

                this.estudio.cacheEstudio.estudiostipo=result;
            },
            error => {
                console.log(<any>error);

            }
        );
        if(this.estudio.cacheEstudio.estudioestados!=null){
            this.estudioestados=this.estudio.cacheEstudio.estudioestados;

        }

        else
        this.nomencladoresservice.getEstudiosEstado(this.url).pipe(retry(this.retries)).subscribe(
            result => {
                this.estudioestados=result;

                this.estudio.cacheEstudio.estudioestados=result;
            },
            error => {
                console.log(<any>error);

            }
        );
        if(this.estudio.cacheEstudio.estudiotitulos!=null)
        {
            this.estudiotitulos=this.estudio.cacheEstudio.estudiotitulos;

            this.addestudioEnable=true;
        }

        else
        this.nomencladoresservice.getEstudiosTitulo(this.url).pipe(retry(this.retries)).subscribe(
            result => {
                this.estudiotitulos=result;

                this.estudio.cacheEstudio.estudiotitulos=result;
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
        }
        else
            this.nomencladoresservice.getIdiomas(this.url).pipe(retry(this.retries)).subscribe(
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
            this.nomencladoresservice.getNiveles(this.url).pipe(retry(this.retries)).subscribe(
                result => {
                    this.niveles=result;
                    this.nivelesPlaceHolder='Nivel';
                    this.estudio.cacheEstudio.niveles=result;
                    this.addestudioEnable=true;
                },
                error => {
                    this.nivelesPlaceHolder='Error de red';
                    console.log(<any>error);
                }
            );
        if( this.estudio.estudioscursados.length>0)
        {
            this.dataSourceEstudios=  new MatTableDataSource(this.estudio.estudioscursados);
            this.estudiosCursadosArrayList=this.estudio.estudioscursados;
        }

        this.updateVisualfromEstudioIdiomas();
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
      return  this.estudiostipo.filter(x =>
       x.id== id)[0].nombre;
    }

    FromEstado(id:any){
        return  this.estudioestados.filter(x =>
        x.id== id)[0].nombre;
    }

    FromNombre(estudio:any){
        return estudio ? estudio.nombre : estudio;
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

    addCurso(){
        let dialogRef = this.dialog.open(DialogCursosSemCongComponent, {
            width: '250px',
            data: {tipo:'Curso'}
          });
      
          dialogRef.afterClosed().subscribe(result => {   
            if(result!=undefined)             
            this.estudio.cursos+=result+'\n';
          });

    }

    addSeminario(){
        let dialogRef = this.dialog.open(DialogCursosSemCongComponent, {
            width: '250px',
            data: {tipo:'Seminario'}
          });
      
          dialogRef.afterClosed().subscribe(result => {  
            if(result!=undefined)              
            this.estudio.seminarios+=result+'\n';
          });
    }

    addCongreso(){
        let dialogRef = this.dialog.open(DialogCursosSemCongComponent, {
            width: '250px',
            data: {tipo:'Congreso'}
          });
      
          dialogRef.afterClosed().subscribe(result => {  
              if(result!=undefined)          
            this.estudio.congresos+=result+'\n';
          }); 
    }


}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'cursosemcongdialog.html',
  })
  export class DialogCursosSemCongComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DialogCursosSemCongComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }