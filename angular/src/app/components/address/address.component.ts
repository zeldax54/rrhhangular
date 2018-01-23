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
    selector:     'mt-wizard-address'
    ,templateUrl: './address.component.html'
})

export class AddressComponent implements OnInit {
    title = 'Experiencia Laboral';
    sub = 'Saber en qué has trabajado nos ayuda a poder seleccionarte en función de tu experiencia.';
    experienciaLaboral: ExperienciaLaboral=new ExperienciaLaboral();
    experiencia:Experiencia=new Experiencia();
    form: any;
    perosnal:any;
    hasexperienciaList=[{id:0,valor:'No'},{id:1,valor:'Si'}]
    hasexperienciabool:boolean=false;
    paises:Array<any>=[];
    url:any;
    displayedColumns = ['empresa','fechaingreso','fechaegreso','actions'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router, private formDataService: FormDataService,
                public dialog: MatDialog,private envspecific:EnvironmentSpecificService, private paisesservice:PaisesService,public snackBar: MatSnackBar) {
        this.url=envspecific.envSpecific.APIURL;
        this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);
    }

    ngOnInit() {
          this.experienciaLaboral = this.formDataService.getExperienciaLaboral();
             if(this.experienciaLaboral.hasexperiencia==1)
                 this.hasexperienciabool=true;

        this.perosnal=this.formDataService.getPersonal();
        this.paises=this.perosnal.cachePersonal.paises;
        if(this.paises==undefined){
            this.paisesservice.getPaises(this.url).retry(3).subscribe(
                result => {
                    this.paises=result;

                },
                error => {

                    console.log(<any>error);
                }
            );
        }
        if(this.experienciaLaboral.experiencias!=[] && this.experienciaLaboral.experiencias.length>0){

            this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);
        }
        window.scrollTo(0, 0);
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
        if (this.save(form)) {
            // Navigate to the result page
            this.router.navigate(['registrar/result']);
        }
    }

    changeExp(){
        this.hasexperienciabool=!this.hasexperienciabool;
    }

    addNew() {
        const dialogRef = this.dialog.open(AddDialogComponent, {
           data: {experiencia: this.experiencia,paises:this.paises}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                if(this.findEmpresaInList(this.experiencia.empresa)){
                    this.openSnackBar('Ya ha agregado esta empresa !!!');

                }else{
                    this.experienciaLaboral.experiencias.push(this.experiencia);
                    this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);
                    this.experiencia=new Experiencia();
                }

            }
        });
    }


    deleteItem(empresa:any){
        var index = this.experienciaLaboral.experiencias.findIndex(x => x.empresa==empresa);
        if (index > -1) {
            this.experienciaLaboral.experiencias.splice(index, 1);
            this.dataSource=  new MatTableDataSource(this.experienciaLaboral.experiencias);

        }
    }

    editItem(empresa){


        let experiencia=this.getExperienciaFromList(empresa);
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: {experiencia:experiencia ,paises:this.paises}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                if(this.findEmpresaInList(this.experiencia.empresa)){
                    this.openSnackBar('Ya ha agregado esta empresa!!!');

                }else{

                }

            }
        });


    }

    findEmpresaInList(empresaname:any){
        return this.experienciaLaboral.experiencias.findIndex(x => x.empresa==empresaname) >-1;

    }

    getExperienciaFromList(empresa:any):Experiencia{

      return  this.experienciaLaboral.experiencias.filter(x => x.empresa==empresa)[0]
    }

    openSnackBar(message: string, action: string='') {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}