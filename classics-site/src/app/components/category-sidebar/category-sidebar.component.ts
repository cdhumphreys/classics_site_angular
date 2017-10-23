import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {

  categories = [
    {
      name: 'Ovid',
      expanded: false
    },
    {
      name: 'Propertius',
      expanded: false
    },
    {
      name: 'Cicero',
      expanded: false
    },
    {
      name: 'Catullus',
      expanded: false
    }
  ];
  @Output() onSelectedOption = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onToggleCategory(category) {
    category.expanded = !category.expanded;
  }

  onSelectTask(task: string, category: any) {
    console.log(task, category.name);
    this.onSelectedOption.emit({task, category: category.name});
  }

}
