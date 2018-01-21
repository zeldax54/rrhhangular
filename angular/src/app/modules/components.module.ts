import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule


} from '@angular/material';




@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatTooltipModule,
        MatIconModule,
        MatCardModule,
        MatProgressBarModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule ,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatTableModule,
        MatPaginatorModule,
        MatSnackBarModule

        ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatTooltipModule,
        MatIconModule,
        MatCardModule,
        MatProgressBarModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatTableModule,
        MatPaginatorModule,
        MatSnackBarModule

        ],
})
export class MyOwnCustomMaterialModule { }