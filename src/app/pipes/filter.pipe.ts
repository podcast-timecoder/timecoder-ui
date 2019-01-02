import { Pipe, PipeTransform } from "@angular/core";
import { Theme } from "../model/theme";

@Pipe({ name: 'filter'})
export class FilterPipe implements PipeTransform {
    transform(arr: Theme[], status: boolean) {
      if(arr === null) {
        return []
      } 
      return arr.filter(value => { 
        return value.passed === status; 
      }); 
    }
}