
import {retry} from 'rxjs/operators';
import { Component, OnInit,ViewChild }   from '@angular/core';
import { Router }              from '@angular/router';

import { ExperienciaLaboral }             from '../../data/formData.model';
import { FormDataService }     from '../../data/formData.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatDialog, MatPaginator, MatSort,MatTableDataSource} from '@angular/material';
import {AddDialogComponent} from '../../components/dialogos/add_experiencia.dialogg';
import {Experiencia} from "../../data/formData.model";
import {NomencladoresService} from "../../services/nomencladores.service";
import {PaisesService} from "../../services/paises.services";
import {EnvironmentSpecificService} from "../../services/enviromentSpecific";
import {MatSnackBar} from '@angular/material';

@Component ({
    selector:     'mt-wizard-address',
    styleUrls: ['address.component.css'],
    templateUrl: './address.component.html'
})

export class AddressComponent implements OnInit {
    title = 'Experiencia Laboral';
    sub = 'Saber en qué has trabajado nos ayuda a poder seleccionarte en función de tu experiencia.';
    experienciaLaboral: ExperienciaLaboral=new ExperienciaLaboral();
    experiencia:Experiencia=new Experiencia();
    form: any;
    perosnal:any;
    hasexperienciabool:boolean=false;
    paises:Array<any>=[];
    actividadesempresa:Array<any>=[];
    url:any;
    displayedColumns = ['empresa','fechaingreso','fechaegreso','actions'];
    dataSource: MatTableDataSource<any>;
    addexperiencieEnable:boolean=false;
    actividadcargada:boolean=false;
    puestos:Array<any>=[];
    puestoscargado:boolean=false;


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router, private formDataService: FormDataService,
                public dialog: MatDialog,private envspecific:EnvironmentSpecificService, private paisesservice:PaisesService,public snackBar: MatSnackBar,
     private nomencladoresService:NomencladoresService) {
        this.url=envspecific.envSpecific.APIURL;
       // this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);
    }

    ngOnInit() {

      //Update
      this.form = this.formDataService.getFormData();

        this.experienciaLaboral = this.formDataService.getExperienciaLaboral();
        if(this.experienciaLaboral.hasexperiencia==true)
            this.hasexperienciabool=true;
                    this.perosnal=this.formDataService.getPersonal();



        this.paises=this.perosnal.cachePersonal.paises;
        if(this.paises==undefined){
            this.paisesservice.getPaises(this.url).pipe(retry(3)).subscribe(
                result => {
                    this.paises=result;
                    this.updateExps();

                },
                error => {

                    console.log(<any>error);
                }
            );
        }
        if(this.actividadesempresa.length==0 || this.actividadesempresa==undefined){

            this.nomencladoresService.getActividadEmpresa(this.url).pipe(retry(3)).subscribe(
                result => {
                    this.actividadesempresa=result;
                    this.addexperiencieEnable=true;
                    this.actividadcargada=true;
                    this.updateExps();
                },
                error => {

                    console.log(<any>error);
                }
            );

        }
        if(this.puestos.length==0 || this.puestos==undefined){

          this.nomencladoresService.getPuestos(this.url).pipe(retry(3)).subscribe(
              result => {
                  let casttResult=result as any;
                  this.puestos=casttResult;
                  this.addexperiencieEnable=true;
                  this.updateExps();
              },
              error => {

                  console.log(<any>error);
              }
          );

      }
        if(this.experienciaLaboral.experiencias!=[] && this.experienciaLaboral.experiencias.length>0)
        {
          this.hasexperienciabool=true;
          this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);
          this.form.loadedCV=false;
        }
        window.scrollTo(0, 0);
    }

    updateExps(){
      if(this.form.datadownload==1){
        let dataExp= this.form.loadedCV;
        if(dataExp.hasexp==true ||dataExp.hasexp=='true'){
          this.experienciaLaboral.hasexperiencia=true;
          let expLaborales=dataExp.experienciaslaborales;
          let ExperienciaArray=new Array<Experiencia>();
          for (var _i = 0; _i < expLaborales.length; _i++) {
            let tE=new Experiencia();
            console.log(expLaborales[_i].actividadempresa.id);
            tE.actividadempresa=expLaborales[_i].actividadempresa.id;

            tE.actualmente=expLaborales[_i].actualmente;
            tE.email=expLaborales[_i].email;
            tE.empresa=expLaborales[_i].empresa;
            tE.fechaingreso=this.convertUTCDateToLocalDate(expLaborales[_i].fechainreso);
            if(expLaborales[_i].fechaegreso!=undefined)
            tE.fechaegreso=this.convertUTCDateToLocalDate(expLaborales[_i].fechaegreso);
            tE.modoegreso=expLaborales[_i].modoegreso;
            tE.motivoegreso=expLaborales[_i].motivoegreso;
            tE.pais=expLaborales[_i].pais.id;
            tE.principalesresponsabilidades=expLaborales[_i].principalesresponsabilidades;
            tE.principalestareas=expLaborales[_i].principalestareas;
            tE.puestodesempenado=expLaborales[_i].puesto.id;
            tE.referencias=expLaborales[_i].referencias;
            tE.telefono=expLaborales[_i].telefono;
            ExperienciaArray.push(tE);

          }

          this.experienciaLaboral.experiencias=ExperienciaArray;
          this.hasexperienciabool=true;
          this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);
        }
      }
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setExperienciaLaboral(this.experienciaLaboral);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['registrar/work']);
        }
    }

    goToNext(form: any) {
        if(this.hasexperienciabool==true && (this.experienciaLaboral.experiencias.length==0 || this.experienciaLaboral.experiencias==undefined))
            this.openSnackBar("Debe introducir al menos una experiencia!")
        else
        if (this.save(form)) {
            // Navigate to the result page
            this.router.navigate(['registrar/result']);
        }
    }

    changeExp(){
        this.hasexperienciabool=!this.hasexperienciabool;
    }

    addNew() {

        if(this.addexperiencieEnable){
          this.experiencia.actualmente=false;
            const dialogRef = this.dialog.open(AddDialogComponent, {
                panelClass: 'my-full-screen-dialog',
                data: {experiencia: this.experiencia,paises:this.paises,actividadesempresa:this.actividadesempresa,puestos:this.puestos}
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result === 1) {
                    if(this.findEmpresaInList(this.experiencia.empresa)){
                        this.openSnackBar('Ya ha agregado esta empresa !!!');

                    }else{
                        this.experienciaLaboral.experiencias.push(this.experiencia);
                        this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);
                        this.experiencia=new Experiencia();
                        this.experiencia.actualmente=false;
                    }

                }
            });

        }
        else{
            this.openSnackBar('Cargando nomencladores. Espere por favor');
        }

    }


    deleteItem(empresa:any){
        var index = this.experienciaLaboral.experiencias.findIndex(x => x.empresa==empresa);
        if (index > -1) {
            this.experienciaLaboral.experiencias.splice(index, 1);
            this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);

        }
    }

    editItem(empresa){

      if(this.addexperiencieEnable){
        let experiencia=this.getExperienciaFromList(empresa);
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: {experiencia:experiencia ,paises:this.paises,actividadesempresa:this.actividadesempresa,puestos:this.puestos}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                if(this.findEmpresaInList(this.experiencia.empresa)){
                    this.openSnackBar('Ya ha agregado esta empresa!!!');

                }else{

                }

            }
        });
      }   else{
        this.openSnackBar('Cargando nomencladores. Espere por favor');
    }



    }

    findEmpresaInList(empresaname:any){
        return this.experienciaLaboral.experiencias.findIndex(x => x.empresa==empresaname) >-1;

    }

    getExperienciaFromList(empresa:any):Experiencia{

      return  this.experienciaLaboral.experiencias.filter(x => x.empresa==empresa)[0]
    }

    convertUTCDateToLocalDate(date:Date) {
      var finalDate=new Date(date);
      return new Date(finalDate.setDate(finalDate.getDate()+1));
  }

    openSnackBar(message: string, action: string='') {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }


}
