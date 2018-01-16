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
    MatSlideToggleModule

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
        MatSlideToggleModule
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
        MatSlideToggleModule
        ],
})
export class MyOwnCustomMaterialModule { }