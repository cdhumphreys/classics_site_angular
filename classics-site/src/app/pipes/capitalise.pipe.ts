import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalise'
})

export class CapitalisePipe implements PipeTransform {
  transform(words: any) {
    let splitWords = words.split(' ');

    if (splitWords.length == 1) {
      splitWords = words.split('-').length == 1 ? words.split('_') : words.split('-');
    }

    const capitalisedWordsArray = splitWords.map((word) => {
      const capitalised = word[0].toUpperCase() + word.slice(1);
      return capitalised;
    });

    return capitalisedWordsArray.join(' ');
  }
}
