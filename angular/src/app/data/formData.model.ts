export class FormData {


    cachePersonal:CachePersonal=new CachePersonal();
    nombre: string = null;
    apellidos : string ='';
    tipodoc : string = '';
    nrodoc:string='';
    email: string = '';
    email2: string = '';
    fechanacimiento:Date=null;
    lugarnacimiento:string='';
    sexo:string='';
    estadocivil:string='';
    hijos:Hijo[]= [];
    calle:string='';
    nrocalle:string='';
    piso:string='';
    depto:string='';
    codigopostal:string='';
    pais:string='';
    provincia:string='';
    localidad:string='';
    paisNacimiento:string='';
    provinciaNacimiento:string='';
    localidadNacimiento:string='';
    telefonos:Telefono[]=[];
    dispotraslado:string='';
    dispohoras:string='';
    movilidadpropia:string='';

    cacheEstudio:CacheEstudio=new CacheEstudio();
    estudioIdiomas:EstudioIdioma[]=[];
    estudioscursados:Array<EstudioCursado>=[];

    cursos:string='';
    seminarios:string='';
    congresos:string='';
    //Experiencia
    hasexperiencia:boolean=false;
    experiencias:Array<Experiencia>=[];
   //Final
    postulaciones:Array<any>=[];
    otraspostulaciones:string='';
    comentarios:string='';
    subscribir:boolean=true;




    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';

    clear() {

        this.cachePersonal=new CachePersonal();
        this.nombre = null;
        this.apellidos = '';
        this.tipodoc = '';
        this.nrodoc='';
        this.email = '';
        this.email2 = '';
        this.fechanacimiento=null;
        this.lugarnacimiento='';
        this.sexo='';
        this.estadocivil='';
        this.hijos=[];
        this.calle='';
        this.nrocalle='';
        this.piso='';
        this.depto='';
        this.codigopostal='';
        this.pais='';
        this.provincia='';
        this.localidad='';
        this.paisNacimiento='';
        this.provinciaNacimiento='';
        this.localidadNacimiento='';
        
        this.telefonos=[];
        this.dispotraslado='';
        this.dispohoras='';
        this.movilidadpropia='';
        //Estudios
        this.cacheEstudio=new CacheEstudio();
        this.estudioscursados=[];
        this.estudioIdiomas=[];
        this.cursos='';
        this.seminarios='';
        this.congresos='';
        //Experiencia
        this.hasexperiencia=false;
        this.experiencias=[];
        //final
        this.postulaciones=[];
        this.otraspostulaciones='';
        this.comentarios='';
        this.subscribir=true;





        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
}

export class Personal {
    nombre: string = null;
    apellidos : string = '';
    tipodoc:string='';
    nrodoc:string='';
    email: string = '';
    email2: string = '';
    fechanacimiento:Date=null;
    lugarnacimiento:string='';
    sexo:string='';
    estadocivil:string='';
    hijos:Hijo[];
    calle:string='';
    nrocalle:string='';
    piso:string='';
    depto:string='';
    codigopostal:string='';
    pais:string='';
    provincia:string='';
    localidad:string='';
    paisNacimiento:string='';
    provinciaNacimiento:string='';
    localidadNacimiento:string='';
    telefonos:Telefono[];
    dispotraslado:string='';
    dispohoras:string='';
    movilidadpropia:string='';
    cachePersonal:CachePersonal=new CachePersonal();
}

export class Hijo{

    id:any=null;
    sexo:string=null;
    fechanacimiento:Date=null;
}
export class Telefono{

    id:any=null;
    numero:string='';
    tipo:string='';

}

export class CachePersonal{

    td:Array<any>=null;
    ec:Array<any>=null;
    paises:Array<any>=null;
    paisesNacimiento:Array<any>=null;
    tipostelefono:Array<any>=null;
}


export class Estudio{

    estudioscursados:Array<EstudioCursado>=[];
    estudioIdiomas:EstudioIdioma[];
    cursos:string='';
    seminarios:string='';
    congresos:string='';
    cacheEstudio:CacheEstudio=new CacheEstudio();

}

export class EstudioCursado{

    estudiotipo:number=null;
    estudioestado:number=null;
    institucion:string='';
    estudiotitulo:number=null;
    annoingreso:number=null;
    annoegreso:number=null;
    materiasaprobadas:string=null;
    cantidadmaterias:number=null;
    annosaprobadoscursados:string=null;

}

export class EstudioIdioma{

    idioma:number=0;
    habilidad:number=0;
    nivel:number=0;
}

export class CacheEstudio{

    idiomas:Array<any>=null;
    annos:Array<any>=null;
    estudiotitulos:Array<any>=null;
    estudiostipo:Array<any>=null;
    estudioestados:Array<any>=null;
    niveles:Array<any>=null;
}

export class EstuduiIdiomaVisual{
    idioma:number=0;
    idiomaname:string='';
    nivellectura:number=1;
    nivelescritura:number=1;
    nivelconversacion:number=1;

}


export class ExperienciaLaboral {


    hasexperiencia:boolean=false;
    experiencias:Array<Experiencia>=[];

}

export  class Experiencia{

    empresa:string='';
    fechaingreso:Date=null;
    fechaegreso:Date=null;
    actualmente:boolean=true;
    modoegreso:string='acuerdo';
    motivoegreso:string='';
    puestodesempenado:string='';
    principalesresponsabilidades:string='';
    principalestareas:string='';
    actividadempresa:number=0;
    pais:number=0;

    telefono:string='';
    referencias:string='';
    email:string='';

}

export class Result{
    postulaciones:Array<any>=[];
    otraspostulaciones:string='';
    comentarios:string='';
    subscribir:boolean=true;
}

