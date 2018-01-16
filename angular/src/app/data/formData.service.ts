import { Injectable,Component }                        from '@angular/core';

import { FormData, Personal, Address,Estudio }       from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';



@Injectable()
export class FormDataService {



    private formData: FormData = new FormData();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;

    constructor(private workflowService: WorkflowService) { 
    }

    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            nombre: this.formData.nombre,
            tipodoc:this.formData.tipodoc,
            nrodoc:this.formData.nrodoc,
            apellidos: this.formData.apellidos,
            email: this.formData.email,
            fechanacimiento:this.formData.fechanacimiento,
            lugarnacimiento:this.formData.lugarnacimiento,
            sexo:this.formData.sexo,
            estadocivil:this.formData.estadocivil,
            hijos:this.formData.hijos,
            calle:this.formData.calle,
            nrocalle:this.formData.nrocalle,
            piso:this.formData.piso,
            depto:this.formData.depto,
            codigopostal:this.formData.codigopostal,
            pais:this.formData.pais,
            provincia:this.formData.provincia,
            localidad:this.formData.localidad,
            telefonos:this.formData.telefonos
        };
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully

        this.isPersonalFormValid = true;
        this.formData.nombre = data.nombre;
        this.formData.tipodoc = data.tipodoc;
        this.formData.nrodoc = data.nrodoc;
        this.formData.apellidos = data.apellidos;
        this.formData.email = data.email;
        this.formData.fechanacimiento=data.fechanacimiento;
        this.formData.lugarnacimiento=data.lugarnacimiento;
        this.formData.sexo=data.sexo;
        this.formData.estadocivil=data.estadocivil;
        this.formData.hijos=data.hijos;
        this.formData.calle=data.calle;
        this.formData.nrocalle=data.nrocalle;
        this.formData.piso=data.piso;
        this.formData.depto=data.depto;
        this.formData.codigopostal=data.codigopostal;
        this.formData.pais=data.pais;
        this.formData.provincia=data.provincia;
        this.formData.localidad=data.localidad;
        this.formData.telefonos=data.telefonos;

        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }

    getEstudio() : Estudio {
        // Return the work type
        var estudio: Estudio= {
            estudiotipo:this.formData.estudiotipo,
            estudioestado:this.formData.estudioestado,
            institucion:this.formData.institucion,
            estudiotitulo:this.formData.estudiotitulo,
            annoingreso:this.formData.annoingreso,
            annoegreso:this.formData.annoegreso,



        };
        return estudio;
    }
    
    setEstudio(data: Estudio) {

        this.isWorkFormValid = true;
        this.formData.estudiotipo = data.estudiotipo;
        this.formData.estudioestado = data.estudioestado;
        this.formData.institucion = data.institucion;
        this.formData.estudiotitulo = data.estudiotitulo;
        this.formData.annoingreso = data.annoingreso;
        this.formData.annoegreso = data.annoingreso;

        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid && 
                this.isAddressFormValid;
    }
}