import {Pipe,PipeTransform} from "@angular/core";


@Pipe({name:'filter'})

export class FilterPipe implements PipeTransform{



    transform(items: any[], args: any):any {
        if (items == undefined || args.id == null || args.id == '')
            return [{'id': '-1', 'nombre': '', 'provincias': []}];
        return items.filter(item => item.id == args.id);
    }
}