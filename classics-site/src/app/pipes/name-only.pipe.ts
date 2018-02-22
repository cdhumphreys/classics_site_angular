import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameOnly'
})

export class NameOnlyPipe implements PipeTransform {
  transform(email: any) {
    const username = email.split('@')[0];
    return username;
  }
}
