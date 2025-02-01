import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns'; // Using date-fns for formatting

@Pipe({
  name: 'dateFormat'
})

// export class DateFormatPipe //doto: complete missing code..

//doto: complete missing code..
export class DateFormatPipe implements PipeTransform{

  transform(value: any, dateFormat: string = 'MMMM dd, yyyy' ) : any {
    if(!value){
      return "Invalid date";
    }
    if(value === null){
      return "Invalid date";
    }

      const date = new Date(value);
      if(isNaN(date.getTime()))
        return "Invalid date format";

      const day = date.getDate();
      const month = date.toLocaleString('en-IN', {month: 'long'});
      const year = date.getFullYear();

      // return `${month} ${day}, ${year}`;
      return format(date, dateFormat);

  }
}