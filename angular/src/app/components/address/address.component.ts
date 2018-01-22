import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

import { ExperienciaLaboral }             from '../../data/formData.model';
import { FormDataService }     from '../../data/formData.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {AddDialogComponent} from '../../components/dialogos/add_experiencia.dialogg';
import {Experiencia} from "../../data/formData.model";
@Component ({
    selector:     'mt-wizard-address'
    ,templateUrl: './address.component.html'
})

export class AddressComponent implements OnInit {
    title = 'Experiencia Laboral';
    sub = 'Saber en qué has trabajado nos ayuda a poder seleccionarte en función de tu experiencia.';
    experienciaLaboral: ExperienciaLaboral;
    experiencia:Experiencia=new Experiencia();
    form: any;
    hasexperienciaList=[{id:0,valor:'No'},{id:1,valor:'Si'}]
    hasexperienciabool:boolean=false;
    constructor(private router: Router, private formDataService: FormDataService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.experienciaLaboral = this.formDataService.getExperienciaLaboral();

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
            height: '400px',
            width: '600px', data: {experiencia: this.experiencia }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                // After dialog is closed we're doing frontend updates
                // For add we're just pushing a new row inside DataService
                //this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
                //this.refreshTable();
            }
        });
    }
}