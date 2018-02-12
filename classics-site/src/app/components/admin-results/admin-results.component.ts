import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { GapFillService } from '../../services/gap-fill.service';
import { SubjectsService } from '../../services/subjects.service';


@Component({
  selector: 'admin-results',
  templateUrl: './admin-results.component.html',
  styleUrls: ['./admin-results.component.css']
})
export class AdminResultsComponent implements OnInit {
  students;
  filteredStudents;

  groups: string[] = [];

  constructor(private gapFillService: GapFillService, private subjectsService: SubjectsService) {}

  ngOnInit() {
    this.gapFillService.getAllStudents().subscribe((snapshot) => {
      this.students = snapshot.filter((element) => {
        return !element.isAdmin;
      })
      .map((studentData) => {
        let group = 'No group';
        if (studentData.group) {
          group = studentData.group;
        }
        if (!this.groups.includes(group))  {
          this.groups.push(group);
        }

        const newStudentData = {email: studentData.email, gapFills: [], group: group};
        const gapFillsArray = Object.keys(studentData.gapFills).map((key) => {
          return studentData.gapFills[key];
        });

        const gapFills = gapFillsArray.map((gapFill) => {
          return {...gapFill, ...{course: this.subjectsService.getSubjectName(gapFill.course), date: new Date(gapFill.date)}};
        })
        .sort((a, b) => {
          // sort by ascending course
          const nameA = a.course.toUpperCase(); // ignore upper and lowercase
          const nameB = b.course.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // if same course then sort by ascending exercise
          const sectionA = a.exercise.toUpperCase(); // ignore upper and lowercase
          const sectionB = b.exercise.toUpperCase(); // ignore upper and lowercase
          if (sectionA > sectionB) {
            return 1;
          }
          if (sectionA < sectionB) {
            return -1;
          }

          // if same course and section then sort by descending date
          const dateA = a.date;
          const dateB = b.date;

          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }

          return 0;
        });
        newStudentData.gapFills = gapFills;

        console.log(newStudentData);
        return newStudentData;
      })
      .sort((a, b) => {
        if (a.email > b.email) {
          return 1;
        }
        else if (a.email < b.email) {
          return -1;
        }

        return 0;
      });
      this.filteredStudents = this.students;
    });
  }

  onSelectFilter(event, group) {
    if (event.target.classList.contains('active')) return;

    const siblingNodes = event.target.parentElement.querySelectorAll('.filter');
    const siblings = Array.from(siblingNodes).filter((element) => {
      return element != event.target;
    });

    siblings.map((element: HTMLElement) => {
      element.classList.remove('active');
    });

    event.target.classList.add('active');

    this.filteredStudents = this.students.filter((student) => {
      return student.group == group;
    });
  }

  onClearFilter(event) {
    this.filteredStudents = this.students;
    const siblingNodes = event.target.parentElement.querySelectorAll('.filter');
    const siblings = Array.from(siblingNodes).map((element: HTMLElement) => {
      element.classList.remove('active');
    });
  }

}
