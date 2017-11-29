import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalise'
})

export class CapitalisePipe implements PipeTransform {
  transform(words: any) {
    const splitWords = words.split(' ');

    const capitalisedWordsArray = splitWords.map((word) => {
      const capitalised = word[0].toUpperCase() + word.slice(1);
      return capitalised;
    });

    return capitalisedWordsArray.join(' ');
  }
}
