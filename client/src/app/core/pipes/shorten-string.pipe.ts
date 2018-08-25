// Decorators
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenString',
  pure: true
})
export class ShortenStringPipe implements PipeTransform {
  transform(value: string, len: number): string {
    if (value.length <= len) {
      return value;
    }

    return value.slice(0, len) + '...';
  }

}
