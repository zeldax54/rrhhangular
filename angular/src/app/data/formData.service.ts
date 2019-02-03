import { Injectable,Component }                        from '@angular/core';

import { FormData, Personal,Estudio,ExperienciaLaboral }       from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';
import {Result} from "./formData.model";




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
            email2: this.formData.email,
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
            paisNacimiento:this.formData.paisNacimiento,
            provinciaNacimiento:this.formData.provinciaNacimiento,
            localidadNacimiento:this.formData.localidadNacimiento,
            telefonos:this.formData.telefonos,
            dispotraslado:this.formData.dispotraslado,
            dispohoras:this.formData.dispohoras,
            movilidadpropia:this.formData.movilidadpropia,
            cachePersonal:this.formData.cachePersonal
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
        this.formData.email2 = data.email;
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
        this.formData.paisNacimiento=data.paisNacimiento;
        this.formData.provinciaNacimiento=data.provinciaNacimiento;
        this.formData.localidadNacimiento=data.localidadNacimiento;
        this.formData.telefonos=data.telefonos;
        this.formData.dispotraslado=data.dispotraslado;
        this.formData.dispohoras=data.dispohoras;
        this.formData.movilidadpropia=data.movilidadpropia;
        this.formData.cachePersonal=data.cachePersonal;

        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }

    getEstudio() : Estudio {
        // Return the work type
        var estudio: Estudio= {
             estudioscursados:this.formData.estudioscursados,
            estudioIdiomas:this.formData.estudioIdiomas,
            cacheEstudio:this.formData.cacheEstudio,
            eventos:this.formData.eventos

        };
        return estudio;
    }

    setEstudio(data: Estudio) {

        this.isWorkFormValid = true;
        this.formData.estudioscursados=data.estudioscursados;
        this.formData.estudioIdiomas = data.estudioIdiomas;
        this.formData.cacheEstudio = data.cacheEstudio;
        this.formData.eventos=data.eventos;



        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getExperienciaLaboral() : ExperienciaLaboral {
        // Return the Address data
        var eL: ExperienciaLaboral = {
            hasexperiencia:this.formData.hasexperiencia,
            experiencias:this.formData.experiencias

        };
        return eL;
    }

    setExperienciaLaboral(data: ExperienciaLaboral) {
        // Update the Address data only when the Address Form had been validated successfully
        this.formData.hasexperiencia = data.hasexperiencia;
        this.formData.experiencias = data.experiencias;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }


    setResult(data: Result){

        this.formData.postulaciones = data.postulaciones;
        this.formData.postulacionesNomenclador=data.postulacionesNomenclador;
        this.formData.otraspostulaciones = data.otraspostulaciones;
        this.formData.comentarios = data.comentarios;
        this.formData.subscribir = data.subscribir;

    }

    getResult():Result{

        var result: Result= {
            postulaciones:this.formData.postulaciones,
            postulacionesNomenclador:this.formData.postulacionesNomenclador,
            otraspostulaciones:this.formData.otraspostulaciones,
            comentarios:this.formData.comentarios,
            subscribir:this.formData.subscribir
        };
        return result;
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
