import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answerFilter'
})

export class AnswerFilterPipe implements PipeTransform {
  // filter out non-answer properties
  transform(questionProperties: any, index: number): any {
    let answers = [];
    for (let questionProperty in questionProperties[index]) {
      if (questionProperty.includes('answer')) {
        answers.push(questionProperties[index][questionProperty]);
      }
    }
    return answers;
  }
}
