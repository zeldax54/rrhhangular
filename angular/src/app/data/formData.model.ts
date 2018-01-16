export class FormData {


    nombre: string = '';
    apellidos : string ='';
    tipodoc : string = '';
    nrodoc:string='';
    email: string = '';
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
    telefonos:Telefono[]=[];

    estudiotipo:number=null;
    estudioestado:number=null;
    institucion:string='';
    estudiotitulo:number=null;
    annoingreso:number=null;
    annoegreso:number=null;


    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';

    clear() {
        this.nombre = '';
        this.apellidos = '';
        this.tipodoc = '';
        this.nrodoc='';
        this.email = '';
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
        this.telefonos=[];

        this.estudiotipo=null;
        this.estudioestado=null;
        this.institucion='';
        this.estudiotitulo=null;
        this.annoingreso=null;
        this.annoegreso=null;



        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
}

export class Personal {
    nombre: string = '';
    apellidos : string = '';
    tipodoc:string='';
    nrodoc:string='';
    email: string = '';
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
    telefonos:Telefono[];
}

export class Hijo{

    id:any=null;
    fechanacimiento:Date=null;
}
export class Telefono{

    id:any=null;
    numero:string='';
    tipo:string='';

}


export class Estudio{

    estudiotipo:number=null;
    estudioestado:number=null;
    institucion:string='';
    estudiotitulo:number=null;
    annoingreso:number=null;
    annoegreso:number=null;
}


export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}