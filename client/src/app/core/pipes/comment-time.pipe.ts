// Decorators
import { Pipe, PipeTransform } from '@angular/core';

function calcTime(dateIsoFormat: string) {
  let diff = new Date().getTime() - (new Date(dateIsoFormat).getTime());
  diff = Math.floor(diff / 60000);

  if (diff < 1) {
    return 'less than a minute';
  }

  if (diff < 60) {
    return diff + ' minute' + pluralize(diff);
  }

  diff = Math.floor(diff / 60);

  if (diff < 24) {
    return diff + ' hour' + pluralize(diff);
  }

  diff = Math.floor(diff / 24);

  if (diff < 30) {
    return diff + ' day' + pluralize(diff);
  }

  diff = Math.floor(diff / 30);

  if (diff < 12) {
    return diff + ' month' + pluralize(diff);
  }

  diff = Math.floor(diff / 12);

  return diff + ' year' + pluralize(diff);

  function pluralize(value) {
    if (value !== 1) {
      return 's';
    } else {
      return '';
    }
  }
}

@Pipe({
  name: 'commentTime',
  pure: true
})
export class CommentTimePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    return calcTime(value);
  }

}
