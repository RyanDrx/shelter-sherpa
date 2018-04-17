import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(value: any, args: any): any {
    const re = new RegExp(args, 'gi');
    return value.replace(re, '<span class="search-mark">' + args + '</span>');
  }
}
