import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../services/global";

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { NomencladoresService }     from '../../services/nomencladores.service';

import { FormDataService }     from '../../data/formData.service';
import {Estudio} from "../../data/formData.model";







@Component ({
    selector:     'mt-wizard-work'
    ,templateUrl: './work.component.html',
})

export class WorkComponent implements OnInit {
    title = 'Formación académica';
    estudio: Estudio;
    form: any;
    estudiostipo:Array<any>=[];
    estudioestados:Array<any>=[];
    estudiotitulos:Array<any>=[];
    completado:boolean=false;
    encurso:boolean=false;
    incompleto:boolean=false;
    institucionFormControl = new FormControl('', [
        Validators.required,

    ]);
    estudiotipoFormControl = new FormControl('', [
        Validators.required,

    ]);

    estudioestadoFormControl=new FormControl('', [
        Validators.required,

    ]);
    annos:Array<any>=[];
    annoseg:Array<any>=[];

    estudiotitulosCtrl: FormControl;
    annoingresoCtrl: FormControl;
    annoegresoCtrl: FormControl;
    filteredStates: Observable<any[]>;
    filterannos: Observable<any[]>;
    filterannoseg: Observable<any[]>;

    matcher = new MyErrorStateMatcher();

    
    constructor(private router: Router,
                private nomencladoresservice:NomencladoresService,
                private formDataService: FormDataService) {

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
    }

    filterannosf(anno: string){

        return this.annos.filter(state =>
        state.anno.toString().toLowerCase().indexOf(anno.toString().toLowerCase()) === 0);
    }

    filterannosfeg(anno: string){

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

        if(this.estudiostipo.length==0)
        this.nomencladoresservice.getEstudiosTipo().subscribe(
            result => {
                this.estudiostipo=result;
            },
            error => {
                console.log(<any>error);
            }
        );
        if(this.estudioestados.length==0)
        this.nomencladoresservice.getEstudiosEstado().subscribe(
            result => {
                this.estudioestados=result;
            },
            error => {
                console.log(<any>error);
            }
        );
        if(this.estudiotitulos.length==0)
        this.nomencladoresservice.getEstudiosTitulo().subscribe(
            result => {
                this.estudiotitulos=result;
            },
            error => {
                console.log(<any>error);
            }
        );
        if(this.annos.length==0)
            this.nomencladoresservice.getAnnos().subscribe(
                result => {
                    this.annos=result;
                    this.annoseg=result;
                },
                error => {
                    console.log(<any>error);
                }
            );


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

         }
        if(value==2){
            this.encurso=true;
        }
        if(value==3){
            this.incompleto=true;
        }

    }
}