import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {
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
