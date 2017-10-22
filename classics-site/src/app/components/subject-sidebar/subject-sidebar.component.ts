import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'subject-sidebar',
  templateUrl: './subject-sidebar.component.html',
  styleUrls: ['./subject-sidebar.component.css']
})
export class SubjectSidebarComponent implements OnInit {
  categories = [
    'Ovid',
    'Propertius',
    'Cicero',
    'Catullus'
  ];
  @Output() onSelectedOption = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onSelectTask(task: string, category: string) {
    // console.log(task);
    this.onSelectedOption.emit({task, category});
  }

}
