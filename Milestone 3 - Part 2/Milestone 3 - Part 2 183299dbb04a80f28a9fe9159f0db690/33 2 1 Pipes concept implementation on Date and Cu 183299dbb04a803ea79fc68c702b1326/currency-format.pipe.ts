import { getNumberOfCurrencyDigits } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})

// export class CurrencyFormatPipe //doto: complete missing code..
//doto: complete missing code..
export class CurrencyFormatPipe implements PipeTransform{

  transform(value: any, symbol: string = "$" ) : any {

    if(isNaN(value) || value == null || value === undefined )
      return 'Invalid amount';

    // convert the value to a number
    let numberValue = Number(value);

    // Format the number with commas as thousand separator
    let formattedValue = numberValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  
    return `${symbol}${formattedValue}`;
  }

}